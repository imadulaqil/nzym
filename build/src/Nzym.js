/**
 * Nzym quick start.
 */
Nzym.createEngine = function (options) {
    if (options === void 0) { options = {}; }
    // Get engine options
    var engineOptions = {};
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
    var Engine = new NzymEngine(engineOptions);
    // Make aliases
    var Draw = Engine.Draw, Scene = Engine.Scene;
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
    // Link default font
    Draw.Font.embedGoogleFonts('Quicksand');
    Engine.makeGlobalAliases();
    if (options.onInit)
        options.onInit.call(Engine);
    if (options.autoStart) {
        // Start the engine
        Engine.start();
    }
    return Engine;
};
