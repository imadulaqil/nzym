Nzym.start({
    onStart() {
        console.log('start');
    },
    onUpdate() {
        console.log('update');
    },
    onRender() {
        Draw.ctx.fillRect(100 + 40 * Math.sin(window.performance.now() * 0.01), 20, 30, 60);
    },
    onRenderUI() {
        Draw.setFont(Font.l);
        Draw.setColor('blue');
        Draw.setHVAlign(Align.c, Align.m);
        Draw.text(Stage.mid.w, Stage.mid.h, window.performance.now());
    }
});