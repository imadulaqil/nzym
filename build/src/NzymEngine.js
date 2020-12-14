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
        this.Time = new NzymTime(this);
        this.Input = new NzymInput(this);
        this.Scene = new NzymScene(this);
        this.Stage = new NzymStage(this, options.canvas, options.pixelRatio);
        this.Runner = new NzymRunner(this);
        this.Draw.init();
        this.Input.init();
        this.stop();
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
        this.Draw.clear();
        this.Scene.render();
        this.Scene.renderUI();
        this.Input.reset();
    };
    NzymEngine.prototype.makeGlobalAliases = function () {
        window['Common'] = Nzym.Common;
        window['Events'] = Nzym.Events;
        window['KeyCode'] = Nzym.KeyCode;
        window['Engine'] = this;
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
