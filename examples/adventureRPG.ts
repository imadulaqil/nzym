var Example = Example || {};

Example.adventureRPG = (() => {

    const {
        C,
        Align,
        Common,
        Events,
        KeyCode,
        LineCap,
        LineJoin,
        LineDash,
        Primitive
    } = Nzym.getAliases();

    const Engine = new NzymEngine({
        name: 'Adventure RPG',
        w: 800,
        h: 576,
        bgColor: C.burlyWood,
        parent: document.getElementById('gameContainer')
    });

    const {
        Log,
        OBJ,
        Draw,
        Font,
        Time,
        Input,
        Scene,
        Sound,
        Stage,
        Loader
    } = Engine.getAliases();

    enum ItemType {
        coin = 'coin',
        potion = 'potion'
    };

    enum EnemyType {
        slimey = 'slimey'
    };

    enum EnemyState {
        idle = 'idle',
        chase = 'chase',
        patrol = 'patrol',
        attack = 'attack',
        die = 'die'
    };

    enum BulletTag {
        player = 'player',
        enemy = 'enemy'
    };
    
    enum TAG {
        player = 'player',
        item = 'item',
        floatingText = 'floatingText',
        block = 'block',
        footsteps = 'footsteps',
        enemy = 'enemy',
        bullet = 'bullet',
        particle = 'particle'
    };

    class MyCamera {

        x: number = 0;
        y: number = 0;

        constructor() {}

        follow(x: number, y: number): void {
            const target = {
                x: Stage.mid.w - x,
                y: Stage.mid.h - y
            };
            this.x += 0.1 * ((target.x) - this.x);
            this.y += 0.1 * ((target.y) - this.y);
        }
    }

    let coins: number,
        health: number,
        maxHealth: number,
        magnetRange: number,
        treeImages: HTMLImageElement[],
        Emitter: NzymEmitter,
        Camera: MyCamera;

    class Hitbox {
        constructor(
            public x: number,
            public y: number,
            public w: number,
            public h: number,
            public xOffset: number = 0,
            public yOffset: number = 0,
            public isCenter: boolean = false
        ) {
            this.updatePosition(this.x, this.y);
        }

        getTop() {
            return this.y;
        }

        getRight() {
            return this.x + this.w;
        }

        getBottom() {
            return this.y + this.h;
        }

        getLeft() {
            return this.x;
        }

        getCenter() {
            return this.x + this.w / 2;
        }

        getMiddle() {
            return this.y + this.h / 2;
        }

        updatePosition(x: number, y: number) {
            this.x = x + this.xOffset;
            this.y = y + this.yOffset;
            if (this.isCenter) {
                this.x -= this.w / 2;
                this.y -= this.h / 2;
            }
        }

        draw() {
            Draw.setColor(C.magenta);
            Draw.rectObject(this, true);
        }
    }

    class Player {

        id: number = Common.getID();
        depth: number;
        imageIndex: number;
        imageNumber: number;
        imageXScale: number;
        imageYScale: number;
        imageAngle: number;
        imageOriginX: number;
        imageOriginY: number;

        xs: number = 1;
        ys: number = 1;

        face: 1 | -1;
        xPrev: number;
        yPrev: number;
        moveTime: number;

        isDead: boolean = false;

        hitbox: Hitbox;
        bulletHitbox: Hitbox;

        constructor(
            public x: number = 0,
            public y: number = 0,
            public speed: number = 5
        ) {
            this.imageIndex = 0;
            this.imageNumber = 4;
            this.imageXScale = 1.2;
            this.imageYScale = 1.2;
            this.imageAngle = 0;
            this.imageOriginX = 0.5;
            this.imageOriginY = 1;
            this.face = 1;
            this.xPrev = this.x;
            this.yPrev = this.y;
            this.moveTime = 0;
            this.hitbox = new Hitbox(this.x, this.y, 20, 12, 0, -8, true);
            this.bulletHitbox = new Hitbox(this.x, this.y, 24, 40, 0, -24, true);
        }

        movement() {
            this.xPrev = this.x;
            this.yPrev = this.y;

            const move = {
                x: 0,
                y: 0
            };

            if (Input.keyHold(KeyCode.Left)) {
                move.x -= 1;
                this.face = -1;
            }
            if (Input.keyHold(KeyCode.Right)) {
                move.x += 1;
                this.face = 1;
            }
            if (Input.keyHold(KeyCode.Up)) {
                move.y -= 1;
            }
            if (Input.keyHold(KeyCode.Down)) {
                move.y += 1;
            }

            const moveMag = Common.hypot(move.x, move.y);

            if (moveMag > 0) {
                move.x /= moveMag;
                move.y /= moveMag;
                move.x *= this.speed;
                move.y *= this.speed;
            }

            this.x += move.x;
            this.y += move.y;

            if (this.x !== this.xPrev || this.y !== this.yPrev) {
                if (Time.frameCount % 5 === 0) {
                    const offset = Time.frameCount % 10 === 0? -8 : 8;
                    this.spawnFootsteps(this.xPrev + offset + Common.range(-2, 2), this.yPrev + Common.range(-2, 2));
                    // this.spawnFootsteps(this.xPrev + 8 + Common.range(-5, 5), this.yPrev + Common.range(-5, 5));
                }
                this.moveTime += Time.clampedDeltaTime;
            }
            else {
                this.moveTime = 0;
            }
        }

        spawnFootsteps(x: number, y: number) {
            OBJ.push(TAG.footsteps, new Footsteps(x, y, Common.range(7, 8)));
        }

        update() {
            if (this.isDead) return;
            this.movement();
            const items: Item[] = OBJ.take(TAG.item);
            for (const item of items) {
                const cp = item.containsPoint(this);
                if (cp.isContained) {
                    item.onCollected();
                    OBJ.remove(TAG.item, (n: Item) => {
                        return n.id === item.id;
                    });
                }
                if (cp.distance < magnetRange) {
                    item.x += 0.2 * (this.x - item.x);
                    item.y += 0.2 * (this.y - item.y);
                }
            }
            this.updateHitbox();
            this.bulletCheck();
            this.constraint();

            this.depth = -this.y;
        }

        bulletCheck() {
            const bullets: Bullet[] = OBJ.take(TAG.bullet);
            for (const bullet of bullets) {
                if (bullet.tag === BulletTag.enemy) {
                    if (Common.rectContainsPoint(this.bulletHitbox, bullet)) {
                        this.x += bullet.vx * 1;
                        this.y += bullet.vy * 1;
                        this.xs = 0.8;
                        this.ys = 1.2;
                        this.face = this.x < bullet.x? 1 : -1;
                        health -= bullet.damage;
                        spawnFloatingText(bullet.x, bullet.y, `-${bullet.damage}`, Math.PI * Common.range(-0.05, 0.05), C.red);
                        OBJ.removeById(TAG.bullet, bullet.id);
                        Emitter.setArea(bullet.x, bullet.y);
                        Emitter.emit(Common.choose(4, 5, 6));
                        Sound.play('hit');
                        if (health < 0) {
                            health = 0;
                            this.isDead = true;
                            break;
                        }
                    }
                }
            }
        }

        updateHitbox() {
            this.hitbox.updatePosition(this.x, this.y);
            this.bulletHitbox.updatePosition(this.x, this.y);
        }

        constraint() {
            const blocks: Block[] = OBJ.take(TAG.block);
            for (const block of blocks) {
                if (block.intersectsRect(this.hitbox)) {
                    if (this.hitbox.getLeft() < block.getLeft()) {
                        if (this.x > this.xPrev) {
                            this.x = this.xPrev;
                        }
                    }
                    this.updateHitbox();
                    if (this.hitbox.getRight() > block.getRight()) {
                        if (this.x < this.xPrev) {
                            this.x = this.xPrev;
                        }
                    }
                    this.updateHitbox();
                    if (this.hitbox.getTop() < block.getTop()) {
                        if (this.y > this.yPrev) {
                            this.y = this.yPrev;
                        }
                    }
                    this.updateHitbox();
                    if (this.hitbox.getBottom() > block.getBottom()) {
                        if (this.y < this.yPrev) {
                            this.y = this.yPrev;
                        }
                    }
                    // this.x = this.xPrev;
                    // this.y = this.yPrev;
                }
            }
        }

        render() {
            this.xs += 0.2 * (1 - this.xs);
            this.ys += 0.2 * (1 - this.ys);
            if (this.isDead) {
                Draw.noSmooth();
                Draw.strip(
                    'player-idle',
                    this.imageNumber,
                    0,
                    this.x,
                    this.y,
                    this.imageXScale * this.face * this.xs,
                    this.imageYScale * this.ys,
                    Math.PI / 2 * -this.face,
                    this.imageOriginX,
                    this.imageOriginY,
                    true
                );
                Draw.smooth();
                return;
            }
            this.imageIndex += Time.clampedDeltaTime * (this.moveTime > 0? 0.2 : 0.1);
            const t = this.moveTime > 0? Math.sin(this.moveTime * 0.5) * this.face : 0;
            this.imageAngle = t * Math.PI / 20;
            Draw.noSmooth();
            Draw.strip(
                'player-idle',
                this.imageNumber,
                Math.floor(this.imageIndex),
                this.x,
                this.y - Math.abs(5 * t),
                this.imageXScale * this.face * this.xs,
                this.imageYScale * this.ys,
                this.imageAngle,
                this.imageOriginX,
                this.imageOriginY,
                true
            );
            Draw.smooth();
            // Draw.circle(this.x, this.y, 10);
            // this.hitbox.draw();
            // this.bulletHitbox.draw();
        }
    }

    class Footsteps {

        id: number = Common.getID();
        depth: number = 2;

        private alpha: number = 0.5;

        constructor(
            public x: number,
            public y: number,
            public size: number,
            public color: string = C.black
        ) {}
        
        render() {
            Draw.setColor(this.color);
            Draw.setAlpha(this.alpha);
            Draw.circle(this.x, this.y, this.size / 2);
            Draw.setAlpha(1);
            this.alpha -= 0.02;
            this.size -= 0.05;
            if (this.size < 1) {
                this.size = 1;
            }
            if (this.alpha < 0) {
                OBJ.remove(TAG.footsteps, (n) => n.id === this.id);
            }
        }
    }

    class Item {

        id: number = Common.getID();
        depth: number = -9998;
        canvasImage: HTMLCanvasElement;

        scale = Common.range(0.8, 1);

        constructor(
            public type: ItemType,
            public x: number = 0,
            public y: number = 0,
            public value: number = 0
        ) {
            this.canvasImage = Draw.createCanvas(32, 32, (canvas, w, h) => {
                switch (this.type) {
                    case ItemType.coin: Item.drawCoin(canvas, w, h); break;
                    case ItemType.potion: Item.drawPotion(canvas, w, h); break;
                }
            });
        }
            
        static drawCoin(canvas?: HTMLCanvasElement, w?: number, h?: number) {
            Draw.setColor(C.goldenRod);
            Draw.circle(w / 2, h / 2, 15);
            Draw.setColor(C.yellow);
            Draw.circle(w / 2, h / 2, 10);
        }

        static drawPotion(canvas?: HTMLCanvasElement, w?: number, h?: number) {
            Draw.setColor(C.red);
            Draw.circle(w / 2, h / 2, 15);
            Draw.setColor(C.white);
            Draw.circle(w / 2, h / 2, 10);
            Draw.setColor(C.red);
            Draw.setLineWidth(4);
            Draw.plus(w / 2, h / 2, 6);
            Draw.setLineWidth(1);
        }

        onCollected() {
            const angle = Math.PI * Common.range(-0.05, 0.05);
            switch (this.type) {
                case ItemType.coin:
                    coins += this.value;
                    spawnFloatingText(this.x, this.y, `Coins +${this.value}`, angle, C.gold);
                    Sound.play('coin');
                    break;
                case ItemType.potion:
                    health += this.value;
                    if (health > maxHealth) {
                        maxHealth += 0.1 * (health - maxHealth);
                        health = maxHealth;
                    }
                    spawnFloatingText(this.x, this.y, `Health +${this.value}`, angle, C.red);
                    Sound.play('item2');
                    break;
            }
        }

        containsPoint(point: { x: number, y: number }) {
            let dx = point.x - this.x,
                dy = point.y - this.y,
                distance = Common.hypot(dx, dy);
            return {
                distance: distance,
                isContained: distance < 32
            };
        }

        render() {
            Draw.image(this.canvasImage, this.x, this.y, this.scale * Math.sin((Time.frameCount + this.id) * 0.1), this.scale);
        }
    }

    class FloatingText {

        static floatSpeed = 1;

        id: number = Common.getID();
        depth: number = -9999;

        private vx: number;
        private vy: number;
        private alpha: number = 1;

        constructor(
            public x: number,
            public y: number,
            public text: string,
            public angle: number = 0,
            public color: string = C.black
        ) {
            const up = angle - Math.PI / 2;
            this.vx = Math.cos(up) * FloatingText.floatSpeed;
            this.vy = Math.sin(up) * FloatingText.floatSpeed;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
        }
        
        render() {
            Draw.setColor(this.color);
            Draw.setAlpha(this.alpha);
            Draw.onTransform(this.x, this.y, 1, 1, this.angle, () => {
                Draw.setFont(Font.mb);
                Draw.setHVAlign(Align.c, Align.m);
                Draw.text(0, 0, this.text);
            }, true);
            Draw.setAlpha(1);
            this.alpha -= 0.02;
            if (this.alpha < 0) {
                OBJ.remove(TAG.floatingText, (n) => n.id === this.id);
            }
        }
    }

    class Block {

        id: number = Common.getID();
        depth: number;
        image: HTMLImageElement;
        imageXScale: number;
        imageYScale: number;
        imageAngle: number;

        constructor(
            public x: number,
            public y: number,
            public w: number,
            public h: number
        ) {
            this.image = Common.pick(treeImages);
            this.imageXScale = Common.range(0.7, 1);
            this.imageYScale = Common.range(0.7, this.imageXScale);
            this.imageAngle = 0;
            this.depth = -(this.y + this.h - 2 + Common.range(0, 2));
        }

        getTop() {
            return this.y;
        }

        getRight() {
            return this.x + this.w;
        }

        getBottom() {
            return this.y + this.h;
        }

        getLeft() {
            return this.x;
        }

        containsPoint(point: { x: number, y: number }) {
            return point.x >= this.getLeft() && point.x < this.getRight()
                && point.y >= this.getTop() && point.y < this.getBottom();
        }

        intersectsRect(rect: { x: number, y: number, w: number, h: number}) {
            return this.getLeft() < rect.x + rect.w && this.getRight() >= rect.x
                && this.getTop() < rect.y + rect.h && this.getBottom() >= rect.y;
        }

        render() {
            // Draw.setColor(C.burlyWood, C.black);
            // Draw.rect(this.x, this.y, this.w, this.h);
            // Draw.stroke();
            this.imageAngle = Math.sin((Time.frameCount + this.id * this.id) * 0.01) * 2;
            Draw.image(this.image, this.x + this.w / 2, this.y + this.h / 2, this.imageXScale, this.imageYScale, this.imageAngle, 0.5, 0.9);
        }
    }

    class Enemy {

        events = {};

        id: number = Common.getID();
        depth: number;
        state: EnemyState = EnemyState.idle;
        
        target = {
            x: 0,
            y: 0
        };

        speed = 0.5;

        vx = 0;
        vy = 0;

        xs = 1;
        ys = 1;

        attackTime = 0;
        attackRange = Common.range(100, 200);
        attackInterval = Common.range(10, 20);

        shootPoint: NzymPoint = {
            x: 0,
            y: 0
        };

        playerInRange = false;

        constructor(
            public type: EnemyType,
            public x: number,
            public y: number
        ) {
            this.xs = 1.8;
            this.ys = 0.2;
            this.depth = -this.y;
            switch (this.type) {
                case EnemyType.slimey:
                    this.shootPoint.x = this.x;
                    this.shootPoint.y = this.y - 32;
                    Events.on(this, 'idleupdate', () => {
                        const p: Player = OBJ.take(TAG.player)[0];
                        if (p) {
                            if (p.isDead) {
                                return;
                            }
                            const distanceBetween = Common.hypot(p.x - this.x, p.y - this.y);
                            if (distanceBetween < this.attackRange) {
                                this.playerInRange = true;
                                this.changeState(EnemyState.attack);
                            }
                        }
                    });
                    Events.on(this, 'attackupdate', () => {
                        this.playerInRange = false;
                        const p: Player = OBJ.take(TAG.player)[0];
                        if (p) {
                            if (p.isDead) {
                                this.changeState(EnemyState.idle);
                                return;
                            }
                            const distanceBetween = Common.hypot(p.x - this.x, p.y - this.y);
                            if (distanceBetween > this.attackRange) {
                                this.attackTime = 0;
                                this.changeState(EnemyState.idle);
                            }
                            else {
                                this.playerInRange = true;
                                if (this.attackTime < 0) {
                                    const bulletSpeed = Common.range(1.9, 2.1)
                                    OBJ.push(TAG.bullet,
                                        new Bullet(
                                            BulletTag.enemy,
                                            this.shootPoint.x,
                                            this.shootPoint.y,
                                            Common.angleBetween(
                                                this.shootPoint.x,
                                                this.shootPoint.y,
                                                p.bulletHitbox.getCenter() + Common.range(-3, 3),
                                                p.bulletHitbox.getMiddle() + Common.range(-3, 3)
                                            ),
                                            bulletSpeed
                                        )
                                    );
                                    this.attackTime = this.attackInterval;
                                }
                                else {
                                    this.attackTime -= Time.clampedDeltaTime;
                                }
                            }
                        }
                    });
                    Events.on(this, 'render', () => {

                        this.xs += 0.2 * (1 - this.xs);
                        this.ys += 0.2 * (1 - this.ys);

                        // Draw.setAlpha(this.playerInRange? 0.5 : 0.2);
                        // Draw.setColor(C.wheat);
                        // Draw.circle(this.x, this.y, this.attackRange);
                        // Draw.setAlpha(1);
                        
                        const p = this.getPlayer();
                        Draw.image('snowman', this.x, this.y, 0.5 * (this.x < p.x? 1 : -1) * this.xs, 0.5 * this.ys, 0, 0.5, 0.9);

                        Draw.setStroke(C.red);
                        Draw.circle(this.shootPoint.x, this.shootPoint.y, 16 * Math.max(0, this.attackTime / 20), true);
                    });
                    break;
            }
        }

        getPlayer() {
            const p: Player = OBJ.take(TAG.player)[0];
            return p || { x: 0, y: 0 };
        }

        followTarget() {
            let dx = this.target.x - this.x,
                dy = this.target.y - this.y,
                length = Common.hypot(dx, dy);

            dx /= length;
            dy /= length;

            this.vx = dx * this.speed;
            this.vy = dy * this.speed;
            this.x += this.vx;
            this.y += this.vy;
            return length;
        }

        changeState(newState: EnemyState) {
            // trigger event `transition from old state to new state`
            const errorObject = {
                errorCount: 0,
                errorMessage: ''
            };
            Events.trigger(this, `transition${this.state}${newState}`, errorObject);
            if (errorObject.errorCount > 0) {
                Log.error(`Failed to trigger enemy (id=${this.id}) transition event`, errorObject.errorMessage);
            }
            else {
                Events.trigger(this, `${this.state}end`);
                Events.trigger(this, `${newState}start`);
                this.state = newState;
            }
        }

        update() {
            switch (this.state) {
                case EnemyState.idle: Events.trigger(this, 'idleupdate'); break;
                case EnemyState.chase: Events.trigger(this, 'chaseupdate'); break;
                case EnemyState.patrol: Events.trigger(this, 'patrolupdate'); break;
                case EnemyState.attack: Events.trigger(this, 'attackupdate'); break;
                case EnemyState.die: Events.trigger(this, 'dieupdate'); break;
                default: this.changeState(EnemyState.idle); break;
            }
        }

        render() {
            Events.trigger(this, 'render');
            switch (this.state) {
                case EnemyState.idle: Events.trigger(this, 'idlerender'); break;
                case EnemyState.chase: Events.trigger(this, 'chaserender'); break;
                case EnemyState.patrol: Events.trigger(this, 'patrolrender'); break;
                case EnemyState.attack: Events.trigger(this, 'attackrender'); break;
                case EnemyState.die: Events.trigger(this, 'dierender'); break;
                default: this.changeState(EnemyState.idle); break;
            }
        }
    }

    class Bullet {

        id = Common.getID();
        depth = 0;

        vx = 0;
        vy = 0;

        constructor(
            public tag: BulletTag,
            public x: number,
            public y: number,
            public angle: number,
            public speed: number,
            public damage: number = Common.choose(3, 4, 5),
            public radius: number = 3
        ) {
            this.vx = Math.cos(angle) * this.speed;
            this.vy = Math.sin(angle) * this.speed;
            this.radius = this.damage * 0.8;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (!Stage.insideStage(this.x, this.y)) {
                OBJ.removeById(TAG.bullet, this.id);
            }
            // else {
            //     const blocks: Block[] = OBJ.take(TAG.block);
            //     for (const b of blocks) {
            //         if (b.containsPoint(this)) {
            //             OBJ.removeById(TAG.bullet, this.id);
            //             break;
            //         }
            //     }
            // }
            this.depth = -this.y - 32;
        }

        render() {
            Draw.setColor(C.red);
            Draw.circle(this.x, this.y, this.radius);
            Draw.setColor(C.orange);
            Draw.circle(this.x, this.y, this.radius * 0.75);
        }
    }

    const spawnItem = (type: ItemType) => {
        return OBJ.push(TAG.item, new Item(type, Stage.randomX(), Stage.randomY(), Math.floor(Common.range(10, 20))));
    };

    const spawnFloatingText = (x: number, y: number, text: string, angle?: number, color?: string) => {
        return OBJ.push(TAG.floatingText, new FloatingText(x, y, text, angle, color));
    };
    
    const GameScenes: NzymGameScene = {
        onLoad: {}
    };

    GameScenes.boot = () => {
        coins = 0;
        maxHealth = 100;
        health = maxHealth;
        magnetRange = 100;
        Camera = new MyCamera();
        OBJ.addTag(
            TAG.player,
            TAG.item,
            TAG.floatingText,
            TAG.block,
            TAG.footsteps,
            TAG.enemy,
            TAG.bullet,
            TAG.particle
        );

        Emitter = NzymEmitter.Blood(Engine, TAG.particle);
        Emitter.setDepth(-9997);

        Loader.loadImage('player-idle', '../assets/images/ghost-idle_strip4.png');
        Loader.loadImage('snowman', '../assets/images/kenney/snowmanFancy_SE.png');

        treeImages = [];
        for (const d of ['NE', 'NW', 'SE', 'SW']) {
            treeImages.push(Loader.loadImage(`../assets/images/kenney/treePine_${d}.png`));
        }

        Loader.loadSound('hit', '../assets/sounds/hit.mp3');
        Loader.loadSound('coin', '../assets/sounds/coin.mp3');
        Loader.loadSound('item1', '../assets/sounds/item1.mp3');
        Loader.loadSound('item2', '../assets/sounds/item2.mp3');
    };

    GameScenes.start = () => {
        Sound.setVolume('hit', 0.5);
        const blockMap = {
            x: 0,
            y: 0,
            w: 32,
            h: 32,
            rows: 19,
            columns: 25,
            data: [
                '#########################',
                '####...##########...#####',
                '#............#..#.......#',
                '#.......................#',
                '#.......................#',
                '#..................#....#',
                '#..................#....#',
                '#......#....##.....##...#',
                '#......#................#',
                '#......###..............#',
                '#.......................#',
                '#..............###......#',
                '#................#......#',
                '#................####...#',
                '#.......................#',
                '#.......................#',
                '#.......................#',
                '#.......................#',
                '#########################'
            ]
        };

        for (let j = 0; j < Math.min(blockMap.rows, blockMap.data.length); j++) {
            for (let i = 0; i < Math.min(blockMap.columns, blockMap.data[j].length); i++) {
                if (blockMap.data[j][i] === '#') {
                    OBJ.push(TAG.block, new Block(blockMap.x + i * blockMap.w, blockMap.y + j * blockMap.h, blockMap.w, blockMap.h));
                }
            }
        }

        OBJ.push(TAG.player, new Player(Stage.mid.w, Stage.mid.h));
    };

    GameScenes.update = () => {
        // health -= 0.1;
        if (Time.frameCount % 20 === 0) {
            if (OBJ.count(TAG.item) < 25) {
                spawnItem(Common.picko(ItemType));
            }
        }
        if (Time.frameCount % 10 === 0) {
            if (OBJ.count(TAG.enemy) < 10) {
                const spawnPos = {
                    x: Stage.randomX(),
                    y: Stage.randomY()
                };
                // check if empty
                let isBlocked = false;
                const blocks: Block[] = OBJ.take(TAG.block);
                for (const b of blocks) {
                    if (b.containsPoint(spawnPos)) {
                        isBlocked = true;
                        break;
                    }
                }
                if (!isBlocked) {
                    OBJ.push(TAG.enemy, new Enemy(Common.picko(EnemyType), spawnPos.x, spawnPos.y));
                }
            }
        }

        const mainPlayer: Player = OBJ.take(TAG.player)[0];
        Camera.follow(mainPlayer.x, mainPlayer.y);
    };

    GameScenes.render = () => {
        OBJ.autoRender = false;
        const sortedList = [];
        for (const list of OBJ.list) {
            for (const n of list) {
                if (n.render) {
                    sortedList.push(n);
                }
            }
        }
        sortedList.sort((a, b) => b.depth - a.depth);
        Draw.ctx.save();
        Draw.ctx.translate(Camera.x, Camera.y);
        for (const n of sortedList) {
            n.render();
        }
        Draw.ctx.restore();
    };

    GameScenes.renderUI = () => {
        Draw.setColor(C.black);
        Draw.setAlpha(0.5);
        Draw.rect(0, 0, 180, 80);
        Draw.setAlpha(1);
        Draw.setFont(Font.mb);
        Draw.setColor(C.white);
        Draw.setHVAlign(Align.l, Align.t);
        const hp = Common.clamp(health, 0, maxHealth);
        Draw.text(10, 10, `Coins: ${coins}\nHealth: ${Math.floor(hp)}/${Math.floor(maxHealth)}`);
        const y = Draw.lastText.y + Draw.getLastTextHeight() + 2;
        const w = 150;
        Draw.setColor(C.black);
        Draw.rect(10, y, w, 10);
        Draw.setColor(C.red);
        Draw.rect(11, y + 1, (w - 2) * (hp / maxHealth), 8);

        // Debug
        Draw.setFont(Font.sm);
        Draw.setColor(C.black);
        Draw.setHVAlign(Align.l, Align.m);
        let debugText = `Bullet count: ${OBJ.count(TAG.bullet)}`;
        Draw.text(10, Stage.mid.h, debugText);

        // Credits
        Draw.setFont(Font.smb);
        Draw.setColor(C.black);
        Draw.setHVAlign(Align.l, Align.b);
        Draw.text(Draw.currentFont.size / 2, Stage.h - Draw.currentFont.size / 2, 'Art by kenney.nl');
    };

    Scene.setup({
        scenes: GameScenes
    });

    Engine.makeGlobalAliases();
    Engine.start();

    return Engine;
})();