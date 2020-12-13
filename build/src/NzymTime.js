var NzymTime = /** @class */ (function () {
    function NzymTime(engine) {
        this.engine = engine;
        this.FPS = 60;
        this.time = 0;
        this.startTime = window.performance.now();
        this.deltaTime = 0;
        this.runningTime = 0;
        this.frameCount = 0;
        this.clampedDeltaTime = 0;
        this.unscaledDeltaTime = 0;
    }
    NzymTime.prototype.start = function (t) {
        if (t === void 0) { t = window.performance.now(); }
        this.time = t - this.startTime;
    };
    NzymTime.prototype.update = function (t) {
        if (t === void 0) { t = window.performance.now(); }
        this.unscaledDeltaTime = t - this.time - this.startTime;
        this.deltaTime = this.unscaledDeltaTime * 0.06;
        this.clampedDeltaTime = Math.min(2, this.deltaTime);
        this.time = t - this.startTime;
        if (this.engine.Runner.isRunning) {
            this.runningTime += this.unscaledDeltaTime;
        }
        this.frameCount++;
        if (this.frameCount % 20 === 0) {
            this.FPS = Math.floor(this.deltaTime * 60);
        }
    };
    return NzymTime;
}());
