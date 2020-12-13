class NzymDraw {

    ctx: CanvasRenderingContext2D
    defaultCtx: CanvasRenderingContext2D

    constructor(
        public engine: NzymEngine
    ) {}

    init() {
        this.ctx = this.defaultCtx = this.engine.Stage.canvas.getContext('2d');
    }

    onCtx(ctx: CanvasRenderingContext2D, drawFn: Function) {
        this.ctx = ctx;
        drawFn();
        this.ctx = this.defaultCtx;
    }

    setFill(color: string) {
        this.ctx.fillStyle = color;
    }

    setStroke(color: string) {
        this.ctx.strokeStyle = color;
    }

    setColor(fillColor: string, strokeColor?: string) {
        this.ctx.fillStyle = fillColor;
        this.ctx.strokeStyle = strokeColor || fillColor;
    }

    text(x: number, y: number, text: string) {
        this.ctx.fillText(text, x, y);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

}