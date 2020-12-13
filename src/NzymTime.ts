class NzymTime {

    FPS = 60;
    time = 0;
    startTime = window.performance.now();
    deltaTime = 0;
    runningTime = 0;
    frameCount = 0;
    clampedDeltaTime = 0;
    unscaledDeltaTime = 0;

    constructor(
        public engine: NzymEngine
    ) {}

    start(t=window.performance.now()) {
        this.time = t - this.startTime;
    }

    update(t=window.performance.now()) {
        this.unscaledDeltaTime = t - this.time - this.startTime;
        this.deltaTime = this.unscaledDeltaTime * 0.06;
        this.clampedDeltaTime = Math.min(2, this.deltaTime);
        this.time = t - this.startTime;
        if (this.engine.Runner.isRunning) {
            this.runningTime += this.unscaledDeltaTime;
        }
        this.frameCount++;
        if (this.frameCount % 20 === 0) {
            this.FPS = Math.floor(this.deltaTime * 60);
        }
    }
}