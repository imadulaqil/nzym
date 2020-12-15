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

    // Get engine options
    const engineOptions = {};
    for (const prop of ['w', 'h', 'canvas', 'parent', 'bgColor', 'pixelRatio']) {
        if (options[prop]) {
            engineOptions[prop] = options[prop];
        }
    }
    for (const prop of ['autoClear', 'autoUpdate', 'autoRender']) {
        if (options[prop] === false) {
            engineOptions[prop] = false;
        }
    }

    // Create an engine
    const Engine = new NzymEngine(engineOptions);

    // Make aliases
    const {
        Draw,
        Scene
    } = Engine;

    // Get scene options
    const sceneSetupOptions = {};
    for (const prop of ['onStart', 'onUpdate', 'onRender', 'onRenderUI']) {
        if (options[prop]) {
            sceneSetupOptions[prop] = options[prop];
        }
    }

    Scene.setup(sceneSetupOptions);
    
    // Link default font
    Draw.Font.embedGoogleFonts('Quicksand');

    Engine.makeGlobalAliases();

    if (options.onInit) options.onInit.call(Engine);

    if (options.autoStart) {
        // Start the engine
        Engine.start();
    }

    return Engine;

};