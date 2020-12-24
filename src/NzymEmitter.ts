class NzymEmitter {

    life: NzymRange = { // uses milliseconds
        min: 100,
        max: 200
    };

    area: NzymRect = {
        x: 0,
        y: 0,
        w: 100,
        h: 0
    };

    gravity = 0.5;

    speed: NzymRange = {
        min: 15,
        max: 18
    };

    speedInc: NzymRange = { // speed increment
        min: -0.5,
        max: 0.5
    };

    direction: NzymRange = { // uses radians
        min: 0,
        max: Math.PI
    };

    directionInc: NzymRange = { // direction increment (in radians as well)
        min: -0.1,
        max: 0.1
    };

    friction = 0.99; // 0=no velocity, 1=no friction

    size: NzymRange = {
        min: 10,
        max: 25
    };

    sizeEndScalar: NzymRange = {
        min: 0.1, // size scalar at the end of life (begin from 1)
        max: 0.2
    };

    color: string[] = ['skyblue', 'royalblue', 'gold']; // will be choosed randomly

    fadeOutStop: NzymRange = {
        min: 0.2, // 0-1 start of fade out (0.5=fade out at half of life, 0=no fade out)
        max: 0.4
    };

    depth: number = 0;

    constructor(
        public engine: NzymEngine,
        public tag: string
    ) {}

    emit(amount: number) {
        while (amount-- > 0) {
            const n = new NzymParticle(
                this.engine,
                this.tag,
                Nzym.Common.range(this.life.min, this.life.max),
                Nzym.Common.range(this.area.x, this.area.x + this.area.w),
                Nzym.Common.range(this.area.y, this.area.y + this.area.h),
                Nzym.Common.range(this.speed.min, this.speed.max),
                Nzym.Common.range(this.speedInc.min, this.speedInc.max),
                Nzym.Common.range(this.direction.min, this.direction.max),
                Nzym.Common.range(this.directionInc.min, this.directionInc.max),
                Nzym.Common.range(this.size.min, this.size.max),
                Nzym.Common.range(this.sizeEndScalar.min, this.sizeEndScalar.max),
                Nzym.Common.pick(this.color),
                Nzym.Common.range(this.fadeOutStop.min, this.fadeOutStop.max),
                this.gravity,
                this.friction
            );
            n.depth = this.depth;
            this.engine.OBJ.push(this.tag, n);
        }
    }

    setLife(min: number, max?: number) {
        this.life.min = min;
        this.life.max = max || min;
    }

    setArea(x: number, y: number, w: number = 0, h: number = 0) {
        this.area.x = x;
        this.area.y = y;
        this.area.w = w;
        this.area.h = h;
    }

    setGravity(gravity: number) {
        this.gravity = gravity;
    }

    setSpeed(min: number, max?: number) {
        this.speed.min = min;
        this.speed.max = max || min;
    }

    setSpeedInc(min: number, max?: number) {
        this.speedInc.min = min;
        this.speedInc.max = max || min;
    }

    setDirection(min: number, max?: number) {
        this.direction.min = min;
        this.direction.max = max || min;
    }

    setDirectionInc(min: number, max?: number) {
        this.directionInc.min = min;
        this.directionInc.max = max || min;
    }

    setDirectionDeg(min: number, max?: number) {
        if (max === undefined) max = min;
        this.direction.min = min * Math.PI / 180;
        this.direction.max = max * Math.PI / 180;
    }

    setDirectionIncDeg(min: number, max?: number) {
        if (max === undefined) max = min;
        this.directionInc.min = min * Math.PI / 180;
        this.directionInc.max = max * Math.PI / 180;
    }

    setFriction(friction: number) {
        this.friction = friction;
    }

    setSize(min: number, max?: number) {
        this.size.min = min;
        this.size.max = max || min;
    }

    setSizeEndScalar(min: number, max?: number) {
        this.sizeEndScalar.min = min;
        this.sizeEndScalar.max = max || min;
    }

    setColor(...colors: string[]) {
        this.color = colors;
    }

    addColor(...colors: string[]) {
        for (let i = 0; i < colors.length; i++) {
            this.color.push(colors[i]);
        }
    }

    setFadeOutStop(min: number, max?: number) {
        this.fadeOutStop.min = min;
        this.fadeOutStop.max = max || min;
    }

    setDepth(depth: number) {
        this.depth = depth;
    }
}