var Example = Example || {};
Example.verletPhysics = (function () {
    var Engine = new NzymEngine({
        name: 'Verlet Physics',
        parent: document.getElementById('gameContainer')
    });
    var _a = Engine.getAliases(), C = _a.C, Draw = _a.Draw, Font = _a.Font, Time = _a.Time, Align = _a.Align, Input = _a.Input, Scene = _a.Scene, Stage = _a.Stage, Common = _a.Common, KeyCode = _a.KeyCode;
    var points, sticks, dragged;
    var Point = /** @class */ (function () {
        function Point(x, y, vx, vy, r) {
            if (vx === void 0) { vx = 0; }
            if (vy === void 0) { vy = 0; }
            if (r === void 0) { r = 10; }
            this.x = x;
            this.y = y;
            this.px = this.x - vx;
            this.py = this.y - vy;
            this.r = r;
            this.bounce = 0.97;
            this.gravity = 0.5;
            this.friction = 0.99;
            this.isPinned = false;
        }
        Point.prototype.update = function () {
            if (this.isPinned)
                return;
            var vx = this.x - this.px, vy = this.y - this.py;
            this.px = this.x;
            this.py = this.y;
            this.x += vx * this.friction;
            this.y += vy * this.friction;
            this.y += this.gravity;
        };
        Point.prototype.constraint = function () {
            var vx = this.x - this.px, vy = this.y - this.py;
            if (this.x > Stage.w - this.r) {
                this.x = Stage.w - this.r;
                this.px = this.x + vx * this.bounce;
            }
            else if (this.x < this.r) {
                this.x = this.r;
                this.px = this.x + vx * this.bounce;
            }
            if (this.y > Stage.h - this.r) {
                this.y = Stage.h - this.r;
                this.py = this.y + vy * this.bounce;
            }
            else if (this.y < this.r) {
                this.y = this.r;
                this.py = this.y + vy * this.bounce;
            }
        };
        Point.prototype.draw = function () {
            Draw.setColor(C.black);
            Draw.circle(this.x, this.y, this.r, !this.isPinned);
        };
        return Point;
    }());
    var Stick = /** @class */ (function () {
        function Stick(p0, p1, length) {
            this.id = 0;
            this.p0 = p0;
            this.p1 = p1;
            this.length = length || Common.hypot(this.p1.x - this.p0.x, this.p1.y - this.p0.y);
            this.isHidden = false;
            this.stiffness = 1;
        }
        Stick.prototype.update = function () {
            var dx = this.p1.x - this.p0.x, dy = this.p1.y - this.p0.y, dist = Common.hypot(dx, dy), diff = this.length - dist, percent = diff / dist / 2 * this.stiffness, offsetX = dx * percent, offsetY = dy * percent;
            if (!this.p0.isPinned) {
                this.p0.x -= offsetX;
                this.p0.y -= offsetY;
            }
            if (!this.p1.isPinned) {
                this.p1.x += offsetX;
                this.p1.y += offsetY;
            }
        };
        Stick.prototype.draw = function () {
            if (!this.isHidden) {
                Draw.setColor(C.black);
                Draw.linePoint(this.p0, this.p1);
            }
        };
        return Stick;
    }());
    var addPoint = function (p) {
        p.id = Common.getID();
        points.push(p);
        return p;
    };
    var addStick = function (p0, p1, isHidden) {
        var s = new Stick(p0, p1);
        s.id = Common.getID();
        if (isHidden)
            s.isHidden = true;
        sticks.push(s);
        return s;
    };
    var addRect = function (x, y, w, h, vx, vy) {
        var p = [];
        p.push(addPoint(new Point(x, y, vx, vy, Common.range(5, 12))));
        p.push(addPoint(new Point(x + w, y, vx, vy, Common.range(5, 12))));
        p.push(addPoint(new Point(x + w, y + h, vx, vy, Common.range(5, 12))));
        p.push(addPoint(new Point(x, y + h, vx, vy, Common.range(5, 12))));
        addStick(p[0], p[1]);
        addStick(p[1], p[2]);
        addStick(p[2], p[3]);
        addStick(p[3], p[0]);
        addStick(p[0], p[2], true);
        addStick(p[1], p[3], true);
    };
    var addRope = function (x, y, length, segments) {
        var p = [];
        length /= segments;
        for (var i = 0; i <= segments; i++) {
            p.push(addPoint(new Point(x, y + i * length, 0, 0, 5)));
        }
        for (var i = 0; i < p.length - 1; i++) {
            addStick(p[i], p[i + 1]);
        }
        p[0].isPinned = true;
    };
    Scene.setup({
        onBoot: function () {
            points = [];
            sticks = [];
        },
        onStart: function () {
            points.length = 0;
            sticks.length = 0;
            for (var i = 0; i < 3; i++) {
                addRect(Stage.randomX(), Stage.randomY(), Common.range(50, 90), Common.range(50, 90), Common.range(-5, 5), Common.range(-5, 5));
            }
            addRope(Stage.mid.w, Stage.h * 0.2, Stage.mid.h, 10);
        },
        onUpdate: function () {
            if (Input.mouseDown(0)) {
                dragged = null;
                var nearestDistance = 100; // minimum distance to get grabbed
                for (var i = 0; i < points.length; i++) {
                    var distance = Common.hypot(Input.x - points[i].x, Input.y - points[i].y);
                    if (distance < nearestDistance) {
                        nearestDistance = distance;
                        dragged = points[i];
                    }
                }
            }
            if (dragged) {
                if (Input.mouseHold(0)) {
                    dragged.px = dragged.x = Input.x;
                    dragged.py = dragged.y = Input.y;
                }
                else {
                    dragged = null;
                }
            }
            for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
                var p = points_1[_i];
                p.update();
            }
            var iter = 5;
            while (iter-- > 0) {
                for (var _a = 0, sticks_1 = sticks; _a < sticks_1.length; _a++) {
                    var s = sticks_1[_a];
                    s.update();
                }
                for (var _b = 0, points_2 = points; _b < points_2.length; _b++) {
                    var p = points_2[_b];
                    p.constraint();
                }
            }
        },
        onRender: function () {
            for (var _i = 0, sticks_2 = sticks; _i < sticks_2.length; _i++) {
                var s = sticks_2[_i];
                s.draw();
            }
            for (var _a = 0, points_3 = points; _a < points_3.length; _a++) {
                var p = points_3[_a];
                p.draw();
            }
        },
        onRenderUI: function () {
            Draw.setFont(Font.m);
            Draw.setColor(C.black);
            Draw.setHVAlign(Align.l, Align.t);
            Draw.text(10, 10, Time.FPS);
            if (Input.keyDown(KeyCode.M)) {
                Scene.restart();
            }
        }
    });
    return Engine;
})();
