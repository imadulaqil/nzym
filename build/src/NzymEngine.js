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
        // Get OBJ options
        var OBJOptions = {};
        for (var _i = 0, _a = ['autoClear', 'autoUpdate', 'autoRender']; _i < _a.length; _i++) {
            var prop = _a[_i];
            if (options[prop]) {
                OBJOptions[prop] = options[prop];
            }
        }
        // Get scene options
        var sceneOptions = {};
        for (var _b = 0, _c = ['scenes', 'onStart', 'onUpdate', 'onRender', 'onRenderUI']; _b < _c.length; _b++) {
            var prop = _c[_b];
            if (options[prop]) {
                sceneOptions[prop] = options[prop];
            }
        }
        // Get Stage options
        var stageOptions = {};
        for (var _d = 0, _e = ['w', 'h', 'canvas', 'parent', 'bgColor', 'pixelRatio']; _d < _e.length; _d++) {
            var prop = _e[_d];
            if (options[prop]) {
                stageOptions[prop] = options[prop];
            }
        }
        // Instantiate all modules
        this.OBJ = new NzymOBJ(this, OBJOptions);
        this.Draw = new NzymDraw(this);
        this.Time = new NzymTime(this);
        this.Input = new NzymInput(this);
        this.Scene = new NzymScene(this, sceneOptions);
        this.Stage = new NzymStage(this, stageOptions);
        this.Runner = new NzymRunner(this);
        this.OBJ.init();
        this.Draw.init();
        this.Input.init();
        this.stop();
        this.makeGlobalAliases();
        if (options.scenes) {
            if (options.scenes['init'])
                options.scenes['init'].call(this);
        }
        if (options.onInit)
            options.onInit.call(this);
        if (options.autoStart) {
            // Start the engine
            this.start();
        }
    }
    NzymEngine.prototype.start = function () {
        if (!this.Runner.isRunning) {
            this.Time.start();
            this.Stage.show();
            this.Scene.start();
            this.Runner.start();
        }
        else {
            Nzym.Common.LogWarn('The engine is already running');
        }
    };
    NzymEngine.prototype.stop = function () {
        this.Stage.hide();
        this.Runner.stop();
    };
    NzymEngine.prototype.restart = function () {
        this.Scene.restart();
    };
    NzymEngine.prototype.pause = function () {
        this.Runner.stop();
    };
    NzymEngine.prototype.resume = function () {
        if (this.Scene.isStarted) {
            if (!this.Runner.isRunning) {
                this.Time.start();
                this.Runner.start();
            }
            else {
                Nzym.Common.LogWarn('The engine is already running');
            }
        }
        else {
            Nzym.Common.LogWarn('The scene has not started yet, nothing to resume');
        }
    };
    NzymEngine.prototype.run = function () {
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
    };
    NzymEngine.prototype.makeGlobalAliases = function () {
        window['Common'] = Nzym.Common;
        window['Events'] = Nzym.Events;
        window['KeyCode'] = Nzym.KeyCode;
        window['Engine'] = this;
        window['OBJ'] = this.OBJ;
        window['Draw'] = this.Draw;
        window['Font'] = this.Draw.Font;
        window['Time'] = this.Time;
        window['Input'] = this.Input;
        window['Scene'] = this.Scene;
        window['Stage'] = this.Stage;
        window['C'] = Nzym.DrawConstants.C;
        window['Align'] = Nzym.DrawConstants.Align;
        window['LineCap'] = Nzym.DrawConstants.LineCap;
        window['LineJoin'] = Nzym.DrawConstants.LineJoin;
        window['LineDash'] = Nzym.DrawConstants.LineDash;
        window['Primitive'] = Nzym.DrawConstants.Primitive;
    };
    return NzymEngine;
}());
