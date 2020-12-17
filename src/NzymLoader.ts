class NzymLoader {

    events = {}

    list = {
        image: []
    };

    isLoaded = false;

    constructor(public engine: NzymEngine) {}

    getLoadAmount() {
        let amount = 0;
        for (const tag in this.list) {
            amount += this.list[tag].length;
        }
        return amount;
    }

    getLoadedCount() {
        let count = 0;
        for (const tag in this.list) {
            for (const data of this.list[tag]) {
                if (data['isLoaded']) {
                    count++;
                }
            }
        }
        return count;
    }

    getErrorCount() {
        let count = 0;
        for (const tag in this.list) {
            for (const data of this.list[tag]) {
                if (data['isError']) {
                    count++;
                }
            }
        }
        return count;
    }

    getLoadProgress() {
        const n = this.getLoadAmount();
        return n < 1? 1 : this.getLoadedCount() / n;
    }

    completeLoad() {
        this.isLoaded = true;
        Nzym.Events.trigger(this, 'loaded');
    }

    onLoadEvent(data: HTMLImageElement) {
        data['isLoaded'] = true;
        if (this.getLoadedCount() >= this.getLoadAmount()) {
            this.completeLoad();
        }
    }

    onErrorEvent(data: HTMLImageElement) {
        data['isError'] = true;
        this.engine.Log.error(`Failed to load source: ${data.src}. Make sure it's exists or make sure it's relative to your document. If you are working with local server, in some browser, you can't use "C:Users/user/..." it has to be relative to where your document exists.`);
    }

    loadImage(name: any, src?: any) {
        if (src === undefined) {
            src = name;
            name = src.split('/').pop().split('.')[0];
        }
        const img = new Image();
        img.addEventListener('load', () => this.onLoadEvent(img));
        img.addEventListener('error', () => this.onErrorEvent(img));
        img.src = src;
        this.list.image.push(img);
        this.engine.Draw.addImage(name, img);
    }
};