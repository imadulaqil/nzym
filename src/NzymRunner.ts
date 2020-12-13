class NzymRunner {

    public isRunning: boolean = false;

    constructor(
        public engine: NzymEngine
    ) {}

    start() {
        this.isRunning = true;
        this.run();
    }
    
    stop() {
        this.isRunning = false;
    }

    run() {
        this.engine.Scene.update();
        this.engine.Draw.clear();
        this.engine.Scene.render();
        this.engine.Scene.renderUI();
        if (this.isRunning) {
            window.requestAnimationFrame(() => this.run());
        }
    }

}