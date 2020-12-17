/**
 * This file will be the first when merging.
 */

type NzymCommon = {
    ID: number,
    RAD_TO_DEG: number,
    DEG_TO_RAD: number,
    getID: Function,
    pick: Function,
    choose: Function,
    picko: Function,
    toString: Function,
    range: Function,
    radtodeg: Function,
    degtorad: Function
};

type NzymEvents = {
    on: Function,
    off: Function,
    trigger: Function
};

type NzymColor = {
    aliceBlue: string,
    antiqueWhite: string,
    aqua: string,
    aquamarine: string,
    azure: string,
    beige: string,
    bisque: string,
    black: string,
    blanchedAlmond: string,
    blue: string,
    blueViolet: string,
    brown: string,
    burlyWood: string,
    cadetBlue: string,
    chartreuse: string,
    chocolate: string,
    coral: string,
    cornflowerBlue: string,
    cornsilk: string,
    crimson: string,
    cyan: string,
    darkBlue: string,
    darkCyan: string,
    darkGoldenRod: string,
    darkGray: string,
    darkGrey: string,
    darkGreen: string,
    darkKhaki: string,
    darkMagenta: string,
    darkOliveGreen: string,
    darkOrange: string,
    darkOrchid: string,
    darkRed: string,
    darkSalmon: string,
    darkSeaGreen: string,
    darkSlateBlue: string,
    darkSlateGray: string,
    darkSlateGrey: string,
    darkTurquoise: string,
    darkViolet: string,
    deepPink: string,
    deepSkyBlue: string,
    dimGray: string,
    dimGrey: string,
    dodgerBlue: string,
    fireBrick: string,
    floralWhite: string,
    forestGreen: string,
    fuchsia: string,
    gainsboro: string,
    ghostWhite: string,
    gold: string,
    goldenRod: string,
    gray: string,
    grey: string,
    green: string,
    greenYellow: string,
    honeyDew: string,
    hotPink: string,
    indianRed: string,
    indigo: string,
    ivory: string,
    khaki: string,
    lavender: string,
    lavenderBlush: string,
    lawnGreen: string,
    lemonChiffon: string,
    lightBlue: string,
    lightCoral: string,
    lightCyan: string,
    lightGoldenRodYellow: string,
    lightGray: string,
    lightGrey: string,
    lightGreen: string,
    lightPink: string,
    lightSalmon: string,
    lightSeaGreen: string,
    lightSkyBlue: string,
    lightSlateGray: string,
    lightSlateGrey: string,
    lightSteelBlue: string,
    lightYellow: string,
    lime: string,
    limeGreen: string,
    linen: string,
    magenta: string,
    maroon: string,
    mediumAquaMarine: string,
    mediumBlue: string,
    mediumOrchid: string,
    mediumPurple: string,
    mediumSeaGreen: string,
    mediumSlateBlue: string,
    mediumSpringGreen: string,
    mediumTurquoise: string,
    mediumVioletRed: string,
    midnightBlue: string,
    mintCream: string,
    mistyRose: string,
    moccasin: string,
    navajoWhite: string,
    navy: string,
    oldLace: string,
    olive: string,
    oliveDrab: string,
    orange: string,
    orangeRed: string,
    orchid: string,
    paleGoldenRod: string,
    paleGreen: string,
    paleTurquoise: string,
    paleVioletRed: string,
    papayaWhip: string,
    peachPuff: string,
    peru: string,
    pink: string,
    plum: string,
    powderBlue: string,
    purple: string,
    rebeccaPurple: string,
    red: string,
    rosyBrown: string,
    royalBlue: string,
    saddleBrown: string,
    salmon: string,
    sandyBrown: string,
    seaGreen: string,
    seaShell: string,
    sienna: string,
    silver: string,
    skyBlue: string,
    slateBlue: string,
    slateGray: string,
    slateGrey: string,
    snow: string,
    springGreen: string,
    steelBlue: string,
    tan: string,
    teal: string,
    thistle: string,
    tomato: string,
    turquoise: string,
    violet: string,
    wheat: string,
    white: string,
    whiteSmoke: string,
    yellow: string,
    yellowGreen: string,
    none: string,
    keys: string[],
    list: string[],
    random: Function,
    init: Function
};

type NzymDrawConstants = {
    C: NzymColor,
    Align: any,
    LineCap: any,
    LineJoin: any,
    LineDash: any,
    Primitive: any
};

var Nzym: {
    Log?: NzymLog,
    Common?: NzymCommon,
    Events?: NzymEvents,
    KeyCode?: any,
    DrawConstants?: NzymDrawConstants,
    createEngine?: (options: NzymEngineOptions) => NzymEngine,
    start?: (options: NzymEngineOptions) => NzymEngine
} = Nzym || {};

type NzymOBJOptions = {
    autoClear?: boolean,
    autoUpdate?: boolean,
    autoRender?: boolean
};

type NzymGameScene = {
    boot?: Function,
    loaded?: Function,
    start?: Function,
    update?: Function,
    render?: Function,
    renderUI?: Function,
    onLoad?: {
        start?: Function,
        update?: Function,
        render?: Function,
        renderUI?: Function
    }
};

type NzymGame = NzymGameScene;

type NzymSceneOptions = {
    scenes?: NzymGameScene,
    onBoot?: Function,
    onLoaded?: Function,
    onStart?: Function,
    onUpdate?: Function,
    onRender?: Function,
    onRenderUI?: Function,
    onLoadStart?: Function,
    onLoadUpdate?: Function,
    onLoadRender?: Function,
    onLoadRenderUI?: Function
};

type NzymStageOptions = {
    w?: number,
    h?: number,
    canvas?: HTMLCanvasElement,
    parent?: HTMLElement,
    bgColor?: string,
    pixelRatio?: number
};

type NzymEngineOptions = { name?: string, autoStart?: boolean } & NzymOBJOptions & NzymSceneOptions & NzymStageOptions;

type NzymFontFormat = { size: number, style: string, family: string };
type NzymPointFormat = { x: number, y: number };

type NzymSceneCreateCanvasOptions = {
    w?: number,
    h?: number,
    parent?: HTMLElement,
    bgColor?: string,
    autoAppend?: boolean
};