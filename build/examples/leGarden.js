var GameData;
Nzym.Example.leGarden = (function () {
    var _a = Nzym.getAliases(), C = _a.C, Align = _a.Align, Common = _a.Common, Events = _a.Events, KeyCode = _a.KeyCode, LineCap = _a.LineCap, LineJoin = _a.LineJoin, LineDash = _a.LineDash, Primitive = _a.Primitive;
    var Engine = new NzymEngine({
        name: 'Le Garden',
        w: 800,
        h: 576,
        bgColor: C.skyBlue,
        parent: document.getElementById('gameContainer')
    });
    var _b = Engine.getAliases(), Log = _b.Log, OBJ = _b.OBJ, Draw = _b.Draw, Font = _b.Font, Time = _b.Time, Input = _b.Input, Scene = _b.Scene, Sound = _b.Sound, Stage = _b.Stage, Loader = _b.Loader;
    var TAG;
    (function (TAG) {
        TAG["player"] = "player";
        TAG["item"] = "item";
    })(TAG || (TAG = {}));
    ;
    var BoundingRect = /** @class */ (function () {
        function BoundingRect(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }
        BoundingRect.prototype.set = function (x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        };
        BoundingRect.prototype.getBounds = function () {
            return {
                left: this.left,
                right: this.right,
                top: this.top,
                bottom: this.bottom
            };
        };
        Object.defineProperty(BoundingRect.prototype, "left", {
            get: function () {
                return this.x;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BoundingRect.prototype, "right", {
            get: function () {
                return this.x + this.w;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BoundingRect.prototype, "top", {
            get: function () {
                return this.y;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BoundingRect.prototype, "bottom", {
            get: function () {
                return this.y + this.h;
            },
            enumerable: false,
            configurable: true
        });
        BoundingRect.getBounds = function (x, y, w, h) {
            return (new BoundingRect(x, y, w, h)).getBounds();
        };
        return BoundingRect;
    }());
    var Grid = /** @class */ (function () {
        function Grid(rows, columns) {
            this.x = 0;
            this.y = 0;
            this.cellWidth = 32;
            this.cellHeight = 32;
            this.rows = rows;
            this.columns = columns;
            this.resetData();
            this.calculateGridSize();
            this.calculateGridBounds();
        }
        Grid.prototype.resetData = function () {
            this.data = [];
            for (var i = 0; i < this.rows; i++) {
                this.data[i] = [];
                for (var j = 0; j < this.columns; j++) {
                    this.data[i][j] = null;
                }
            }
        };
        Grid.prototype.calculateGridSize = function () {
            this.gridWidth = this.cellWidth * this.columns;
            this.gridHeight = this.cellHeight * this.rows;
        };
        Grid.prototype.calculateGridBounds = function () {
            this.left = this.x;
            this.right = this.x + this.gridWidth;
            this.top = this.y;
            this.bottom = this.y + this.gridHeight;
        };
        Grid.prototype.render = function (viewport) {
            var viewportBounds = new BoundingRect(0, 0, 0, 0);
            if (viewport)
                viewportBounds = viewport;
            var cellBoundingRect = new BoundingRect(0, 0, 0, 0);
            for (var i = 0; i < this.rows; i++) {
                for (var j = 0; j < this.columns; j++) {
                    cellBoundingRect.set(this.x + this.cellWidth * j, this.y + this.cellHeight * i, this.cellWidth, this.cellHeight);
                    var cellBounds = cellBoundingRect.getBounds();
                    // check viewport visibility
                    if (viewport) {
                        if (cellBounds.left > viewportBounds.right || cellBounds.right < viewportBounds.left
                            || cellBounds.top > viewportBounds.bottom || cellBounds.bottom < viewportBounds.top) {
                            continue;
                        }
                    }
                    // top line
                    Draw.line(cellBounds.left, cellBounds.top, cellBounds.right, cellBounds.top);
                    // left line
                    Draw.line(cellBounds.left, cellBounds.top, cellBounds.left, cellBounds.bottom);
                }
            }
            if (viewport) {
                // check bottom line visibility
                if (this.x + this.gridWidth > viewportBounds.left && this.x < viewportBounds.right
                    && this.y + this.gridHeight > viewportBounds.top && this.y + this.gridHeight < viewportBounds.bottom) {
                    // draw big bottom line
                    Draw.line(Math.max(this.x, viewportBounds.left), this.y + this.gridHeight, Math.min(this.x + this.gridWidth, viewportBounds.right), this.y + this.gridHeight);
                }
                // check right line visibility
                if (this.x + this.gridWidth > viewportBounds.left && this.x + this.gridWidth < viewportBounds.right
                    && this.y < viewportBounds.bottom && this.y + this.gridHeight > viewportBounds.top) {
                    // draw big right line
                    Draw.line(this.x + this.gridWidth, Math.max(this.y, viewportBounds.top), this.x + this.gridWidth, Math.min(this.y + this.gridHeight, viewportBounds.bottom));
                }
            }
            else {
                // draw big bottom line
                Draw.line(this.x, this.y + this.gridHeight, this.x + this.gridWidth, this.y + this.gridHeight);
                // draw big right line
                Draw.line(this.x + this.gridWidth, this.y, this.x + this.gridWidth, this.y + this.gridHeight);
            }
        };
        return Grid;
    }());
    var GRID;
    var VIEWPORT;
    var GameScenes = {};
    GameScenes.boot = function () {
        OBJ.addTagByObject(TAG);
    };
    GameScenes.start = function () {
        GRID = new Grid(12, 12);
        VIEWPORT = new BoundingRect(0, 0, Stage.w, Stage.h);
        // debug
        GameData = GRID;
    };
    GameScenes.update = function () {
        if (Input.keyHold(KeyCode.Left)) {
            VIEWPORT.x -= 3;
        }
        if (Input.keyHold(KeyCode.Right)) {
            VIEWPORT.x += 3;
        }
        if (Input.keyHold(KeyCode.Up)) {
            VIEWPORT.y -= 3;
        }
        if (Input.keyHold(KeyCode.Down)) {
            VIEWPORT.y += 3;
        }
    };
    GameScenes.render = function () {
        GRID.render(VIEWPORT);
    };
    GameScenes.renderUI = function () {
        Draw.setFont(Font.m);
        Draw.setColor(C.black);
        Draw.setHVAlign(Align.l, Align.t);
        Draw.text(10, 10, Time.FPS);
    };
    Scene.setup({
        scenes: GameScenes
    });
    Engine.makeGlobalAliases();
    Engine.start();
    return Engine;
})();
