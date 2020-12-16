/**
 * HTML canvas wrapper.
 */
class NzymStage {

    w: number;
    h: number;
    mid: { w: number, h: number };

    canvas: HTMLCanvasElement;
    pixelRatio = 2;

    constructor(public engine: NzymEngine, options: NzymStageOptions = {}) {
        if (options.canvas) {
            this.canvas = options.canvas;
        }
        else {
            const canvasOptions: NzymStageOptions & NzymSceneCreateCanvasOptions = options;
            canvasOptions.autoAppend = true;
            this.canvas = this.createCanvas(canvasOptions);
        }
        this.init();
        this.applyPixelRatio(options.pixelRatio);
    }
    
    init() {
        const b = this.canvas.getBoundingClientRect();
        this.w = b.width;
        this.h = b.height;
        this.mid = {
            w: this.w / 2,
            h: this.h / 2
        };
    }

    applyPixelRatio(pixelRatio: number = this.pixelRatio) {
        this.pixelRatio = pixelRatio;
        this.canvas.width = this.w * this.pixelRatio;
        this.canvas.height = this.h * this.pixelRatio;
        this.canvas.getContext('2d').resetTransform();
        this.canvas.getContext('2d').scale(this.pixelRatio, this.pixelRatio);
    }

    createCanvas(options: NzymSceneCreateCanvasOptions = {}) {
        // Create the default canvas
        const canvas = document.createElement('canvas');
        if (options.w && options.h) {
            // Both `w` and `h` have to be exists to set the canvas size
            canvas.style.width = `${options.w}px`;
            canvas.style.height = `${options.h}px`;
        }
        else {
            // Otherwise set to default
            canvas.style.width = '800px';
            canvas.style.height = '600px';
        }
        if (options.bgColor) {
            // Set style background color if provided
            canvas.style.backgroundColor = options.bgColor;
        }
        else {
            // Otherwise make a nice little gradient as the background
            canvas.style.backgroundImage = 'radial-gradient(white 33%, mintcream)';
        }
        if (options.autoAppend) {
            if (options.parent) {
                options.parent.appendChild(canvas);
            }
            else {
                document.body.appendChild(canvas);
            }
        }
        return canvas;
    }

    randomX() {
        return Math.random() * this.w;
    }

    randomY() {
        return Math.random() * this.h;
    }

    hide() {
        this.canvas.style.display = 'none';
    }

    show() {
        this.canvas.style.display = 'initial';
    }

    get isHidden() {
        return this.canvas.style.display === 'none';
    }

}