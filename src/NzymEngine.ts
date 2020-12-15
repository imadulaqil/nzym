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
        options: {
            w?: number,
            h?: number,
            canvas?: HTMLCanvasElement,
            parent?: HTMLElement,
            bgColor?: string,
            pixelRatio?: number,
            autoStart?: boolean,
            autoClear?: boolean,
            autoUpdate?: boolean,
            autoRender?: boolean,
            scenes?: Function[],
            onInit?: Function,
            onStart?: Function,
            onUpdate?: Function,
            onRender?: Function,
            onRenderUI?: Function
        } = {}
    ) {

        // Get OBJ options
        const OBJOptions = {};
        for (const prop of ['autoClear', 'autoUpdate', 'autoRender']) {
            if (options[prop]) {
                OBJOptions[prop] = options[prop];
            }
        }

        // Get scene options
        const sceneOptions = {};
        for (const prop of ['scenes', 'onStart', 'onUpdate', 'onRender', 'onRenderUI']) {
            if (options[prop]) {
                sceneOptions[prop] = options[prop];
            }
        }

        // Get Stage options
        const stageOptions = {};
        for (const prop of ['w', 'h', 'canvas', 'parent', 'bgColor', 'pixelRatio']) {
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
            if (options.scenes['init']) options.scenes['init'].call(this);
        }
        if (options.onInit) options.onInit.call(this);

        if (options.autoStart) {
            // Start the engine
            this.start();
        }
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