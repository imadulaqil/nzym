Nzym.getAliases = () => {
    return {
        C: Nzym.DrawConstants.C,
        Align: Nzym.DrawConstants.Align,
        Common: Nzym.Common,
        Events: Nzym.Events,
        KeyCode: Nzym.KeyCode,
        LineCap: Nzym.DrawConstants.LineCap,
        LineJoin: Nzym.DrawConstants.LineJoin,
        LineDash: Nzym.DrawConstants.LineDash,
        Primitive: Nzym.DrawConstants.Primitive
    };
};

Nzym.createEngine = (options: NzymEngineOptions = {}) => {
    return new NzymEngine(options);
};

Nzym.start = (options: NzymEngineOptions = {}) => {
    options.autoStart = true;
    return Nzym.createEngine(options);
};