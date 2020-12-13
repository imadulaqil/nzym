class NzymRunner {

    public isRunning: boolean = false;

    constructor(
        public engine: NzymEngine
    ) {}

    start() {
        this.isRunning = true;
        this.loop();
    }
    
    stop() {
        this.isRunning = false;
    }

    loop() {
        this.engine.run();
        if (this.isRunning) {
            window.requestAnimationFrame(() => this.loop());
        }
    }

} 