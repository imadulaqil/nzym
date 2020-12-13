var NzymScene = /** @class */ (function () {
    function NzymScene(engine) {
        this.engine = engine;
        this.events = {};
        this.isStarted = false;
    }
    NzymScene.prototype.setup = function (options) {
        if (options === void 0) { options = {}; }
        if (options.onStart)
            Nzym.Events.on(this, 'start', options.onStart);
        if (options.onUpdate)
            Nzym.Events.on(this, 'update', options.onUpdate);
        if (options.onRender)
            Nzym.Events.on(this, 'render', options.onRender);
        if (options.onRenderUI)
            Nzym.Events.on(this, 'renderui', options.onRenderUI);
    };
    NzymScene.prototype.restart = function () {
        this.start();
    };
    NzymScene.prototype.start = function () {
        if (!this.isStarted) {
            this.isStarted = true;
        }
        Nzym.Events.trigger(this, 'start');
    };
    NzymScene.prototype.update = function () {
        Nzym.Events.trigger(this, 'update');
    };
    NzymScene.prototype.render = function () {
        Nzym.Events.trigger(this, 'render');
    };
    NzymScene.prototype.renderUI = function () {
        Nzym.Events.trigger(this, 'renderui');
    };
    return NzymScene;
}());
