var Example = Example || {};

Example.gettingStarted = (() => {
    let color, points, primitiveKind;
    return Nzym.createEngine({
        onInit() {
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
            Draw.text(10, 10, `FPS: ${Time.FPS}\ncolor: ${C.keys[C.list.indexOf(color)]}\nprimitive kind: ${primitiveKind.name}\nrunning time: ${(Time.runningTime * 0.001).toFixed(2)}\ntime since created: ${(Time.time * 0.001).toFixed(2)}`);
            Draw.setHVAlign(Align.c, Align.m);
        }
    });
})();