var Example = Example || {};

Example.gettingStarted = (() => {
    let color, points, primitiveKind;

    class Box {
        constructor(x, y) {
            this.id = Common.getID();
            this.x = x;
            this.y = y;
            this.size = 40 + Math.sin(Time.frameCount * 0.2) * 20;
            this.angle = 0;
            this.color = C.royalBlue;
        }
        update() {
            this.angle += Math.PI / 20;
            if (this.angle > Math.PI * 4) {
                OBJ.remove('box', (n) => n.id === this.id);
            }
        }
        render() {
            Draw.setColor(this.color);
            Draw.setLineWidth(2);
            Draw.onTransform(this.x, this.y, 1, 1, this.angle, () => {
                Draw.rectCenter(0, 0, this.size, this.size, true);
            }, true);
        }
    }
    
    return Nzym.createEngine({
        onBoot() {
            OBJ.addTag('box');
        },
        onStart() {
            color = C.random();
            
            points = [];
            for (let i = 0; i < 9; i++) {
                points.push({
                    x: Stage.randomX(),
                    y: Stage.randomY()
                });
            }
            
            primitiveKind = Common.picko(Primitive);
        },
        onUpdate() {
            const n = OBJ.push('box', new Box(Input.x, Input.y));
            if (Input.isMoving) {
                n.color = C.orangeRed;
            }
            if (Input.keyDown(KeyCode.Space)) {
                Scene.restart();
            }
        },
        onRender() {
            Draw.primitiveBegin();

            for (const p of points) {
                Draw.vertex(p.x, p.y);
            }

            Draw.setColor(color);
            Draw.primitiveEnd(primitiveKind);
        },
        onRenderUI() {
            Draw.setFont(Font.m);
            Draw.setColor(C.black);
            Draw.setHVAlign(Align.l, Align.t);
            Draw.text(10, 10, `FPS: ${Time.FPS}\ncolor: ${C.keys[C.list.indexOf(color)]}\nprimitive kind: ${primitiveKind.name}\nrunning time: ${(Time.runningTime * 0.001).toFixed(2)}\ntime since created: ${(Time.time * 0.001).toFixed(2)}\nOBJ count: ${OBJ.countAll()}`);
            Draw.setHVAlign(Align.c, Align.m);
        }
    });
})();