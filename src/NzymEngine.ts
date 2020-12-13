/**
 * Initializes and runs all Nzym modules.
 */
class NzymEngine {

    Draw: NzymDraw;
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
        this.Input = new NzymInput(this);
        this.Scene = new NzymScene(this);
        this.Stage = new NzymStage(this, options.canvas, options.pixelRatio);
        this.Runner = new NzymRunner(this);

        this.Draw.init();
        this.Input.init();
    }

    start() {
        this.Scene.start();
        this.Runner.start();
    }

    run() {
        this.Scene.update();
        this.Draw.clear();
        this.Scene.render();
        this.Scene.renderUI();
        this.Input.reset();
    }
}