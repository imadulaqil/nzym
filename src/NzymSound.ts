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

    /**
     * Play audio from beginning
     * @param name 
     */
    play(name: string) {
        this.audios[name].currentTime = 0;
        this.audios[name].play();
    }

    /**
     * Start loop if not playing
     * @param name 
     */
    loop(name: string) {
        if (!this.isPlaying(name)) {
            this.startLoop(name);
        }
    }

    /**
     * Pause audio and reset playback time
     * @param name 
     */
    stop(name: string) {
        this.stopLoop(name);
    }

    /**
     * Pause audio
     * @param name 
     */
    pause(name: string) {
        this.audios[name].pause();
    }

    /**
     * Play audio from current playback time
     * If playback time is finished, this will play from beginning
     * @param name 
     */
    resume(name: string) {
        this.audios[name].play();
    }

    /**
     * Set audio loop to `true` then play from beginning
     * @param name 
     */
    startLoop(name: string) {
        this.audios[name].loop = true;
        this.play(name);
    }

    /**
     * Pause audio and reset playback time
     * @param name 
     */
    stopLoop(name: string) {
        this.audios[name].pause();
        this.audios[name].loop = false;
        this.audios[name].currentTime = 0;
    }

    /**
     * Returns true if audio is not paused
     * @param name 
     */
    isPlaying(name: string) {
        return !this.audios[name].paused;
    }

    /**
     * Play audio one at a time
     * @param name 
     */
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

    getDuration(name: string): number {
        return this.audios[name].duration;
    }

    getCurrentTime(name: string): number {
        return this.audios[name].currentTime;
    }

    getPlaybackTime(name: string): number {
        return this.audios[name].currentTime / this.audios[name].duration;
    }

    stopAll() {
        for (const name in this.audios) {
            this.stop(name);
        }
    }
}