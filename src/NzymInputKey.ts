class NzymInputKey {

    held = false;
    pressed = false;
    released = false;
    repeated = false;

    up() {
        this.held = false;
        this.released = true;
    }

    down() {
        if (!this.held) {
            this.held = true;
            this.pressed = true;
        }
        this.repeated = true;
    }

    reset() {
        this.pressed = false;
        this.released = false;
        this.repeated = false;
    }
}