/**
 * Built-in runner to loop engine run.
 */
var NzymRunner = /** @class */ (function () {
    function NzymRunner(engine) {
        this.engine = engine;
        this.isRunning = false;
        this.loopHandle = 0;
    }
    NzymRunner.prototype.start = function () {
        if (!this.isRunning) {
            this.isRunning = true;
            this.run();
        }
    };
    NzymRunner.prototype.stop = function () {
        this.isRunning = false;
        window.cancelAnimationFrame(this.loopHandle);
    };
    NzymRunner.prototype.run = function () {
        var _this = this;
        this.loopHandle = window.requestAnimationFrame(function () { return _this.loop(); });
    };
    NzymRunner.prototype.loop = function () {
        this.engine.run();
        if (this.isRunning) {
            this.run();
        }
    };
    return NzymRunner;
}());
