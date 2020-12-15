/**
 * Nzym quick start.
 */
Nzym.createEngine = (
        options: {
            canvas?: HTMLCanvasElement,
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
    if (options.canvas) {
        engineOptions['canvas'] = options.canvas;
    }
    if (options.pixelRatio) {
        engineOptions['pixelRatio'] = options.pixelRatio;
    }
    if (options.autoClear === false) {
        engineOptions['autoClear'] = false;
    }
    if (options.autoUpdate === false) {
        engineOptions['autoUpdate'] = false;
    }
    if (options.autoRender === false) {
        engineOptions['autoRender'] = false;
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
    if (options.onStart) sceneSetupOptions['onStart'] = options.onStart;
    if (options.onUpdate) sceneSetupOptions['onUpdate'] = options.onUpdate;
    if (options.onRender) sceneSetupOptions['onRender'] = options.onRender;
    if (options.onRenderUI) sceneSetupOptions['onRenderUI'] = options.onRenderUI;

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