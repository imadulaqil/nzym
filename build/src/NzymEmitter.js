var NzymEmitter = /** @class */ (function () {
    function NzymEmitter(engine, tag) {
        this.engine = engine;
        this.tag = tag;
        this.life = {
            min: 100,
            max: 200
        };
        this.area = {
            x: 0,
            y: 0,
            w: 100,
            h: 0
        };
        this.gravity = 0.5;
        this.speed = {
            min: 15,
            max: 18
        };
        this.speedInc = {
            min: -0.5,
            max: 0.5
        };
        this.direction = {
            min: 0,
            max: Math.PI
        };
        this.directionInc = {
            min: -0.1,
            max: 0.1
        };
        this.friction = 0.99; // 0=no velocity, 1=no friction
        this.size = {
            min: 10,
            max: 25
        };
        this.sizeEndScalar = {
            min: 0.1,
            max: 0.2
        };
        this.color = ['skyblue', 'royalblue', 'gold']; // will be choosed randomly
        this.fadeOutStop = {
            min: 0.2,
            max: 0.4
        };
        this.depth = 0;
    }
    NzymEmitter.prototype.emit = function (amount) {
        while (amount-- > 0) {
            var n = new NzymParticle(this.engine, this.tag, Nzym.Common.range(this.life.min, this.life.max), Nzym.Common.range(this.area.x, this.area.x + this.area.w), Nzym.Common.range(this.area.y, this.area.y + this.area.h), Nzym.Common.range(this.speed.min, this.speed.max), Nzym.Common.range(this.speedInc.min, this.speedInc.max), Nzym.Common.range(this.direction.min, this.direction.max), Nzym.Common.range(this.directionInc.min, this.directionInc.max), Nzym.Common.range(this.size.min, this.size.max), Nzym.Common.range(this.sizeEndScalar.min, this.sizeEndScalar.max), Nzym.Common.pick(this.color), Nzym.Common.range(this.fadeOutStop.min, this.fadeOutStop.max), this.gravity, this.friction);
            n.depth = this.depth;
            this.engine.OBJ.push(this.tag, n);
        }
    };
    NzymEmitter.prototype.setLife = function (min, max) {
        this.life.min = min;
        this.life.max = max || min;
    };
    NzymEmitter.prototype.setArea = function (x, y, w, h) {
        if (w === void 0) { w = 0; }
        if (h === void 0) { h = 0; }
        this.area.x = x;
        this.area.y = y;
        this.area.w = w;
        this.area.h = h;
    };
    NzymEmitter.prototype.setGravity = function (gravity) {
        this.gravity = gravity;
    };
    NzymEmitter.prototype.setSpeed = function (min, max) {
        this.speed.min = min;
        this.speed.max = max || min;
    };
    NzymEmitter.prototype.setSpeedInc = function (min, max) {
        this.speedInc.min = min;
        this.speedInc.max = max || min;
    };
    NzymEmitter.prototype.setDirection = function (min, max) {
        this.direction.min = min;
        this.direction.max = max || min;
    };
    NzymEmitter.prototype.setDirectionInc = function (min, max) {
        this.directionInc.min = min;
        this.directionInc.max = max || min;
    };
    NzymEmitter.prototype.setDirectionDeg = function (min, max) {
        if (max === undefined)
            max = min;
        this.direction.min = min * Math.PI / 180;
        this.direction.max = max * Math.PI / 180;
    };
    NzymEmitter.prototype.setDirectionIncDeg = function (min, max) {
        if (max === undefined)
            max = min;
        this.directionInc.min = min * Math.PI / 180;
        this.directionInc.max = max * Math.PI / 180;
    };
    NzymEmitter.prototype.setFriction = function (friction) {
        this.friction = friction;
    };
    NzymEmitter.prototype.setSize = function (min, max) {
        this.size.min = min;
        this.size.max = max || min;
    };
    NzymEmitter.prototype.setSizeEndScalar = function (min, max) {
        this.sizeEndScalar.min = min;
        this.sizeEndScalar.max = max || min;
    };
    NzymEmitter.prototype.setColor = function () {
        var colors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            colors[_i] = arguments[_i];
        }
        this.color = colors;
    };
    NzymEmitter.prototype.addColor = function () {
        var colors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            colors[_i] = arguments[_i];
        }
        for (var i = 0; i < colors.length; i++) {
            this.color.push(colors[i]);
        }
    };
    NzymEmitter.prototype.setFadeOutStop = function (min, max) {
        this.fadeOutStop.min = min;
        this.fadeOutStop.max = max || min;
    };
    NzymEmitter.prototype.setDepth = function (depth) {
        this.depth = depth;
    };
    return NzymEmitter;
}());
