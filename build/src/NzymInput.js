/**
 * Input manager.
 */
var NzymInput = /** @class */ (function () {
    function NzymInput(engine) {
        this.engine = engine;
        this.events = {};
        this.keys = {};
        this.keyCodes = [];
        this.position = {
            x: 0,
            y: 0
        };
        this.x = 0;
        this.y = 0;
        this.mouses = [];
        this.wheelDelta = {
            x: 0,
            y: 0,
            z: 0,
            reset: function () {
                this.x = 0;
                this.y = 0;
                this.z = 0;
            }
        };
        this.isMoving = false;
    }
    NzymInput.prototype.init = function () {
        var _this = this;
        this.canvas = this.engine.Stage.canvas;
        // Initialize all key codes
        for (var prop in Nzym.KeyCode) {
            var code = Nzym.KeyCode[prop];
            this.addKey(code);
            // Store KeyCode in array form
            this.keyCodes.push(code);
        }
        for (var i = 0; i < 3; i++) {
            this.mouses[i] = new NzymInputKey();
        }
        window.addEventListener('keyup', function (e) { return _this.keyUpEvent(e); });
        window.addEventListener('keydown', function (e) { return _this.keyDownEvent(e); });
        window.addEventListener('mouseup', function (e) { return _this.mouseUpEvent(e); });
        window.addEventListener('mousedown', function (e) { return _this.mouseDownEvent(e); });
        window.addEventListener('mousemove', function (e) { return _this.mouseMoveEvent(e); });
        window.addEventListener('wheel', function (e) { return _this.wheelEvent(e); });
    };
    NzymInput.prototype.reset = function () {
        for (var code in this.keys) {
            this.keys[code].reset();
        }
        for (var _i = 0, _a = this.mouses; _i < _a.length; _i++) {
            var mouse = _a[_i];
            mouse.reset();
        }
        this.wheelDelta.reset();
        this.isMoving = false;
    };
    // --- KEY METHODS ---
    NzymInput.prototype.addKey = function (code) {
        this.keys[code] = new NzymInputKey();
    };
    NzymInput.prototype.keyUp = function (code) {
        return this.keys[code].released;
    };
    NzymInput.prototype.keyDown = function (code) {
        return this.keys[code].pressed;
    };
    NzymInput.prototype.keyHold = function (code) {
        return this.keys[code].held;
    };
    NzymInput.prototype.keyRepeat = function (code) {
        return this.keys[code].repeated;
    };
    NzymInput.prototype.keyUpAny = function () {
        for (var _i = 0, _a = this.keyCodes; _i < _a.length; _i++) {
            var code = _a[_i];
            if (this.keyUp(code))
                return true;
        }
        return false;
    };
    NzymInput.prototype.keyDownAny = function () {
        for (var _i = 0, _a = this.keyCodes; _i < _a.length; _i++) {
            var code = _a[_i];
            if (this.keyDown(code))
                return true;
        }
        return false;
    };
    NzymInput.prototype.keyHoldAny = function () {
        for (var _i = 0, _a = this.keyCodes; _i < _a.length; _i++) {
            var code = _a[_i];
            if (this.keyHold(code))
                return true;
        }
        return false;
    };
    NzymInput.prototype.keyRepeatAny = function () {
        for (var _i = 0, _a = this.keyCodes; _i < _a.length; _i++) {
            var code = _a[_i];
            if (this.keyRepeat(code))
                return true;
        }
        return false;
    };
    // --- MOUSE METHODS ---
    NzymInput.prototype.mouseUp = function (button) {
        return this.mouses[button].released;
    };
    NzymInput.prototype.mouseDown = function (button) {
        return this.mouses[button].pressed;
    };
    NzymInput.prototype.mouseHold = function (button) {
        return this.mouses[button].held;
    };
    NzymInput.prototype.mouseRepeat = function (button) {
        return this.mouses[button].repeated;
    };
    NzymInput.prototype.mouseUpAny = function () {
        for (var i = 0; i < this.mouses.length; i++) {
            if (this.mouseUp(i))
                return true;
        }
        return false;
    };
    NzymInput.prototype.mouseDownAny = function () {
        for (var i = 0; i < this.mouses.length; i++) {
            if (this.mouseDown(i))
                return true;
        }
        return false;
    };
    NzymInput.prototype.mouseHoldAny = function () {
        for (var i = 0; i < this.mouses.length; i++) {
            if (this.mouseHold(i))
                return true;
        }
        return false;
    };
    NzymInput.prototype.mouseRepeatAny = function () {
        for (var i = 0; i < this.mouses.length; i++) {
            if (this.mouseRepeat(i))
                return true;
        }
        return false;
    };
    // --- EVENTS ---
    NzymInput.prototype.updatePosition = function (x, y) {
        var b = this.canvas.getBoundingClientRect();
        this.x = this.position.x = x - b.x;
        this.y = this.position.y = y - b.y;
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
    NzymInput.prototype.mouseUpEvent = function (e) {
        if (this.mouses[e.button]) {
            this.mouses[e.button].up();
        }
        this.updatePosition(e.clientX, e.clientY);
        Nzym.Events.trigger(this, 'mouseup', e);
    };
    NzymInput.prototype.mouseDownEvent = function (e) {
        if (this.mouses[e.button]) {
            this.mouses[e.button].down();
        }
        this.updatePosition(e.clientX, e.clientY);
        Nzym.Events.trigger(this, 'mousedown', e);
    };
    NzymInput.prototype.mouseMoveEvent = function (e) {
        this.updatePosition(e.clientX, e.clientY);
        this.isMoving = true;
        Nzym.Events.trigger(this, 'mousemove', e);
    };
    NzymInput.prototype.wheelEvent = function (e) {
        this.wheelDelta.x = e.deltaX;
        this.wheelDelta.y = e.deltaY;
        this.wheelDelta.z = e.deltaZ;
        this.updatePosition(e.clientX, e.clientY);
        Nzym.Events.trigger(this, 'wheel', e);
    };
    return NzymInput;
}());
