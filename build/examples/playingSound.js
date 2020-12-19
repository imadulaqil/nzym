var Example = Example || {};
Example.playingSound = (function () {
    var _a = Nzym.getAliases(), C = _a.C, Align = _a.Align, Common = _a.Common, Events = _a.Events, KeyCode = _a.KeyCode, LineCap = _a.LineCap, LineJoin = _a.LineJoin, LineDash = _a.LineDash, Primitive = _a.Primitive;
    var Engine = new NzymEngine({
        name: 'Playing Sound',
        parent: document.getElementById('gameContainer')
    });
    var _b = Engine.getAliases(), OBJ = _b.OBJ, Draw = _b.Draw, Font = _b.Font, Time = _b.Time, Input = _b.Input, Scene = _b.Scene, Sound = _b.Sound, Stage = _b.Stage, Loader = _b.Loader;
    // SE=sound effect (usually play once)
    var playSE = function () { return Sound.play('splash'); };
    var stopSE = function () { return Sound.stop('splash'); };
    var pauseSE = function () { return Sound.pause('splash'); };
    var resumeSE = function () { return Sound.resume('splash'); };
    var playAtOnceSE = function () { return Sound.playAtOnce('splash'); };
    // BGM=background music (usually loop until stop)
    var loopBGM = function () { return Sound.loop('sunnyday'); };
    var stopBGM = function () { return Sound.stop('sunnyday'); };
    var pauseBGM = function () { return Sound.pause('sunnyday'); };
    var resumeBGM = function () { return Sound.resume('sunnyday'); };
    var GameScenes = {
        onLoad: {}
    };
    GameScenes.boot = function () {
        Loader.loadSound('../assets/sounds/splash.mp3');
        Loader.loadSound('../assets/sounds/sunnyday.mp3');
    };
    GameScenes.update = function () {
        if (Input.keyDown(KeyCode.Q))
            playSE();
        if (Input.keyDown(KeyCode.W))
            stopSE();
        if (Input.keyDown(KeyCode.E))
            pauseSE();
        if (Input.keyDown(KeyCode.R))
            resumeSE();
        if (Input.keyDown(KeyCode.T))
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
        Draw.setHVAlign(Align.l, Align.m);
        var text = 'Press <Q> to play SE';
        text += '\nPress <W> to stop SE';
        text += '\nPress <E> to pause SE';
        text += '\nPress <R> to resume SE';
        text += '\nPress <T> to play SE one at a time';
        text += '\nPress <A> to start loop BGM';
        text += '\nPress <S> to stop loop BGM';
        text += '\nPress <D> to pause BGM';
        text += '\nPress <F> to resume BGM';
        Draw.text(Stage.w * 0.2, Stage.mid.h, text);
        var x = 10;
        var y = 10;
        var h = 4;
        Draw.setFont(Font.m);
        Draw.setHVAlign(Align.l, Align.t);
        for (var name_1 in Sound.audios) {
            Draw.text(x, y, name_1 + ": (duration=" + Sound.getDuration(name_1) + "s)");
            y += Draw.currentFont.size + 10;
            var w = Draw.getLastTextWidth();
            Draw.rect(x, y, Sound.getPlaybackTime(name_1) * w, h);
            Draw.rect(x, y, w, h, true);
            y += h + 10;
        }
    };
    GameScenes.onLoad.renderUI = function () {
        Draw.setFont(Font.l);
        Draw.setColor(C.black);
        Draw.setHVAlign(Align.c, Align.m);
        Draw.text(Stage.mid.w, Stage.mid.h, "Loading sounds " + ~~(Loader.getLoadProgress() * 100) + "%");
    };
    Scene.setup({
        scenes: GameScenes
    });
    return Engine;
})();
