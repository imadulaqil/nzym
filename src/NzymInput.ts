/**
 * Input manager.
 */
class NzymInput {

    canvas: HTMLCanvasElement;

    events = {};

    position = {
        x: 0,
        y: 0
    };
    
    x = 0;
    y = 0;

    keys = {};

    constructor(
        public engine: NzymEngine
    ) {}

    init() {
        this.canvas = this.engine.Stage.canvas;

        // Initialize all key codes
        for (const prop in Nzym.KeyCode) {
            this.addKey(Nzym.KeyCode[prop]);
        }

        window.addEventListener('keyup', (e) => this.keyUpEvent(e));
        window.addEventListener('keydown', (e) => this.keyDownEvent(e));
    }

    reset() {
        for (const code in this.keys) {
            this.keys[code].reset();
        }
    }

    addKey(code: string) {
        this.keys[code] = new NzymInputKey();
    }

    keyUpEvent(e: KeyboardEvent) {
        if (this.keys[e.code]) {
            this.keys[e.code].up();
        }
        Nzym.Events.trigger(this, 'keyup', e);
    }

    keyDownEvent(e: KeyboardEvent) {
        if (this.keys[e.code]) {
            this.keys[e.code].down();
        }
        Nzym.Events.trigger(this, 'keydown', e);
    }
}