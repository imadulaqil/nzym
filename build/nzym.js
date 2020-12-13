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
        default: 'round'
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
    window['Engine'] = Engine;
    window['Draw'] = Engine.Draw;
    window['Font'] = Engine.Draw.Font;
    window['Stage'] = Engine.Stage;
    window['Align'] = Nzym.DrawConstants.Align;
    window['LineCap'] = Nzym.DrawConstants.LineCap;
    window['LineJoin'] = Nzym.DrawConstants.LineJoin;
    window['LineDash'] = Nzym.DrawConstants.LineDash;
    window['Primitive'] = Nzym.DrawConstants.Primitive;
    // Start the engine
    Engine.start();
};
/**
 * Draw methods.
 */
var NzymDraw = /** @class */ (function () {
    function NzymDraw(engine) {
        this.engine = engine;
        this.Font = new NzymFont();
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
        this.isRestarting = false;
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
        this.isRestarting = true;
        this.start();
    };
    NzymScene.prototype.start = function () {
        Nzym.Events.trigger(this, 'start');
    };
    NzymScene.prototype.update = function () {
        if (!this.isRestarting) {
            Nzym.Events.trigger(this, 'update');
        }
    };
    NzymScene.prototype.render = function () {
        if (!this.isRestarting) {
            Nzym.Events.trigger(this, 'render');
        }
    };
    NzymScene.prototype.renderUI = function () {
        if (!this.isRestarting) {
            Nzym.Events.trigger(this, 'renderui');
        }
        this.isRestarting = false;
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
    return NzymStage;
}());
