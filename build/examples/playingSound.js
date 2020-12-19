var Example = Example || {};
Example.playingSound = (function () {
    var _a = Nzym.getAliases(), C = _a.C, Align = _a.Align, Common = _a.Common, Events = _a.Events, KeyCode = _a.KeyCode, LineCap = _a.LineCap, LineJoin = _a.LineJoin, LineDash = _a.LineDash, Primitive = _a.Primitive;
    var Engine = new NzymEngine({
        name: 'Playing Sound',
        parent: document.getElementById('gameContainer')
    });
    var _b = Engine.getAliases(), OBJ = _b.OBJ, Draw = _b.Draw, Font = _b.Font, Time = _b.Time, Input = _b.Input, Scene = _b.Scene, Sound = _b.Sound, Stage = _b.Stage, Loader = _b.Loader;
    // SE=sound effect (usually play once)
    var playSE = function () { return Sound.play('se'); };
    var stopSE = function () { return Sound.stop('se'); };
    var playAtOnceSE = function () { return Sound.playAtOnce('se'); };
    // BGM=background music (usually loop until stop)
    var loopBGM = function () { return Sound.loop('bgm'); };
    var stopBGM = function () { return Sound.stop('bgm'); };
    var pauseBGM = function () { return Sound.pause('bgm'); };
    var resumeBGM = function () { return Sound.resume('bgm'); };
    var GameScenes = {
        onLoad: {}
    };
    GameScenes.boot = function () {
        Loader.loadSound('se', '../assets/sounds/splash.mp3');
        Loader.loadSound('bgm', '../assets/sounds/sunnyday.mp3');
    };
    GameScenes.update = function () {
        if (Input.keyDown(KeyCode.Q))
            playSE();
        if (Input.keyDown(KeyCode.W))
            stopSE();
        if (Input.keyDown(KeyCode.E))
            playAtOnceSE();
        if (Input.keyDown(KeyCode.A))
            loopBGM();
        if (Input.keyDown(KeyCode.S))
            stopBGM();
        if (Input.keyDown(KeyCode.D))
            pauseBGM();
        if (Input.keyDown(KeyCode.F))
            resumeBGM();
    };
    GameScenes.renderUI = function () {
        Draw.setFont(Font.l);
        Draw.setColor(C.black);
        Draw.setHVAlign(Align.c, Align.m);
        var text = 'Press <Q> to play SE';
        text += '\nPress <W> to stop SE';
        text += '\nPress <E> to play SE one at a time';
        text += '\nPress <A> to start loop BGM';
        text += '\nPress <S> to stop BGM';
        text += '\nPress <D> to pause BGM';
        text += '\nPress <F> to resume BGM';
        Draw.text(Stage.mid.w, Stage.mid.h, text);
    };
    GameScenes.onLoad.renderUI = function () {
        Draw.setFont(Font.m);
        Draw.setColor(C.black);
        Draw.setHVAlign(Align.c, Align.m);
        Draw.text(Stage.mid.w, Stage.mid.h, "Loading sounds " + ~~(Loader.getLoadProgress() * 100) + "%");
    };
    Scene.setup({
        scenes: GameScenes
    });
    return Engine;
})();
