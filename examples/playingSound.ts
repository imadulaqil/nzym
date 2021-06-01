Nzym.Example.playingSound = (() => {

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
    const playSE = () => Sound.play('splash');
    const stopSE = () => Sound.stop('splash');
    const pauseSE = () => Sound.pause('splash');
    const resumeSE = () => Sound.resume('splash');
    const playAtOnceSE = () => Sound.playAtOnce('splash');
    // BGM=background music (usually loop until stop)
    const loopBGM = () => Sound.loop('sunnyday');
    const stopBGM = () => Sound.stop('sunnyday');
    const pauseBGM = () => Sound.pause('sunnyday');
    const resumeBGM = () => Sound.resume('sunnyday');

    const GameScenes: NzymGameScenes = {
        onLoad: {}
    };

    GameScenes.boot = () => {
        Loader.loadSound('../assets/sounds/splash.mp3');
        Loader.loadSound('../assets/sounds/sunnyday.mp3');
    };

    GameScenes.update = () => {
        if (Input.keyDown(KeyCode.Q)) playSE();
        if (Input.keyDown(KeyCode.W)) stopSE();
        if (Input.keyDown(KeyCode.E)) pauseSE();
        if (Input.keyDown(KeyCode.R)) resumeSE();
        if (Input.keyDown(KeyCode.T)) playAtOnceSE();
        if (Input.keyDown(KeyCode.A)) loopBGM();
        if (Input.keyDown(KeyCode.S)) stopBGM();
        if (Input.keyDown(KeyCode.D)) pauseBGM();
        if (Input.keyDown(KeyCode.F)) resumeBGM();
    };

    GameScenes.renderUI = () => {
        Draw.setFont(Font.l);
        Draw.setColor(C.black);
        Draw.setHVAlign(Align.l, Align.m);
        let text = 'Press <Q> to play SE';
        text += '\nPress <W> to stop SE';
        text += '\nPress <E> to pause SE';
        text += '\nPress <R> to resume SE';
        text += '\nPress <T> to play SE one at a time';
        text += '\nPress <A> to start loop BGM';
        text += '\nPress <S> to stop loop BGM';
        text += '\nPress <D> to pause BGM';
        text += '\nPress <F> to resume BGM';
        Draw.text(Stage.w * 0.2, Stage.mid.h, text);
        let x = 10;
        let y = 10;
        const h = 4;
        Draw.setFont(Font.m);
        Draw.setHVAlign(Align.l, Align.t);
        for (const name in Sound.audios) {
            Draw.text(x, y, `${name}: (duration=${Sound.getDuration(name)}s)`);
            y += Draw.currentFont.size + 10;
            const w = Draw.getLastTextWidth();
            Draw.rect(x, y, Sound.getPlaybackTime(name) * w, h);
            Draw.rect(x, y, w, h, true);
            y += h + 10;
        }
    };

    GameScenes.onLoad.renderUI = () => {
        Draw.setFont(Font.l);
        Draw.setColor(C.black);
        Draw.setHVAlign(Align.c, Align.m);
        Draw.text(Stage.mid.w, Stage.mid.h, `Loading sounds ${~~(Loader.getLoadProgress() * 100)}%`);
    };

    Scene.setup({
        scenes: GameScenes
    });

    return Engine;
})();