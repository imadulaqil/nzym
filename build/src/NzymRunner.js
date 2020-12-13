var NzymRunner = /** @class */ (function () {
    function NzymRunner(engine) {
        this.engine = engine;
        this.isRunning = false;
    }
    NzymRunner.prototype.start = function () {
        this.isRunning = true;
        this.run();
    };
    NzymRunner.prototype.stop = function () {
        this.isRunning = false;
    };
    NzymRunner.prototype.run = function () {
        var _this = this;
        this.engine.Scene.update();
        this.engine.Draw.clear();
        this.engine.Scene.render();
        this.engine.Scene.renderUI();
        if (this.isRunning) {
            window.requestAnimationFrame(function () { return _this.run(); });
        }
    };
    return NzymRunner;
}());
