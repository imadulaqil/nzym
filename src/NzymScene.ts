class NzymScene {

    events = {};
    isStarted = false;

    constructor(
        public engine: NzymEngine,
        options: {
            scenes?: Function[],
            onStart?: Function,
            onUpdate?: Function,
            onRender?: Function,
            onRenderUI?: Function
        } = {}
    ) {
        this.setup(options);
    }

    setup(
        options: {
            scenes?: Function[],
            onStart?: Function,
            onUpdate?: Function,
            onRender?: Function,
            onRenderUI?: Function
        } = {}
    ) {
        if (options.scenes) {
            for (const prop of ['start', 'update', 'render', 'renderUI']) {
                if (options.scenes[prop]) {
                    Nzym.Events.on(this, prop, options.scenes[prop]);
                }
            }
        }
        if (options.onStart) Nzym.Events.on(this, 'start', options.onStart);
        if (options.onUpdate) Nzym.Events.on(this, 'update', options.onUpdate);
        if (options.onRender) Nzym.Events.on(this, 'render', options.onRender);
        if (options.onRenderUI) Nzym.Events.on(this, 'renderUI', options.onRenderUI);
    }

    restart() {
        this.start();
    }

    start() {
        if (!this.isStarted) {
            this.isStarted = true;
        }
        Nzym.Events.trigger(this, 'beforestart');
        Nzym.Events.trigger(this, 'start');
    }

    update() {
        Nzym.Events.trigger(this, 'update');
    }

    render() {
        Nzym.Events.trigger(this, 'render');
    }

    renderUI() {
        Nzym.Events.trigger(this, 'renderUI');
    }
}