var NzymEngine = /** @class */ (function () {
    function NzymEngine(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
        if (!options.canvas) {
            options.canvas = document.createElement('canvas');
            options.canvas.style.width = '800px';
            options.canvas.style.height = '600px';
            options.canvas.style.backgroundImage = 'radial-gradient(white 33%, mintcream)';
            document.body.appendChild(options.canvas);
        }
        this.Draw = new NzymDraw(this);
        this.Scene = new NzymScene(this);
        this.Stage = new NzymStage(this, options.canvas, options.pixelRatio);
        this.Runner = new NzymRunner(this);
        this.Draw.init();
    }
    NzymEngine.prototype.start = function () {
        this.Scene.start();
        this.Runner.start();
    };
    NzymEngine.prototype.run = function () {
        this.Scene.update();
        this.Draw.clear();
        this.Scene.render();
        this.Scene.renderUI();
    };
    return NzymEngine;
}());
