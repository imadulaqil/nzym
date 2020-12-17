Nzym.getAliases = function () {
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
Nzym.createEngine = function (options) {
    if (options === void 0) { options = {}; }
    return new NzymEngine(options);
};
Nzym.start = function (options) {
    if (options === void 0) { options = {}; }
    options.autoStart = true;
    return Nzym.createEngine(options);
};
