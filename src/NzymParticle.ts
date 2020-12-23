class NzymParticle {

    static ID = 0;

    id: number = NzymParticle.ID++;
    depth: number = 0;
    vx: number;
    vy: number;
    startLife: number;

    /**
     * 
     * @param engine 
     * @param tag 
     * @param life 
     * @param x 
     * @param y 
     * @param speed start speed
     * @param speedInc speed increment
     * @param direction start direction
     * @param directionInc direction increment
     * @param size start size
     * @param sizeEnd end size
     * @param color 
     * @param fadeOutStop start of fade out (in range 0-1, 1 = fade out from start, 0.5 = fade out at half of life, 0 = no fade out)
     */
    constructor(
        public engine: NzymEngine,
        public tag: string,
        public life: number,
        public x: number,
        public y: number,
        public speed: number,
        public speedInc: number,
        public direction: number,
        public directionInc: number,
        public size: number,
        public sizeEnd: number,
        public color: string,
        public fadeOutStop: number,
        public gravity = 0.5,
        public friction = 0.99
    ) {
        this.startLife = Math.max(1, this.life);
        this.vx = Math.cos(this.direction) * this.speed;
        this.vy = Math.sin(this.direction) * this.speed;
    }

    update() {
        if (this.life <= 0) {
            this.engine.OBJ.removeById(this.tag, this.id);
            return;
        }
        this.life -= this.engine.Time.clampedDeltaTime;
        this.speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        this.direction = Math.atan2(this.vy, this.vx);
        this.speed += this.speedInc;
        this.direction += this.directionInc;
        this.vx = Math.cos(this.direction) * this.speed;
        this.vy = Math.sin(this.direction) * this.speed;
        this.vy += this.gravity;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.x += this.vx;
        this.y += this.vy;
    }

    render() {
        const lifeScaled = Math.max(0, this.life) / this.startLife; // 1 -> 0
        this.engine.Draw.setFill(this.color);
        if (this.fadeOutStop > 0) {
            this.engine.Draw.setAlpha(Math.min(1, lifeScaled / this.fadeOutStop));
        }
        this.engine.Draw.circle(this.x, this.y, Math.max(0, this.size + (1 - lifeScaled) * (this.sizeEnd - this.size)) / 2);
        this.engine.Draw.setAlpha(1);
    }
}