/**
 * HTML canvas wrapper.
 */
var NzymStage = /** @class */ (function () {
    function NzymStage(engine, options) {
        if (options === void 0) { options = {}; }
        this.engine = engine;
        this.pixelRatio = 2;
        if (options.canvas) {
            this.canvas = options.canvas;
        }
        else {
            var canvasOptions = options;
            canvasOptions.autoAppend = true;
            this.canvas = this.createCanvas(canvasOptions);
        }
        this.init();
        this.applyPixelRatio(options.pixelRatio);
    }
    NzymStage.prototype.init = function () {
        var b = this.canvas.getBoundingClientRect();
        this.w = b.width;
        this.h = b.height;
        this.mid = {
            w: this.w / 2,
            h: this.h / 2
        };
    };
    NzymStage.prototype.applyPixelRatio = function (pixelRatio) {
        if (pixelRatio === void 0) { pixelRatio = this.pixelRatio; }
        this.pixelRatio = pixelRatio;
        this.canvas.width = this.w * this.pixelRatio;
        this.canvas.height = this.h * this.pixelRatio;
        this.canvas.getContext('2d').resetTransform();
        this.canvas.getContext('2d').scale(this.pixelRatio, this.pixelRatio);
    };
    NzymStage.prototype.createCanvas = function (options) {
        if (options === void 0) { options = {}; }
        // Create the default canvas
        var canvas = document.createElement('canvas');
        if (options.w && options.h) {
            // Both `w` and `h` have to be exists to set the canvas size
            canvas.style.width = options.w + "px";
            canvas.style.height = options.h + "px";
        }
        else {
            // Otherwise set to default
            canvas.style.width = '800px';
            canvas.style.height = '600px';
        }
        if (options.bgColor) {
            // Set style background color if provided
            canvas.style.backgroundColor = options.bgColor;
        }
        else {
            // Otherwise make a nice little gradient as the background
            canvas.style.backgroundImage = 'radial-gradient(white 33%, mintcream)';
        }
        if (options.autoAppend) {
            if (options.parent) {
                options.parent.appendChild(canvas);
            }
            else {
                document.body.appendChild(canvas);
            }
        }
        return canvas;
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
