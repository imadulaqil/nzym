/**
 * Nzym quick start.
 */
Nzym.createEngine = (
        options: {
            autoStart?: boolean,
            onInit?: Function,
            onStart?: Function,
            onUpdate?: Function,
            onRender?: Function,
            onRenderUI?: Function
        } = {}
    ) => {

    // Create an engine
    const Engine = new NzymEngine();

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

    if (options.onInit) options.onInit();

    if (options.autoStart) {
        // Start the engine
        Engine.start();
    }

    return Engine;

};