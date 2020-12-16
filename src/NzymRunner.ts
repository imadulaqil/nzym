/**
 * Built-in runner to loop engine run.
 */
class NzymRunner {

    isRunning = false;
    loopHandle = 0;

    constructor(
        public engine: NzymEngine
    ) {}

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.run();
        }
    }
    
    stop() {
        this.isRunning = false;
        window.cancelAnimationFrame(this.loopHandle);
    }

    run() {
        this.loopHandle = window.requestAnimationFrame(() => this.loop());
    }

    loop() {
        this.engine.run();
        if (this.isRunning) {
            this.run();
        }
    }
}