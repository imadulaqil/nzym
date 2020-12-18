/**
 * Input manager.
 */
class NzymInput {

    canvas: HTMLCanvasElement;

    events = {};

    keys = {};
    keyCodes = [];

    preventedKeys = [];

    position = {
        x: 0,
        y: 0
    };

    x = 0;
    y = 0;

    mouses: NzymInputKey[] = [];
    wheelDelta = {
        x: 0,
        y: 0,
        z: 0,
        reset() {
            this.x = 0;
            this.y = 0;
            this.z = 0;
        }
    };

    isMoving = false;

    constructor(public engine: NzymEngine, options: NzymInputOptions = {}) {
        if (options.preventKey) {
            this.preventKey(...options.preventKey);
        }
    }

    init() {
        this.canvas = this.engine.Stage.canvas;

        // Initialize all key codes
        for (const prop in Nzym.KeyCode) {
            const code = Nzym.KeyCode[prop];
            this.addKey(code);

            // Store KeyCode in array form
            this.keyCodes.push(code);
        }

        for (let i = 0; i < 3; i++) {
            this.mouses[i] = new NzymInputKey();
        }

        window.addEventListener('keyup', (e) => this.keyUpEvent(e));
        window.addEventListener('keydown', (e) => this.keyDownEvent(e));
        window.addEventListener('mouseup', (e) => this.mouseUpEvent(e));
        window.addEventListener('mousedown', (e) => this.mouseDownEvent(e));
        window.addEventListener('mousemove', (e) => this.mouseMoveEvent(e));
        window.addEventListener('wheel', (e) => this.wheelEvent(e));
    }

    reset() {
        for (const code in this.keys) {
            this.keys[code].reset();
        }
        for (const mouse of this.mouses) {
            mouse.reset();
        }
        this.wheelDelta.reset();
        this.isMoving = false;
    }

    /**
     * Add keys that you want to prevent default
     * @param codes 
     */
    preventKey(...codes: string[]) {
        for (const code of codes) {
            if (!this.preventedKeys.includes(code)) {
                this.preventedKeys.push(code);
            }
        }
    }

    // --- KEY METHODS ---

    addKey(code: string) {
        this.keys[code] = new NzymInputKey();
    }

    keyUp(code: string) {
        return this.keys[code].released;
    }
    
    keyDown(code: string) {
        return this.keys[code].pressed;
    }
    
    keyHold(code: string) {
        return this.keys[code].held;
    }
    
    keyRepeat(code: string) {
        return this.keys[code].repeated;
    }
    
    keyUpAny() {
        for (const code of this.keyCodes) {
            if (this.keyUp(code)) return true;
        }
        return false;
    }

    keyDownAny() {
        for (const code of this.keyCodes) {
            if (this.keyDown(code)) return true;
        }
        return false;
    }

    keyHoldAny() {
        for (const code of this.keyCodes) {
            if (this.keyHold(code)) return true;
        }
        return false;
    }

    keyRepeatAny() {
        for (const code of this.keyCodes) {
            if (this.keyRepeat(code)) return true;
        }
        return false;
    }

    // --- MOUSE METHODS ---

    mouseUp(button: number) {
        return this.mouses[button].released;
    }

    mouseDown(button: number) {
        return this.mouses[button].pressed;
    }

    mouseHold(button: number) {
        return this.mouses[button].held;
    }

    mouseRepeat(button: number) {
        return this.mouses[button].repeated;
    }

    mouseUpAny() {
        for (let i = 0; i < this.mouses.length; i++) {
            if (this.mouseUp(i)) return true;
        }
        return false;
    }

    mouseDownAny() {
        for (let i = 0; i < this.mouses.length; i++) {
            if (this.mouseDown(i)) return true;
        }
        return false;
    }

    mouseHoldAny() {
        for (let i = 0; i < this.mouses.length; i++) {
            if (this.mouseHold(i)) return true;
        }
        return false;
    }

    mouseRepeatAny() {
        for (let i = 0; i < this.mouses.length; i++) {
            if (this.mouseRepeat(i)) return true;
        }
        return false;
    }

    // --- EVENTS ---

    updatePosition(x: number, y: number) {
        const b = this.canvas.getBoundingClientRect();
        this.x = this.position.x = x - b.x;
        this.y = this.position.y = y - b.y;
    }

    keyUpEvent(e: KeyboardEvent) {
        if (this.keys[e.code]) {
            this.keys[e.code].up();
        }
        Nzym.Events.trigger(this, 'keyup', e);
    }

    keyDownEvent(e: KeyboardEvent) {
        if (this.preventedKeys.includes(e.code)) {
            e.preventDefault();
        }
        if (this.keys[e.code]) {
            this.keys[e.code].down();
        }
        Nzym.Events.trigger(this, 'keydown', e);
    }

    mouseUpEvent(e: MouseEvent) {
        if (this.mouses[e.button]) {
            this.mouses[e.button].up();
        }
        this.updatePosition(e.clientX, e.clientY);
        Nzym.Events.trigger(this, 'mouseup', e);
    }

    mouseDownEvent(e: MouseEvent) {
        if (this.mouses[e.button]) {
            this.mouses[e.button].down();
        }
        this.updatePosition(e.clientX, e.clientY);
        Nzym.Events.trigger(this, 'mousedown', e);
    }

    mouseMoveEvent(e: MouseEvent) {
        this.updatePosition(e.clientX, e.clientY);
        this.isMoving = true;
        Nzym.Events.trigger(this, 'mousemove', e);
    }

    wheelEvent(e: WheelEvent) {
        this.wheelDelta.x = e.deltaX;
        this.wheelDelta.y = e.deltaY;
        this.wheelDelta.z = e.deltaZ;
        this.updatePosition(e.clientX, e.clientY);
        Nzym.Events.trigger(this, 'wheel', e);
    }

}