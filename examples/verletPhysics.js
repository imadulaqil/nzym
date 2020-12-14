var Example = Example || {};

Example.verletPhysics = (() => {
    let points;

    class Point {
        constructor(x, y, vx=0, vy=0) {
            this.x = x;
            this.y = y;
            this.px = this.x - vx;
            this.py = this.y - vy;
            this.r = 10;
            this.bounce = 0.9;
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

    const addPoint = (p) => {
        p.id = Common.getID();
        points.push(p);
        return p;
    };

    return Nzym.createEngine({
        onInit() {
            points = [];
        },
        onStart() {
            points.length = 0;
            addPoint(new Point(45, 45, 5));
            addPoint(new Point(130, 57, 6));
        },
        onUpdate() {
            for (const p of points) {
                p.update();
            }
            for (const p of points) {
                p.constraint();
            }
        },
        onRender() {
            for (const p of points) {
                p.draw();
            }
        },
        onRenderUI() {
            Draw.setFont(Font.m);
            Draw.setColor(C.black);
            Draw.setHVAlign(Align.l, Align.t);
        }
    });
})();