/**
 * Nzym quick start.
 */
Nzym.start = function (options) {
    if (options === void 0) { options = {}; }
    // Create an engine
    var Engine = new NzymEngine();
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
    // Make global aliases
    window['Common'] = Nzym.Common;
    window['Events'] = Nzym.Events;
    window['KeyCode'] = Nzym.KeyCode;
    window['Engine'] = Engine;
    window['Draw'] = Engine.Draw;
    window['Font'] = Engine.Draw.Font;
    window['Input'] = Engine.Input;
    window['Scene'] = Engine.Scene;
    window['Stage'] = Engine.Stage;
    window['Align'] = Nzym.DrawConstants.Align;
    window['LineCap'] = Nzym.DrawConstants.LineCap;
    window['LineJoin'] = Nzym.DrawConstants.LineJoin;
    window['LineDash'] = Nzym.DrawConstants.LineDash;
    window['Primitive'] = Nzym.DrawConstants.Primitive;
    if (options.onInit)
        options.onInit();
    // Start the engine
    Engine.start();
};
