/**
 * Nzym quick start.
 */
Nzym.createEngine = function (options) {
    if (options === void 0) { options = {}; }
    // Get engine options
    var engineOptions = {};
    for (var _i = 0, _a = ['w', 'h', 'canvas', 'parent', 'bgColor', 'pixelRatio']; _i < _a.length; _i++) {
        var prop = _a[_i];
        if (options[prop]) {
            engineOptions[prop] = options[prop];
        }
    }
    for (var _b = 0, _c = ['autoClear', 'autoUpdate', 'autoRender']; _b < _c.length; _b++) {
        var prop = _c[_b];
        if (options[prop] === false) {
            engineOptions[prop] = false;
        }
    }
    // Create an engine
    var Engine = new NzymEngine(engineOptions);
    // Make aliases
    var Draw = Engine.Draw, Scene = Engine.Scene;
    // Get scene options
    var sceneSetupOptions = {};
    for (var _d = 0, _e = ['onStart', 'onUpdate', 'onRender', 'onRenderUI']; _d < _e.length; _d++) {
        var prop = _e[_d];
        if (options[prop]) {
            sceneSetupOptions[prop] = options[prop];
        }
    }
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
