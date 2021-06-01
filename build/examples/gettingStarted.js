Nzym.Example.gettingStarted = (function () {
    var Engine = new NzymEngine({
        name: 'Getting Started',
        parent: document.getElementById('gameContainer')
    });
    var _a = Engine.getAliases(), C = _a.C, OBJ = _a.OBJ, Draw = _a.Draw, Font = _a.Font, Time = _a.Time, Align = _a.Align, Input = _a.Input, Scene = _a.Scene, Stage = _a.Stage, Common = _a.Common, KeyCode = _a.KeyCode, Primitive = _a.Primitive;
    var Box = /** @class */ (function () {
        function Box(x, y) {
            this.id = Common.getID();
            this.x = x;
            this.y = y;
            this.size = 40 + Math.sin(Time.frameCount * 0.2) * 20;
            this.angle = 0;
            this.color = C.royalBlue;
        }
        Box.prototype.update = function () {
            var _this = this;
            this.angle += Math.PI / 20;
            if (this.angle > Math.PI * 4) {
                OBJ.remove('box', function (n) { return n.id === _this.id; });
            }
        };
        Box.prototype.render = function () {
            var _this = this;
            Draw.setColor(this.color);
            Draw.setLineWidth(2);
            Draw.onTransform(this.x, this.y, 1, 1, this.angle, function () {
                Draw.rectCenter(0, 0, _this.size, _this.size, true);
            }, true);
        };
        return Box;
    }());
    var color, points, primitiveKind;
    var Game = {};
    Game.boot = function () {
        OBJ.addTag('box');
    };
    Game.start = function () {
        color = C.random();
        points = [];
        primitiveKind = Common.picko(Primitive);
        for (var i = 0; i < 9; i++) {
            points.push({
                x: Stage.randomX(),
                y: Stage.randomY()
            });
        }
    };
    Game.update = function () {
        var n = OBJ.push('box', new Box(Input.x, Input.y));
        if (Input.isMoving) {
            n.color = C.orangeRed;
        }
        if (Input.keyDown(KeyCode.M)) {
            Scene.restart();
        }
    };
    Game.render = function () {
        Draw.primitiveBegin();
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var p = points_1[_i];
            Draw.vertex(p.x, p.y);
        }
        Draw.setColor(color);
        Draw.primitiveEnd(primitiveKind);
    };
    Game.renderUI = function () {
        Draw.setFont(Font.m);
        Draw.setColor(C.black);
        Draw.setHVAlign(Align.l, Align.t);
        Draw.text(10, 10, "FPS: " + Time.FPS + "\ncolor: " + C.keys[C.list.indexOf(color)] + "\nprimitive kind: " + primitiveKind.name + "\nrunning time: " + (Time.runningTime * 0.001).toFixed(2) + "\ntime since created: " + (Time.time * 0.001).toFixed(2) + "\nOBJ count: " + OBJ.countAll());
        Draw.setHVAlign(Align.c, Align.m);
    };
    Scene.setup({ scenes: Game });
    return Engine;
})();
