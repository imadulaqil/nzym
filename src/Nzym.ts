Nzym.createEngine = (options: NzymEngineOptions = {}) => {
    return new NzymEngine(options);
};

Nzym.start = (options: NzymEngineOptions = {}) => {
    options.autoStart = true;
    return Nzym.createEngine(options);
};