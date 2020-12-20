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

    let coins: number,
        health: number,
        maxHealth: number;

    class Player {

        id: number = Common.getID();
        depth: number = -1;

        constructor(
            public x: number = 0,
            public y: number = 0,
            public speed: number = 5
        ) {}

        update() {
            if (Input.keyHold(KeyCode.Left)) {
                this.x -= this.speed;
            }
            if (Input.keyHold(KeyCode.Right)) {
                this.x += this.speed;
            }
            if (Input.keyHold(KeyCode.Up)) {
                this.y -= this.speed;
            }
            if (Input.keyHold(KeyCode.Down)) {
                this.y += this.speed;
            }
            const items: Item[] = OBJ.take(TAG.item);
            for (const item of items) {
                if (item.containsPoint(this)) {
                    item.onCollected();
                    OBJ.remove(TAG.item, (n: Item) => {
                        return n.id === item.id;
                    });
                }
            }
        }

        render() {
            Draw.setColor(C.blueViolet);
            Draw.rectCenter(this.x, this.y, 32, 32);
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
            switch (this.type) {
                case ItemType.coin: coins += this.value; break;
                case ItemType.potion: health += this.value; break;
            }
        }

        containsPoint(point: { x: number, y: number }) {
            let dx = point.x - this.x,
                dy = point.y - this.y,
                distance = Common.hypot(dx, dy);
            return distance < 32;
        }

        render() {
            Draw.image(this.canvasImage, this.x, this.y);
        }
    }
    
    enum ItemType {
        coin = 'coin',
        potion = 'potion'
    };
    
    enum TAG {
        player = 'player',
        item = 'item'
    };

    const spawnItem = (type: ItemType) => {
        return OBJ.push(TAG.item, new Item(type, Stage.randomX(), Stage.randomY(), Math.floor(Common.range(10, 20))));
    };
    
    const GameScenes: NzymGameScene = {
        onLoad: {}
    };

    GameScenes.boot = () => {
        coins = 0;
        maxHealth = 100;
        health = maxHealth;
        OBJ.addTag(
            TAG.player,
            TAG.item
        );
    };

    GameScenes.start = () => {
        OBJ.push(TAG.player, new Player(Stage.mid.w, Stage.mid.h));
    };

    GameScenes.update = () => {
        health -= 0.1;
        if (Time.frameCount % 120 === 0) {
            if (OBJ.count(TAG.item) < 10) {
                spawnItem(Common.picko(ItemType));
            }
        }
    };

    GameScenes.renderUI = () => {
        Draw.setFont(Font.m);
        Draw.setColor(C.black);
        Draw.setHVAlign(Align.l, Align.t);
        Draw.text(10, 10, `Coins: ${coins}\nHealth: ${Math.max(0, Math.floor(health))}/${maxHealth}`);
        const y = Draw.lastText.y + Draw.getLastTextHeight() + 2;
        const w = 150;
        Draw.setColor(C.black);
        Draw.rect(10, y, w, 10);
        Draw.setColor(C.red);
        Draw.rect(11, y + 1, (w - 2) * (Math.max(0, health) / maxHealth), 8);
    };

    Scene.setup({
        scenes: GameScenes
    });

    Engine.makeGlobalAliases();
    Engine.start();

    return Engine;
})();