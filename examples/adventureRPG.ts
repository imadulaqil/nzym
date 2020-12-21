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
        parent: document.getElementById('gameContainer')
    });

    const {
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
    
    enum TAG {
        player = 'player',
        item = 'item',
        floatingText = 'floatingText',
        block = 'block',
        footsteps = 'footsteps'
    };

    let coins: number,
        health: number,
        maxHealth: number,
        magnetRange: number;

    class Hitbox {
        constructor(
            public x: number,
            public y: number,
            public w: number,
            public h: number,
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

        updatePosition(x: number, y: number) {
            this.x = x;
            this.y = y;
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
        depth: number = -1;
        imageIndex: number;
        imageNumber: number;
        imageXScale: number;
        imageYScale: number;
        imageAngle: number;
        imageOriginX: number;
        imageOriginY: number;

        face: 1 | -1;
        xPrev: number;
        yPrev: number;
        moveTime: number;

        hitbox: Hitbox;

        constructor(
            public x: number = 0,
            public y: number = 0,
            public speed: number = 5
        ) {
            this.imageIndex = 0;
            this.imageNumber = 4;
            this.imageXScale = 1.5;
            this.imageYScale = 1.5;
            this.imageAngle = 0;
            this.imageOriginX = 0.5;
            this.imageOriginY = 1;
            this.face = 1;
            this.xPrev = this.x;
            this.yPrev = this.y;
            this.moveTime = 0;
            this.hitbox = new Hitbox(this.x, this.y, 20, 12, true);
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
                    this.spawnFootsteps(this.xPrev + offset + Common.range(-5, 5), this.yPrev + Common.range(-5, 5));
                    // this.spawnFootsteps(this.xPrev + 8 + Common.range(-5, 5), this.yPrev + Common.range(-5, 5));
                }
                this.moveTime += Time.clampedDeltaTime;
            }
            else {
                this.moveTime = 0;
            }
        }

        spawnFootsteps(x: number, y: number) {
            OBJ.push(TAG.footsteps, new Footsteps(x, y, 8));
        }

        update() {
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
            this.constraint();
        }

        updateHitbox() {
            this.hitbox.updatePosition(this.x, this.y - 8);
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
                this.imageXScale * this.face,
                this.imageYScale,
                this.imageAngle,
                this.imageOriginX,
                this.imageOriginY,
                true
            );
            Draw.smooth();
            // Draw.circle(this.x, this.y, 10);
            // this.hitbox.draw();
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
            if (this.alpha < 0) {
                OBJ.remove(TAG.footsteps, (n) => n.id === this.id);
            }
        }
    }

    class Item {

        id: number = Common.getID();
        depth: number = 0;
        canvasImage: HTMLCanvasElement;

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
            Draw.image(this.canvasImage, this.x, this.y);
        }
    }

    class FloatingText {

        static floatSpeed = 1;

        id: number = Common.getID();
        depth: number = -2;

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
        depth: number = 1;

        constructor(
            public x: number,
            public y: number,
            public w: number,
            public h: number
        ) {}

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
            Draw.setColor(C.burlyWood, C.black);
            Draw.rect(this.x, this.y, this.w, this.h);
            Draw.stroke();
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
        OBJ.addTag(
            TAG.player,
            TAG.item,
            TAG.floatingText,
            TAG.block,
            TAG.footsteps
        );

        Loader.loadImage('player-idle', '../assets/images/ghost-idle_strip4.png');

        Loader.loadSound('coin', '../assets/sounds/coin.mp3');
        Loader.loadSound('item1', '../assets/sounds/item1.mp3');
        Loader.loadSound('item2', '../assets/sounds/item2.mp3');
    };

    GameScenes.start = () => {
        const blockMap = {
            x: 0,
            y: 0,
            w: 32,
            h: 32,
            rows: 18,
            columns: 25,
            data: [
                '#########################',
                '#.......................#',
                '#.......................#',
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
        // if (Time.frameCount % 20 === 0) {
        //     if (OBJ.count(TAG.item) < 25) {
        //         spawnItem(Common.picko(ItemType));
        //     }
        // }
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
    };

    Scene.setup({
        scenes: GameScenes
    });

    Engine.makeGlobalAliases();
    Engine.start();

    return Engine;
})();