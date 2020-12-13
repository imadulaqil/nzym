/**
 * HTML canvas wrapper.
 */
class NzymStage {

    public w: number;
    public h: number;
    public mid: { w: number, h: number };

    constructor(
        public engine: NzymEngine,
        public canvas: HTMLCanvasElement,
        public pixelRatio: number = 2
    ) {
        const b = this.canvas.getBoundingClientRect();
        this.w = b.width;
        this.h = b.height;
        this.mid = {
            w: this.w / 2,
            h: this.h / 2
        };
        this.applyPixelRatio();
    }

    applyPixelRatio(pixelRatio: number = this.pixelRatio) {
        this.pixelRatio = pixelRatio;
        this.canvas.width = this.w * this.pixelRatio;
        this.canvas.height = this.h * this.pixelRatio;
        this.canvas.getContext('2d').resetTransform();
        this.canvas.getContext('2d').scale(this.pixelRatio, this.pixelRatio);
    }

    randomX() {
        return Math.random() * this.w;
    }

    randomY() {
        return Math.random() * this.h;
    }

}