/**
 * Input manager.
 */
var NzymInput = /** @class */ (function () {
    function NzymInput(engine) {
        this.engine = engine;
        this.events = {};
        this.position = {
            x: 0,
            y: 0
        };
        this.x = 0;
        this.y = 0;
        this.keys = {};
    }
    NzymInput.prototype.init = function () {
        var _this = this;
        this.canvas = this.engine.Stage.canvas;
        // Initialize all key codes
        for (var prop in Nzym.KeyCode) {
            this.addKey(Nzym.KeyCode[prop]);
        }
        window.addEventListener('keyup', function (e) { return _this.keyUpEvent(e); });
        window.addEventListener('keydown', function (e) { return _this.keyDownEvent(e); });
    };
    NzymInput.prototype.reset = function () {
        for (var code in this.keys) {
            this.keys[code].reset();
        }
    };
    NzymInput.prototype.addKey = function (code) {
        this.keys[code] = new NzymInputKey();
    };
    NzymInput.prototype.keyUpEvent = function (e) {
        if (this.keys[e.code]) {
            this.keys[e.code].up();
        }
        Nzym.Events.trigger(this, 'keyup', e);
    };
    NzymInput.prototype.keyDownEvent = function (e) {
        if (this.keys[e.code]) {
            this.keys[e.code].down();
        }
        Nzym.Events.trigger(this, 'keydown', e);
    };
    return NzymInput;
}());
