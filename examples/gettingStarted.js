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
            if (Input.keyDown(KeyCode.Space) || Input.mouseDown(0)) {
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
            Draw.setFont(Font.l);
            Draw.setColor(C.black);
            Draw.setHVAlign(Align.c, Align.m);
            Draw.text(Input.x, Input.y, primitiveKind.name);
            Draw.setHVAlign(Align.l, Align.t);
            Draw.text(10, 10, Common.toString(Input.wheelDelta));
        }
    });
})();