/**
 * Draw methods.
 */
class NzymDraw {

    ctx: CanvasRenderingContext2D;
    defaultCtx: CanvasRenderingContext2D;
    currentFont: NzymFontFormat;

    Font = new NzymFont();
    vertices = [];
    primitive = { name: 'Fill', quantity: 0, closePath: true, isStroke: false };

    constructor(
        public engine: NzymEngine
    ) {
        this.currentFont = this.Font['m'];
    }

    init() {
        this.ctx = this.defaultCtx = this.engine.Stage.canvas.getContext('2d');
    }

    onCtx(ctx: CanvasRenderingContext2D, drawFn: Function) {
        this.ctx = ctx;
        drawFn();
        this.ctx = this.defaultCtx;
    }

    setFill(color: string) {
        this.ctx.fillStyle = color;
    }

    setStroke(color: string) {
        this.ctx.strokeStyle = color;
    }

    setColor(fillColor: string, strokeColor?: string) {
        this.ctx.fillStyle = fillColor;
        this.ctx.strokeStyle = strokeColor || fillColor;
    }

    setFont(font: NzymFontFormat) {
        this.ctx.font = `${font.style}${font.size}px ${font.family}, serif`;
        this.currentFont = font;
    }

    setHAlign(align) {
        this.ctx.textAlign = align;
    }

    setVAlign(align) {
        this.ctx.textBaseline = align;
    }

    setHVAlign(halign, valign) {
        this.ctx.textAlign = halign;
        this.ctx.textBaseline = valign;
    }

    setAlign(align) {
        this.ctx.textAlign = align;
    }

    setBaseline(align) {
        this.ctx.textBaseline = align;
    }

    splitText(text: string) {
        return ('' + text).split('\n');
    }

    text(x: number, y: number, text: string) {
        let baseline = 0;
        const t = this.splitText(text);
        switch (this.ctx.textBaseline) {
            case 'bottom': baseline = -this.currentFont.size * (t.length - 1); break;
            case 'middle': baseline = -this.currentFont.size * (t.length - 1) * 0.5; break;
        }
        for (let i = t.length - 1; i >= 0; --i) {
            this.ctx.fillText(t[i], x, y + baseline + this.currentFont.size * i);
        }
    }

    textWidth(text: string) {
        return Math.max(...this.splitText(text).map(x => this.ctx.measureText(x).width));
    }

    textHeight(text: string) {
        return this.currentFont.size * this.splitText(text).length;
    }

    setLineCap(lineCap) {
        this.ctx.lineCap = lineCap;
    }

    setLineJoin(lineJoin) {
        this.ctx.lineJoin = lineJoin;
    }

    setLineWidth(width: number) {
        this.ctx.lineWidth = width;
    }

    setStrokeWeight(weight: number) {
        this.setLineWidth(weight);
    }

    setLineDash(segments: number[], offset: number = 0) {
        this.ctx.setLineDash(segments);
        this.ctx.lineDashOffset = offset;
    }

    fill() {
        this.ctx.fill();
    }

    stroke() {
        this.ctx.stroke();
    }

    draw(isStroke?: boolean) {
        isStroke? this.ctx.stroke() : this.ctx.fill();
    }

    rect(x: number, y: number, w: number, h: number, isStroke?: boolean) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.draw(isStroke);
    }

    rectCenter(x: number, y: number, w: number, h: number, isStroke?: boolean) {
        this.rect(x - w / 2, y - h / 2, w, h, isStroke);
    }

    circle(x: number, y: number, r: number, isStroke?: boolean) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.draw(isStroke);
    }

    arc(x: number, y: number, r: number, startAngle: number, endAngle: number, anticlockwise?: boolean) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, startAngle, endAngle, anticlockwise);
        this.ctx.stroke();
    }

    line(x1: number, y1: number, x2: number, y2: number) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }

    linePoint(p1: NzymPointFormat, p2: NzymPointFormat) {
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
    }

    primitiveBegin() {
        this.vertices.length = 0;
    }

    vertex(x: number, y: number) {
        this.vertices.push({ x, y });
    }

    primitiveEnd(primitive = this.primitive) {
        this.primitive = primitive;
        const q = this.primitive.quantity;
        this.ctx.save();
        if (q === 1) {
            this.ctx.lineCap = 'round';
            if (this.ctx.lineWidth < 3.5) {
                this.ctx.lineWidth = 3.5;
            }
        }
        this.ctx.beginPath();
        for (let i = 0; i < this.vertices.length; i++) {
            const v = this.vertices[i];
            if (q === 1) {
                this.draw(this.primitive.isStroke);
                this.ctx.beginPath();
                this.ctx.moveTo(v.x, v.y);
                this.ctx.lineTo(v.x, v.y);
            }
            else if (i === 0 || (q > 1 && i % q === 0)) {
                if (this.primitive.closePath) this.ctx.closePath();
                this.draw(this.primitive.isStroke);
                this.ctx.beginPath();
                this.ctx.moveTo(v.x, v.y);
            }
            else this.ctx.lineTo(v.x, v.y);
        }
        if (this.primitive.closePath) this.ctx.closePath();
        this.draw(this.primitive.isStroke);
        this.ctx.restore();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

}