/**
 * Font manager.
 */
class NzymFont {

    regular = '';
    bold = 'bold ';
    italic = 'italic ';
    boldItalic = 'bold italic ';

    xxl: NzymFontFormat;
    xl: NzymFontFormat;
    l: NzymFontFormat;
    ml: NzymFontFormat;
    m: NzymFontFormat;
    sm: NzymFontFormat;
    s: NzymFontFormat;
    xs: NzymFontFormat;
    xxlb: NzymFontFormat;
    xlb: NzymFontFormat;
    lb: NzymFontFormat;
    mlb: NzymFontFormat;
    mb: NzymFontFormat;
    smb: NzymFontFormat;
    sb: NzymFontFormat;
    xsb: NzymFontFormat;

    constructor(
        public defaultFamily: string = 'Quicksand, sans-serif'
    ) {
        this.xxl  = this.makeFont(64);
        this.xl   = this.makeFont(48);
        this.l    = this.makeFont(30);
        this.ml   = this.makeFont(24);
        this.m    = this.makeFont(20);
        this.sm   = this.makeFont(16);
        this.s    = this.makeFont(10);
        this.xs    = this.makeFont(8);
        this.xxlb  = this.makeFont(this.xxl.size, this.bold);
        this.xlb   = this.makeFont(this.xl.size , this.bold);
        this.lb    = this.makeFont(this.l.size  , this.bold);
        this.mlb   = this.makeFont(this.ml.size , this.bold);
        this.mb    = this.makeFont(this.m.size  , this.bold);
        this.smb   = this.makeFont(this.sm.size , this.bold);
        this.sb    = this.makeFont(this.s.size  , this.bold);
        this.xsb   = this.makeFont(this.xs.size , this.bold);
    }
    
    makeFont(size: number, style: string = this.regular, family: string = this.defaultFamily): NzymFontFormat {
        return { size, style, family };
    }

    forEach(callbackFn: Function) {
        let font: any;
        for (const prop in this) {
            font = this[prop];
            if (typeof font === 'object') {
                if (font.size !== undefined && font.style !== undefined && font.family !== undefined) {
                    callbackFn(font);
                }
            }
        }
    }

    embedGoogleFonts(...fontNames: string[]) {
        const prelink = document.createElement('link');
        prelink.href = 'https://fonts.gstatic.com';
        prelink.rel = 'preconnect';

        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=${fontNames.join('+')}&display=swap`;
        link.rel = 'stylesheet';

        document.head.appendChild(prelink);
        document.head.appendChild(link);
    }
}