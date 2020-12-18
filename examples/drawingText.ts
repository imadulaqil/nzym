var Example = Example || {};

Example.drawingText = (() => {

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
        name: 'Drawing Text',
        w: 1280,
        h: 720,
        parent: document.getElementById('gameContainer'),
        preventContextMenu: true
    });

    const {
        OBJ,
        Draw,
        Font,
        Time,
        Input,
        Scene,
        Stage,
        Loader
    } = Engine.getAliases();

    const GameScenes: NzymGameScene = {};

    GameScenes.start = () => {
        Stage.bgColor = C.random();
    };

    GameScenes.renderUI = () => {
        let x: number, y: number;

        Draw.setColor(C.black);
        Draw.setHVAlign(Align.r, Align.b);

        y = Stage.h - 10;
        Font.forEach((font, name) => {
            if (Font.isRegular(font)) {
                Draw.setFont(font);
                Draw.text(Stage.w - 10, y, `${name} ${font.size}`);
                y -= Draw.currentFont.size;
            }
        });

        x = Stage.mid.w;
        y = Stage.mid.h;

        Draw.setFont(Font.lbi);
        Draw.setHVAlign(Align.c, Align.m);
        Draw.text(x, y, 'This is a bold italic\ncenter align and\nmiddle baseline text.');

        const w = Draw.getLastTextWidth();
        const h = Draw.getLastTextHeight();

        Draw.setFont(Font.mb);
        Draw.setHVAlign(Align.l, Align.b);
        Draw.text(x + w / 2, y - h / 2, 'This is a bold left align\nand bottom baseline\ntext that sits on top right\nof the center middle text.');

        Draw.setFont(Font.mli);
        Draw.setHVAlign(Align.r, Align.t);
        Draw.text(x - w / 2, y + h / 2, 'This is a italic right align\nand top baseline text\nthat sits on bottom left\nof the center middle text.');

        Draw.setFont(Font.m);
        Draw.setHVAlign(Align.l, Align.t);
        Draw.text(10, 10, `FPS: ${Time.FPS}\nname: ${Engine.name}\nbgColor: ${Stage.bgColor}\ndefaultFamily: ${Font.defaultFamily}`);

        Draw.setVAlign(Align.b);
        Draw.text(10, Stage.h - 10, 'Press <M> to change background color');

        if (Input.keyRepeat(KeyCode.M)) {
            Scene.restart();
        }
    };

    Scene.setup({
        scenes: GameScenes
    });

    Engine.start();

    return Engine;
})();