var Example = Example || {};
Example.adventureRPG = (function () {
    var _a = Nzym.getAliases(), C = _a.C, Align = _a.Align, Common = _a.Common, Events = _a.Events, KeyCode = _a.KeyCode, LineCap = _a.LineCap, LineJoin = _a.LineJoin, LineDash = _a.LineDash, Primitive = _a.Primitive;
    var Engine = new NzymEngine({
        name: 'Adventure RPG',
        w: 800,
        h: 576,
        parent: document.getElementById('gameContainer')
    });
    var _b = Engine.getAliases(), OBJ = _b.OBJ, Draw = _b.Draw, Font = _b.Font, Time = _b.Time, Input = _b.Input, Scene = _b.Scene, Sound = _b.Sound, Stage = _b.Stage, Loader = _b.Loader;
    var ItemType;
    (function (ItemType) {
        ItemType["coin"] = "coin";
        ItemType["potion"] = "potion";
    })(ItemType || (ItemType = {}));
    ;
    var TAG;
    (function (TAG) {
        TAG["player"] = "player";
        TAG["item"] = "item";
        TAG["floatingText"] = "floatingText";
        TAG["block"] = "block";
        TAG["footsteps"] = "footsteps";
    })(TAG || (TAG = {}));
    ;
    var coins, health, maxHealth, magnetRange;
    var Hitbox = /** @class */ (function () {
        function Hitbox(x, y, w, h, isCenter) {
            if (isCenter === void 0) { isCenter = false; }
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
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
        Hitbox.prototype.updatePosition = function (x, y) {
            this.x = x;
            this.y = y;
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
            this.depth = -1;
            this.imageIndex = 0;
            this.imageNumber = 4;
            this.imageXScale = 1.5;
            this.imageYScale = 1.5;
            this.imageAngle = 0;
            this.imageOriginX = 0.5;
            this.imageOriginY = 1;
            this.face = 1;
            this.xPrev = this.x;
            this.yPrev = this.y;
            this.moveTime = 0;
            this.hitbox = new Hitbox(this.x, this.y, 20, 12, true);
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
                    this.spawnFootsteps(this.xPrev + offset + Common.range(-5, 5), this.yPrev + Common.range(-5, 5));
                    // this.spawnFootsteps(this.xPrev + 8 + Common.range(-5, 5), this.yPrev + Common.range(-5, 5));
                }
                this.moveTime += Time.clampedDeltaTime;
            }
            else {
                this.moveTime = 0;
            }
        };
        Player.prototype.spawnFootsteps = function (x, y) {
            OBJ.push(TAG.footsteps, new Footsteps(x, y, 8));
        };
        Player.prototype.update = function () {
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
            this.constraint();
        };
        Player.prototype.updateHitbox = function () {
            this.hitbox.updatePosition(this.x, this.y - 8);
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
            this.imageIndex += Time.clampedDeltaTime * (this.moveTime > 0 ? 0.2 : 0.1);
            var t = this.moveTime > 0 ? Math.sin(this.moveTime * 0.5) * this.face : 0;
            this.imageAngle = t * Math.PI / 20;
            Draw.noSmooth();
            Draw.strip('player-idle', this.imageNumber, Math.floor(this.imageIndex), this.x, this.y - Math.abs(5 * t), this.imageXScale * this.face, this.imageYScale, this.imageAngle, this.imageOriginX, this.imageOriginY, true);
            Draw.smooth();
            // Draw.circle(this.x, this.y, 10);
            // this.hitbox.draw();
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
            this.depth = 0;
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
            Draw.image(this.canvasImage, this.x, this.y);
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
            this.depth = -2;
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
            this.depth = 1;
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
            Draw.setColor(C.burlyWood, C.black);
            Draw.rect(this.x, this.y, this.w, this.h);
            Draw.stroke();
        };
        return Block;
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
        OBJ.addTag(TAG.player, TAG.item, TAG.floatingText, TAG.block, TAG.footsteps);
        Loader.loadImage('player-idle', '../assets/images/ghost-idle_strip4.png');
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
            rows: 18,
            columns: 25,
            data: [
                '#########################',
                '#.......................#',
                '#.......................#',
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
        // if (Time.frameCount % 20 === 0) {
        //     if (OBJ.count(TAG.item) < 25) {
        //         spawnItem(Common.picko(ItemType));
        //     }
        // }
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
    };
    Scene.setup({
        scenes: GameScenes
    });
    Engine.makeGlobalAliases();
    Engine.start();
    return Engine;
})();
