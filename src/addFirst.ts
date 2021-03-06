/**
 * This file will be the first when merging.
 */

type NzymEventsHandler = {
    [eventName: string]: Function[]
};

type NzymPoint = {
    x: number,
    y: number
};

type NzymRect = {
    x: number,
    y: number,
    w: number,
    h: number
};

type NzymCommon = {
    ID: number,
    RAD_TO_DEG: number,
    DEG_TO_RAD: number,
    getID(): number,
    pick(array: any[]): any,
    choose(...args: any[]): any,
    picko(object: any): any,
    toString(object: any): string,
    range(min: number, max: number): number,
    radtodeg(radians: number): number,
    degtorad(degrees: number): number,
    hypot(a: number, b: number): number,
    clamp(value: number, min: number, max: number): number,
    getFilenameFromPath(src: string): string,
    angleBetween(x1: number, y1: number, x2: number, y2: number): number,
    distanceBetween(x1: number, y1: number, x2: number, y2: number): number,
    rectIntersects(rectA: NzymRect, rectB: NzymRect): boolean,
    rectContainsPoint(rect: NzymRect, point: NzymPoint): boolean
};

type NzymEvents = {
    on(object: { events: NzymEventsHandler }, eventName: string, callbackFn: Function): void,
    off(object: { events: NzymEventsHandler }, eventName: string, callbackFn: Function): void,
    trigger(object: { events: NzymEventsHandler }, eventNames: string | string[], events?: any): void
};

type NzymColor = {
    aliceBlue: '#f0f8ff',
    antiqueWhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedAlmond: '#ffebcd',
    blue: '#0000ff',
    blueViolet: '#8a2be2',
    brown: '#a52a2a',
    burlyWood: '#deb887',
    cadetBlue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerBlue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkBlue: '#00008b',
    darkCyan: '#008b8b',
    darkGoldenRod: '#b8860b',
    darkGray: '#a9a9a9',
    darkGrey: '#a9a9a9',
    darkGreen: '#006400',
    darkKhaki: '#bdb76b',
    darkMagenta: '#8b008b',
    darkOliveGreen: '#556b2f',
    darkOrange: '#ff8c00',
    darkOrchid: '#9932cc',
    darkRed: '#8b0000',
    darkSalmon: '#e9967a',
    darkSeaGreen: '#8fbc8f',
    darkSlateBlue: '#483d8b',
    darkSlateGray: '#2f4f4f',
    darkSlateGrey: '#2f4f4f',
    darkTurquoise: '#00ced1',
    darkViolet: '#9400d3',
    deepPink: '#ff1493',
    deepSkyBlue: '#00bfff',
    dimGray: '#696969',
    dimGrey: '#696969',
    dodgerBlue: '#1e90ff',
    fireBrick: '#b22222',
    floralWhite: '#fffaf0',
    forestGreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostWhite: '#f8f8ff',
    gold: '#ffd700',
    goldenRod: '#daa520',
    gray: '#808080',
    grey: '#808080',
    green: '#008000',
    greenYellow: '#adff2f',
    honeyDew: '#f0fff0',
    hotPink: '#ff69b4',
    indianRed: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavender: '#e6e6fa',
    lavenderBlush: '#fff0f5',
    lawnGreen: '#7cfc00',
    lemonChiffon: '#fffacd',
    lightBlue: '#add8e6',
    lightCoral: '#f08080',
    lightCyan: '#e0ffff',
    lightGoldenRodYellow: '#fafad2',
    lightGray: '#d3d3d3',
    lightGrey: '#d3d3d3',
    lightGreen: '#90ee90',
    lightPink: '#ffb6c1',
    lightSalmon: '#ffa07a',
    lightSeaGreen: '#20b2aa',
    lightSkyBlue: '#87cefa',
    lightSlateGray: '#778899',
    lightSlateGrey: '#778899',
    lightSteelBlue: '#b0c4de',
    lightYellow: '#ffffe0',
    lime: '#00ff00',
    limeGreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumAquaMarine: '#66cdaa',
    mediumBlue: '#0000cd',
    mediumOrchid: '#ba55d3',
    mediumPurple: '#9370db',
    mediumSeaGreen: '#3cb371',
    mediumSlateBlue: '#7b68ee',
    mediumSpringGreen: '#00fa9a',
    mediumTurquoise: '#48d1cc',
    mediumVioletRed: '#c71585',
    midnightBlue: '#191970',
    mintCream: '#f5fffa',
    mistyRose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajoWhite: '#ffdead',
    navy: '#000080',
    oldLace: '#fdf5e6',
    olive: '#808000',
    oliveDrab: '#6b8e23',
    orange: '#ffa500',
    orangeRed: '#ff4500',
    orchid: '#da70d6',
    paleGoldenRod: '#eee8aa',
    paleGreen: '#98fb98',
    paleTurquoise: '#afeeee',
    paleVioletRed: '#db7093',
    papayaWhip: '#ffefd5',
    peachPuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderBlue: '#b0e0e6',
    purple: '#800080',
    rebeccaPurple: '#663399',
    red: '#ff0000',
    rosyBrown: '#bc8f8f',
    royalBlue: '#4169e1',
    saddleBrown: '#8b4513',
    salmon: '#fa8072',
    sandyBrown: '#f4a460',
    seaGreen: '#2e8b57',
    seaShell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyBlue: '#87ceeb',
    slateBlue: '#6a5acd',
    slateGray: '#708090',
    slateGrey: '#708090',
    snow: '#fffafa',
    springGreen: '#00ff7f',
    steelBlue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whiteSmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowGreen: '#9acd32',
    none: '#0000',
    keys: string[],
    list: string[],
    random: Function,
    init: Function
};

type NzymAlign = {
    l: CanvasTextAlign,
    r: CanvasTextAlign,
    c: CanvasTextAlign,
    t: CanvasTextBaseline,
    b: CanvasTextBaseline,
    m: CanvasTextBaseline
};

type NzymDrawConstants = {
    C: NzymColor,
    Align: NzymAlign,
    LineCap: any,
    LineJoin: any,
    LineDash: any,
    Primitive: any
};

type NzymKeyCode = {
    AltLeft: 'AltLeft',
    AltRight: 'AltRight',
    Down: 'ArrowDown',
    Left: 'ArrowLeft',
    Right: 'ArrowRight',
    Up: 'ArrowUp',
    AudioVolumeDown: 'AudioVolumeDown',
    AudioVolumeMute: 'AudioVolumeMute',
    AudioVolumeUp: 'AudioVolumeUp',
    Backquote: 'Backquote',
    Backslash: 'Backslash',
    Backspace: 'Backspace',
    BracketLeft: 'BracketLeft',
    BracketRight: 'BracketRight',
    CapsLock: 'CapsLock',
    Comma: 'Comma',
    ControlLeft: 'ControlLeft',
    ControlRight: 'ControlRight',
    Delete: 'Delete',
    Digit0: 'Digit0',
    Digit1: 'Digit1',
    Digit2: 'Digit2',
    Digit3: 'Digit3',
    Digit4: 'Digit4',
    Digit5: 'Digit5',
    Digit6: 'Digit6',
    Digit7: 'Digit7',
    Digit8: 'Digit8',
    Digit9: 'Digit9',
    End: 'End',
    Enter: 'Enter',
    Equal: 'Equal',
    Escape: 'Escape',
    F1: 'F1',
    F2: 'F2',
    F3: 'F3',
    F4: 'F4',
    F5: 'F5',
    F6: 'F6',
    F7: 'F7',
    F8: 'F8',
    F9: 'F9',
    F10: 'F10',
    F11: 'F11',
    F12: 'F12',
    Home: 'Home',
    Insert: 'Insert',
    A: 'KeyA',
    B: 'KeyB',
    C: 'KeyC',
    D: 'KeyD',
    E: 'KeyE',
    F: 'KeyF',
    G: 'KeyG',
    H: 'KeyH',
    I: 'KeyI',
    J: 'KeyJ',
    K: 'KeyK',
    L: 'KeyL',
    M: 'KeyM',
    N: 'KeyN',
    O: 'KeyO',
    P: 'KeyP',
    Q: 'KeyQ',
    R: 'KeyR',
    S: 'KeyS',
    T: 'KeyT',
    U: 'KeyU',
    V: 'KeyV',
    W: 'KeyW',
    X: 'KeyX',
    Y: 'KeyY',
    Z: 'KeyZ',
    MediaPlayPause: 'MediaPlayPause',
    MediaTrackNext: 'MediaTrackNext',
    MediaTrackPrevious: 'MediaTrackPrevious',
    MetaLeft: 'MetaLeft',
    Minus: 'Minus',
    NumLock: 'NumLock',
    Numpad0: 'Numpad0',
    Numpad1: 'Numpad1',
    Numpad2: 'Numpad2',
    Numpad3: 'Numpad3',
    Numpad4: 'Numpad4',
    Numpad5: 'Numpad5',
    Numpad6: 'Numpad6',
    Numpad7: 'Numpad7',
    Numpad8: 'Numpad8',
    Numpad9: 'Numpad9',
    NumpadAdd: 'NumpadAdd',
    NumpadDecimal: 'NumpadDecimal',
    NumpadDivide: 'NumpadDivide',
    NumpadEnter: 'NumpadEnter',
    NumpadMultiply: 'NumpadMultiply',
    NumpadSubtract: 'NumpadSubtract',
    PageDown: 'PageDown',
    PageUp: 'PageUp',
    Period: 'Period',
    PrintScreen: 'PrintScreen',
    Quote: 'Quote',
    Semicolon: 'Semicolon',
    ShiftLeft: 'ShiftLeft',
    ShiftRight: 'ShiftRight',
    Slash: 'Slash',
    Space: 'Space'
};

var Nzym: {
    name?: string,
    version?: string,
    Log?: NzymLog,
    Common?: NzymCommon,
    Events?: NzymEvents,
    KeyCode?: NzymKeyCode,
    DrawConstants?: NzymDrawConstants,
    getAliases?(): {
        C: NzymColor,
        Align: NzymAlign,
        Common: NzymCommon,
        Events: NzymEvents,
        KeyCode: NzymKeyCode,
        LineCap: any,
        LineJoin: any,
        LineDash: any,
        Primitive: any
    },
    createEngine?(options: NzymEngineOptions): NzymEngine,
    start?(options: NzymEngineOptions): NzymEngine,
    Example: {
        [name: string]: NzymEngine
    },
} = Nzym || {
    Example: {}
};

Nzym.name = 'Nzym';
// major.minor.build.revision
Nzym.version = '0.0.1.1';

type NzymOBJOptions = {
    autoClear?: boolean,
    autoUpdate?: boolean,
    autoRender?: boolean
};

type NzymGameScenes = {
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

type NzymGame = NzymGameScenes;

type NzymSceneOptions = {
    scenes?: NzymGameScenes,
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
    pixelRatio?: number,
    preventContextMenu?: boolean
};

type NzymInputOptions = {
    preventKey?: string[]
};

type NzymEngineOptions = { name?: string, autoStart?: boolean } & NzymOBJOptions & NzymSceneOptions & NzymStageOptions & NzymInputOptions;

type NzymFontFormat = { size: number, style: string, family: string };
type NzymRange = {
    min: number,
    max: number
};

type NzymSceneCreateCanvasOptions = {
    w?: number,
    h?: number,
    parent?: HTMLElement,
    bgColor?: string,
    autoAppend?: boolean
};