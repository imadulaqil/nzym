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
        this.xxl = this.makeFont(64);
        this.xl = this.makeFont(48);
        this.l = this.makeFont(30);
        this.ml = this.makeFont(24);
        this.m = this.makeFont(20);
        this.sm = this.makeFont(16);
        this.s = this.makeFont(10);
        this.xs = this.makeFont(8);
        this.xxlb = this.makeFont(this.xxl.size, this.bold);
        this.xlb = this.makeFont(this.xl.size, this.bold);
        this.lb = this.makeFont(this.l.size, this.bold);
        this.mlb = this.makeFont(this.ml.size, this.bold);
        this.mb = this.makeFont(this.m.size, this.bold);
        this.smb = this.makeFont(this.sm.size, this.bold);
        this.sb = this.makeFont(this.s.size, this.bold);
        this.xsb = this.makeFont(this.xs.size, this.bold);
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
                    callbackFn(font);
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
    return NzymFont;
}());
