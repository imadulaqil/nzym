var Example = Example || {};
Example.adventureRPG = (function () {
    var _a = Nzym.getAliases(), C = _a.C, Align = _a.Align, Common = _a.Common, Events = _a.Events, KeyCode = _a.KeyCode, LineCap = _a.LineCap, LineJoin = _a.LineJoin, LineDash = _a.LineDash, Primitive = _a.Primitive;
    var Engine = new NzymEngine({
        name: 'Adventure RPG',
        w: 800,
        h: 576,
        bgColor: C.burlyWood,
        parent: document.getElementById('gameContainer')
    });
    var _b = Engine.getAliases(), Log = _b.Log, OBJ = _b.OBJ, Draw = _b.Draw, Font = _b.Font, Time = _b.Time, Input = _b.Input, Scene = _b.Scene, Sound = _b.Sound, Stage = _b.Stage, Loader = _b.Loader;
    var ItemType;
    (function (ItemType) {
        ItemType["coin"] = "coin";
        ItemType["potion"] = "potion";
    })(ItemType || (ItemType = {}));
    ;
    var EnemyType;
    (function (EnemyType) {
        EnemyType["slimey"] = "slimey";
    })(EnemyType || (EnemyType = {}));
    ;
    var EnemyState;
    (function (EnemyState) {
        EnemyState["idle"] = "idle";
        EnemyState["chase"] = "chase";
        EnemyState["patrol"] = "patrol";
        EnemyState["attack"] = "attack";
        EnemyState["die"] = "die";
    })(EnemyState || (EnemyState = {}));
    ;
    var BulletTag;
    (function (BulletTag) {
        BulletTag["player"] = "player";
        BulletTag["enemy"] = "enemy";
    })(BulletTag || (BulletTag = {}));
    ;
    var TAG;
    (function (TAG) {
        TAG["player"] = "player";
        TAG["item"] = "item";
        TAG["floatingText"] = "floatingText";
        TAG["block"] = "block";
        TAG["footsteps"] = "footsteps";
        TAG["enemy"] = "enemy";
        TAG["bullet"] = "bullet";
    })(TAG || (TAG = {}));
    ;
    var coins, health, maxHealth, magnetRange, treeImages;
    var Hitbox = /** @class */ (function () {
        function Hitbox(x, y, w, h, xOffset, yOffset, isCenter) {
            if (xOffset === void 0) { xOffset = 0; }
            if (yOffset === void 0) { yOffset = 0; }
            if (isCenter === void 0) { isCenter = false; }
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.xOffset = xOffset;
            this.yOffset = yOffset;
            this.isCenter = isCenter;
            this.updatePosition(this.x, this.y);
        }
        Hitbox.prototype.getTop = function () {
            return this.y;
        };
        Hitbox.prototype.getRight = function () {
            return this.x + this.w;
        };
        Hitbox.prototype.getBottom = function () {
            return this.y + this.h;
        };
        Hitbox.prototype.getLeft = function () {
            return this.x;
        };
        Hitbox.prototype.getCenter = function () {
            return this.x + this.w / 2;
        };
        Hitbox.prototype.getMiddle = function () {
            return this.y + this.h / 2;
        };
        Hitbox.prototype.updatePosition = function (x, y) {
            this.x = x + this.xOffset;
            this.y = y + this.yOffset;
            if (this.isCenter) {
                this.x -= this.w / 2;
                this.y -= this.h / 2;
            }
        };
        Hitbox.prototype.draw = function () {
            Draw.setColor(C.magenta);
            Draw.rectObject(this, true);
        };
        return Hitbox;
    }());
    var Player = /** @class */ (function () {
        function Player(x, y, speed) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (speed === void 0) { speed = 5; }
            this.x = x;
            this.y = y;
            this.speed = speed;
            this.id = Common.getID();
            this.xs = 1;
            this.ys = 1;
            this.isDead = false;
            this.imageIndex = 0;
            this.imageNumber = 4;
            this.imageXScale = 1.2;
            this.imageYScale = 1.2;
            this.imageAngle = 0;
            this.imageOriginX = 0.5;
            this.imageOriginY = 1;
            this.face = 1;
            this.xPrev = this.x;
            this.yPrev = this.y;
            this.moveTime = 0;
            this.hitbox = new Hitbox(this.x, this.y, 20, 12, 0, -8, true);
            this.bulletHitbox = new Hitbox(this.x, this.y, 24, 40, 0, -24, true);
        }
        Player.prototype.movement = function () {
            this.xPrev = this.x;
            this.yPrev = this.y;
            var move = {
                x: 0,
                y: 0
            };
            if (Input.keyHold(KeyCode.Left)) {
                move.x -= 1;
                this.face = -1;
            }
            if (Input.keyHold(KeyCode.Right)) {
                move.x += 1;
                this.face = 1;
            }
            if (Input.keyHold(KeyCode.Up)) {
                move.y -= 1;
            }
            if (Input.keyHold(KeyCode.Down)) {
                move.y += 1;
            }
            var moveMag = Common.hypot(move.x, move.y);
            if (moveMag > 0) {
                move.x /= moveMag;
                move.y /= moveMag;
                move.x *= this.speed;
                move.y *= this.speed;
            }
            this.x += move.x;
            this.y += move.y;
            if (this.x !== this.xPrev || this.y !== this.yPrev) {
                if (Time.frameCount % 5 === 0) {
                    var offset = Time.frameCount % 10 === 0 ? -8 : 8;
                    this.spawnFootsteps(this.xPrev + offset + Common.range(-2, 2), this.yPrev + Common.range(-2, 2));
                    // this.spawnFootsteps(this.xPrev + 8 + Common.range(-5, 5), this.yPrev + Common.range(-5, 5));
                }
                this.moveTime += Time.clampedDeltaTime;
            }
            else {
                this.moveTime = 0;
            }
        };
        Player.prototype.spawnFootsteps = function (x, y) {
            OBJ.push(TAG.footsteps, new Footsteps(x, y, Common.range(7, 8)));
        };
        Player.prototype.update = function () {
            if (this.isDead)
                return;
            this.movement();
            var items = OBJ.take(TAG.item);
            var _loop_1 = function (item) {
                var cp = item.containsPoint(this_1);
                if (cp.isContained) {
                    item.onCollected();
                    OBJ.remove(TAG.item, function (n) {
                        return n.id === item.id;
                    });
                }
                if (cp.distance < magnetRange) {
                    item.x += 0.2 * (this_1.x - item.x);
                    item.y += 0.2 * (this_1.y - item.y);
                }
            };
            var this_1 = this;
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                _loop_1(item);
            }
            this.updateHitbox();
            this.bulletCheck();
            this.constraint();
            this.depth = -this.y;
        };
        Player.prototype.bulletCheck = function () {
            var bullets = OBJ.take(TAG.bullet);
            for (var _i = 0, bullets_1 = bullets; _i < bullets_1.length; _i++) {
                var bullet = bullets_1[_i];
                if (bullet.tag === BulletTag.enemy) {
                    if (Common.rectContainsPoint(this.bulletHitbox, bullet)) {
                        this.x += bullet.vx * 1;
                        this.y += bullet.vy * 1;
                        this.xs = 0.8;
                        this.ys = 1.2;
                        this.face = this.x < bullet.x ? 1 : -1;
                        health -= bullet.damage;
                        if (health < 0) {
                            health = 0;
                            this.isDead = true;
                            break;
                        }
                        spawnFloatingText(bullet.x, bullet.y, "-" + bullet.damage, Math.PI * Common.range(-0.05, 0.05), C.red);
                        OBJ.removeById(TAG.bullet, bullet.id);
                    }
                }
            }
        };
        Player.prototype.updateHitbox = function () {
            this.hitbox.updatePosition(this.x, this.y);
            this.bulletHitbox.updatePosition(this.x, this.y);
        };
        Player.prototype.constraint = function () {
            var blocks = OBJ.take(TAG.block);
            for (var _i = 0, blocks_1 = blocks; _i < blocks_1.length; _i++) {
                var block = blocks_1[_i];
                if (block.intersectsRect(this.hitbox)) {
                    if (this.hitbox.getLeft() < block.getLeft()) {
                        if (this.x > this.xPrev) {
                            this.x = this.xPrev;
                        }
                    }
                    this.updateHitbox();
                    if (this.hitbox.getRight() > block.getRight()) {
                        if (this.x < this.xPrev) {
                            this.x = this.xPrev;
                        }
                    }
                    this.updateHitbox();
                    if (this.hitbox.getTop() < block.getTop()) {
                        if (this.y > this.yPrev) {
                            this.y = this.yPrev;
                        }
                    }
                    this.updateHitbox();
                    if (this.hitbox.getBottom() > block.getBottom()) {
                        if (this.y < this.yPrev) {
                            this.y = this.yPrev;
                        }
                    }
                    // this.x = this.xPrev;
                    // this.y = this.yPrev;
                }
            }
        };
        Player.prototype.render = function () {
            this.xs += 0.2 * (1 - this.xs);
            this.ys += 0.2 * (1 - this.ys);
            if (this.isDead) {
                Draw.noSmooth();
                Draw.strip('player-idle', this.imageNumber, 0, this.x, this.y, this.imageXScale * this.face * this.xs, this.imageYScale * this.ys, Math.PI / 2 * -this.face, this.imageOriginX, this.imageOriginY, true);
                Draw.smooth();
                return;
            }
            this.imageIndex += Time.clampedDeltaTime * (this.moveTime > 0 ? 0.2 : 0.1);
            var t = this.moveTime > 0 ? Math.sin(this.moveTime * 0.5) * this.face : 0;
            this.imageAngle = t * Math.PI / 20;
            Draw.noSmooth();
            Draw.strip('player-idle', this.imageNumber, Math.floor(this.imageIndex), this.x, this.y - Math.abs(5 * t), this.imageXScale * this.face * this.xs, this.imageYScale * this.ys, this.imageAngle, this.imageOriginX, this.imageOriginY, true);
            Draw.smooth();
            // Draw.circle(this.x, this.y, 10);
            // this.hitbox.draw();
            // this.bulletHitbox.draw();
        };
        return Player;
    }());
    var Footsteps = /** @class */ (function () {
        function Footsteps(x, y, size, color) {
            if (color === void 0) { color = C.black; }
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.id = Common.getID();
            this.depth = 2;
            this.alpha = 0.5;
        }
        Footsteps.prototype.render = function () {
            var _this = this;
            Draw.setColor(this.color);
            Draw.setAlpha(this.alpha);
            Draw.circle(this.x, this.y, this.size / 2);
            Draw.setAlpha(1);
            this.alpha -= 0.02;
            this.size -= 0.05;
            if (this.size < 1) {
                this.size = 1;
            }
            if (this.alpha < 0) {
                OBJ.remove(TAG.footsteps, function (n) { return n.id === _this.id; });
            }
        };
        return Footsteps;
    }());
    var Item = /** @class */ (function () {
        function Item(type, x, y, value) {
            var _this = this;
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (value === void 0) { value = 0; }
            this.type = type;
            this.x = x;
            this.y = y;
            this.value = value;
            this.id = Common.getID();
            this.depth = -9998;
            this.scale = Common.range(0.8, 1);
            this.canvasImage = Draw.createCanvas(32, 32, function (canvas, w, h) {
                switch (_this.type) {
                    case ItemType.coin:
                        Item.drawCoin(canvas, w, h);
                        break;
                    case ItemType.potion:
                        Item.drawPotion(canvas, w, h);
                        break;
                }
            });
        }
        Item.drawCoin = function (canvas, w, h) {
            Draw.setColor(C.goldenRod);
            Draw.circle(w / 2, h / 2, 15);
            Draw.setColor(C.yellow);
            Draw.circle(w / 2, h / 2, 10);
        };
        Item.drawPotion = function (canvas, w, h) {
            Draw.setColor(C.red);
            Draw.circle(w / 2, h / 2, 15);
            Draw.setColor(C.white);
            Draw.circle(w / 2, h / 2, 10);
            Draw.setColor(C.red);
            Draw.setLineWidth(4);
            Draw.plus(w / 2, h / 2, 6);
            Draw.setLineWidth(1);
        };
        Item.prototype.onCollected = function () {
            var angle = Math.PI * Common.range(-0.05, 0.05);
            switch (this.type) {
                case ItemType.coin:
                    coins += this.value;
                    spawnFloatingText(this.x, this.y, "Coins +" + this.value, angle, C.gold);
                    Sound.play('coin');
                    break;
                case ItemType.potion:
                    health += this.value;
                    if (health > maxHealth) {
                        maxHealth += 0.1 * (health - maxHealth);
                        health = maxHealth;
                    }
                    spawnFloatingText(this.x, this.y, "Health +" + this.value, angle, C.red);
                    Sound.play('item2');
                    break;
            }
        };
        Item.prototype.containsPoint = function (point) {
            var dx = point.x - this.x, dy = point.y - this.y, distance = Common.hypot(dx, dy);
            return {
                distance: distance,
                isContained: distance < 32
            };
        };
        Item.prototype.render = function () {
            Draw.image(this.canvasImage, this.x, this.y, this.scale * Math.sin((Time.frameCount + this.id) * 0.1), this.scale);
        };
        return Item;
    }());
    var FloatingText = /** @class */ (function () {
        function FloatingText(x, y, text, angle, color) {
            if (angle === void 0) { angle = 0; }
            if (color === void 0) { color = C.black; }
            this.x = x;
            this.y = y;
            this.text = text;
            this.angle = angle;
            this.color = color;
            this.id = Common.getID();
            this.depth = -9999;
            this.alpha = 1;
            var up = angle - Math.PI / 2;
            this.vx = Math.cos(up) * FloatingText.floatSpeed;
            this.vy = Math.sin(up) * FloatingText.floatSpeed;
        }
        FloatingText.prototype.update = function () {
            this.x += this.vx;
            this.y += this.vy;
        };
        FloatingText.prototype.render = function () {
            var _this = this;
            Draw.setColor(this.color);
            Draw.setAlpha(this.alpha);
            Draw.onTransform(this.x, this.y, 1, 1, this.angle, function () {
                Draw.setFont(Font.mb);
                Draw.setHVAlign(Align.c, Align.m);
                Draw.text(0, 0, _this.text);
            }, true);
            Draw.setAlpha(1);
            this.alpha -= 0.02;
            if (this.alpha < 0) {
                OBJ.remove(TAG.floatingText, function (n) { return n.id === _this.id; });
            }
        };
        FloatingText.floatSpeed = 1;
        return FloatingText;
    }());
    var Block = /** @class */ (function () {
        function Block(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.id = Common.getID();
            this.image = Common.pick(treeImages);
            this.imageXScale = Common.range(0.7, 1);
            this.imageYScale = Common.range(0.7, this.imageXScale);
            this.imageAngle = 0;
            this.depth = -(this.y + this.h - 2 + Common.range(0, 2));
        }
        Block.prototype.getTop = function () {
            return this.y;
        };
        Block.prototype.getRight = function () {
            return this.x + this.w;
        };
        Block.prototype.getBottom = function () {
            return this.y + this.h;
        };
        Block.prototype.getLeft = function () {
            return this.x;
        };
        Block.prototype.containsPoint = function (point) {
            return point.x >= this.getLeft() && point.x < this.getRight()
                && point.y >= this.getTop() && point.y < this.getBottom();
        };
        Block.prototype.intersectsRect = function (rect) {
            return this.getLeft() < rect.x + rect.w && this.getRight() >= rect.x
                && this.getTop() < rect.y + rect.h && this.getBottom() >= rect.y;
        };
        Block.prototype.render = function () {
            // Draw.setColor(C.burlyWood, C.black);
            // Draw.rect(this.x, this.y, this.w, this.h);
            // Draw.stroke();
            this.imageAngle = Math.sin((Time.frameCount + this.id * this.id) * 0.01) * 2;
            Draw.image(this.image, this.x + this.w / 2, this.y + this.h / 2, this.imageXScale, this.imageYScale, this.imageAngle, 0.5, 0.9);
        };
        return Block;
    }());
    var Enemy = /** @class */ (function () {
        function Enemy(type, x, y) {
            var _this = this;
            this.type = type;
            this.x = x;
            this.y = y;
            this.events = {};
            this.id = Common.getID();
            this.state = EnemyState.idle;
            this.target = {
                x: 0,
                y: 0
            };
            this.speed = 0.5;
            this.vx = 0;
            this.vy = 0;
            this.xs = 1;
            this.ys = 1;
            this.attackTime = 0;
            this.attackRange = Common.range(100, 200);
            this.attackInterval = Common.range(10, 20);
            this.shootPoint = {
                x: 0,
                y: 0
            };
            this.playerInRange = false;
            this.xs = 1.8;
            this.ys = 0.2;
            this.depth = -this.y;
            switch (this.type) {
                case EnemyType.slimey:
                    this.shootPoint.x = this.x;
                    this.shootPoint.y = this.y - 32;
                    Events.on(this, 'idleupdate', function () {
                        var p = OBJ.take(TAG.player)[0];
                        if (p) {
                            if (p.isDead) {
                                return;
                            }
                            var distanceBetween = Common.hypot(p.x - _this.x, p.y - _this.y);
                            if (distanceBetween < _this.attackRange) {
                                _this.playerInRange = true;
                                _this.changeState(EnemyState.attack);
                            }
                        }
                    });
                    Events.on(this, 'attackupdate', function () {
                        _this.playerInRange = false;
                        var p = OBJ.take(TAG.player)[0];
                        if (p) {
                            if (p.isDead) {
                                _this.changeState(EnemyState.idle);
                                return;
                            }
                            var distanceBetween = Common.hypot(p.x - _this.x, p.y - _this.y);
                            if (distanceBetween > _this.attackRange) {
                                _this.attackTime = 0;
                                _this.changeState(EnemyState.idle);
                            }
                            else {
                                _this.playerInRange = true;
                                if (_this.attackTime < 0) {
                                    var bulletSpeed = Common.range(1.9, 2.1);
                                    OBJ.push(TAG.bullet, new Bullet(BulletTag.enemy, _this.shootPoint.x, _this.shootPoint.y, Common.angleBetween(_this.shootPoint.x, _this.shootPoint.y, p.bulletHitbox.getCenter() + Common.range(-3, 3), p.bulletHitbox.getMiddle() + Common.range(-3, 3)), bulletSpeed));
                                    _this.attackTime = _this.attackInterval;
                                }
                                else {
                                    _this.attackTime -= Time.clampedDeltaTime;
                                }
                            }
                        }
                    });
                    Events.on(this, 'render', function () {
                        _this.xs += 0.2 * (1 - _this.xs);
                        _this.ys += 0.2 * (1 - _this.ys);
                        // Draw.setAlpha(this.playerInRange? 0.5 : 0.2);
                        // Draw.setColor(C.wheat);
                        // Draw.circle(this.x, this.y, this.attackRange);
                        // Draw.setAlpha(1);
                        var p = _this.getPlayer();
                        Draw.image('snowman', _this.x, _this.y, 0.5 * (_this.x < p.x ? 1 : -1) * _this.xs, 0.5 * _this.ys, 0, 0.5, 0.9);
                        Draw.setStroke(C.red);
                        Draw.circle(_this.shootPoint.x, _this.shootPoint.y, 16 * Math.max(0, _this.attackTime / 20), true);
                    });
                    break;
            }
        }
        Enemy.prototype.getPlayer = function () {
            var p = OBJ.take(TAG.player)[0];
            return p || { x: 0, y: 0 };
        };
        Enemy.prototype.followTarget = function () {
            var dx = this.target.x - this.x, dy = this.target.y - this.y, length = Common.hypot(dx, dy);
            dx /= length;
            dy /= length;
            this.vx = dx * this.speed;
            this.vy = dy * this.speed;
            this.x += this.vx;
            this.y += this.vy;
            return length;
        };
        Enemy.prototype.changeState = function (newState) {
            // trigger event `transition from old state to new state`
            var errorObject = {
                errorCount: 0,
                errorMessage: ''
            };
            Events.trigger(this, "transition" + this.state + newState, errorObject);
            if (errorObject.errorCount > 0) {
                Log.error("Failed to trigger enemy (id=" + this.id + ") transition event", errorObject.errorMessage);
            }
            else {
                Events.trigger(this, this.state + "end");
                Events.trigger(this, newState + "start");
                this.state = newState;
            }
        };
        Enemy.prototype.update = function () {
            switch (this.state) {
                case EnemyState.idle:
                    Events.trigger(this, 'idleupdate');
                    break;
                case EnemyState.chase:
                    Events.trigger(this, 'chaseupdate');
                    break;
                case EnemyState.patrol:
                    Events.trigger(this, 'patrolupdate');
                    break;
                case EnemyState.attack:
                    Events.trigger(this, 'attackupdate');
                    break;
                case EnemyState.die:
                    Events.trigger(this, 'dieupdate');
                    break;
                default:
                    this.changeState(EnemyState.idle);
                    break;
            }
        };
        Enemy.prototype.render = function () {
            Events.trigger(this, 'render');
            switch (this.state) {
                case EnemyState.idle:
                    Events.trigger(this, 'idlerender');
                    break;
                case EnemyState.chase:
                    Events.trigger(this, 'chaserender');
                    break;
                case EnemyState.patrol:
                    Events.trigger(this, 'patrolrender');
                    break;
                case EnemyState.attack:
                    Events.trigger(this, 'attackrender');
                    break;
                case EnemyState.die:
                    Events.trigger(this, 'dierender');
                    break;
                default:
                    this.changeState(EnemyState.idle);
                    break;
            }
        };
        return Enemy;
    }());
    var Bullet = /** @class */ (function () {
        function Bullet(tag, x, y, angle, speed, damage, radius) {
            if (damage === void 0) { damage = Common.choose(3, 4, 5); }
            if (radius === void 0) { radius = 3; }
            this.tag = tag;
            this.x = x;
            this.y = y;
            this.angle = angle;
            this.speed = speed;
            this.damage = damage;
            this.radius = radius;
            this.id = Common.getID();
            this.depth = 0;
            this.vx = 0;
            this.vy = 0;
            this.vx = Math.cos(angle) * this.speed;
            this.vy = Math.sin(angle) * this.speed;
            this.radius = this.damage * 0.8;
        }
        Bullet.prototype.update = function () {
            this.x += this.vx;
            this.y += this.vy;
            if (!Stage.insideStage(this.x, this.y)) {
                OBJ.removeById(TAG.bullet, this.id);
            }
            // else {
            //     const blocks: Block[] = OBJ.take(TAG.block);
            //     for (const b of blocks) {
            //         if (b.containsPoint(this)) {
            //             OBJ.removeById(TAG.bullet, this.id);
            //             break;
            //         }
            //     }
            // }
            this.depth = -this.y - 32;
        };
        Bullet.prototype.render = function () {
            Draw.setColor(C.red);
            Draw.circle(this.x, this.y, this.radius);
            Draw.setColor(C.orange);
            Draw.circle(this.x, this.y, this.radius * 0.75);
        };
        return Bullet;
    }());
    var spawnItem = function (type) {
        return OBJ.push(TAG.item, new Item(type, Stage.randomX(), Stage.randomY(), Math.floor(Common.range(10, 20))));
    };
    var spawnFloatingText = function (x, y, text, angle, color) {
        return OBJ.push(TAG.floatingText, new FloatingText(x, y, text, angle, color));
    };
    var GameScenes = {
        onLoad: {}
    };
    GameScenes.boot = function () {
        coins = 0;
        maxHealth = 100;
        health = maxHealth;
        magnetRange = 100;
        OBJ.addTag(TAG.player, TAG.item, TAG.floatingText, TAG.block, TAG.footsteps, TAG.enemy, TAG.bullet);
        Loader.loadImage('player-idle', '../assets/images/ghost-idle_strip4.png');
        Loader.loadImage('snowman', '../assets/images/kenney/snowmanFancy_SE.png');
        treeImages = [];
        for (var _i = 0, _a = ['NE', 'NW', 'SE', 'SW']; _i < _a.length; _i++) {
            var d = _a[_i];
            treeImages.push(Loader.loadImage("../assets/images/kenney/treePine_" + d + ".png"));
        }
        Loader.loadSound('coin', '../assets/sounds/coin.mp3');
        Loader.loadSound('item1', '../assets/sounds/item1.mp3');
        Loader.loadSound('item2', '../assets/sounds/item2.mp3');
    };
    GameScenes.start = function () {
        var blockMap = {
            x: 0,
            y: 0,
            w: 32,
            h: 32,
            rows: 19,
            columns: 25,
            data: [
                '#########################',
                '####...##########...#####',
                '#............#..#.......#',
                '#.......................#',
                '#.......................#',
                '#..................#....#',
                '#..................#....#',
                '#......#....##.....##...#',
                '#......#................#',
                '#......###..............#',
                '#.......................#',
                '#..............###......#',
                '#................#......#',
                '#................####...#',
                '#.......................#',
                '#.......................#',
                '#.......................#',
                '#.......................#',
                '#########################'
            ]
        };
        for (var j = 0; j < Math.min(blockMap.rows, blockMap.data.length); j++) {
            for (var i = 0; i < Math.min(blockMap.columns, blockMap.data[j].length); i++) {
                if (blockMap.data[j][i] === '#') {
                    OBJ.push(TAG.block, new Block(blockMap.x + i * blockMap.w, blockMap.y + j * blockMap.h, blockMap.w, blockMap.h));
                }
            }
        }
        OBJ.push(TAG.player, new Player(Stage.mid.w, Stage.mid.h));
    };
    GameScenes.update = function () {
        // health -= 0.1;
        if (Time.frameCount % 20 === 0) {
            if (OBJ.count(TAG.item) < 25) {
                spawnItem(Common.picko(ItemType));
            }
        }
        if (Time.frameCount % 10 === 0) {
            if (OBJ.count(TAG.enemy) < 10) {
                var spawnPos = {
                    x: Stage.randomX(),
                    y: Stage.randomY()
                };
                // check if empty
                var isBlocked = false;
                var blocks = OBJ.take(TAG.block);
                for (var _i = 0, blocks_2 = blocks; _i < blocks_2.length; _i++) {
                    var b = blocks_2[_i];
                    if (b.containsPoint(spawnPos)) {
                        isBlocked = true;
                        break;
                    }
                }
                if (!isBlocked) {
                    OBJ.push(TAG.enemy, new Enemy(Common.picko(EnemyType), spawnPos.x, spawnPos.y));
                }
            }
        }
    };
    GameScenes.renderUI = function () {
        Draw.setColor(C.black);
        Draw.setAlpha(0.5);
        Draw.rect(0, 0, 180, 80);
        Draw.setAlpha(1);
        Draw.setFont(Font.mb);
        Draw.setColor(C.white);
        Draw.setHVAlign(Align.l, Align.t);
        var hp = Common.clamp(health, 0, maxHealth);
        Draw.text(10, 10, "Coins: " + coins + "\nHealth: " + Math.floor(hp) + "/" + Math.floor(maxHealth));
        var y = Draw.lastText.y + Draw.getLastTextHeight() + 2;
        var w = 150;
        Draw.setColor(C.black);
        Draw.rect(10, y, w, 10);
        Draw.setColor(C.red);
        Draw.rect(11, y + 1, (w - 2) * (hp / maxHealth), 8);
        // Debug
        Draw.setFont(Font.sm);
        Draw.setColor(C.black);
        Draw.setHVAlign(Align.l, Align.m);
        var debugText = "Bullet count: " + OBJ.count(TAG.bullet);
        Draw.text(10, Stage.mid.h, debugText);
        // Credits
        Draw.setFont(Font.smb);
        Draw.setColor(C.black);
        Draw.setHVAlign(Align.l, Align.b);
        Draw.text(Draw.currentFont.size / 2, Stage.h - Draw.currentFont.size / 2, 'Art by kenney.nl');
    };
    Scene.setup({
        scenes: GameScenes
    });
    Engine.makeGlobalAliases();
    Engine.start();
    return Engine;
})();
