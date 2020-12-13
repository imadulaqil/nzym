var NzymInputKey = /** @class */ (function () {
    function NzymInputKey() {
        this.held = false;
        this.pressed = false;
        this.released = false;
        this.repeated = false;
    }
    NzymInputKey.prototype.up = function () {
        this.held = false;
        this.released = true;
    };
    NzymInputKey.prototype.down = function () {
        if (!this.held) {
            this.held = true;
            this.pressed = true;
        }
        this.repeated = true;
    };
    NzymInputKey.prototype.reset = function () {
        this.pressed = false;
        this.released = false;
        this.repeated = false;
    };
    return NzymInputKey;
}());
