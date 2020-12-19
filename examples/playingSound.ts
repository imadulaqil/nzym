var Example = Example || {};

Example.playingSound = (() => {

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
        name: 'Playing Sound',
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

    // SE=sound effect (usually play once)
    const playSE = () => Sound.play('se');
    const stopSE = () => Sound.stop('se');
    const playAtOnceSE = () => Sound.playAtOnce('se');
    // BGM=background music (usually loop until stop)
    const loopBGM = () => Sound.loop('bgm');
    const stopBGM = () => Sound.stop('bgm');
    const pauseBGM = () => Sound.pause('bgm');
    const resumeBGM = () => Sound.resume('bgm');

    const GameScenes: NzymGameScene = {
        onLoad: {}
    };

    GameScenes.boot = () => {
        Loader.loadSound('se', '../assets/sounds/splash.mp3');
        Loader.loadSound('bgm', '../assets/sounds/sunnyday.mp3');
    };

    GameScenes.update = () => {
        if (Input.keyDown(KeyCode.Q)) playSE();
        if (Input.keyDown(KeyCode.W)) stopSE();
        if (Input.keyDown(KeyCode.E)) playAtOnceSE();
        if (Input.keyDown(KeyCode.A)) loopBGM();
        if (Input.keyDown(KeyCode.S)) stopBGM();
        if (Input.keyDown(KeyCode.D)) pauseBGM();
        if (Input.keyDown(KeyCode.F)) resumeBGM();
    };

    GameScenes.renderUI = () => {
        Draw.setFont(Font.l);
        Draw.setColor(C.black);
        Draw.setHVAlign(Align.c, Align.m);
        let text = 'Press <Q> to play SE';
        text += '\nPress <W> to stop SE';
        text += '\nPress <E> to play SE one at a time';
        text += '\nPress <A> to start loop BGM';
        text += '\nPress <S> to stop BGM';
        text += '\nPress <D> to pause BGM';
        text += '\nPress <F> to resume BGM';
        Draw.text(Stage.mid.w, Stage.mid.h, text);
    };

    GameScenes.onLoad.renderUI = () => {
        Draw.setFont(Font.m);
        Draw.setColor(C.black);
        Draw.setHVAlign(Align.c, Align.m);
        Draw.text(Stage.mid.w, Stage.mid.h, `Loading sounds ${~~(Loader.getLoadProgress() * 100)}%`);
    };

    Scene.setup({
        scenes: GameScenes
    });

    return Engine;
})();