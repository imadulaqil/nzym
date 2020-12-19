class NzymSound {

    static supportedExt = ['ogg', 'mp3', 'wav'];

    audios: { [name: string]: HTMLAudioElement };

    constructor(public engine: NzymEngine) {
        this.audios = {};
    }

    addAudio(name: string, audio: HTMLAudioElement) {
        this.audios[name] = audio;
    }

    getAudio(name: string) {
        return this.audios[name];
    }

    play(name: string) {
        this.audios[name].currentTime = 0;
        this.audios[name].play();
    }

    loop(name: string) {
        if (!this.isPlaying(name)) {
            this.startLoop(name);
        }
    }

    stop(name: string) {
        if (this.isPlaying(name)) {
            this.stopLoop(name);
        }
    }

    pause(name: string) {
        this.audios[name].pause();
    }

    resume(name: string) {
        this.audios[name].play();
    }

    startLoop(name: string) {
        this.audios[name].loop = true;
        this.audios[name].currentTime = 0;
        this.audios[name].play();
    }

    stopLoop(name: string) {
        this.audios[name].pause();
        this.audios[name].loop = false;
        this.audios[name].currentTime = 0;
    }

    isPlaying(name: string) {
        return !this.audios[name].paused;
    }

    playAtOnce(name: string) {
        if (!this.isPlaying(name)) {
            this.play(name);
        }
    }

    setVolume(name: string, value: number) {
        this.audios[name].volume = Nzym.Common.clamp(value, 0, 1);
    }

    getVolume(name: string) {
        return this.audios[name].volume;
    }

    stopAll() {
        for (const name in this.audios) {
            this.stop(name);
        }
    }
}