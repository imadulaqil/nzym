Nzym.Example.verletPhysics = (() => {

    const Engine = new NzymEngine({
        name: 'Verlet Physics',
        parent: document.getElementById('gameContainer')
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
        Common,
        KeyCode
    } = Engine.getAliases();

    let points: Point[], sticks: Stick[], dragged: Point;

    class Point {

        x: number;
        y: number;
        px: number;
        py: number;
        r: number;
        bounce: number;
        gravity: number;
        friction: number;
        isPinned: boolean;

        constructor(x: number, y: number, vx=0, vy=0, r=10) {
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
        update() {
            if (this.isPinned) return;

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
            Draw.circle(this.x, this.y, this.r, !this.isPinned);
        }
    }

    class Stick {

        id = 0;
        p0: Point;
        p1: Point;
        length: number;
        isHidden: boolean;
        stiffness: number;

        constructor(p0: Point, p1: Point, length?: number) {
            this.p0 = p0;
            this.p1 = p1;
            this.length = length || Common.hypot(this.p1.x - this.p0.x, this.p1.y - this.p0.y);
            this.isHidden = false;
            this.stiffness = 1;
        }
        update() {
            let dx = this.p1.x - this.p0.x,
                dy = this.p1.y - this.p0.y,
                dist = Common.hypot(dx, dy),
                diff = this.length - dist,
                percent = diff / dist / 2 * this.stiffness,
                offsetX = dx * percent,
                offsetY = dy * percent;

            if (!this.p0.isPinned) {
                this.p0.x -= offsetX;
                this.p0.y -= offsetY;
            }
            if (!this.p1.isPinned) {
                this.p1.x += offsetX;
                this.p1.y += offsetY;
            }
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

    const addStick = (p0: Point, p1: Point, isHidden?: boolean) => {
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

    const addRope = (x, y, length, segments) => {
        const p = [];
        length /= segments;
        for (let i = 0; i <= segments; i++) {
            p.push(addPoint(new Point(x, y + i * length, 0, 0, 5)));
        }
        for (let i = 0; i < p.length - 1; i++) {
            addStick(p[i], p[i + 1]);
        }
        p[0].isPinned = true;
    };

    Scene.setup({
        onBoot() {
            points = [];
            sticks = [];
        },
        onStart() {
            points.length = 0;
            sticks.length = 0;
            for (let i = 0; i < 3; i++) {
                addRect(
                    Stage.randomX(), Stage.randomY(),
                    Common.range(50, 90), Common.range(50, 90),
                    Common.range(-5, 5), Common.range(-5, 5)
                );
            }
            addRope(Stage.mid.w, Stage.h * 0.2, Stage.mid.h, 10);
        },
        onUpdate() {
            if (Input.mouseDown(0)) {
                dragged = null;
                let nearestDistance = 100; // minimum distance to get grabbed
                for (let i = 0; i < points.length; i++) {
                    const distance = Common.hypot(Input.x - points[i].x, Input.y - points[i].y);
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

            if (Input.keyDown(KeyCode.M)) {
                Scene.restart();
            }
        }
    });

    return Engine;
})();