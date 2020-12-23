var Example = Example || {};

Example.particleSystem = (() => {

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
        name: 'Particle System',
        parent: document.getElementById('gameContainer')
    });

    const {
        Log,
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

    const GameScenes: NzymGameScene = {
        onLoad: {}
    };

    enum Tag {
        particle = 'particle'
    };

    GameScenes.boot = () => {
        OBJ.addTag(Tag.particle);
    };

    GameScenes.update = () => {
        OBJ.push(
            Tag.particle,
            new NzymParticle(
                Engine,
                Tag.particle,
                Common.range(100, 200),
                Input.x,
                Input.y,
                Common.range(5, 10),
                0,
                Common.range(0, Math.PI * 2),
                0,
                Common.range(5, 15),
                2,
                Common.choose(C.red, C.orange, C.orangeRed),
                Common.range(0.1, 0.4),
                0,
                1
            )
        );
    };

    GameScenes.render = () => {
        Draw.text(10, 10, OBJ.count(Tag.particle));
    };

    Scene.setup({
        scenes: GameScenes
    });

    Engine.makeGlobalAliases();
    Engine.start();

    return Engine;
})();