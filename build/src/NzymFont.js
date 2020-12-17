/**
 * Font manager.
 */
var NzymFont = /** @class */ (function () {
    function NzymFont(defaultFamily) {
        if (defaultFamily === void 0) { defaultFamily = 'Quicksand, sans-serif'; }
        this.defaultFamily = defaultFamily;
        this.regular = '';
        this.bold = 'bold ';
        this.italic = 'italic ';
        this.boldItalic = 'bold italic ';
        this.vvl = this.makeFont(128);
        this.vl = this.makeFont(96);
        this.xxl = this.makeFont(64);
        this.xl = this.makeFont(48);
        this.l = this.makeFont(32);
        this.ml = this.makeFont(24);
        this.m = this.makeFont(20);
        this.sm = this.makeFont(16);
        this.s = this.makeFont(12);
        this.xs = this.makeFont(8);
        this.vvlb = this.makeFont(this.vvl.size, this.bold);
        this.vlb = this.makeFont(this.vl.size, this.bold);
        this.xxlb = this.makeFont(this.xxl.size, this.bold);
        this.xlb = this.makeFont(this.xl.size, this.bold);
        this.lb = this.makeFont(this.l.size, this.bold);
        this.mlb = this.makeFont(this.ml.size, this.bold);
        this.mb = this.makeFont(this.m.size, this.bold);
        this.smb = this.makeFont(this.sm.size, this.bold);
        this.sb = this.makeFont(this.s.size, this.bold);
        this.xsb = this.makeFont(this.xs.size, this.bold);
        this.vvli = this.makeFont(this.vvl.size, this.italic);
        this.vli = this.makeFont(this.vl.size, this.italic);
        this.xxli = this.makeFont(this.xxl.size, this.italic);
        this.xli = this.makeFont(this.xl.size, this.italic);
        this.li = this.makeFont(this.l.size, this.italic);
        this.mli = this.makeFont(this.ml.size, this.italic);
        this.mi = this.makeFont(this.m.size, this.italic);
        this.smi = this.makeFont(this.sm.size, this.italic);
        this.si = this.makeFont(this.s.size, this.italic);
        this.xsi = this.makeFont(this.xs.size, this.italic);
        this.vvlbi = this.makeFont(this.vvl.size, this.boldItalic);
        this.vlbi = this.makeFont(this.vl.size, this.boldItalic);
        this.xxlbi = this.makeFont(this.xxl.size, this.boldItalic);
        this.xlbi = this.makeFont(this.xl.size, this.boldItalic);
        this.lbi = this.makeFont(this.l.size, this.boldItalic);
        this.mlbi = this.makeFont(this.ml.size, this.boldItalic);
        this.mbi = this.makeFont(this.m.size, this.boldItalic);
        this.smbi = this.makeFont(this.sm.size, this.boldItalic);
        this.sbi = this.makeFont(this.s.size, this.boldItalic);
        this.xsbi = this.makeFont(this.xs.size, this.boldItalic);
    }
    NzymFont.prototype.makeFont = function (size, style, family) {
        if (style === void 0) { style = this.regular; }
        if (family === void 0) { family = this.defaultFamily; }
        return { size: size, style: style, family: family };
    };
    NzymFont.prototype.forEach = function (callbackFn) {
        var font;
        for (var prop in this) {
            font = this[prop];
            if (typeof font === 'object') {
                if (font.size !== undefined && font.style !== undefined && font.family !== undefined) {
                    callbackFn(font, prop);
                }
            }
        }
    };
    NzymFont.prototype.embedGoogleFonts = function () {
        var fontNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fontNames[_i] = arguments[_i];
        }
        var prelink = document.createElement('link');
        prelink.href = 'https://fonts.gstatic.com';
        prelink.rel = 'preconnect';
        var link = document.createElement('link');
        link.href = "https://fonts.googleapis.com/css2?family=" + fontNames.join('+') + "&display=swap";
        link.rel = 'stylesheet';
        document.head.appendChild(prelink);
        document.head.appendChild(link);
    };
    NzymFont.prototype.isRegular = function (font) {
        return font.style === this.regular;
    };
    NzymFont.prototype.isBold = function (font) {
        return font.style.includes(this.bold);
    };
    NzymFont.prototype.isItalic = function (font) {
        return font.style.includes(this.italic);
    };
    NzymFont.prototype.isBoldItalic = function (font) {
        return font.style === this.boldItalic;
    };
    return NzymFont;
}());
