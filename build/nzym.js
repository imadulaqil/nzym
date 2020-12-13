/**
 * This file will be the first when merging.
 */
var Nzym = Nzym || {};
/**
 * Things that are common througout all modules.
 */
Nzym.Common = {
    LOG_INFO: 0,
    LOG_WARN: 1,
    LOG_ERROR: 2,
    logLevel: 2,
    setLogLevel: function (level) {
        this.logLevel = level;
    },
    LogInfo: function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        if (this.logLevel >= this.LOG_INFO) {
            console.log.apply(console, data);
        }
    },
    LogWarn: function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        if (this.logLevel >= this.LOG_WARN) {
            console.warn.apply(console, data);
        }
    },
    LogError: function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        if (this.logLevel >= this.LOG_ERROR) {
            console.error.apply(console, data);
        }
    },
    pick: function (array) {
        return array[Math.floor(Math.random() * array.length)];
    },
    choose: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.pick(args);
    },
    picko: function (object) {
        var values = [];
        for (var prop in object) {
            values.push(object[prop]);
        }
        return this.pick(values);
    },
    toString: function (object) {
        var values = [];
        for (var prop in object) {
            var value = object[prop];
            if (typeof value === 'number' || typeof value === 'string') {
                values.push(prop + ": " + value);
            }
        }
        return values.join('\n');
    }
};
/**
 * List of constants to use in Draw.
 * See Nzym.start where this got aliases.
 */
Nzym.DrawConstants = {
    Align: {
        l: 'left',
        r: 'right',
        c: 'center',
        t: 'top',
        b: 'bottom',
        m: 'middle'
    },
    LineCap: {
        butt: 'butt',
        round: 'round',
        default: 'butt'
    },
    LineJoin: {
        miter: 'miter',
        round: 'round',
        bevel: 'bevel',
        default: 'miter'
    },
    LineDash: {
        none: [],
        solid: [],
        dot: [3, 10],
        short: [10, 10],
        long: [30, 20],
        default: []
    },
    Primitive: {
        fill: { name: 'Fill', quantity: 0, closePath: true, isStroke: false },
        line: { name: 'Line', quantity: 0, closePath: false, isStroke: true },
        stroke: { name: 'Stroke', quantity: 0, closePath: true, isStroke: true },
        lineList: { name: 'Line List', quantity: 2, closePath: false, isStroke: true },
        pointList: { name: 'Point List', quantity: 1, closePath: false, isStroke: true },
        triangleList: { name: 'Triangle List', quantity: 3, closePath: true, isStroke: true },
        triangleListFill: { name: 'Triangle List Fill', quantity: 3, closePath: false, isStroke: false }
    }
};
/**
 * Events handler.
 */
Nzym.Events = {
    on: function (object, eventName, callbackFn) {
        if (object.events) {
            object.events[eventName] = object.events[eventName] || [];
            object.events[eventName].push(callbackFn);
        }
        else {
            Nzym.Common.LogError("Property 'events' does not exists on given 'object'.");
        }
    },
    off: function (object, eventName, callbackFn) {
        if (object.events) {
            var callbacks = object.events[eventName];
            var newCallbacks = [];
            if (callbacks instanceof Array) {
                for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
                    var callback = callbacks_1[_i];
                    if (callback !== callbackFn) {
                        newCallbacks.push(callback);
                    }
                }
                object.events[eventName] = newCallbacks;
            }
            else {
                Nzym.Common.LogInfo("There are no callbacks on the events['eventName'] of 'object'.");
            }
        }
        else {
            Nzym.Common.LogError("Property 'events' does not exists on given 'object'.");
        }
    },
    trigger: function (object, eventNames, events) {
        if (object.events) {
            if (!(eventNames instanceof Array)) {
                eventNames = [eventNames];
            }
            for (var _i = 0, eventNames_1 = eventNames; _i < eventNames_1.length; _i++) {
                var eventName = eventNames_1[_i];
                var callbacks = object.events[eventName];
                if (callbacks instanceof Array) {
                    for (var _a = 0, callbacks_2 = callbacks; _a < callbacks_2.length; _a++) {
                        var callback = callbacks_2[_a];
                        callback.call(object, events);
                    }
                }
            }
        }
    }
};
/**
 * Nzym quick start.
 */
Nzym.start = function (options) {
    if (options === void 0) { options = {}; }
    // Create an engine
    var Engine = new NzymEngine();
    // Make aliases
    var Draw = Engine.Draw, Scene = Engine.Scene;
    // Get scene options
    var sceneSetupOptions = {};
    if (options.onStart)
        sceneSetupOptions['onStart'] = options.onStart;
    if (options.onUpdate)
        sceneSetupOptions['onUpdate'] = options.onUpdate;
    if (options.onRender)
        sceneSetupOptions['onRender'] = options.onRender;
    if (options.onRenderUI)
        sceneSetupOptions['onRenderUI'] = options.onRenderUI;
    Scene.setup(sceneSetupOptions);
    // Link default font
    Draw.Font.embedGoogleFonts('Quicksand');
    // Make global aliases
    window['Common'] = Nzym.Common;
    window['Events'] = Nzym.Events;
    window['KeyCode'] = Nzym.KeyCode;
    window['Engine'] = Engine;
    window['Draw'] = Engine.Draw;
    window['Font'] = Engine.Draw.Font;
    window['Input'] = Engine.Input;
    window['Scene'] = Engine.Scene;
    window['Stage'] = Engine.Stage;
    window['Align'] = Nzym.DrawConstants.Align;
    window['LineCap'] = Nzym.DrawConstants.LineCap;
    window['LineJoin'] = Nzym.DrawConstants.LineJoin;
    window['LineDash'] = Nzym.DrawConstants.LineDash;
    window['Primitive'] = Nzym.DrawConstants.Primitive;
    if (options.onInit)
        options.onInit();
    // Start the engine
    Engine.start();
};
/**
 * List of KeyboardEvent.code
 */
Nzym.KeyCode = {
    AltLeft: 'AltLeft',
    AltRight: 'AltRight',
    ArrowDown: 'ArrowDown',
    ArrowLeft: 'ArrowLeft',
    ArrowRight: 'ArrowRight',
    ArrowUp: 'ArrowUp',
    AudioVolumeDown: 'AudioVolumeDown',
    AudioVolumeMute: 'AudioVolumeMute',
    AudioVolumeUp: 'AudioVolumeUp',
    Backquote: 'Backquote',
    Backslash: 'Backslash',
    Backspace: 'Backspace',
    BracketLeft: 'BracketLeft',
    BracketRight: 'BracketRight',
    CapsLock: 'CapsLock',
    Comma: 'Comma',
    ControlLeft: 'ControlLeft',
    ControlRight: 'ControlRight',
    Delete: 'Delete',
    Digit0: 'Digit0',
    Digit1: 'Digit1',
    Digit2: 'Digit2',
    Digit3: 'Digit3',
    Digit4: 'Digit4',
    Digit5: 'Digit5',
    Digit6: 'Digit6',
    Digit7: 'Digit7',
    Digit8: 'Digit8',
    Digit9: 'Digit9',
    End: 'End',
    Enter: 'Enter',
    Equal: 'Equal',
    Escape: 'Escape',
    F1: 'F1',
    F2: 'F2',
    F3: 'F3',
    F4: 'F4',
    F5: 'F5',
    F6: 'F6',
    F7: 'F7',
    F8: 'F8',
    F9: 'F9',
    F10: 'F10',
    F11: 'F11',
    F12: 'F12',
    Home: 'Home',
    Insert: 'Insert',
    A: 'KeyA',
    B: 'KeyB',
    C: 'KeyC',
    D: 'KeyD',
    E: 'KeyE',
    F: 'KeyF',
    G: 'KeyG',
    H: 'KeyH',
    I: 'KeyI',
    J: 'KeyJ',
    K: 'KeyK',
    L: 'KeyL',
    M: 'KeyM',
    N: 'KeyN',
    O: 'KeyO',
    P: 'KeyP',
    Q: 'KeyQ',
    R: 'KeyR',
    S: 'KeyS',
    T: 'KeyT',
    U: 'KeyU',
    V: 'KeyV',
    W: 'KeyW',
    X: 'KeyX',
    Y: 'KeyY',
    Z: 'KeyZ',
    MediaPlayPause: 'MediaPlayPause',
    MediaTrackNext: 'MediaTrackNext',
    MediaTrackPrevious: 'MediaTrackPrevious',
    MetaLeft: 'MetaLeft',
    Minus: 'Minus',
    NumLock: 'NumLock',
    Numpad0: 'Numpad0',
    Numpad1: 'Numpad1',
    Numpad2: 'Numpad2',
    Numpad3: 'Numpad3',
    Numpad4: 'Numpad4',
    Numpad5: 'Numpad5',
    Numpad6: 'Numpad6',
    Numpad7: 'Numpad7',
    Numpad8: 'Numpad8',
    Numpad9: 'Numpad9',
    NumpadAdd: 'NumpadAdd',
    NumpadDecimal: 'NumpadDecimal',
    NumpadDivide: 'NumpadDivide',
    NumpadEnter: 'NumpadEnter',
    NumpadMultiply: 'NumpadMultiply',
    NumpadSubtract: 'NumpadSubtract',
    PageDown: 'PageDown',
    PageUp: 'PageUp',
    Period: 'Period',
    PrintScreen: 'PrintScreen',
    Quote: 'Quote',
    Semicolon: 'Semicolon',
    ShiftLeft: 'ShiftLeft',
    ShiftRight: 'ShiftRight',
    Slash: 'Slash',
    Space: 'Space'
};
/**
 * Draw methods.
 */
var NzymDraw = /** @class */ (function () {
    function NzymDraw(engine) {
        this.engine = engine;
        this.Font = new NzymFont();
        this.vertices = [];
        this.primitive = { name: 'Fill', quantity: 0, closePath: true, isStroke: false };
        this.currentFont = this.Font['m'];
    }
    NzymDraw.prototype.init = function () {
        this.ctx = this.defaultCtx = this.engine.Stage.canvas.getContext('2d');
    };
    NzymDraw.prototype.onCtx = function (ctx, drawFn) {
        this.ctx = ctx;
        drawFn();
        this.ctx = this.defaultCtx;
    };
    NzymDraw.prototype.setFill = function (color) {
        this.ctx.fillStyle = color;
    };
    NzymDraw.prototype.setStroke = function (color) {
        this.ctx.strokeStyle = color;
    };
    NzymDraw.prototype.setColor = function (fillColor, strokeColor) {
        this.ctx.fillStyle = fillColor;
        this.ctx.strokeStyle = strokeColor || fillColor;
    };
    NzymDraw.prototype.setFont = function (font) {
        this.ctx.font = "" + font.style + font.size + "px " + font.family + ", serif";
        this.currentFont = font;
    };
    NzymDraw.prototype.setHAlign = function (align) {
        this.ctx.textAlign = align;
    };
    NzymDraw.prototype.setVAlign = function (align) {
        this.ctx.textBaseline = align;
    };
    NzymDraw.prototype.setHVAlign = function (halign, valign) {
        this.ctx.textAlign = halign;
        this.ctx.textBaseline = valign;
    };
    NzymDraw.prototype.setAlign = function (align) {
        this.ctx.textAlign = align;
    };
    NzymDraw.prototype.setBaseline = function (align) {
        this.ctx.textBaseline = align;
    };
    NzymDraw.prototype.splitText = function (text) {
        return ('' + text).split('\n');
    };
    NzymDraw.prototype.text = function (x, y, text) {
        var baseline = 0;
        var t = this.splitText(text);
        switch (this.ctx.textBaseline) {
            case 'bottom':
                baseline = -this.currentFont.size * (t.length - 1);
                break;
            case 'middle':
                baseline = -this.currentFont.size * (t.length - 1) * 0.5;
                break;
        }
        for (var i = t.length - 1; i >= 0; --i) {
            this.ctx.fillText(t[i], x, y + baseline + this.currentFont.size * i);
        }
    };
    NzymDraw.prototype.textWidth = function (text) {
        var _this = this;
        return Math.max.apply(Math, this.splitText(text).map(function (x) { return _this.ctx.measureText(x).width; }));
    };
    NzymDraw.prototype.textHeight = function (text) {
        return this.currentFont.size * this.splitText(text).length;
    };
    NzymDraw.prototype.setLineCap = function (lineCap) {
        this.ctx.lineCap = lineCap;
    };
    NzymDraw.prototype.setLineJoin = function (lineJoin) {
        this.ctx.lineJoin = lineJoin;
    };
    NzymDraw.prototype.setLineWidth = function (width) {
        this.ctx.lineWidth = width;
    };
    NzymDraw.prototype.setStrokeWeight = function (weight) {
        this.setLineWidth(weight);
    };
    NzymDraw.prototype.setLineDash = function (segments, offset) {
        if (offset === void 0) { offset = 0; }
        this.ctx.setLineDash(segments);
        this.ctx.lineDashOffset = offset;
    };
    NzymDraw.prototype.fill = function () {
        this.ctx.fill();
    };
    NzymDraw.prototype.stroke = function () {
        this.ctx.stroke();
    };
    NzymDraw.prototype.draw = function (isStroke) {
        isStroke ? this.ctx.stroke() : this.ctx.fill();
    };
    NzymDraw.prototype.rect = function (x, y, w, h, isStroke) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.draw(isStroke);
    };
    NzymDraw.prototype.rectCenter = function (x, y, w, h, isStroke) {
        this.rect(x - w / 2, y - h / 2, w, h, isStroke);
    };
    NzymDraw.prototype.circle = function (x, y, r, isStroke) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.draw(isStroke);
    };
    NzymDraw.prototype.arc = function (x, y, r, startAngle, endAngle, anticlockwise) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, startAngle, endAngle, anticlockwise);
        this.ctx.stroke();
    };
    NzymDraw.prototype.primitiveBegin = function () {
        this.vertices.length = 0;
    };
    NzymDraw.prototype.vertex = function (x, y) {
        this.vertices.push({ x: x, y: y });
    };
    NzymDraw.prototype.primitiveEnd = function (primitive) {
        if (primitive === void 0) { primitive = this.primitive; }
        this.primitive = primitive;
        var q = this.primitive.quantity;
        this.ctx.save();
        if (q === 1) {
            this.ctx.lineCap = 'round';
            if (this.ctx.lineWidth < 3.5) {
                this.ctx.lineWidth = 3.5;
            }
        }
        this.ctx.beginPath();
        for (var i = 0; i < this.vertices.length; i++) {
            var v = this.vertices[i];
            if (q === 1) {
                this.draw(this.primitive.isStroke);
                this.ctx.beginPath();
                this.ctx.moveTo(v.x, v.y);
                this.ctx.lineTo(v.x, v.y);
            }
            else if (i === 0 || (q > 1 && i % q === 0)) {
                if (this.primitive.closePath)
                    this.ctx.closePath();
                this.draw(this.primitive.isStroke);
                this.ctx.beginPath();
                this.ctx.moveTo(v.x, v.y);
            }
            else
                this.ctx.lineTo(v.x, v.y);
        }
        if (this.primitive.closePath)
            this.ctx.closePath();
        this.draw(this.primitive.isStroke);
        this.ctx.restore();
    };
    NzymDraw.prototype.clear = function () {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    };
    return NzymDraw;
}());
/**
 * Initializes and runs all Nzym modules.
 */
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
        this.Input = new NzymInput(this);
        this.Scene = new NzymScene(this);
        this.Stage = new NzymStage(this, options.canvas, options.pixelRatio);
        this.Runner = new NzymRunner(this);
        this.Draw.init();
        this.Input.init();
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
        this.Input.reset();
    };
    return NzymEngine;
}());
/**
 * Font manager.
 */
var NzymFont = /** @class */ (function () {
    function NzymFont(defaultFamily) {
        if (defaultFamily === void 0) { defaultFamily = 'Quicksand, sans-serif'; }
        this.defaultFamily = defaultFamily;
        this.regular = '';
        this.bold = 'bold ';
        this.italic = 'italic ';
        this.boldItalic = 'bold italic ';
        this['xxl'] = this.makeFont(64);
        this['xl'] = this.makeFont(48);
        this['l'] = this.makeFont(30);
        this['ml'] = this.makeFont(24);
        this['m'] = this.makeFont(20);
        this['sm'] = this.makeFont(16);
        this['s'] = this.makeFont(10);
        this['xxlb'] = this.makeFont(this['xxl'].size, this.bold);
        this['xlb'] = this.makeFont(this['xl'].size, this.bold);
        this['lb'] = this.makeFont(this['l'].size, this.bold);
        this['mlb'] = this.makeFont(this['ml'].size, this.bold);
        this['mb'] = this.makeFont(this['m'].size, this.bold);
        this['smb'] = this.makeFont(this['sm'].size, this.bold);
        this['sb'] = this.makeFont(this['s'].size, this.bold);
    }
    NzymFont.prototype.makeFont = function (size, style, family) {
        if (style === void 0) { style = this.regular; }
        if (family === void 0) { family = this.defaultFamily; }
        return { size: size, style: style, family: family };
    };
    NzymFont.prototype.forEach = function (callbackFn) {
        var font;
        for (var prop in this) {
            font = this[prop];
            if (typeof font === 'object') {
                if (font.size !== undefined && font.style !== undefined && font.family !== undefined) {
                    callbackFn(font);
                }
            }
        }
    };
    NzymFont.prototype.embedGoogleFonts = function () {
        var fontNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fontNames[_i] = arguments[_i];
        }
        var prelink = document.createElement('link');
        prelink.href = 'https://fonts.gstatic.com';
        prelink.rel = 'preconnect';
        var link = document.createElement('link');
        link.href = "https://fonts.googleapis.com/css2?family=" + fontNames.join('+') + "&display=swap";
        link.rel = 'stylesheet';
        document.head.appendChild(prelink);
        document.head.appendChild(link);
    };
    return NzymFont;
}());
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
        Nzym.Events.trigger(this, 'mousemove', e);
    };
    NzymInput.prototype.wheelEvent = function (e) {
        this.wheelDelta.x = e.deltaX;
        this.wheelDelta.y = e.deltaY;
        this.wheelDelta.z = e.deltaZ;
        this.updatePosition(e.clientX, e.clientY);
        Nzym.Events.trigger(this, 'mousewheel', e);
    };
    return NzymInput;
}());
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
/**
 * Built-in runner to loop engine run.
 */
var NzymRunner = /** @class */ (function () {
    function NzymRunner(engine) {
        this.engine = engine;
        this.isRunning = false;
    }
    NzymRunner.prototype.start = function () {
        this.isRunning = true;
        this.loop();
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
var NzymScene = /** @class */ (function () {
    function NzymScene(engine) {
        this.engine = engine;
        this.events = {};
    }
    NzymScene.prototype.setup = function (options) {
        if (options === void 0) { options = {}; }
        if (options.onStart)
            Nzym.Events.on(this, 'start', options.onStart);
        if (options.onUpdate)
            Nzym.Events.on(this, 'update', options.onUpdate);
        if (options.onRender)
            Nzym.Events.on(this, 'render', options.onRender);
        if (options.onRenderUI)
            Nzym.Events.on(this, 'renderui', options.onRenderUI);
    };
    NzymScene.prototype.restart = function () {
        this.start();
    };
    NzymScene.prototype.start = function () {
        Nzym.Events.trigger(this, 'start');
    };
    NzymScene.prototype.update = function () {
        Nzym.Events.trigger(this, 'update');
    };
    NzymScene.prototype.render = function () {
        Nzym.Events.trigger(this, 'render');
    };
    NzymScene.prototype.renderUI = function () {
        Nzym.Events.trigger(this, 'renderui');
    };
    return NzymScene;
}());
/**
 * HTML canvas wrapper.
 */
var NzymStage = /** @class */ (function () {
    function NzymStage(engine, canvas, pixelRatio) {
        if (pixelRatio === void 0) { pixelRatio = 2; }
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
    return NzymStage;
}());
