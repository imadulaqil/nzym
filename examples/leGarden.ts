let GameData: any;
Nzym.Example.leGarden = (() => {

    const {
        C,
        Align,
        Common,
        Events,
        KeyCode,
        LineCap,
        LineJoin,
        LineDash,
        Primitive
    } = Nzym.getAliases();

    const Engine = new NzymEngine({
        name: 'Le Garden',
        w: 800,
        h: 576,
        bgColor: C.skyBlue,
        parent: document.getElementById('gameContainer')
    });

    const {
        Log,
        OBJ,
        Draw,
        Font,
        Time,
        Input,
        Scene,
        Sound,
        Stage,
        Loader
    } = Engine.getAliases();

    enum TAG {
        player = 'player',
        item = 'item'
    };

    class BoundingRect {

        constructor(
            public x: number,
            public y: number,
            public w: number,
            public h: number
        ) { }

        set(x: number, y: number, w: number, h: number) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }

        getBounds() {
            return {
                left: this.left,
                right: this.right,
                top: this.top,
                bottom: this.bottom
            };
        }

        get left() {
            return this.x;
        }

        get right() {
            return this.x + this.w;
        }

        get top() {
            return this.y;
        }

        get bottom() {
            return this.y + this.h;
        }

        static getBounds(x: number, y: number, w: number, h: number) {
            return (new BoundingRect(x, y, w, h)).getBounds();
        }
    }

    class Grid {

        data: number[][];

        readonly rows: number;
        columns: number;

        x: number = 0;
        y: number = 0;

        cellWidth: number = 32;
        cellHeight: number = 32;

        gridWidth: number;
        gridHeight: number;

        left: number;
        right: number;
        top: number;
        bottom: number;

        constructor(rows: number, columns: number) {
            this.rows = rows;
            this.columns = columns;
            this.resetData();
            this.calculateGridSize();
            this.calculateGridBounds();
        }

        resetData() {
            this.data = [];
            for (let i = 0; i < this.rows; i++) {
                this.data[i] = [];
                for (let j = 0; j < this.columns; j++) {
                    this.data[i][j] = null;
                }
            }
        }

        calculateGridSize() {
            this.gridWidth = this.cellWidth * this.columns;
            this.gridHeight = this.cellHeight * this.rows;
        }

        calculateGridBounds() {
            this.left = this.x;
            this.right = this.x + this.gridWidth;
            this.top = this.y;
            this.bottom = this.y + this.gridHeight;
        }

        render(viewport?: BoundingRect) {
            let viewportBounds = new BoundingRect(0, 0, 0, 0);
            if (viewport) viewportBounds = viewport;

            const cellBoundingRect = new BoundingRect(0, 0, 0, 0);

            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.columns; j++) {
                    cellBoundingRect.set(this.x + this.cellWidth * j, this.y + this.cellHeight * i, this.cellWidth, this.cellHeight);
                    const cellBounds = cellBoundingRect.getBounds();

                    // check viewport visibility
                    if (viewport) {
                        if (cellBounds.left > viewportBounds.right || cellBounds.right < viewportBounds.left
                            || cellBounds.top > viewportBounds.bottom || cellBounds.bottom < viewportBounds.top) {
                            continue;
                        }
                    }

                    // top line
                    Draw.line(
                        cellBounds.left, cellBounds.top,
                        cellBounds.right, cellBounds.top
                    );

                    // left line
                    Draw.line(
                        cellBounds.left, cellBounds.top,
                        cellBounds.left, cellBounds.bottom
                    );
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
        }
    }

    let GRID: Grid;
    let VIEWPORT: BoundingRect;

    const GameScenes: NzymGameScenes = {};

    GameScenes.boot = () => {
        OBJ.addTagByObject(TAG);
    };

    GameScenes.start = () => {
        GRID = new Grid(12, 12);
        VIEWPORT = new BoundingRect(0, 0, Stage.w, Stage.h);

        // debug
        GameData = GRID;
    };

    GameScenes.update = () => {
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

    GameScenes.render = () => {
        GRID.render(VIEWPORT);
    };

    GameScenes.renderUI = () => {
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