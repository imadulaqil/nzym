var Example = Example || {};
Example.adventureRPG = (function () {
    var _a = Nzym.getAliases(), C = _a.C, Align = _a.Align, Common = _a.Common, Events = _a.Events, KeyCode = _a.KeyCode, LineCap = _a.LineCap, LineJoin = _a.LineJoin, LineDash = _a.LineDash, Primitive = _a.Primitive;
    var Engine = new NzymEngine({
        name: 'Adventure RPG',
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
    })(TAG || (TAG = {}));
    ;
    var coins, health, maxHealth;
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
        }
        Player.prototype.update = function () {
            if (Input.keyHold(KeyCode.Left)) {
                this.x -= this.speed;
            }
            if (Input.keyHold(KeyCode.Right)) {
                this.x += this.speed;
            }
            if (Input.keyHold(KeyCode.Up)) {
                this.y -= this.speed;
            }
            if (Input.keyHold(KeyCode.Down)) {
                this.y += this.speed;
            }
            var items = OBJ.take(TAG.item);
            var _loop_1 = function (item) {
                if (item.containsPoint(this_1)) {
                    item.onCollected();
                    OBJ.remove(TAG.item, function (n) {
                        return n.id === item.id;
                    });
                }
            };
            var this_1 = this;
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                _loop_1(item);
            }
        };
        Player.prototype.render = function () {
            Draw.setColor(C.blueViolet);
            Draw.rectCenter(this.x, this.y, 32, 32);
        };
        return Player;
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
            return distance < 32;
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
        OBJ.addTag(TAG.player, TAG.item, TAG.floatingText);
        Loader.loadSound('coin', '../assets/sounds/coin.mp3');
        Loader.loadSound('item1', '../assets/sounds/item1.mp3');
        Loader.loadSound('item2', '../assets/sounds/item2.mp3');
    };
    GameScenes.start = function () {
        OBJ.push(TAG.player, new Player(Stage.mid.w, Stage.mid.h));
    };
    GameScenes.update = function () {
        health -= 0.1;
        if (Time.frameCount % 20 === 0) {
            if (OBJ.count(TAG.item) < 25) {
                spawnItem(Common.picko(ItemType));
            }
        }
    };
    GameScenes.renderUI = function () {
        Draw.setFont(Font.m);
        Draw.setColor(C.black);
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
