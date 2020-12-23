var NzymParticle = /** @class */ (function () {
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
    function NzymParticle(engine, tag, life, x, y, speed, speedInc, direction, directionInc, size, sizeEnd, color, fadeOutStop, gravity, friction) {
        if (gravity === void 0) { gravity = 0.5; }
        if (friction === void 0) { friction = 0.99; }
        this.engine = engine;
        this.tag = tag;
        this.life = life;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.speedInc = speedInc;
        this.direction = direction;
        this.directionInc = directionInc;
        this.size = size;
        this.sizeEnd = sizeEnd;
        this.color = color;
        this.fadeOutStop = fadeOutStop;
        this.gravity = gravity;
        this.friction = friction;
        this.id = NzymParticle.ID++;
        this.depth = 0;
        this.startLife = Math.max(1, this.life);
        this.vx = Math.cos(this.direction) * this.speed;
        this.vy = Math.sin(this.direction) * this.speed;
    }
    NzymParticle.prototype.update = function () {
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
    };
    NzymParticle.prototype.render = function () {
        var lifeScaled = Math.max(0, this.life) / this.startLife; // 1 -> 0
        this.engine.Draw.setFill(this.color);
        if (this.fadeOutStop > 0) {
            this.engine.Draw.setAlpha(Math.min(1, lifeScaled / this.fadeOutStop));
        }
        this.engine.Draw.circle(this.x, this.y, Math.max(0, this.size + (1 - lifeScaled) * (this.sizeEnd - this.size)) / 2);
        this.engine.Draw.setAlpha(1);
    };
    NzymParticle.ID = 0;
    return NzymParticle;
}());
