var Nzym = Nzym || {};

/**
 * 
 * Nzym quick start.
 * 
 */
Nzym.start = (
        options: {
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
        Scene
    } = Engine;

    // Get scene options
    const sceneSetupOptions = {};
    if (options.onStart) sceneSetupOptions['onStart'] = options.onStart;
    if (options.onUpdate) sceneSetupOptions['onUpdate'] = options.onUpdate;
    if (options.onRender) sceneSetupOptions['onRender'] = options.onRender;
    if (options.onRenderUI) sceneSetupOptions['onRenderUI'] = options.onRenderUI;

    Scene.setup(sceneSetupOptions);

    // Make global aliases
    window['Engine'] = Engine;
    window['Draw'] = Engine.Draw;
    window['Stage'] = Engine.Stage;

    // Start the engine
    Engine.start();

};