var Example = Example || {};
Example.particleSystem = (function () {
    var _a = Nzym.getAliases(), C = _a.C, Align = _a.Align, Common = _a.Common, Events = _a.Events, KeyCode = _a.KeyCode, LineCap = _a.LineCap, LineJoin = _a.LineJoin, LineDash = _a.LineDash, Primitive = _a.Primitive;
    var Engine = new NzymEngine({
        name: 'Particle System',
        parent: document.getElementById('gameContainer')
    });
    var _b = Engine.getAliases(), Log = _b.Log, OBJ = _b.OBJ, Draw = _b.Draw, Font = _b.Font, Time = _b.Time, Input = _b.Input, Scene = _b.Scene, Sound = _b.Sound, Stage = _b.Stage, Loader = _b.Loader;
    var GameScenes = {
        onLoad: {}
    };
    var Tag;
    (function (Tag) {
        Tag["particle"] = "particle";
    })(Tag || (Tag = {}));
    ;
    var Emitter;
    GameScenes.boot = function () {
        OBJ.addTag(Tag.particle);
        Emitter = new NzymEmitter(Engine, Tag.particle);
    };
    GameScenes.update = function () {
        Emitter.emit(1);
    };
    GameScenes.render = function () {
        Draw.setFont(Font.l);
        Draw.setColor(C.black);
        Draw.setHVAlign(Align.l, Align.t);
        Draw.text(10, 10, "Particle count: " + OBJ.count(Tag.particle));
    };
    Scene.setup({
        scenes: GameScenes
    });
    // Engine.makeGlobalAliases();
    // Engine.start();
    return Engine;
})();
