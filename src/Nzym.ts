/**
 * Nzym quick start.
 */
Nzym.createEngine = (
        options: {
            w?: number,
            h?: number,
            canvas?: HTMLCanvasElement,
            parent?: HTMLElement,
            bgColor?: string,
            pixelRatio?: number,
            autoStart?: boolean,
            autoClear?: boolean,
            autoUpdate?: boolean,
            autoRender?: boolean,
            onInit?: Function,
            onStart?: Function,
            onUpdate?: Function,
            onRender?: Function,
            onRenderUI?: Function
        } = {}
    ) => {
    return new NzymEngine(options);
};