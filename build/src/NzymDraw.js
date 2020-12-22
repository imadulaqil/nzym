/**
 * Draw methods.
 */
var NzymDraw = /** @class */ (function () {
    function NzymDraw(engine) {
        this.engine = engine;
        this.Font = new NzymFont();
        this.vertices = [];
        this.primitive = { name: 'Fill', quantity: 0, closePath: true, isStroke: false };
        this.images = {};
        this.currentFont = this.Font.m;
        this.lastText = {
            x: 0,
            y: 0,
            text: '',
            font: this.currentFont
        };
    }
    NzymDraw.prototype.init = function () {
        this.ctx = this.defaultCtx = this.engine.Stage.canvas.getContext('2d');
        this.Font.embedGoogleFonts('Quicksand');
    };
    NzymDraw.prototype.onCtx = function (ctx, drawFn) {
        this.ctx = ctx;
        drawFn();
        this.ctx = this.defaultCtx;
    };
    NzymDraw.prototype.onCanvas = function (canvas, drawFn) {
        this.onCtx(canvas.getContext('2d'), drawFn);
    };
    NzymDraw.prototype.createCanvas = function (w, h, drawFn) {
        var canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        if (drawFn) {
            this.ctx = canvas.getContext('2d');
            drawFn(canvas, canvas.width, canvas.height);
            this.ctx = this.defaultCtx;
        }
        return canvas;
    };
    NzymDraw.prototype.setAlpha = function (alpha) {
        this.ctx.globalAlpha = alpha;
    };
    NzymDraw.prototype.setFill = function (color) {
        this.ctx.fillStyle = color;
    };
    NzymDraw.prototype.setStroke = function (color) {
        this.ctx.strokeStyle = color;
    };
    NzymDraw.prototype.setColor = function (fillColor, strokeColor) {
        this.ctx.fillStyle = fillColor;
        this.ctx.strokeStyle = strokeColor || fillColor;
    };
    NzymDraw.prototype.setFont = function (font) {
        this.ctx.font = "" + font.style + font.size + "px " + font.family + ", serif";
        this.currentFont = font;
    };
    NzymDraw.prototype.setHAlign = function (halign) {
        this.ctx.textAlign = halign;
    };
    NzymDraw.prototype.setVAlign = function (valign) {
        this.ctx.textBaseline = valign;
    };
    NzymDraw.prototype.setHVAlign = function (halign, valign) {
        this.ctx.textAlign = halign;
        this.ctx.textBaseline = valign;
    };
    NzymDraw.prototype.setAlign = function (align) {
        this.ctx.textAlign = align;
    };
    NzymDraw.prototype.setBaseline = function (baseline) {
        this.ctx.textBaseline = baseline;
    };
    NzymDraw.prototype.splitText = function (text) {
        return ('' + text).split('\n');
    };
    NzymDraw.prototype.text = function (x, y, text) {
        this.lastText.x = x;
        this.lastText.y = y;
        this.lastText.text = text;
        this.lastText.font = this.currentFont;
        var baseline = 0;
        var t = this.splitText(text);
        switch (this.ctx.textBaseline) {
            case 'bottom':
                baseline = -this.currentFont.size * (t.length - 1);
                break;
            case 'middle':
                baseline = -this.currentFont.size * (t.length - 1) * 0.5;
                break;
        }
        for (var i = t.length - 1; i >= 0; --i) {
            this.ctx.fillText(t[i], x, y + baseline + this.currentFont.size * i);
        }
    };
    NzymDraw.prototype.textWidth = function (text, font) {
        var _this = this;
        if (font === void 0) { font = this.currentFont; }
        var temp = this.currentFont;
        this.setFont(font);
        var result = Math.max.apply(Math, this.splitText(text).map(function (x) { return _this.ctx.measureText(x).width; }));
        this.setFont(temp);
        return result;
    };
    NzymDraw.prototype.textHeight = function (text, charHeight) {
        if (charHeight === void 0) { charHeight = this.currentFont.size; }
        return charHeight * this.splitText(text).length;
    };
    NzymDraw.prototype.getLastTextWidth = function () {
        return this.textWidth(this.lastText.text, this.lastText.font);
    };
    NzymDraw.prototype.getLastTextHeight = function () {
        return this.textHeight(this.lastText.text, this.lastText.font.size);
    };
    NzymDraw.prototype.setLineCap = function (lineCap) {
        this.ctx.lineCap = lineCap;
    };
    NzymDraw.prototype.setLineJoin = function (lineJoin) {
        this.ctx.lineJoin = lineJoin;
    };
    NzymDraw.prototype.setLineWidth = function (width) {
        this.ctx.lineWidth = width;
    };
    NzymDraw.prototype.setStrokeWeight = function (weight) {
        this.setLineWidth(weight);
    };
    NzymDraw.prototype.setLineDash = function (segments, offset) {
        if (offset === void 0) { offset = 0; }
        this.ctx.setLineDash(segments);
        this.ctx.lineDashOffset = offset;
    };
    NzymDraw.prototype.fill = function () {
        this.ctx.fill();
    };
    NzymDraw.prototype.stroke = function () {
        this.ctx.stroke();
    };
    NzymDraw.prototype.draw = function (isStroke) {
        isStroke ? this.ctx.stroke() : this.ctx.fill();
    };
    NzymDraw.prototype.rect = function (x, y, w, h, isStroke) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.draw(isStroke);
    };
    NzymDraw.prototype.rectCenter = function (x, y, w, h, isStroke) {
        this.rect(x - w / 2, y - h / 2, w, h, isStroke);
    };
    NzymDraw.prototype.rectObject = function (rect, isStroke) {
        this.rect(rect.x, rect.y, rect.w, rect.h, isStroke);
    };
    NzymDraw.prototype.circle = function (x, y, r, isStroke) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.draw(isStroke);
    };
    NzymDraw.prototype.arc = function (x, y, r, startAngle, endAngle, anticlockwise) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, startAngle, endAngle, anticlockwise);
        this.ctx.stroke();
    };
    NzymDraw.prototype.line = function (x1, y1, x2, y2) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    };
    NzymDraw.prototype.linePoint = function (p1, p2) {
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
    };
    NzymDraw.prototype.plus = function (x, y, radius) {
        this.ctx.beginPath();
        this.ctx.moveTo(x - radius, y);
        this.ctx.lineTo(x + radius, y);
        this.ctx.moveTo(x, y - radius);
        this.ctx.lineTo(x, y + radius);
        this.stroke();
    };
    NzymDraw.prototype.primitiveBegin = function () {
        this.vertices.length = 0;
    };
    NzymDraw.prototype.vertex = function (x, y) {
        this.vertices.push({ x: x, y: y });
    };
    NzymDraw.prototype.primitiveEnd = function (primitive) {
        if (primitive === void 0) { primitive = this.primitive; }
        this.primitive = primitive;
        var q = this.primitive.quantity;
        this.ctx.save();
        if (q === 1) {
            this.ctx.lineCap = 'round';
            if (this.ctx.lineWidth < 3.5) {
                this.ctx.lineWidth = 3.5;
            }
        }
        this.ctx.beginPath();
        for (var i = 0; i < this.vertices.length; i++) {
            var v = this.vertices[i];
            if (q === 1) {
                this.draw(this.primitive.isStroke);
                this.ctx.beginPath();
                this.ctx.moveTo(v.x, v.y);
                this.ctx.lineTo(v.x, v.y);
            }
            else if (i === 0 || (q > 1 && i % q === 0)) {
                if (this.primitive.closePath)
                    this.ctx.closePath();
                this.draw(this.primitive.isStroke);
                this.ctx.beginPath();
                this.ctx.moveTo(v.x, v.y);
            }
            else
                this.ctx.lineTo(v.x, v.y);
        }
        if (this.primitive.closePath)
            this.ctx.closePath();
        this.draw(this.primitive.isStroke);
        this.ctx.restore();
    };
    NzymDraw.prototype.onTransform = function (x, y, xscale, yscale, angle, drawFn, isRadians) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(isRadians ? angle : Nzym.Common.degtorad(angle));
        this.ctx.scale(xscale, yscale);
        drawFn();
        this.ctx.restore();
    };
    NzymDraw.prototype.addImage = function (name, img) {
        this.images[name] = img;
    };
    NzymDraw.prototype.getImage = function (name) {
        return this.images[name];
    };
    NzymDraw.prototype.image = function (name, x, y, xscale, yscale, angle, originX, originY, isRadians) {
        var _this = this;
        if (xscale === void 0) { xscale = 1; }
        if (yscale === void 0) { yscale = 1; }
        if (angle === void 0) { angle = 0; }
        if (originX === void 0) { originX = 0.5; }
        if (originY === void 0) { originY = 0.5; }
        var img;
        if (typeof name === 'string') {
            img = this.images[name];
        }
        else {
            img = name;
        }
        originX *= -img.width;
        originY *= -img.height;
        this.onTransform(x, y, xscale, yscale, angle, function () {
            _this.ctx.drawImage(img, originX, originY);
        }, isRadians);
    };
    NzymDraw.prototype.strip = function (name, stripsCount, index, x, y, xscale, yscale, angle, originX, originY, isRadians) {
        var _this = this;
        if (xscale === void 0) { xscale = 1; }
        if (yscale === void 0) { yscale = 1; }
        if (angle === void 0) { angle = 0; }
        if (originX === void 0) { originX = 0.5; }
        if (originY === void 0) { originY = 0.5; }
        var img = (typeof name === 'string') ? this.images[name] : name;
        var s = {
            w: Number(img.width) / stripsCount,
            h: Number(img.height)
        };
        originX *= -s.w;
        originY *= -s.h;
        this.onTransform(x, y, xscale, yscale, angle, function () {
            _this.ctx.drawImage(img, (index % stripsCount) * s.w, 0, s.w, s.h, originX, originY, s.w, s.h);
        }, isRadians);
    };
    NzymDraw.prototype.smooth = function () {
        this.ctx.imageSmoothingEnabled = true;
    };
    NzymDraw.prototype.noSmooth = function () {
        this.ctx.imageSmoothingEnabled = false;
    };
    NzymDraw.prototype.clear = function () {
        var b = this.ctx.canvas.getBoundingClientRect();
        this.ctx.clearRect(0, 0, b.width, b.height);
    };
    return NzymDraw;
}());
