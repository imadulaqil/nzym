/**
 * Initializes and runs all Nzym modules.
 */
class NzymEngine {

    OBJ: NzymOBJ;
    Draw: NzymDraw;
    Time: NzymTime;
    Input: NzymInput;
    Scene: NzymScene;
    Stage: NzymStage;
    Runner: NzymRunner;

    /**
     * Set `options.canvas` to the target canvas element.
     * Or else the engine will create a default canvas with default width and height.
     * Setting `options.w` and `options.h` will set the size of the engine default canvas.
     * `options.parent` is the parent element of the engine default canvas (default parent is `body` element.)
     * @param options 
     */
    constructor(
        public options: {
            w?: number,
            h?: number,
            canvas?: HTMLCanvasElement,
            parent?: HTMLElement,
            bgColor?: string,
            pixelRatio?: number,
            autoClear?: boolean,
            autoUpdate?: boolean,
            autoRender?: boolean
        } = {}
    ) {
        if (!options.canvas) {
            // Create the default canvas
            options.canvas = document.createElement('canvas');

            if (options.w && options.h) {
                // Both `w` and `h` have to be exists to set the canvas size
                options.canvas.style.width = `${options.w}px`;
                options.canvas.style.height = `${options.h}px`;
            }
            else {
                // Otherwise set to default
                options.canvas.style.width = '800px';
                options.canvas.style.height = '600px';
            }
            if (options.bgColor) {
                // Set style background color if provided
                options.canvas.style.backgroundColor = options.bgColor;
            }
            else {
                // Otherwise make a nice little gradient as the background
                options.canvas.style.backgroundImage = 'radial-gradient(white 33%, mintcream)';
            }
            if (options.parent) {
                options.parent.appendChild(options.canvas);
            }
            else {
                document.body.appendChild(options.canvas);
            }
        }

        // Instantiate all modules
        this.OBJ = new NzymOBJ(this);
        this.Draw = new NzymDraw(this);
        this.Time = new NzymTime(this);
        this.Input = new NzymInput(this);
        this.Scene = new NzymScene(this);
        this.Stage = new NzymStage(this, options.canvas, options.pixelRatio);
        this.Runner = new NzymRunner(this);

        if (options.autoClear === false) {
            this.OBJ.autoClear = false;
        }

        if (options.autoUpdate === false) {
            this.OBJ.autoUpdate = false;
        }

        if (options.autoRender === false) {
            this.OBJ.autoRender = false;
        }

        Nzym.Events.on(this.Scene, 'beforestart', () => {
            if (this.OBJ.autoClear) {
                this.OBJ.clearAll();
            }
        });

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
        if (this.OBJ.autoUpdate) this.OBJ.updateAll();
        this.Draw.clear();
        this.Scene.render();
        if (this.OBJ.autoRender) this.OBJ.renderAll();
        this.Scene.renderUI();
        this.Input.reset();
    }

    makeGlobalAliases() {
        window['Common']  = Nzym.Common;
        window['Events']  = Nzym.Events;
        window['KeyCode'] = Nzym.KeyCode;

        window['Engine'] = this;
        window['OBJ'] = this.OBJ;
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