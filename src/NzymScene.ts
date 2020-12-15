class NzymScene {

    events = {};
    isStarted = false;

    constructor(
        public engine: NzymEngine
    ) {}

    setup(
        options: {
            onStart?: Function,
            onUpdate?: Function,
            onRender?: Function,
            onRenderUI?: Function
        } = {}
    ) {
        if (options.onStart) Nzym.Events.on(this, 'start', options.onStart);
        if (options.onUpdate) Nzym.Events.on(this, 'update', options.onUpdate);
        if (options.onRender) Nzym.Events.on(this, 'render', options.onRender);
        if (options.onRenderUI) Nzym.Events.on(this, 'renderui', options.onRenderUI);
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
        Nzym.Events.trigger(this, 'renderui');
    }
}