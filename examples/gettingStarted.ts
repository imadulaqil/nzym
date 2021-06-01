Nzym.Example.gettingStarted = (() => {

    const Engine = new NzymEngine({
        name: 'Getting Started',
        parent: document.getElementById('gameContainer')
    });
    const {
        C,
        OBJ,
        Draw,
        Font,
        Time,
        Align,
        Input,
        Scene,
        Stage,
        Common,
        KeyCode,
        Primitive
    } = Engine.getAliases();

    class Box {

        id: number;
        x: number;
        y: number;
        size: number;
        angle: number;
        color: string;

        constructor(x: number, y: number) {
            this.id = Common.getID();
            this.x = x;
            this.y = y;
            this.size = 40 + Math.sin(Time.frameCount * 0.2) * 20;
            this.angle = 0;
            this.color = C.royalBlue;
        }

        update() {
            this.angle += Math.PI / 20;
            if (this.angle > Math.PI * 4) {
                OBJ.remove('box', (n: Box) => n.id === this.id);
            }
        }

        render() {
            Draw.setColor(this.color);
            Draw.setLineWidth(2);
            Draw.onTransform(this.x, this.y, 1, 1, this.angle, () => {
                Draw.rectCenter(0, 0, this.size, this.size, true);
            }, true);
        }
    }

    let color: string, points: { x: number, y: number }[], primitiveKind: any;

    const Game: NzymGame = {};

    Game.boot = () => {
        OBJ.addTag('box');
    };

    Game.start = () => {
        color = C.random();
        points = [];
        primitiveKind = Common.picko(Primitive);
        for (let i = 0; i < 9; i++) {
            points.push({
                x: Stage.randomX(),
                y: Stage.randomY()
            });
        }
    };

    Game.update = () => {
        const n = OBJ.push('box', new Box(Input.x, Input.y)) as Box;
        if (Input.isMoving) {
            n.color = C.orangeRed;
        }
        if (Input.keyDown(KeyCode.M)) {
            Scene.restart();
        }
    };

    Game.render = () => {
        Draw.primitiveBegin();

        for (const p of points) {
            Draw.vertex(p.x, p.y);
        }

        Draw.setColor(color);
        Draw.primitiveEnd(primitiveKind);
    };

    Game.renderUI = () => {
        Draw.setFont(Font.m);
        Draw.setColor(C.black);
        Draw.setHVAlign(Align.l, Align.t);
        Draw.text(10, 10, `FPS: ${Time.FPS}\ncolor: ${C.keys[C.list.indexOf(color)]}\nprimitive kind: ${primitiveKind.name}\nrunning time: ${(Time.runningTime * 0.001).toFixed(2)}\ntime since created: ${(Time.time * 0.001).toFixed(2)}\nOBJ count: ${OBJ.countAll()}`);
        Draw.setHVAlign(Align.c, Align.m);
    };

    Scene.setup({ scenes: Game });

    return Engine;
})();