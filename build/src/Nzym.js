Nzym.createEngine = function (options) {
    if (options === void 0) { options = {}; }
    return new NzymEngine(options);
};
Nzym.start = function (options) {
    if (options === void 0) { options = {}; }
    options.autoStart = true;
    return Nzym.createEngine(options);
};
