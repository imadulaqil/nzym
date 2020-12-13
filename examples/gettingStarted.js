let points, primitive;

Nzym.start({
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
        Draw.text(Stage.mid.w, Stage.mid.h, primitive.name);
    }
});