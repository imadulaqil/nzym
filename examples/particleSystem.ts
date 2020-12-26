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

    let Emitter: NzymEmitter,
        BloodEmitter: NzymEmitter,
        WaterFountainEmitter: NzymEmitter;

    GameScenes.boot = () => {
        OBJ.addTag(Tag.particle);
        Emitter = new NzymEmitter(Engine, Tag.particle);
        BloodEmitter = NzymEmitter.Blood(Engine, Tag.particle);
        WaterFountainEmitter = NzymEmitter.WaterFountain(Engine, Tag.particle);
    };

    GameScenes.update = () => {
        Emitter.emit(1);
        if (Time.frameCount % 20 === 0) {
            BloodEmitter.setArea(Stage.randomX(), Stage.randomY());
            BloodEmitter.emit(Common.choose(5, 6, 7));
        }
        WaterFountainEmitter.setArea(Input.x, Input.y);
        WaterFountainEmitter.emit(1);
    };

    GameScenes.render = () => {
        Draw.setFont(Font.l);
        Draw.setColor(C.black);
        Draw.setHVAlign(Align.l, Align.t);
        Draw.text(10, 10, `Particle count: ${OBJ.count(Tag.particle)}`);
    };

    Scene.setup({
        scenes: GameScenes
    });

    // Engine.makeGlobalAliases();
    // Engine.start();

    return Engine;
})();