/**
 * Initializes and runs all Nzym modules.
 */
class NzymEngine {

    Draw: NzymDraw;
    Time: NzymTime;
    Input: NzymInput;
    Scene: NzymScene;
    Stage: NzymStage;
    Runner: NzymRunner;

    constructor(
        public options: {
            canvas?: HTMLCanvasElement,
            pixelRatio?: number
        } = {}
    ) {
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

    start() {
        if (!this.Runner.isRunning) {
            this.Time.start();
            this.Stage.show();
            this.Scene.start();
            this.Runner.start();
        }
        else {
            Nzym.Common.LogWarn('The engine is already running');
        }
    }
    
    stop() {
        this.Stage.hide();
        this.Runner.stop();
    }

    restart() {
        this.Scene.restart();
    }
    
    pause() {
        this.Runner.stop();
    }

    resume() {
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
    }

    run() {
        this.Time.update();
        this.Scene.update();
        this.Draw.clear();
        this.Scene.render();
        this.Scene.renderUI();
        this.Input.reset();
    }

    makeGlobalAliases() {
        window['Common']  = Nzym.Common;
        window['Events']  = Nzym.Events;
        window['KeyCode'] = Nzym.KeyCode;

        window['Engine'] = this;
        window['Draw']   = this.Draw;
        window['Font']   = this.Draw.Font;
        window['Time']   = this.Time;
        window['Input']  = this.Input;
        window['Scene']  = this.Scene;
        window['Stage']  = this.Stage;

        window['C']         = Nzym.DrawConstants.C;
        window['Align']     = Nzym.DrawConstants.Align;
        window['LineCap']   = Nzym.DrawConstants.LineCap;
        window['LineJoin']  = Nzym.DrawConstants.LineJoin;
        window['LineDash']  = Nzym.DrawConstants.LineDash;
        window['Primitive'] = Nzym.DrawConstants.Primitive;
    }
}