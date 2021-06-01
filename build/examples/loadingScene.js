Nzym.Example.loadingScene = (function () {
    var Engine = new NzymEngine({
        name: 'Loading Scene',
        w: 1280,
        h: 720,
        bgColor: 'royalblue',
        parent: document.getElementById('gameContainer')
    });
    var _a = Engine.getAliases(), C = _a.C, Draw = _a.Draw, Font = _a.Font, Time = _a.Time, Align = _a.Align, Input = _a.Input, Scene = _a.Scene, Stage = _a.Stage, Loader = _a.Loader, KeyCode = _a.KeyCode;
    var Game = {
        onLoad: {}
    };
    var names = [], cursor = 0, scaleTo = 0.6, loadTime = '', scale;
    var getLoadTime = function () { return ((Time.runningTime) / 1000).toFixed(4); };
    Game.boot = function () {
        scale = scaleTo;
        for (var _i = 0, _a = [
            '1606295835050-e17a6a239ccf',
            '1606291229990-be6e7b276e70',
            '1606291098139-e1b96a1eabe3',
            '1606206966736-b2971e1d5159',
            '1606216769898-c88daccaa479',
            '1606225474652-2893d7bda441',
            '1606290979721-07c4dd5431a9',
            '1606291587092-8597fe3d5a2c',
            '1606293948406-f68ef1fd95a0',
            '1606291306342-c324b2b16288',
        ]; _i < _a.length; _i++) {
            var name_1 = _a[_i];
            Loader.loadImage(name_1, "https://images.unsplash.com/photo-" + name_1 + "?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=634&q=80");
        }
    };
    Game.loaded = function () {
        loadTime = "Load time: " + getLoadTime() + "s";
        Engine.Log.info(loadTime);
        for (var name_2 in Draw.images) {
            names.push(name_2);
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
        Draw.setColor(C.white);
        if (names.length > 0) {
            Draw.setFont(Font.l);
            Draw.setHVAlign(Align.l, Align.t);
            var img = Draw.getImage(names[cursor]);
            Draw.text(10, 10, names[cursor] + " (" + img.width + "x" + img.height + ")");
        }
        Draw.setFont(Font.m);
        Draw.setHVAlign(Align.l, Align.b);
        Draw.text(10, Stage.h - 10, 'Press <left> or <right> arrow keys to surf through images.');
        Draw.setHAlign(Align.r);
        Draw.text(Stage.w - 10, Stage.h - 10, loadTime);
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
        Draw.setVAlign(Align.b);
        var ec = Loader.getErrorCount();
        Draw.text(10, Stage.h - 10, "Failed to load: " + ec + " file" + (ec > 1 ? 's' : '') + (ec > 0 ? ' (check console)' : ''));
    };
    Scene.setup({
        scenes: Game
    });
    return Engine;
})();
