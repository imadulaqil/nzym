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
    GameScenes.boot = function () {
        OBJ.addTag(Tag.particle);
    };
    GameScenes.update = function () {
        OBJ.push(Tag.particle, new NzymParticle(Engine, Tag.particle, Common.range(100, 200), Input.x, Input.y, Common.range(5, 10), 0, Common.range(0, Math.PI * 2), 0, Common.range(5, 15), 2, Common.choose(C.red, C.orange, C.orangeRed), Common.range(0.1, 0.4), 0, 1));
    };
    GameScenes.render = function () {
        Draw.text(10, 10, OBJ.count(Tag.particle));
    };
    Scene.setup({
        scenes: GameScenes
    });
    Engine.makeGlobalAliases();
    Engine.start();
    return Engine;
})();
