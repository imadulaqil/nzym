class NzymScene {

    events = {};
    isStarted = false;

    constructor(public engine: NzymEngine) {}

    setup(options: NzymSceneOptions = {}) {
        if (options.scenes) {
            if (options.scenes.boot)     Nzym.Events.on(this, 'boot',     options.scenes.boot);
            if (options.scenes.loaded)   Nzym.Events.on(this.engine.Loader, 'loaded', options.scenes.loaded);
            if (options.scenes.start)    Nzym.Events.on(this, 'start',    options.scenes.start);
            if (options.scenes.update)   Nzym.Events.on(this, 'update',   options.scenes.update);
            if (options.scenes.render)   Nzym.Events.on(this, 'render',   options.scenes.render);
            if (options.scenes.renderUI) Nzym.Events.on(this, 'renderUI', options.scenes.renderUI);
            if (options.scenes.onLoad) {
                if (options.scenes.onLoad.start)    Nzym.Events.on(this, 'loadstart',    options.scenes.onLoad.start);
                if (options.scenes.onLoad.update)   Nzym.Events.on(this, 'loadupdate',   options.scenes.onLoad.update);
                if (options.scenes.onLoad.render)   Nzym.Events.on(this, 'loadrender',   options.scenes.onLoad.render);
                if (options.scenes.onLoad.renderUI) Nzym.Events.on(this, 'loadrenderUI', options.scenes.onLoad.renderUI);
            }
        }
        if (options.onBoot) Nzym.Events.on(this, 'boot', options.onBoot);
        if (options.onLoaded) Nzym.Events.on(this.engine.Loader, 'loaded', options.onLoaded);
        if (options.onStart) Nzym.Events.on(this, 'start', options.onStart);
        if (options.onUpdate) Nzym.Events.on(this, 'update', options.onUpdate);
        if (options.onRender) Nzym.Events.on(this, 'render', options.onRender);
        if (options.onRenderUI) Nzym.Events.on(this, 'renderUI', options.onRenderUI);
        if (options.onLoadStart) Nzym.Events.on(this, 'loadstart', options.onLoadStart);
        if (options.onLoadUpdate) Nzym.Events.on(this, 'loadupdate', options.onLoadUpdate);
        if (options.onLoadRender) Nzym.Events.on(this, 'loadrender', options.onLoadRender);
        if (options.onLoadRenderUI) Nzym.Events.on(this, 'loadrenderUI', options.onLoadRenderUI);
    }

    boot() {
        Nzym.Events.trigger(this, 'boot');
        if (this.engine.Loader.getLoadAmount() < 1) {
            this.engine.Loader.completeLoad();
        }
    }

    restart() {
        this.start();
    }

    start() {
        if (!this.isStarted) {
            this.isStarted = true;
        }
        if (!this.engine.Loader.isLoaded) {
            Nzym.Events.trigger(this, 'loadstart');
        }
        else {
            Nzym.Events.trigger(this, 'beforestart');
            Nzym.Events.trigger(this, 'start');
        }
    }

    update() {
        if (!this.engine.Loader.isLoaded) {
            Nzym.Events.trigger(this, 'loadupdate');
        }
        else {
            Nzym.Events.trigger(this, 'update');
        }
    }

    render() {
        if (!this.engine.Loader.isLoaded) {
            Nzym.Events.trigger(this, 'loadrender');
        }
        else {
            Nzym.Events.trigger(this, 'render');
        }
    }

    renderUI() {
        if (!this.engine.Loader.isLoaded) {
            Nzym.Events.trigger(this, 'loadrenderUI');
        }
        else {
            Nzym.Events.trigger(this, 'renderUI');
        }
    }
}