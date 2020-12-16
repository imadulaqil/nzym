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

type NzymDrawConstants = {
    C: any,
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
    createEngine?: Function,
    start?: Function
} = Nzym || {};

type NzymOBJOptions = {
    autoClear?: boolean,
    autoUpdate?: boolean,
    autoRender?: boolean
};

type NzymSceneOptions = {
    scenes?: {
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
    },
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