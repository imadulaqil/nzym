/**
 * This file will be the first when merging.
 */
var Nzym = Nzym || {
    Example: {}
};
Nzym.name = 'Nzym';
// major.minor.build.revision
Nzym.version = '0.0.1.1';
/**
 * Things that are common througout all modules.
 * Such as basic math functions.
 */
Nzym.Common = {
    ID: 0,
    RAD_TO_DEG: 180 / Math.PI,
    DEG_TO_RAD: Math.PI / 180,
    getID: function () {
        return this.ID++;
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
    },
    range: function (min, max) {
        if (max === void 0) { max = 0; }
        return min + Math.random() * (max - min);
    },
    radtodeg: function (radians) {
        return radians * this.RAD_TO_DEG;
    },
    degtorad: function (degrees) {
        return degrees * this.DEG_TO_RAD;
    },
    hypot: function (a, b) {
        return Math.sqrt(a * a + b * b);
    },
    clamp: function (value, min, max) {
        return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
    },
    getFilenameFromPath: function (path) {
        return path.split('\\').pop().split('/').pop();
    },
    angleBetween: function (x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1);
    },
    distanceBetween: function (x1, y1, x2, y2) {
        return this.hypot(x2 - x1, y2 - y1);
    },
    rectIntersects: function (rectA, rectB) {
        return rectA.x <= rectB.x + rectB.w && rectA.x + rectA.w >= rectB.x
            && rectA.y <= rectB.y + rectB.h && rectA.y + rectA.h >= rectB.y;
    },
    rectContainsPoint: function (rect, point) {
        return point.x >= rect.x && point.x < rect.x + rect.w
            && point.y >= rect.y && point.y < rect.y + rect.h;
    }
};
/**
 * List of constants to use in Draw.
 * See Nzym.createEngine where this got aliases.
 */
Nzym.DrawConstants = {
    C: {
        aliceBlue: '#f0f8ff',
        antiqueWhite: '#faebd7',
        aqua: '#00ffff',
        aquamarine: '#7fffd4',
        azure: '#f0ffff',
        beige: '#f5f5dc',
        bisque: '#ffe4c4',
        black: '#000000',
        blanchedAlmond: '#ffebcd',
        blue: '#0000ff',
        blueViolet: '#8a2be2',
        brown: '#a52a2a',
        burlyWood: '#deb887',
        cadetBlue: '#5f9ea0',
        chartreuse: '#7fff00',
        chocolate: '#d2691e',
        coral: '#ff7f50',
        cornflowerBlue: '#6495ed',
        cornsilk: '#fff8dc',
        crimson: '#dc143c',
        cyan: '#00ffff',
        darkBlue: '#00008b',
        darkCyan: '#008b8b',
        darkGoldenRod: '#b8860b',
        darkGray: '#a9a9a9',
        darkGrey: '#a9a9a9',
        darkGreen: '#006400',
        darkKhaki: '#bdb76b',
        darkMagenta: '#8b008b',
        darkOliveGreen: '#556b2f',
        darkOrange: '#ff8c00',
        darkOrchid: '#9932cc',
        darkRed: '#8b0000',
        darkSalmon: '#e9967a',
        darkSeaGreen: '#8fbc8f',
        darkSlateBlue: '#483d8b',
        darkSlateGray: '#2f4f4f',
        darkSlateGrey: '#2f4f4f',
        darkTurquoise: '#00ced1',
        darkViolet: '#9400d3',
        deepPink: '#ff1493',
        deepSkyBlue: '#00bfff',
        dimGray: '#696969',
        dimGrey: '#696969',
        dodgerBlue: '#1e90ff',
        fireBrick: '#b22222',
        floralWhite: '#fffaf0',
        forestGreen: '#228b22',
        fuchsia: '#ff00ff',
        gainsboro: '#dcdcdc',
        ghostWhite: '#f8f8ff',
        gold: '#ffd700',
        goldenRod: '#daa520',
        gray: '#808080',
        grey: '#808080',
        green: '#008000',
        greenYellow: '#adff2f',
        honeyDew: '#f0fff0',
        hotPink: '#ff69b4',
        indianRed: '#cd5c5c',
        indigo: '#4b0082',
        ivory: '#fffff0',
        khaki: '#f0e68c',
        lavender: '#e6e6fa',
        lavenderBlush: '#fff0f5',
        lawnGreen: '#7cfc00',
        lemonChiffon: '#fffacd',
        lightBlue: '#add8e6',
        lightCoral: '#f08080',
        lightCyan: '#e0ffff',
        lightGoldenRodYellow: '#fafad2',
        lightGray: '#d3d3d3',
        lightGrey: '#d3d3d3',
        lightGreen: '#90ee90',
        lightPink: '#ffb6c1',
        lightSalmon: '#ffa07a',
        lightSeaGreen: '#20b2aa',
        lightSkyBlue: '#87cefa',
        lightSlateGray: '#778899',
        lightSlateGrey: '#778899',
        lightSteelBlue: '#b0c4de',
        lightYellow: '#ffffe0',
        lime: '#00ff00',
        limeGreen: '#32cd32',
        linen: '#faf0e6',
        magenta: '#ff00ff',
        maroon: '#800000',
        mediumAquaMarine: '#66cdaa',
        mediumBlue: '#0000cd',
        mediumOrchid: '#ba55d3',
        mediumPurple: '#9370db',
        mediumSeaGreen: '#3cb371',
        mediumSlateBlue: '#7b68ee',
        mediumSpringGreen: '#00fa9a',
        mediumTurquoise: '#48d1cc',
        mediumVioletRed: '#c71585',
        midnightBlue: '#191970',
        mintCream: '#f5fffa',
        mistyRose: '#ffe4e1',
        moccasin: '#ffe4b5',
        navajoWhite: '#ffdead',
        navy: '#000080',
        oldLace: '#fdf5e6',
        olive: '#808000',
        oliveDrab: '#6b8e23',
        orange: '#ffa500',
        orangeRed: '#ff4500',
        orchid: '#da70d6',
        paleGoldenRod: '#eee8aa',
        paleGreen: '#98fb98',
        paleTurquoise: '#afeeee',
        paleVioletRed: '#db7093',
        papayaWhip: '#ffefd5',
        peachPuff: '#ffdab9',
        peru: '#cd853f',
        pink: '#ffc0cb',
        plum: '#dda0dd',
        powderBlue: '#b0e0e6',
        purple: '#800080',
        rebeccaPurple: '#663399',
        red: '#ff0000',
        rosyBrown: '#bc8f8f',
        royalBlue: '#4169e1',
        saddleBrown: '#8b4513',
        salmon: '#fa8072',
        sandyBrown: '#f4a460',
        seaGreen: '#2e8b57',
        seaShell: '#fff5ee',
        sienna: '#a0522d',
        silver: '#c0c0c0',
        skyBlue: '#87ceeb',
        slateBlue: '#6a5acd',
        slateGray: '#708090',
        slateGrey: '#708090',
        snow: '#fffafa',
        springGreen: '#00ff7f',
        steelBlue: '#4682b4',
        tan: '#d2b48c',
        teal: '#008080',
        thistle: '#d8bfd8',
        tomato: '#ff6347',
        turquoise: '#40e0d0',
        violet: '#ee82ee',
        wheat: '#f5deb3',
        white: '#ffffff',
        whiteSmoke: '#f5f5f5',
        yellow: '#ffff00',
        yellowGreen: '#9acd32',
        none: '#0000',
        keys: [],
        list: [],
        random: function () {
            return this.list[Math.floor(Math.random() * this.list.length)];
        },
        init: function () {
            for (var prop in this) {
                this.keys.push(prop);
                this.list.push(this[prop]);
                if (this.list.length >= 148) {
                    // 148 is the amount of visible colors
                    // exists in C; 149th is C.none
                    break;
                }
            }
        }
    },
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
Nzym.DrawConstants.C.init();
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
            Nzym.Log.error("Property 'events' does not exists on given 'object'.");
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
                Nzym.Log.info("There are no callbacks on the events['eventName'] of 'object'.");
            }
        }
        else {
            Nzym.Log.error("Property 'events' does not exists on given 'object'.");
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
                        callback.call(object, events || { name: eventName, source: object });
                    }
                }
            }
        }
    }
};
Nzym.getAliases = function () {
    return {
        C: Nzym.DrawConstants.C,
        Align: Nzym.DrawConstants.Align,
        Common: Nzym.Common,
        Events: Nzym.Events,
        KeyCode: Nzym.KeyCode,
        LineCap: Nzym.DrawConstants.LineCap,
        LineJoin: Nzym.DrawConstants.LineJoin,
        LineDash: Nzym.DrawConstants.LineDash,
        Primitive: Nzym.DrawConstants.Primitive
    };
};
Nzym.createEngine = function (options) {
    if (options === void 0) { options = {}; }
    return new NzymEngine(options);
};
Nzym.start = function (options) {
    if (options === void 0) { options = {}; }
    options.autoStart = true;
    return Nzym.createEngine(options);
};
/**
 * List of KeyboardEvent.code
 */
Nzym.KeyCode = {
    AltLeft: 'AltLeft',
    AltRight: 'AltRight',
    Down: 'ArrowDown',
    Left: 'ArrowLeft',
    Right: 'ArrowRight',
    Up: 'ArrowUp',
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
        this.images = {};
        this.currentFont = this.Font.m;
        this.lastText = {
            x: 0,
            y: 0,
            text: '',
            font: this.currentFont
        };
    }
    NzymDraw.prototype.init = function () {
        this.ctx = this.defaultCtx = this.engine.Stage.canvas.getContext('2d');
        this.Font.embedGoogleFonts('Quicksand');
    };
    NzymDraw.prototype.onCtx = function (ctx, drawFn) {
        this.ctx = ctx;
        drawFn();
        this.ctx = this.defaultCtx;
    };
    NzymDraw.prototype.onCanvas = function (canvas, drawFn) {
        this.onCtx(canvas.getContext('2d'), drawFn);
    };
    NzymDraw.prototype.createCanvas = function (w, h, drawFn) {
        var canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        if (drawFn) {
            this.ctx = canvas.getContext('2d');
            drawFn(canvas, canvas.width, canvas.height);
            this.ctx = this.defaultCtx;
        }
        return canvas;
    };
    NzymDraw.prototype.setAlpha = function (alpha) {
        this.ctx.globalAlpha = alpha;
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
    NzymDraw.prototype.setHAlign = function (halign) {
        this.ctx.textAlign = halign;
    };
    NzymDraw.prototype.setVAlign = function (valign) {
        this.ctx.textBaseline = valign;
    };
    NzymDraw.prototype.setHVAlign = function (halign, valign) {
        this.ctx.textAlign = halign;
        this.ctx.textBaseline = valign;
    };
    NzymDraw.prototype.setAlign = function (align) {
        this.ctx.textAlign = align;
    };
    NzymDraw.prototype.setBaseline = function (baseline) {
        this.ctx.textBaseline = baseline;
    };
    NzymDraw.prototype.splitText = function (text) {
        return ('' + text).split('\n');
    };
    NzymDraw.prototype.text = function (x, y, text) {
        this.lastText.x = x;
        this.lastText.y = y;
        this.lastText.text = text;
        this.lastText.font = this.currentFont;
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
    NzymDraw.prototype.textWidth = function (text, font) {
        var _this = this;
        if (font === void 0) { font = this.currentFont; }
        var temp = this.currentFont;
        this.setFont(font);
        var result = Math.max.apply(Math, this.splitText(text).map(function (x) { return _this.ctx.measureText(x).width; }));
        this.setFont(temp);
        return result;
    };
    NzymDraw.prototype.textHeight = function (text, charHeight) {
        if (charHeight === void 0) { charHeight = this.currentFont.size; }
        return charHeight * this.splitText(text).length;
    };
    NzymDraw.prototype.getLastTextWidth = function () {
        return this.textWidth(this.lastText.text, this.lastText.font);
    };
    NzymDraw.prototype.getLastTextHeight = function () {
        return this.textHeight(this.lastText.text, this.lastText.font.size);
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
    NzymDraw.prototype.rectObject = function (rect, isStroke) {
        this.rect(rect.x, rect.y, rect.w, rect.h, isStroke);
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
    NzymDraw.prototype.line = function (x1, y1, x2, y2) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    };
    NzymDraw.prototype.linePoint = function (p1, p2) {
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
    };
    NzymDraw.prototype.plus = function (x, y, radius) {
        this.ctx.beginPath();
        this.ctx.moveTo(x - radius, y);
        this.ctx.lineTo(x + radius, y);
        this.ctx.moveTo(x, y - radius);
        this.ctx.lineTo(x, y + radius);
        this.stroke();
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
    NzymDraw.prototype.onTransform = function (x, y, xscale, yscale, angle, drawFn, isRadians) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(isRadians ? angle : Nzym.Common.degtorad(angle));
        this.ctx.scale(xscale, yscale);
        drawFn();
        this.ctx.restore();
    };
    NzymDraw.prototype.addImage = function (name, img) {
        this.images[name] = img;
    };
    NzymDraw.prototype.getImage = function (name) {
        return this.images[name];
    };
    NzymDraw.prototype.image = function (name, x, y, xscale, yscale, angle, originX, originY, isRadians) {
        var _this = this;
        if (xscale === void 0) { xscale = 1; }
        if (yscale === void 0) { yscale = 1; }
        if (angle === void 0) { angle = 0; }
        if (originX === void 0) { originX = 0.5; }
        if (originY === void 0) { originY = 0.5; }
        var img;
        if (typeof name === 'string') {
            img = this.images[name];
        }
        else {
            img = name;
        }
        originX *= -img.width;
        originY *= -img.height;
        this.onTransform(x, y, xscale, yscale, angle, function () {
            _this.ctx.drawImage(img, originX, originY);
        }, isRadians);
    };
    NzymDraw.prototype.strip = function (name, stripsCount, index, x, y, xscale, yscale, angle, originX, originY, isRadians) {
        var _this = this;
        if (xscale === void 0) { xscale = 1; }
        if (yscale === void 0) { yscale = 1; }
        if (angle === void 0) { angle = 0; }
        if (originX === void 0) { originX = 0.5; }
        if (originY === void 0) { originY = 0.5; }
        var img = (typeof name === 'string') ? this.images[name] : name;
        var s = {
            w: Number(img.width) / stripsCount,
            h: Number(img.height)
        };
        originX *= -s.w;
        originY *= -s.h;
        this.onTransform(x, y, xscale, yscale, angle, function () {
            _this.ctx.drawImage(img, (index % stripsCount) * s.w, 0, s.w, s.h, originX, originY, s.w, s.h);
        }, isRadians);
    };
    NzymDraw.prototype.smooth = function () {
        this.ctx.imageSmoothingEnabled = true;
    };
    NzymDraw.prototype.noSmooth = function () {
        this.ctx.imageSmoothingEnabled = false;
    };
    NzymDraw.prototype.clear = function () {
        var b = this.ctx.canvas.getBoundingClientRect();
        this.ctx.clearRect(0, 0, b.width, b.height);
    };
    return NzymDraw;
}());
var NzymEmitter = /** @class */ (function () {
    function NzymEmitter(engine, tag) {
        this.engine = engine;
        this.tag = tag;
        /**
         * Particle lifetime range. Uses milliseconds.
         */
        this.life = {
            min: 100,
            max: 200
        };
        this.area = {
            x: 0,
            y: 0,
            w: 100,
            h: 0
        };
        this.gravity = 0.5;
        this.speed = {
            min: 15,
            max: 18
        };
        this.speedInc = {
            min: -0.5,
            max: 0.5
        };
        this.direction = {
            min: 0,
            max: Math.PI
        };
        this.directionInc = {
            min: -0.1,
            max: 0.1
        };
        this.friction = 0.99; // 0=no velocity, 1=no friction
        this.size = {
            min: 10,
            max: 25
        };
        this.sizeEndScalar = {
            min: 0.1,
            max: 0.2
        };
        this.color = ['skyblue', 'royalblue', 'gold']; // will be choosed randomly
        this.fadeOutStop = {
            min: 0.2,
            max: 0.4
        };
        this.depth = 0;
    }
    NzymEmitter.WaterFountain = function (engine, tag) {
        var Emitter = new NzymEmitter(engine, tag);
        Emitter.setColor(Nzym.DrawConstants.C.skyBlue, Nzym.DrawConstants.C.dodgerBlue, Nzym.DrawConstants.C.deepSkyBlue);
        Emitter.setDirectionDeg(-50, -130);
        Emitter.setDirectionIncDeg(0);
        Emitter.setFadeOutStop(1);
        Emitter.setFriction(1);
        Emitter.setGravity(0.45);
        Emitter.setLife(80, 100);
        Emitter.setSize(4);
        Emitter.setSizeEndScalar(2, 4);
        Emitter.setSpeed(8, 12);
        Emitter.setSpeedInc(0);
        return Emitter;
    };
    /**
     * Blood emitter preset.
     */
    NzymEmitter.Blood = function (engine, tag) {
        var Emitter = new NzymEmitter(engine, tag);
        Emitter.setColor(Nzym.DrawConstants.C.red, Nzym.DrawConstants.C.orange, Nzym.DrawConstants.C.orangeRed);
        Emitter.setDirectionDeg(-60, -120);
        Emitter.setDirectionIncDeg(0);
        Emitter.setFadeOutStop(0.05, 0.1);
        Emitter.setFriction(1);
        Emitter.setGravity(0.47);
        Emitter.setLife(20, 30);
        Emitter.setSize(2, 4);
        Emitter.setSizeEndScalar(0.6, 0.8);
        Emitter.setSpeed(6.5, 7.5);
        Emitter.setSpeedInc(0);
        return Emitter;
    };
    NzymEmitter.prototype.emit = function (amount) {
        while (amount-- > 0) {
            var n = new NzymParticle(this.engine, this.tag, Nzym.Common.range(this.life.min, this.life.max), Nzym.Common.range(this.area.x, this.area.x + this.area.w), Nzym.Common.range(this.area.y, this.area.y + this.area.h), Nzym.Common.range(this.speed.min, this.speed.max), Nzym.Common.range(this.speedInc.min, this.speedInc.max), Nzym.Common.range(this.direction.min, this.direction.max), Nzym.Common.range(this.directionInc.min, this.directionInc.max), Nzym.Common.range(this.size.min, this.size.max), Nzym.Common.range(this.sizeEndScalar.min, this.sizeEndScalar.max), Nzym.Common.pick(this.color), Nzym.Common.range(this.fadeOutStop.min, this.fadeOutStop.max), this.gravity, this.friction);
            n.depth = this.depth;
            this.engine.OBJ.push(this.tag, n);
        }
    };
    NzymEmitter.prototype.setLife = function (min, max) {
        this.life.min = min;
        this.life.max = max || min;
    };
    NzymEmitter.prototype.setArea = function (x, y, w, h) {
        if (w === void 0) { w = 0; }
        if (h === void 0) { h = 0; }
        this.area.x = x;
        this.area.y = y;
        this.area.w = w;
        this.area.h = h;
    };
    NzymEmitter.prototype.setGravity = function (gravity) {
        this.gravity = gravity;
    };
    NzymEmitter.prototype.setSpeed = function (min, max) {
        this.speed.min = min;
        this.speed.max = max || min;
    };
    NzymEmitter.prototype.setSpeedInc = function (min, max) {
        this.speedInc.min = min;
        this.speedInc.max = max || min;
    };
    NzymEmitter.prototype.setDirection = function (min, max) {
        this.direction.min = min;
        this.direction.max = max || min;
    };
    NzymEmitter.prototype.setDirectionInc = function (min, max) {
        this.directionInc.min = min;
        this.directionInc.max = max || min;
    };
    NzymEmitter.prototype.setDirectionDeg = function (min, max) {
        if (max === undefined)
            max = min;
        this.direction.min = min * Math.PI / 180;
        this.direction.max = max * Math.PI / 180;
    };
    NzymEmitter.prototype.setDirectionIncDeg = function (min, max) {
        if (max === undefined)
            max = min;
        this.directionInc.min = min * Math.PI / 180;
        this.directionInc.max = max * Math.PI / 180;
    };
    NzymEmitter.prototype.setFriction = function (friction) {
        this.friction = friction;
    };
    NzymEmitter.prototype.setSize = function (min, max) {
        this.size.min = min;
        this.size.max = max || min;
    };
    NzymEmitter.prototype.setSizeEndScalar = function (min, max) {
        this.sizeEndScalar.min = min;
        this.sizeEndScalar.max = max || min;
    };
    NzymEmitter.prototype.setColor = function () {
        var colors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            colors[_i] = arguments[_i];
        }
        this.color = colors;
    };
    NzymEmitter.prototype.addColor = function () {
        var colors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            colors[_i] = arguments[_i];
        }
        for (var i = 0; i < colors.length; i++) {
            this.color.push(colors[i]);
        }
    };
    NzymEmitter.prototype.setFadeOutStop = function (min, max) {
        this.fadeOutStop.min = min;
        this.fadeOutStop.max = max || min;
    };
    NzymEmitter.prototype.setDepth = function (depth) {
        this.depth = depth;
    };
    return NzymEmitter;
}());
/**
 * Initializes and runs all Nzym modules.
 */
var NzymEngine = /** @class */ (function () {
    /**
     * Set `options.canvas` to the target canvas element.
     * Or else the engine will create a default canvas with default width and height.
     * Setting `options.w` and `options.h` will set the size of the engine default canvas.
     * `options.parent` is the parent element of the engine default canvas (default parent is `body` element.)
     * @param options
     */
    function NzymEngine(options) {
        if (options === void 0) { options = {}; }
        this.name = '';
        if (options.name) {
            this.name = options.name;
        }
        // Instantiate all modules
        this.Log = new NzymLog(this.name);
        this.OBJ = new NzymOBJ(this, options);
        this.Draw = new NzymDraw(this);
        this.Time = new NzymTime(this);
        this.Input = new NzymInput(this, options);
        this.Scene = new NzymScene(this);
        this.Sound = new NzymSound(this);
        this.Stage = new NzymStage(this, options);
        this.Loader = new NzymLoader(this);
        this.Runner = new NzymRunner(this);
        this.OBJ.init();
        this.Draw.init();
        this.Input.init();
        this.Scene.setup(options);
        this.stop();
        this.makeGlobalAliases();
        if (options.autoStart) {
            // Start the engine
            this.Scene.boot();
            this.start();
        }
    }
    NzymEngine.prototype.start = function () {
        if (!this.Scene.isStarted) {
            this.Scene.boot();
            this.Scene.isStarted = true;
        }
        if (!this.Runner.isRunning) {
            this.Time.start();
            this.Stage.show();
            this.Scene.start();
            this.Runner.start();
        }
        else {
            this.Log.warn('The engine is already running');
        }
    };
    NzymEngine.prototype.stop = function () {
        this.Stage.hide();
        this.Runner.stop();
    };
    NzymEngine.prototype.restart = function () {
        if (this.Scene.isStarted) {
            this.Scene.restart();
        }
        else {
            this.Log.warn("Failed to execute 'Engine.restart': The scene has not started yet, please start the scene at least once before restart");
        }
    };
    NzymEngine.prototype.pause = function () {
        this.Runner.stop();
    };
    NzymEngine.prototype.resume = function () {
        if (this.Scene.isStarted) {
            if (!this.Runner.isRunning) {
                if (!this.Stage.isHidden) {
                    this.Time.start();
                    this.Runner.start();
                }
                else {
                    this.Log.warn('Failed to resume, the stage is hidden');
                }
            }
            else {
                this.Log.warn('The engine is already running');
            }
        }
        else {
            this.Log.warn('The scene has not started yet, nothing to resume');
        }
    };
    NzymEngine.prototype.run = function () {
        if (this.Scene.isStarted) {
            this.Time.update();
            this.Scene.update();
            if (this.OBJ.autoUpdate)
                this.OBJ.updateAll();
            this.Draw.clear();
            this.Scene.render();
            if (this.OBJ.autoRender)
                this.OBJ.renderAll();
            this.Scene.renderUI();
            this.Input.reset();
        }
        else {
            this.Log.warn("Failed to execute 'Engine.run': The scene has not started yet, please start the scene at least once before run");
        }
    };
    NzymEngine.prototype.makeGlobalAliases = function () {
        window['Common'] = Nzym.Common;
        window['Events'] = Nzym.Events;
        window['KeyCode'] = Nzym.KeyCode;
        window['Engine'] = this;
        window['Log'] = this.Log;
        window['OBJ'] = this.OBJ;
        window['Draw'] = this.Draw;
        window['Font'] = this.Draw.Font;
        window['Time'] = this.Time;
        window['Input'] = this.Input;
        window['Scene'] = this.Scene;
        window['Sound'] = this.Sound;
        window['Stage'] = this.Stage;
        window['Loader'] = this.Loader;
        window['C'] = Nzym.DrawConstants.C;
        window['Align'] = Nzym.DrawConstants.Align;
        window['LineCap'] = Nzym.DrawConstants.LineCap;
        window['LineJoin'] = Nzym.DrawConstants.LineJoin;
        window['LineDash'] = Nzym.DrawConstants.LineDash;
        window['Primitive'] = Nzym.DrawConstants.Primitive;
    };
    NzymEngine.prototype.getAliases = function () {
        return {
            Engine: this,
            Log: this.Log,
            OBJ: this.OBJ,
            Draw: this.Draw,
            Font: this.Draw.Font,
            Time: this.Time,
            Input: this.Input,
            Scene: this.Scene,
            Sound: this.Sound,
            Stage: this.Stage,
            Loader: this.Loader,
            // you can also get values below from Nzym.getAliases()
            C: Nzym.DrawConstants.C,
            Align: Nzym.DrawConstants.Align,
            Common: Nzym.Common,
            Events: Nzym.Events,
            KeyCode: Nzym.KeyCode,
            LineCap: Nzym.DrawConstants.LineCap,
            LineJoin: Nzym.DrawConstants.LineJoin,
            LineDash: Nzym.DrawConstants.LineDash,
            Primitive: Nzym.DrawConstants.Primitive
        };
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
        this.vvl = this.makeFont(128);
        this.vl = this.makeFont(96);
        this.xxl = this.makeFont(64);
        this.xl = this.makeFont(48);
        this.l = this.makeFont(32);
        this.ml = this.makeFont(24);
        this.m = this.makeFont(20);
        this.sm = this.makeFont(16);
        this.s = this.makeFont(12);
        this.xs = this.makeFont(8);
        this.vvlb = this.makeFont(this.vvl.size, this.bold);
        this.vlb = this.makeFont(this.vl.size, this.bold);
        this.xxlb = this.makeFont(this.xxl.size, this.bold);
        this.xlb = this.makeFont(this.xl.size, this.bold);
        this.lb = this.makeFont(this.l.size, this.bold);
        this.mlb = this.makeFont(this.ml.size, this.bold);
        this.mb = this.makeFont(this.m.size, this.bold);
        this.smb = this.makeFont(this.sm.size, this.bold);
        this.sb = this.makeFont(this.s.size, this.bold);
        this.xsb = this.makeFont(this.xs.size, this.bold);
        this.vvli = this.makeFont(this.vvl.size, this.italic);
        this.vli = this.makeFont(this.vl.size, this.italic);
        this.xxli = this.makeFont(this.xxl.size, this.italic);
        this.xli = this.makeFont(this.xl.size, this.italic);
        this.li = this.makeFont(this.l.size, this.italic);
        this.mli = this.makeFont(this.ml.size, this.italic);
        this.mi = this.makeFont(this.m.size, this.italic);
        this.smi = this.makeFont(this.sm.size, this.italic);
        this.si = this.makeFont(this.s.size, this.italic);
        this.xsi = this.makeFont(this.xs.size, this.italic);
        this.vvlbi = this.makeFont(this.vvl.size, this.boldItalic);
        this.vlbi = this.makeFont(this.vl.size, this.boldItalic);
        this.xxlbi = this.makeFont(this.xxl.size, this.boldItalic);
        this.xlbi = this.makeFont(this.xl.size, this.boldItalic);
        this.lbi = this.makeFont(this.l.size, this.boldItalic);
        this.mlbi = this.makeFont(this.ml.size, this.boldItalic);
        this.mbi = this.makeFont(this.m.size, this.boldItalic);
        this.smbi = this.makeFont(this.sm.size, this.boldItalic);
        this.sbi = this.makeFont(this.s.size, this.boldItalic);
        this.xsbi = this.makeFont(this.xs.size, this.boldItalic);
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
                    callbackFn(font, prop);
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
    NzymFont.prototype.isRegular = function (font) {
        return font.style === this.regular;
    };
    NzymFont.prototype.isBold = function (font) {
        return font.style.includes(this.bold);
    };
    NzymFont.prototype.isItalic = function (font) {
        return font.style.includes(this.italic);
    };
    NzymFont.prototype.isBoldItalic = function (font) {
        return font.style === this.boldItalic;
    };
    return NzymFont;
}());
/**
 * Input manager.
 */
var NzymInput = /** @class */ (function () {
    function NzymInput(engine, options) {
        if (options === void 0) { options = {}; }
        this.engine = engine;
        this.events = {};
        this.keys = {};
        this.keyCodes = [];
        this.preventedKeys = [];
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
        if (options.preventKey) {
            this.preventKey.apply(this, options.preventKey);
        }
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
    /**
     * Add keys that you want to prevent default
     * @param codes
     */
    NzymInput.prototype.preventKey = function () {
        var codes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            codes[_i] = arguments[_i];
        }
        for (var _a = 0, codes_1 = codes; _a < codes_1.length; _a++) {
            var code = codes_1[_a];
            if (this.preventedKeys.indexOf(code) < 0) {
                this.preventedKeys.push(code);
            }
        }
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
        if (this.engine.Runner.isRunning && this.preventedKeys.indexOf(e.code) >= 0) {
            e.preventDefault();
        }
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
var NzymLoader = /** @class */ (function () {
    function NzymLoader(engine) {
        this.engine = engine;
        this.events = {};
        this.isLoaded = false;
        this.list = {
            image: [],
            sound: []
        };
    }
    NzymLoader.prototype.getLoadAmount = function () {
        var amount = 0;
        for (var tag in this.list) {
            amount += this.list[tag].length;
        }
        return amount;
    };
    NzymLoader.prototype.getLoadedCount = function () {
        var count = 0;
        for (var tag in this.list) {
            for (var _i = 0, _a = this.list[tag]; _i < _a.length; _i++) {
                var data = _a[_i];
                if (data['isLoaded']) {
                    count++;
                }
            }
        }
        return count;
    };
    NzymLoader.prototype.getErrorCount = function () {
        var count = 0;
        for (var tag in this.list) {
            for (var _i = 0, _a = this.list[tag]; _i < _a.length; _i++) {
                var data = _a[_i];
                if (data['isError']) {
                    count++;
                }
            }
        }
        return count;
    };
    NzymLoader.prototype.getLoadProgress = function () {
        var n = this.getLoadAmount();
        return n < 1 ? 1 : this.getLoadedCount() / n;
    };
    NzymLoader.prototype.completeLoad = function () {
        this.isLoaded = true;
        Nzym.Events.trigger(this, 'loaded');
    };
    NzymLoader.prototype.onLoadEvent = function (data) {
        data['isLoaded'] = true;
        if (this.getLoadedCount() >= this.getLoadAmount()) {
            this.completeLoad();
        }
    };
    NzymLoader.prototype.onErrorEvent = function (data) {
        data['isError'] = true;
        if (data instanceof HTMLImageElement) {
            this.engine.Log.error("Failed to load source: \"" + data.src + "\" Make sure it's exists or, if you are working with local server, in some browser, you can't use \"C:Users/user/...\" It has to be relative to where your document exists, try add \"file:///C:Users/user/...\"");
        }
    };
    NzymLoader.prototype.loadImage = function (name, src) {
        var _this = this;
        if (src === undefined) {
            src = name;
            name = Nzym.Common.getFilenameFromPath(src).split('.')[0];
        }
        var img = new Image();
        img.addEventListener('load', function () { return _this.onLoadEvent(img); });
        img.addEventListener('error', function () { return _this.onErrorEvent(img); });
        img.src = src;
        this.list.image.push(img);
        this.engine.Draw.addImage(name, img);
        return img;
    };
    NzymLoader.prototype.loadSound = function (name) {
        var _this = this;
        var srcs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            srcs[_i - 1] = arguments[_i];
        }
        if (srcs.length === 0) {
            srcs = [name];
            name = Nzym.Common.getFilenameFromPath(name).split('.')[0];
        }
        var sources = [];
        for (var _a = 0, srcs_1 = srcs; _a < srcs_1.length; _a++) {
            var src = srcs_1[_a];
            var ext = src.split('.').pop();
            if (NzymSound.supportedExt.indexOf(ext) >= 0) {
                var type = ext;
                if (ext === 'mp3') {
                    type = 'mpeg';
                }
                sources.push("<source src=\"" + src + "\" type=\"audio/" + type + "\">");
            }
            else {
                this.engine.Log.warn("Sound file extension not supported: ." + ext);
            }
        }
        if (sources.length > 0) {
            var audio_1 = new Audio();
            audio_1.oncanplaythrough = function () {
                _this.onLoadEvent(audio_1);
                audio_1.oncanplaythrough = null;
            };
            audio_1.addEventListener('error', function () { return _this.onErrorEvent(audio_1); });
            audio_1.innerHTML = sources.join('');
            this.list.sound.push(audio_1);
            this.engine.Sound.addAudio(name, audio_1);
            return audio_1;
        }
        return null;
    };
    return NzymLoader;
}());
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var NzymLog = /** @class */ (function () {
    function NzymLog(name) {
        this.LOG_INFO = 0;
        this.LOG_WARN = 1;
        this.LOG_ERROR = 2;
        this.level = 2;
        this.preLog = '[Nzym-Log]:';
        if (name) {
            this.preLog = "[Nzym-" + name + "]:";
        }
    }
    NzymLog.prototype.setLevel = function (level) {
        this.level = level;
    };
    NzymLog.prototype.info = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        if (this.level >= this.LOG_INFO) {
            console.log.apply(console, __spreadArrays([this.preLog], data));
        }
    };
    NzymLog.prototype.warn = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        if (this.level >= this.LOG_WARN) {
            console.warn.apply(console, __spreadArrays([this.preLog], data));
        }
    };
    NzymLog.prototype.error = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        if (this.level >= this.LOG_ERROR) {
            console.error.apply(console, __spreadArrays([this.preLog], data));
        }
    };
    return NzymLog;
}());
Nzym.Log = new NzymLog('Main');
/**
 * Object manager.
 */
var NzymOBJ = /** @class */ (function () {
    function NzymOBJ(engine, options) {
        if (options === void 0) { options = {}; }
        this.engine = engine;
        this.list = [];
        this.tags = [];
        this.autoClear = true;
        this.autoUpdate = true;
        this.autoRender = true;
        if (options.autoClear === false)
            this.autoClear = false;
        if (options.autoUpdate === false)
            this.autoUpdate = false;
        if (options.autoRender === false)
            this.autoRender = false;
    }
    NzymOBJ.prototype.init = function () {
        var _this = this;
        Nzym.Events.on(this.engine.Scene, 'beforestart', function () {
            if (_this.autoClear) {
                _this.clearAll();
            }
        });
    };
    NzymOBJ.prototype.addTag = function () {
        var tags = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tags[_i] = arguments[_i];
        }
        for (var _a = 0, tags_1 = tags; _a < tags_1.length; _a++) {
            var tag = tags_1[_a];
            this.list.push([]);
            this.tags.push(tag);
        }
    };
    NzymOBJ.prototype.removeTag = function () {
        var tags = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tags[_i] = arguments[_i];
        }
        for (var _a = 0, tags_2 = tags; _a < tags_2.length; _a++) {
            var tag = tags_2[_a];
            var i = this.getTagIndex(tag);
            if (i > -1) {
                this.list[i].length = 0;
                this.list.splice(i, 1);
                this.tags.splice(i, 1);
            }
        }
    };
    NzymOBJ.prototype.addTagByObject = function (tagObject) {
        var values = [];
        for (var key in tagObject) {
            values.push(tagObject[key]);
        }
        this.addTag.apply(this, values);
    };
    NzymOBJ.prototype.getTagIndex = function (tag) {
        return this.tags.indexOf(tag);
    };
    NzymOBJ.prototype.getList = function (tag) {
        return this.list[this.getTagIndex(tag)];
    };
    NzymOBJ.prototype.getListSorted = function (tag) {
        var sortedList = [];
        for (var _i = 0, _a = this.getList(tag); _i < _a.length; _i++) {
            var n = _a[_i];
            if (n.render) {
                sortedList.push(n);
            }
        }
        sortedList.sort(function (a, b) { return b.depth - a.depth; });
    };
    /**
     * Returns single array that contains all instances from all lists sorted by depth
     */
    NzymOBJ.prototype.getListSortedAll = function (conditionFn) {
        if (conditionFn === void 0) { conditionFn = function () { return false; }; }
        var sortedList = [];
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var list = _a[_i];
            for (var _b = 0, list_1 = list; _b < list_1.length; _b++) {
                var n = list_1[_b];
                if (conditionFn(n)) {
                    sortedList.push(n);
                }
            }
        }
        sortedList.sort(function (a, b) { return b.depth - a.depth; });
        return sortedList;
    };
    /**
     * Get a list or concatenated list of multiple tags.
     */
    NzymOBJ.prototype.take = function () {
        var tags = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tags[_i] = arguments[_i];
        }
        var list = [];
        for (var _a = 0, tags_3 = tags; _a < tags_3.length; _a++) {
            var tag = tags_3[_a];
            list = list.concat(this.getList(tag) || []);
        }
        return list;
    };
    NzymOBJ.prototype.takeAll = function () {
        var allList = [];
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var list = _a[_i];
            for (var _b = 0, list_2 = list; _b < list_2.length; _b++) {
                var n = list_2[_b];
                allList.push(n);
            }
        }
        return allList;
    };
    NzymOBJ.prototype.count = function (tag) {
        return this.getList(tag).length;
    };
    NzymOBJ.prototype.countAll = function () {
        var count = 0;
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var list = _a[_i];
            count += list.length;
        }
        return count;
    };
    NzymOBJ.prototype.push = function (tag, instance) {
        var list = this.getList(tag);
        if (list) {
            list.push(instance);
        }
        else {
            this.engine.Log.error("'OBJ.push' Tag not found: " + tag + ", failed to push instance");
            return null;
        }
        return instance;
    };
    /**
     * Remove one or more instance from list tagged `tag` that met specified condition.
     * Specifiy condition in `conditionFn`, condition met means if it's returns true.
     * @param tag {string} tag to check
     * @param conditionFn {Function} takes instance to check
     * @returns list of removed instances
     */
    NzymOBJ.prototype.remove = function (tag, conditionFn) {
        var removedList = [];
        var list = this.getList(tag);
        for (var i = list.length - 1; i >= 0; i--) {
            if (conditionFn(list[i], i)) {
                removedList.push(list.splice(i, 1)[0]);
            }
        }
        return removedList;
    };
    NzymOBJ.prototype.removeById = function (tag, id) {
        return this.remove(tag, function (n) { return n.id === id; });
    };
    NzymOBJ.prototype.clear = function (tag) {
        var list = this.getList(tag);
        if (list) {
            list.length = 0;
        }
    };
    NzymOBJ.prototype.clearAll = function () {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var list = _a[_i];
            list.length = 0;
        }
    };
    NzymOBJ.prototype.update = function (tag) {
        var list = this.getList(tag);
        if (list) {
            for (var _i = 0, list_3 = list; _i < list_3.length; _i++) {
                var n = list_3[_i];
                if (n.update) {
                    n.update();
                }
            }
        }
        else {
            this.engine.Log.error("'OBJ.update' Tag not found: " + tag + ", failed to update");
        }
    };
    /**
     * Render list of tag sorted by `depth` value on each instance
     * @param tag
     */
    NzymOBJ.prototype.render = function (tag) {
        var list = this.getList(tag);
        if (list) {
            var sortedList = [];
            for (var _i = 0, list_4 = list; _i < list_4.length; _i++) {
                var n = list_4[_i];
                if (n.render) {
                    sortedList.push(n);
                }
            }
            sortedList.sort(function (a, b) { return b.depth - a.depth; });
            for (var _a = 0, sortedList_1 = sortedList; _a < sortedList_1.length; _a++) {
                var n = sortedList_1[_a];
                n.render();
            }
        }
        else {
            this.engine.Log.error("'OBJ.render' Tag not found: " + tag + ", failed to render");
        }
    };
    NzymOBJ.prototype.renderUnsorted = function (tag) {
        var list = this.getList(tag);
        if (list) {
            for (var _i = 0, list_5 = list; _i < list_5.length; _i++) {
                var n = list_5[_i];
                if (n.render) {
                    n.render();
                }
            }
        }
        else {
            this.engine.Log.error("'OBJ.renderUnsorted' Tag not found: " + tag + ", failed to renderUnsorted");
        }
    };
    NzymOBJ.prototype.updateAll = function () {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var list = _a[_i];
            for (var _b = 0, list_6 = list; _b < list_6.length; _b++) {
                var n = list_6[_b];
                if (n.update) {
                    n.update();
                }
            }
        }
    };
    NzymOBJ.prototype.renderAll = function () {
        var sortedList = [];
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var list = _a[_i];
            for (var _b = 0, list_7 = list; _b < list_7.length; _b++) {
                var n = list_7[_b];
                if (n.render) {
                    sortedList.push(n);
                }
            }
        }
        sortedList.sort(function (a, b) { return b.depth - a.depth; });
        for (var _c = 0, sortedList_2 = sortedList; _c < sortedList_2.length; _c++) {
            var n = sortedList_2[_c];
            n.render();
        }
    };
    NzymOBJ.prototype.renderAllUnsorted = function () {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var list = _a[_i];
            for (var _b = 0, list_8 = list; _b < list_8.length; _b++) {
                var n = list_8[_b];
                if (n.render) {
                    n.render();
                }
            }
        }
    };
    return NzymOBJ;
}());
var NzymParticle = /** @class */ (function () {
    /**
     *
     * @param engine
     * @param tag
     * @param life
     * @param x
     * @param y
     * @param speed start speed
     * @param speedInc speed increment
     * @param direction start direction
     * @param directionInc direction increment
     * @param size start size
     * @param sizeEndScalar end size in the scale of 1 as start size
     * @param color
     * @param fadeOutStop start of fade out (in range 0-1, 1 = fade out from start, 0.5 = fade out at half of life, 0 = no fade out)
     */
    function NzymParticle(engine, tag, life, x, y, speed, speedInc, direction, directionInc, size, sizeEndScalar, color, fadeOutStop, gravity, friction) {
        if (gravity === void 0) { gravity = 0; }
        if (friction === void 0) { friction = 1; }
        this.engine = engine;
        this.tag = tag;
        this.life = life;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.speedInc = speedInc;
        this.direction = direction;
        this.directionInc = directionInc;
        this.size = size;
        this.sizeEndScalar = sizeEndScalar;
        this.color = color;
        this.fadeOutStop = fadeOutStop;
        this.gravity = gravity;
        this.friction = friction;
        this.id = NzymParticle.ID++;
        this.depth = 0;
        this.startLife = Math.max(1, this.life);
        this.vx = Math.cos(this.direction) * this.speed;
        this.vy = Math.sin(this.direction) * this.speed;
    }
    NzymParticle.prototype.update = function () {
        if (this.life <= 0) {
            this.engine.OBJ.removeById(this.tag, this.id);
            return;
        }
        this.life -= this.engine.Time.clampedDeltaTime;
        this.speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        this.direction = Math.atan2(this.vy, this.vx);
        this.speed += this.speedInc;
        this.direction += this.directionInc;
        this.vx = Math.cos(this.direction) * this.speed;
        this.vy = Math.sin(this.direction) * this.speed;
        this.vy += this.gravity;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.x += this.vx;
        this.y += this.vy;
    };
    NzymParticle.prototype.render = function () {
        var lifeScaled = Math.max(0, this.life) / this.startLife; // 1 -> 0
        this.engine.Draw.setFill(this.color);
        if (this.fadeOutStop > 0) {
            this.engine.Draw.setAlpha(Math.min(1, lifeScaled / this.fadeOutStop));
        }
        this.engine.Draw.circle(this.x, this.y, Math.max(0, this.size + (1 - lifeScaled) * ((this.sizeEndScalar * this.size) - this.size)) / 2);
        this.engine.Draw.setAlpha(1);
    };
    NzymParticle.ID = 0;
    return NzymParticle;
}());
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
var NzymScene = /** @class */ (function () {
    function NzymScene(engine) {
        this.engine = engine;
        this.events = {};
        this.isStarted = false;
    }
    NzymScene.prototype.setup = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (options.scenes) {
            if (options.scenes.boot)
                Nzym.Events.on(this, 'boot', options.scenes.boot);
            if (options.scenes.loaded)
                Nzym.Events.on(this.engine.Loader, 'loaded', options.scenes.loaded);
            if (options.scenes.start)
                Nzym.Events.on(this, 'start', options.scenes.start);
            if (options.scenes.update)
                Nzym.Events.on(this, 'update', options.scenes.update);
            if (options.scenes.render)
                Nzym.Events.on(this, 'render', options.scenes.render);
            if (options.scenes.renderUI)
                Nzym.Events.on(this, 'renderUI', options.scenes.renderUI);
            if (options.scenes.onLoad) {
                if (options.scenes.onLoad.start)
                    Nzym.Events.on(this, 'loadstart', options.scenes.onLoad.start);
                if (options.scenes.onLoad.update)
                    Nzym.Events.on(this, 'loadupdate', options.scenes.onLoad.update);
                if (options.scenes.onLoad.render)
                    Nzym.Events.on(this, 'loadrender', options.scenes.onLoad.render);
                if (options.scenes.onLoad.renderUI)
                    Nzym.Events.on(this, 'loadrenderUI', options.scenes.onLoad.renderUI);
            }
        }
        if (options.onBoot)
            Nzym.Events.on(this, 'boot', options.onBoot);
        if (options.onLoaded)
            Nzym.Events.on(this.engine.Loader, 'loaded', options.onLoaded);
        if (options.onStart)
            Nzym.Events.on(this, 'start', options.onStart);
        if (options.onUpdate)
            Nzym.Events.on(this, 'update', options.onUpdate);
        if (options.onRender)
            Nzym.Events.on(this, 'render', options.onRender);
        if (options.onRenderUI)
            Nzym.Events.on(this, 'renderUI', options.onRenderUI);
        if (options.onLoadStart)
            Nzym.Events.on(this, 'loadstart', options.onLoadStart);
        if (options.onLoadUpdate)
            Nzym.Events.on(this, 'loadupdate', options.onLoadUpdate);
        if (options.onLoadRender)
            Nzym.Events.on(this, 'loadrender', options.onLoadRender);
        if (options.onLoadRenderUI)
            Nzym.Events.on(this, 'loadrenderUI', options.onLoadRenderUI);
        Nzym.Events.on(this.engine.Loader, 'loaded', function () {
            _this.start();
        });
    };
    NzymScene.prototype.boot = function () {
        if (!this.isStarted) {
            Nzym.Events.trigger(this, 'boot');
            if (this.engine.Loader.getLoadAmount() < 1) {
                this.engine.Loader.completeLoad();
            }
            this.isStarted = true;
        }
    };
    NzymScene.prototype.restart = function () {
        this.start();
    };
    NzymScene.prototype.start = function () {
        if (!this.isStarted) {
            this.isStarted = true;
        }
        if (!this.engine.Loader.isLoaded) {
            Nzym.Events.trigger(this, 'loadstart');
        }
        else {
            Nzym.Events.trigger(this, 'beforestart');
            Nzym.Events.trigger(this, 'start');
        }
    };
    NzymScene.prototype.update = function () {
        if (!this.engine.Loader.isLoaded) {
            Nzym.Events.trigger(this, 'loadupdate');
        }
        else {
            Nzym.Events.trigger(this, 'update');
        }
    };
    NzymScene.prototype.render = function () {
        if (!this.engine.Loader.isLoaded) {
            Nzym.Events.trigger(this, 'loadrender');
        }
        else {
            Nzym.Events.trigger(this, 'render');
        }
    };
    NzymScene.prototype.renderUI = function () {
        if (!this.engine.Loader.isLoaded) {
            Nzym.Events.trigger(this, 'loadrenderUI');
        }
        else {
            Nzym.Events.trigger(this, 'renderUI');
        }
    };
    return NzymScene;
}());
var NzymSound = /** @class */ (function () {
    function NzymSound(engine) {
        this.engine = engine;
        this.audios = {};
    }
    NzymSound.prototype.addAudio = function (name, audio) {
        this.audios[name] = audio;
    };
    NzymSound.prototype.getAudio = function (name) {
        return this.audios[name];
    };
    /**
     * Play audio from beginning
     * @param name
     */
    NzymSound.prototype.play = function (name) {
        this.audios[name].currentTime = 0;
        this.audios[name].play();
    };
    /**
     * Start loop if not playing
     * @param name
     */
    NzymSound.prototype.loop = function (name) {
        if (!this.isPlaying(name)) {
            this.startLoop(name);
        }
    };
    /**
     * Pause audio and reset playback time
     * @param name
     */
    NzymSound.prototype.stop = function (name) {
        this.stopLoop(name);
    };
    /**
     * Pause audio
     * @param name
     */
    NzymSound.prototype.pause = function (name) {
        this.audios[name].pause();
    };
    /**
     * Play audio from current playback time
     * If playback time is finished, this will play from beginning
     * @param name
     */
    NzymSound.prototype.resume = function (name) {
        this.audios[name].play();
    };
    /**
     * Set audio loop to `true` then play from beginning
     * @param name
     */
    NzymSound.prototype.startLoop = function (name) {
        this.audios[name].loop = true;
        this.play(name);
    };
    /**
     * Pause audio and reset playback time
     * @param name
     */
    NzymSound.prototype.stopLoop = function (name) {
        this.audios[name].pause();
        this.audios[name].loop = false;
        this.audios[name].currentTime = 0;
    };
    /**
     * Returns true if audio is not paused
     * @param name
     */
    NzymSound.prototype.isPlaying = function (name) {
        return !this.audios[name].paused;
    };
    /**
     * Play audio one at a time
     * @param name
     */
    NzymSound.prototype.playAtOnce = function (name) {
        if (!this.isPlaying(name)) {
            this.play(name);
        }
    };
    NzymSound.prototype.setVolume = function (name, value) {
        this.audios[name].volume = Nzym.Common.clamp(value, 0, 1);
    };
    NzymSound.prototype.getVolume = function (name) {
        return this.audios[name].volume;
    };
    NzymSound.prototype.getDuration = function (name) {
        return this.audios[name].duration;
    };
    NzymSound.prototype.getCurrentTime = function (name) {
        return this.audios[name].currentTime;
    };
    NzymSound.prototype.getPlaybackTime = function (name) {
        return this.audios[name].currentTime / this.audios[name].duration;
    };
    NzymSound.prototype.stopAll = function () {
        for (var name_1 in this.audios) {
            this.stop(name_1);
        }
    };
    NzymSound.supportedExt = ['ogg', 'mp3', 'wav'];
    return NzymSound;
}());
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
        if (options.preventContextMenu) {
            this.preventContextMenu();
        }
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
        if (this.canvas.getContext('2d').resetTransform) {
            this.canvas.getContext('2d').resetTransform();
        }
        this.canvas.getContext('2d').scale(this.pixelRatio, this.pixelRatio);
    };
    NzymStage.prototype.onContextMenu = function (e) {
        e.preventDefault();
    };
    NzymStage.prototype.allowContextMenu = function () {
        this.canvas.removeEventListener('contextmenu', this.onContextMenu);
    };
    NzymStage.prototype.preventContextMenu = function () {
        this.canvas.addEventListener('contextmenu', this.onContextMenu);
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
        this.canvas.style.display = 'block';
    };
    Object.defineProperty(NzymStage.prototype, "isHidden", {
        get: function () {
            return this.canvas.style.display === 'none';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NzymStage.prototype, "bgColor", {
        get: function () {
            return this.canvas.style.backgroundColor;
        },
        set: function (value) {
            this.canvas.style.backgroundImage = '';
            this.canvas.style.backgroundColor = value;
        },
        enumerable: false,
        configurable: true
    });
    NzymStage.prototype.insideStage = function (x, y) {
        return x >= 0 && x < this.w && y >= 0 && y < this.h;
    };
    return NzymStage;
}());
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
