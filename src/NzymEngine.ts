/**
 * Initializes and runs all Nzym modules.
 */
class NzymEngine {

    name = '';

    Log: NzymLog;
    OBJ: NzymOBJ;
    Draw: NzymDraw;
    Time: NzymTime;
    Input: NzymInput;
    Scene: NzymScene;
    Stage: NzymStage;
    Loader: NzymLoader;
    Runner: NzymRunner;

    /**
     * Set `options.canvas` to the target canvas element.
     * Or else the engine will create a default canvas with default width and height.
     * Setting `options.w` and `options.h` will set the size of the engine default canvas.
     * `options.parent` is the parent element of the engine default canvas (default parent is `body` element.)
     * @param options 
     */
    constructor(options: NzymEngineOptions = {}) {

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

    start() {
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
    }

    run() {
        // if (this.Scene.isStarted) {
            this.Time.update();
            this.Scene.update();
            if (this.OBJ.autoUpdate) this.OBJ.updateAll();
            this.Draw.clear();
            this.Scene.render();
            if (this.OBJ.autoRender) this.OBJ.renderAll();
            this.Scene.renderUI();
            this.Input.reset();
        // }
        // else {
        //     this.Log.warn(`Failed to execute 'Engine.run': The scene has not started yet, please start the scene at least once before run`);
        // }
    }

    makeGlobalAliases() {
        window['Common']  = Nzym.Common;
        window['Events']  = Nzym.Events;
        window['KeyCode'] = Nzym.KeyCode;

        window['Engine'] = this;
        window['OBJ']    = this.OBJ;
        window['Draw']   = this.Draw;
        window['Font']   = this.Draw.Font;
        window['Time']   = this.Time;
        window['Input']  = this.Input;
        window['Scene']  = this.Scene;
        window['Stage']  = this.Stage;
        window['Loader'] = this.Loader;

        window['C']         = Nzym.DrawConstants.C;
        window['Align']     = Nzym.DrawConstants.Align;
        window['LineCap']   = Nzym.DrawConstants.LineCap;
        window['LineJoin']  = Nzym.DrawConstants.LineJoin;
        window['LineDash']  = Nzym.DrawConstants.LineDash;
        window['Primitive'] = Nzym.DrawConstants.Primitive;
    }

    getAliases() {
        return {
            Engine: this,
            OBJ: this.OBJ,
            Draw: this.Draw,
            Font: this.Draw.Font,
            Time: this.Time,
            Input: this.Input,
            Scene: this.Scene,
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
    }
}