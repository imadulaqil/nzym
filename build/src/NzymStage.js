/**
 * HTML canvas wrapper.
 */
var NzymStage = /** @class */ (function () {
    function NzymStage(engine, canvas, pixelRatio) {
        this.engine = engine;
        this.canvas = canvas;
        this.pixelRatio = pixelRatio;
        var b = this.canvas.getBoundingClientRect();
        this.w = b.width;
        this.h = b.height;
        this.mid = {
            w: this.w / 2,
            h: this.h / 2
        };
        if (typeof this.pixelRatio !== "number") {
            this.pixelRatio = 2;
        }
        this.applyPixelRatio();
    }
    NzymStage.prototype.applyPixelRatio = function (pixelRatio) {
        if (pixelRatio === void 0) { pixelRatio = this.pixelRatio; }
        this.pixelRatio = pixelRatio;
        this.canvas.width = this.w * this.pixelRatio;
        this.canvas.height = this.h * this.pixelRatio;
        this.canvas.getContext('2d').resetTransform();
        this.canvas.getContext('2d').scale(this.pixelRatio, this.pixelRatio);
    };
    NzymStage.prototype.randomX = function () {
        return Math.random() * this.w;
    };
    NzymStage.prototype.randomY = function () {
        return Math.random() * this.h;
    };
    NzymStage.prototype.hide = function () {
        this.canvas.style.display = 'none';
    };
    NzymStage.prototype.show = function () {
        this.canvas.style.display = 'initial';
    };
    return NzymStage;
}());
