var Example = Example || {};

Example.verletPhysics = (() => {
    let points, sticks;

    class Point {
        constructor(x, y, vx=0, vy=0, r=10) {
            this.x = x;
            this.y = y;
            this.px = this.x - vx;
            this.py = this.y - vy;
            this.r = r;
            this.bounce = 0.97;
            this.gravity = 0.5;
            this.friction = 0.99;
        }
        update() {
            let vx = this.x - this.px,
                vy = this.y - this.py;

            this.px = this.x;
            this.py = this.y;
            this.x += vx * this.friction;
            this.y += vy * this.friction;
            this.y += this.gravity;
        }
        constraint() {
            let vx = this.x - this.px,
                vy = this.y - this.py;

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
        }
        draw() {
            Draw.setColor(C.black);
            Draw.circle(this.x, this.y, this.r, true);
        }
    }

    class Stick {
        constructor(p0, p1, length) {
            this.p0 = p0;
            this.p1 = p1;
            this.length = length || Math.hypot(this.p1.x - this.p0.x, this.p1.y - this.p0.y);
            this.isHidden = false;
            this.stiffness = 1;
        }
        update() {
            let dx = this.p1.x - this.p0.x,
                dy = this.p1.y - this.p0.y,
                dist = Math.hypot(dx, dy),
                diff = this.length - dist,
                percent = diff / dist / 2 * this.stiffness,
                offsetX = dx * percent,
                offsetY = dy * percent;

            this.p0.x -= offsetX;
            this.p0.y -= offsetY;
            this.p1.x += offsetX;
            this.p1.y += offsetY;
        }
        draw() {
            if (!this.isHidden) {
                Draw.setColor(C.black);
                Draw.linePoint(this.p0, this.p1);
            }
        }
    }

    const addPoint = (p) => {
        p.id = Common.getID();
        points.push(p);
        return p;
    };

    const addStick = (p0, p1, isHidden) => {
        const s = new Stick(p0, p1);
        s.id = Common.getID();
        if (isHidden) s.isHidden = true;
        sticks.push(s);
        return s;
    };

    const addRect = (x, y, w, h, vx, vy) => {
        const p = [];
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

    return Nzym.createEngine({
        onInit() {
            points = [];
            sticks = [];
        },
        onStart() {
            points.length = 0;
            sticks.length = 0;
            for (let i = 0; i < 3; i++) {
                addRect(
                    Stage.randomX(), Stage.randomY(),
                    Common.range(20, 70), Common.range(20, 70),
                    Common.range(-5, 5), Common.range(-5, 5)
                );
            }
        },
        onUpdate() {
            for (const p of points) {
                p.update();
            }
            let iter = 5;
            while (iter-- > 0) {
                for (const s of sticks) {
                    s.update();
                }
                for (const p of points) {
                    p.constraint();
                }
            }
        },
        onRender() {
            for (const s of sticks) {
                s.draw();
            }
            for (const p of points) {
                p.draw();
            }
        },
        onRenderUI() {
            Draw.setFont(Font.m);
            Draw.setColor(C.black);
            Draw.setHVAlign(Align.l, Align.t);
            Draw.text(10, 10, Time.FPS);

            if (Input.keyDown(KeyCode.Space)) {
                Scene.restart();
            }
        }
    });
})();