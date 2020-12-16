/**
 * This file will be the first when merging.
 */
var Nzym = Nzym || {};

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

type NzymEngineOptions = { autoStart?: boolean } & NzymOBJOptions & NzymSceneOptions & NzymStageOptions;

type NzymFontFormat = { size: number, style: string, family: string };
type NzymPointFormat = { x: number, y: number };

type NzymSceneCreateCanvasOptions = {
    w?: number,
    h?: number,
    parent?: HTMLElement,
    bgColor?: string,
    autoAppend?: boolean
};