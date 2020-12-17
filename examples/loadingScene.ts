var Example = Example || {};

Example.loadingScene = (() => {

    const Engine = new NzymEngine({
        name: 'Loading Scene',
        w: 1280,
        h: 720,
        bgColor: 'royalblue'
    });

    const {
        C,
        Draw,
        Font,
        Time,
        Align,
        Input,
        Scene,
        Stage,
        Loader,
        KeyCode
    } = Engine.getAliases();

    const Game: NzymGame = {
        onLoad: {}
    };

    let names = [],
        cursor = 0,
        scaleTo = 0.6,
        loadTime = '',
        scale: number;

    const getLoadTime = () => ((Time.runningTime) / 1000).toFixed(4);

    Game.boot = () => {
        scale = scaleTo;
        const user = 'yourl';
        for (let i = 35; i <= 219; i++) {
            Loader.loadImage(`C:/Users/${user}/Pictures/Screenshots/Screenshot (${i}).png`);
        }
    };

    Game.loaded = () => {
        loadTime = `Load time: ${getLoadTime()}s`;
        Engine.Log.info(loadTime);
        for (const name in Draw.images) {
            names.push(name);
        }
    };

    Game.update = () => {
        scale += 0.2 * (scaleTo - scale);
        if (Input.keyRepeat(KeyCode.Left)) {
            cursor--;
            if (cursor < 0) cursor += names.length;
            scale = 1.2;
        }
        if (Input.keyRepeat(KeyCode.Right)) {
            cursor++;
            if (cursor > names.length - 1) cursor -= names.length;
            scale = 1.2;
        }
    };

    Game.render = () => {
        if (names.length > 0) {
            const t = Math.sin(Time.frameCount * 0.05);
            Draw.image(names[cursor], Stage.mid.w, Stage.mid.h + t * 4, scale + t * 0.01, scale - t * 0.01, 1 + t * 2);
        }
    };

    Game.renderUI = () => {
        if (names.length > 0) {
            Draw.setFont(Font.l);
            Draw.setColor(C.white);
            Draw.setHVAlign(Align.l, Align.t);
            const img = Draw.getImage(names[cursor]);
            Draw.text(10, 10, `${names[cursor]} (${img.width}x${img.height})`);
            Draw.setFont(Font.m);
            Draw.setVAlign(Align.b);
            Draw.text(10, Stage.h - 10, 'Press <left> or <right> arrow keys to surf through images.');
            Draw.setHAlign(Align.r);
            Draw.text(Stage.w - 10, Stage.h - 10, loadTime);
        }
    };

    Game.onLoad.renderUI = () => {
        Draw.setFont(Font.xl);
        Draw.setColor(C.black);
        Draw.setHVAlign(Align.c, Align.m);
        Draw.text(Stage.mid.w, Stage.mid.h, `Loading ${Loader.getLoadedCount()}/${Loader.getLoadAmount()} files...`);
        Draw.setFont(Font.l);
        Draw.setColor(C.white);
        Draw.setHVAlign(Align.l, Align.t);
        Draw.text(10, 10, `Time elapsed: ${getLoadTime()}s`);
    };

    Scene.setup({
        scenes: Game
    });

    return Engine;
})();