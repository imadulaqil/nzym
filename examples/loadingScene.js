var Example = Example || {};

Example.loadingScene = (() => {
    const Game = {
        onLoad: {}
    };

    let names = [],
        cursor = 0,
        scaleTo = 0.6,
        scale;

    Game.boot = () => {
        console.log('[Example 3 - Loading Scene]: to see loading scene in process, call `Example.loadingScene.start()` immediately after the html document loaded OR uncomment `autoStart: true` below in this file.');
        scale = scaleTo;
        const user = 'johndoe';
        for (let i = 35; i <= 219; i++) {
            Loader.loadImage(`C:/Users/${user}/Pictures/Screenshots/Screenshot (${i}).png`);
        }
    };

    Game.loaded = () => {
        console.log(`[Example 3 - Loading Scene]: Load time: ${(window.performance.now() / 1000).toFixed(4)}s`);
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
        const t = Math.sin(Time.frameCount * 0.05);
        Draw.image(names[cursor], Stage.mid.w, Stage.mid.h + t * 4, scale + t * 0.01, scale - t * 0.01, 1 + t * 2);
    };

    Game.renderUI = () => {
        Draw.setFont(Font.l);
        Draw.setColor(C.white);
        Draw.setHVAlign(Align.l, Align.t);
        const img = Draw.getImage(names[cursor]);
        Draw.text(10, 10, `${names[cursor]} (${img.width}x${img.height})`);
        Draw.setFont(Font.m);
        Draw.setVAlign(Align.b);
        Draw.text(10, Stage.h - 10, 'Press <left> or <right> arrow keys to surf through images.');
    };

    Game.onLoad.renderUI = () => {
        Draw.setFont(Font.xl);
        Draw.setColor(C.black);
        Draw.setHVAlign(Align.c, Align.m);
        Draw.text(Stage.mid.w, Stage.mid.h, `Loading ${Loader.getLoadedCount()}/${Loader.getLoadAmount()} files...`);
    };

    return Nzym.createEngine({
        w: 1280,
        h: 720,
        bgColor: 'royalblue',
        // autoStart: true,
        scenes: Game
    });
})();