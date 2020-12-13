/**
 * Nzym quick start.
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

    // Make global aliases
    window['Common'] = Nzym.Common;
    window['Events'] = Nzym.Events;

    window['Engine'] = Engine;
    window['Draw']   = Engine.Draw;
    window['Font']   = Engine.Draw.Font;
    window['Stage']  = Engine.Stage;

    window['Align']     = Nzym.DrawConstants.Align;
    window['LineCap']   = Nzym.DrawConstants.LineCap;
    window['LineJoin']  = Nzym.DrawConstants.LineJoin;
    window['LineDash']  = Nzym.DrawConstants.LineDash;
    window['Primitive'] = Nzym.DrawConstants.Primitive;

    // Start the engine
    Engine.start();

};