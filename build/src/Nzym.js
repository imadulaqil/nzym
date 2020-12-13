var Nzym = Nzym || {};
/**
 *
 * Nzym quick start.
 *
 */
Nzym.start = function (options) {
    if (options === void 0) { options = {}; }
    // Create an engine
    var Engine = new NzymEngine();
    // Make aliases
    var Scene = Engine.Scene;
    // Get scene options
    var sceneSetupOptions = {};
    if (options.onStart)
        sceneSetupOptions['onStart'] = options.onStart;
    if (options.onUpdate)
        sceneSetupOptions['onUpdate'] = options.onUpdate;
    if (options.onRender)
        sceneSetupOptions['onRender'] = options.onRender;
    if (options.onRenderUI)
        sceneSetupOptions['onRenderUI'] = options.onRenderUI;
    Scene.setup(sceneSetupOptions);
    // Make global aliases
    window['Engine'] = Engine;
    window['Draw'] = Engine.Draw;
    window['Stage'] = Engine.Stage;
    // Start the engine
    Engine.start();
};
