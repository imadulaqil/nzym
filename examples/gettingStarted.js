let points, primitive;

Nzym.start({
    onInit() {
    },
    onStart() {
        points = [];
        for (let i = 0; i < 9; i++) {
            points.push({
                x: Stage.randomX(),
                y: Stage.randomY()
            });
        }

        primitive = Common.picko(Primitive);
    },
    onUpdate() {
        if (Input.mouseDown(0)) {
            Scene.restart();
        }
    },
    onRender() {
        Draw.primitiveBegin();

        for (const p of points) {
            Draw.vertex(p.x, p.y);
        }

        Draw.setColor('red');
        Draw.primitiveEnd(primitive);
    },
    onRenderUI() {
        Draw.setFont(Font.l);
        Draw.setColor('blue');
        Draw.setHVAlign(Align.c, Align.m);
        Draw.text(Input.x, Input.y, primitive.name);
        Draw.setHVAlign(Align.l, Align.t);
        Draw.text(10, 10, Common.toString(Input.wheelDelta));
    }
});