/**
 * Font manager.
 */
class NzymFont {

    regular = '';
    bold = 'bold ';
    italic = 'italic ';
    boldItalic = 'bold italic ';

    vvl: NzymFontFormat;
    vl: NzymFontFormat;
    xxl: NzymFontFormat;
    xl: NzymFontFormat;
    l: NzymFontFormat;
    ml: NzymFontFormat;
    m: NzymFontFormat;
    sm: NzymFontFormat;
    s: NzymFontFormat;
    xs: NzymFontFormat;

    vvlb: NzymFontFormat;
    vlb: NzymFontFormat;
    xxlb: NzymFontFormat;
    xlb: NzymFontFormat;
    lb: NzymFontFormat;
    mlb: NzymFontFormat;
    mb: NzymFontFormat;
    smb: NzymFontFormat;
    sb: NzymFontFormat;
    xsb: NzymFontFormat;

    vvli: NzymFontFormat;
    vli: NzymFontFormat;
    xxli: NzymFontFormat;
    xli: NzymFontFormat;
    li: NzymFontFormat;
    mli: NzymFontFormat;
    mi: NzymFontFormat;
    smi: NzymFontFormat;
    si: NzymFontFormat;
    xsi: NzymFontFormat;

    vvlbi: NzymFontFormat;
    vlbi: NzymFontFormat;
    xxlbi: NzymFontFormat;
    xlbi: NzymFontFormat;
    lbi: NzymFontFormat;
    mlbi: NzymFontFormat;
    mbi: NzymFontFormat;
    smbi: NzymFontFormat;
    sbi: NzymFontFormat;
    xsbi: NzymFontFormat;

    constructor(public defaultFamily: string = 'Quicksand, sans-serif') {
        this.vvl = this.makeFont(128);
        this.vl  = this.makeFont(96);
        this.xxl = this.makeFont(64);
        this.xl  = this.makeFont(48);
        this.l   = this.makeFont(32);
        this.ml  = this.makeFont(24);
        this.m   = this.makeFont(20);
        this.sm  = this.makeFont(16);
        this.s   = this.makeFont(12);
        this.xs  = this.makeFont(8);

        this.vvlb = this.makeFont(this.vvl.size, this.bold);
        this.vlb  = this.makeFont(this.vl.size , this.bold);
        this.xxlb = this.makeFont(this.xxl.size, this.bold);
        this.xlb  = this.makeFont(this.xl.size , this.bold);
        this.lb   = this.makeFont(this.l.size  , this.bold);
        this.mlb  = this.makeFont(this.ml.size , this.bold);
        this.mb   = this.makeFont(this.m.size  , this.bold);
        this.smb  = this.makeFont(this.sm.size , this.bold);
        this.sb   = this.makeFont(this.s.size  , this.bold);
        this.xsb  = this.makeFont(this.xs.size , this.bold);

        this.vvli = this.makeFont(this.vvl.size, this.italic);
        this.vli  = this.makeFont(this.vl.size , this.italic);
        this.xxli = this.makeFont(this.xxl.size, this.italic);
        this.xli  = this.makeFont(this.xl.size , this.italic);
        this.li   = this.makeFont(this.l.size  , this.italic);
        this.mli  = this.makeFont(this.ml.size , this.italic);
        this.mi   = this.makeFont(this.m.size  , this.italic);
        this.smi  = this.makeFont(this.sm.size , this.italic);
        this.si   = this.makeFont(this.s.size  , this.italic);
        this.xsi  = this.makeFont(this.xs.size , this.italic);

        this.vvlbi = this.makeFont(this.vvl.size, this.boldItalic);
        this.vlbi  = this.makeFont(this.vl.size , this.boldItalic);
        this.xxlbi = this.makeFont(this.xxl.size, this.boldItalic);
        this.xlbi  = this.makeFont(this.xl.size , this.boldItalic);
        this.lbi   = this.makeFont(this.l.size  , this.boldItalic);
        this.mlbi  = this.makeFont(this.ml.size , this.boldItalic);
        this.mbi   = this.makeFont(this.m.size  , this.boldItalic);
        this.smbi  = this.makeFont(this.sm.size , this.boldItalic);
        this.sbi   = this.makeFont(this.s.size  , this.boldItalic);
        this.xsbi  = this.makeFont(this.xs.size , this.boldItalic);
    }
    
    makeFont(size: number, style: string = this.regular, family: string = this.defaultFamily): NzymFontFormat {
        return { size, style, family };
    }

    forEach(callbackFn: (font: NzymFontFormat, name?: string) => void) {
        let font: any;
        for (const prop in this) {
            font = this[prop];
            if (typeof font === 'object') {
                if (font.size !== undefined && font.style !== undefined && font.family !== undefined) {
                    callbackFn(font, prop);
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

    isRegular(font: NzymFontFormat) {
        return font.style === this.regular;
    }

    isBold(font: NzymFontFormat) {
        return font.style.includes(this.bold);
    }

    isItalic(font: NzymFontFormat) {
        return font.style.includes(this.italic);
    }

    isBoldItalic(font: NzymFontFormat) {
        return font.style === this.boldItalic;
    }
}