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

    getLoadProgress() {
        const n = this.getLoadAmount();
        return n < 1? 1 : this.getLoadedCount() / n;
    }

    completeLoad() {
        this.isLoaded = true;
        Nzym.Events.trigger(this, 'loaded');
    }

    onLoadEvent(data: any) {
        data['isLoaded'] = true;
        if (this.getLoadedCount() >= this.getLoadAmount()) {
            this.completeLoad();
        }
    }
    
    loadImage(name: string, src: string) {
        if (src === undefined) {
            src = name;
            name = src.split('/').pop().split('.')[0];
        }
        const img = new Image();
        img.src = src;
        this.list['image'].push(img);
        this.engine.Draw.addImage(name, img);
        img.addEventListener('load', () => this.onLoadEvent(img));
    }
};