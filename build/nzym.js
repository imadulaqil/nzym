var Nzym = Nzym || {};
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
var Nzym = Nzym || {};
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
var Nzym = Nzym || {};
var NzymDraw = /** @class */ (function () {
    function NzymDraw(engine) {
        this.engine = engine;
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
    NzymDraw.prototype.text = function (x, y, text) {
        this.ctx.fillText(text, x, y);
    };
    NzymDraw.prototype.clear = function () {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    };
    return NzymDraw;
}());
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
    return NzymEngine;
}());
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
