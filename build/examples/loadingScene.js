var Example = Example || {};
Example.loadingScene = (function () {
    var Engine = new NzymEngine({
        name: 'Loading Scene',
        w: 1280,
        h: 720,
        bgColor: 'royalblue'
    });
    var _a = Engine.getAliases(), C = _a.C, Draw = _a.Draw, Font = _a.Font, Time = _a.Time, Align = _a.Align, Input = _a.Input, Scene = _a.Scene, Stage = _a.Stage, Loader = _a.Loader, KeyCode = _a.KeyCode;
    var Game = {
        onLoad: {}
    };
    var names = [], cursor = 0, scaleTo = 0.6, loadTime = '', scale;
    var getLoadTime = function () { return ((Time.runningTime) / 1000).toFixed(4); };
    Game.boot = function () {
        scale = scaleTo;
        var user = 'yourl';
        for (var i = 35; i <= 219; i++) {
            Loader.loadImage("C:/Users/" + user + "/Pictures/Screenshots/Screenshot (" + i + ").png");
        }
    };
    Game.loaded = function () {
        loadTime = "Load time: " + getLoadTime() + "s";
        Engine.Log.info(loadTime);
        for (var name_1 in Draw.images) {
            names.push(name_1);
        }
    };
    Game.update = function () {
        scale += 0.2 * (scaleTo - scale);
        if (Input.keyRepeat(KeyCode.Left)) {
            cursor--;
            if (cursor < 0)
                cursor += names.length;
            scale = 1.2;
        }
        if (Input.keyRepeat(KeyCode.Right)) {
            cursor++;
            if (cursor > names.length - 1)
                cursor -= names.length;
            scale = 1.2;
        }
    };
    Game.render = function () {
        if (names.length > 0) {
            var t = Math.sin(Time.frameCount * 0.05);
            Draw.image(names[cursor], Stage.mid.w, Stage.mid.h + t * 4, scale + t * 0.01, scale - t * 0.01, 1 + t * 2);
        }
    };
    Game.renderUI = function () {
        if (names.length > 0) {
            Draw.setFont(Font.l);
            Draw.setColor(C.white);
            Draw.setHVAlign(Align.l, Align.t);
            var img = Draw.getImage(names[cursor]);
            Draw.text(10, 10, names[cursor] + " (" + img.width + "x" + img.height + ")");
            Draw.setFont(Font.m);
            Draw.setVAlign(Align.b);
            Draw.text(10, Stage.h - 10, 'Press <left> or <right> arrow keys to surf through images.');
            Draw.setHAlign(Align.r);
            Draw.text(Stage.w - 10, Stage.h - 10, loadTime);
        }
    };
    Game.onLoad.renderUI = function () {
        Draw.setFont(Font.xl);
        Draw.setColor(C.black);
        Draw.setHVAlign(Align.c, Align.m);
        Draw.text(Stage.mid.w, Stage.mid.h, "Loading " + Loader.getLoadedCount() + "/" + Loader.getLoadAmount() + " files...");
        Draw.setFont(Font.l);
        Draw.setColor(C.white);
        Draw.setHVAlign(Align.l, Align.t);
        Draw.text(10, 10, "Time elapsed: " + getLoadTime() + "s");
    };
    Scene.setup({
        scenes: Game
    });
    return Engine;
})();
