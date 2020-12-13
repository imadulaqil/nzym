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

    // Make global aliases
    window['Common']  = Nzym.Common;
    window['Events']  = Nzym.Events;
    window['KeyCode'] = Nzym.KeyCode;

    window['Engine'] = Engine;
    window['Draw']   = Engine.Draw;
    window['Font']   = Engine.Draw.Font;
    window['Input']  = Engine.Input;
    window['Scene']  = Engine.Scene;
    window['Stage']  = Engine.Stage;

    window['C']         = Nzym.DrawConstants.C;
    window['Align']     = Nzym.DrawConstants.Align;
    window['LineCap']   = Nzym.DrawConstants.LineCap;
    window['LineJoin']  = Nzym.DrawConstants.LineJoin;
    window['LineDash']  = Nzym.DrawConstants.LineDash;
    window['Primitive'] = Nzym.DrawConstants.Primitive;

    if (options.onInit) options.onInit();

    if (options.autoStart) {
        // Start the engine
        Engine.start();
    }

    return Engine;

};