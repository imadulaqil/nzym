var Example = Example || {};
Example.drawingText = (function () {
    var _a = Nzym.getAliases(), C = _a.C, Align = _a.Align, Common = _a.Common, Events = _a.Events, KeyCode = _a.KeyCode, LineCap = _a.LineCap, LineJoin = _a.LineJoin, LineDash = _a.LineDash, Primitive = _a.Primitive;
    var Engine = new NzymEngine({
        name: 'Drawing Text',
        w: 1280,
        h: 720,
        parent: document.getElementById('gameContainer')
    });
    var _b = Engine.getAliases(), OBJ = _b.OBJ, Draw = _b.Draw, Font = _b.Font, Time = _b.Time, Input = _b.Input, Scene = _b.Scene, Stage = _b.Stage, Loader = _b.Loader;
    var GameScenes = {};
    GameScenes.start = function () {
        Stage.bgColor = C.random();
    };
    GameScenes.renderUI = function () {
        var x, y;
        Draw.setColor(C.black);
        Draw.setHVAlign(Align.r, Align.b);
        y = Stage.h - 10;
        Font.forEach(function (font, name) {
            if (Font.isRegular(font)) {
                Draw.setFont(font);
                Draw.text(Stage.w - 10, y, name + " " + font.size);
                y -= Draw.currentFont.size;
            }
        });
        x = Stage.mid.w;
        y = Stage.mid.h;
        Draw.setFont(Font.lbi);
        Draw.setHVAlign(Align.c, Align.m);
        Draw.text(x, y, 'This is a bold italic\ncenter align and\nmiddle baseline text.');
        var w = Draw.getLastTextWidth();
        var h = Draw.getLastTextHeight();
        Draw.setFont(Font.mb);
        Draw.setHVAlign(Align.l, Align.b);
        Draw.text(x + w / 2, y - h / 2, 'This is a bold left align\nand bottom baseline\ntext that sits on top right\nof the center middle text.');
        Draw.setFont(Font.mli);
        Draw.setHVAlign(Align.r, Align.t);
        Draw.text(x - w / 2, y + h / 2, 'This is a italic right align\nand top baseline text\nthat sits on bottom left\nof the center middle text.');
        Draw.setFont(Font.m);
        Draw.setHVAlign(Align.l, Align.t);
        Draw.text(10, 10, "FPS: " + Time.FPS + "\nname: " + Engine.name + "\nbgColor: " + Stage.bgColor + "\ndefaultFamily: " + Font.defaultFamily);
        Draw.setVAlign(Align.b);
        Draw.text(10, Stage.h - 10, 'Press <M> to change background color');
        if (Input.keyRepeat(KeyCode.M)) {
            Scene.restart();
        }
    };
    Scene.setup({
        scenes: GameScenes
    });
    return Engine;
})();
