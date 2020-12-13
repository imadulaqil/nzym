/**
 * Built-in runner to loop engine run.
 */
var NzymRunner = /** @class */ (function () {
    function NzymRunner(engine) {
        this.engine = engine;
        this.isRunning = false;
    }
    NzymRunner.prototype.start = function () {
        if (!this.isRunning) {
            this.isRunning = true;
            this.loop();
        }
    };
    NzymRunner.prototype.stop = function () {
        this.isRunning = false;
    };
    NzymRunner.prototype.loop = function () {
        var _this = this;
        this.engine.run();
        if (this.isRunning) {
            window.requestAnimationFrame(function () { return _this.loop(); });
        }
    };
    return NzymRunner;
}());
