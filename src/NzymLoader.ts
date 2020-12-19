class NzymLoader {

    events: NzymEventsHandler = {};

    list: {
        image: HTMLImageElement[],
        sound: HTMLAudioElement[]
    };

    isLoaded = false;

    constructor(public engine: NzymEngine) {
        this.list = {
            image: [],
            sound: []
        };
    }

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

    onLoadEvent(data: HTMLImageElement | HTMLAudioElement) {
        data['isLoaded'] = true;
        if (this.getLoadedCount() >= this.getLoadAmount()) {
            this.completeLoad();
        }
    }

    onErrorEvent(data: HTMLImageElement | HTMLAudioElement) {
        data['isError'] = true;
        if (data instanceof HTMLImageElement) {
            this.engine.Log.error(`Failed to load source: "${data.src}" Make sure it's exists or, if you are working with local server, in some browser, you can't use "C:Users/user/..." It has to be relative to where your document exists, try add "file:///C:Users/user/..."`);
        }
    }

    loadImage(name: string, src?: string) {
        if (src === undefined) {
            src = name;
            name = Nzym.Common.getFilenameFromPath(src).split('.')[0];
        }
        const img = new Image();
        img.addEventListener('load', () => this.onLoadEvent(img));
        img.addEventListener('error', () => this.onErrorEvent(img));
        img.src = src;
        this.list.image.push(img);
        this.engine.Draw.addImage(name, img);
    }

    loadSound(name: string, ...srcs: string[]) {
        if (srcs.length === 0) {
            srcs = [name];
            name = Nzym.Common.getFilenameFromPath(name).split('.')[0];
        }
        const sources = [];
        for (const src of srcs) {
            const ext = src.split('.').pop();
            if (NzymSound.supportedExt.indexOf(ext) >= 0) {
                let type = ext;
                if (ext === 'mp3') {
                    type = 'mpeg';
                }
                sources.push(`<source src="${src}" type="audio/${type}">`);
            }
            else {
                this.engine.Log.warn(`Sound file extension not supported: .${ext}`);
            }
        }
        if (sources.length > 0) {
            const audio = new Audio();
            audio.addEventListener('canplaythrough', () => this.onLoadEvent(audio));
            audio.addEventListener('error', () => this.onErrorEvent(audio));
            audio.innerHTML = sources.join('');
            this.list.sound.push(audio);
            this.engine.Sound.addAudio(name, audio);
        }
    }
}