var NzymScene = /** @class */ (function () {
    function NzymScene(engine, options) {
        if (options === void 0) { options = {}; }
        this.engine = engine;
        this.events = {};
        this.isStarted = false;
        this.setup(options);
    }
    NzymScene.prototype.setup = function (options) {
        if (options === void 0) { options = {}; }
        if (options.scenes) {
            for (var _i = 0, _a = ['start', 'update', 'render', 'renderUI']; _i < _a.length; _i++) {
                var prop = _a[_i];
                if (options.scenes[prop]) {
                    Nzym.Events.on(this, prop, options.scenes[prop]);
                }
            }
        }
        if (options.onStart)
            Nzym.Events.on(this, 'start', options.onStart);
        if (options.onUpdate)
            Nzym.Events.on(this, 'update', options.onUpdate);
        if (options.onRender)
            Nzym.Events.on(this, 'render', options.onRender);
        if (options.onRenderUI)
            Nzym.Events.on(this, 'renderUI', options.onRenderUI);
    };
    NzymScene.prototype.restart = function () {
        this.start();
    };
    NzymScene.prototype.start = function () {
        if (!this.isStarted) {
            this.isStarted = true;
        }
        Nzym.Events.trigger(this, 'beforestart');
        Nzym.Events.trigger(this, 'start');
    };
    NzymScene.prototype.update = function () {
        Nzym.Events.trigger(this, 'update');
    };
    NzymScene.prototype.render = function () {
        Nzym.Events.trigger(this, 'render');
    };
    NzymScene.prototype.renderUI = function () {
        Nzym.Events.trigger(this, 'renderUI');
    };
    return NzymScene;
}());
