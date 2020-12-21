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
        floatingText ='floatingText'
    };

    let coins: number,
        health: number,
        maxHealth: number,
        magnetRange: number;

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

        constructor(
            public x: number = 0,
            public y: number = 0,
            public speed: number = 5
        ) {
            this.imageIndex = 0;
            this.imageNumber = 4;
            this.imageXScale = 2;
            this.imageYScale = 2;
            this.imageAngle = 0;
            this.imageOriginX = 0.5;
            this.imageOriginY = 1;
            this.face = 1;
            this.xPrev = this.x;
            this.yPrev = this.y;
            this.moveTime = 0;
        }

        update() {
            this.xPrev = this.x;
            this.yPrev = this.y;
            if (Input.keyHold(KeyCode.Left)) {
                this.x -= this.speed;
                this.face = -1;
            }
            if (Input.keyHold(KeyCode.Right)) {
                this.x += this.speed;
                this.face = 1;
            }
            if (Input.keyHold(KeyCode.Up)) {
                this.y -= this.speed;
            }
            if (Input.keyHold(KeyCode.Down)) {
                this.y += this.speed;
            }
            if (this.x !== this.xPrev || this.y !== this.yPrev) {
                this.moveTime += Time.clampedDeltaTime;
            }
            else {
                this.moveTime = 0;
            }
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
            TAG.floatingText
        );

        Loader.loadImage('player-idle', '../assets/images/ghost-idle_strip4.png');

        Loader.loadSound('coin', '../assets/sounds/coin.mp3');
        Loader.loadSound('item1', '../assets/sounds/item1.mp3');
        Loader.loadSound('item2', '../assets/sounds/item2.mp3');
    };

    GameScenes.start = () => {
        OBJ.push(TAG.player, new Player(Stage.mid.w, Stage.mid.h));
    };

    GameScenes.update = () => {
        health -= 0.1;
        if (Time.frameCount % 20 === 0) {
            if (OBJ.count(TAG.item) < 25) {
                spawnItem(Common.picko(ItemType));
            }
        }
    };

    GameScenes.renderUI = () => {
        Draw.setFont(Font.m);
        Draw.setColor(C.black);
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