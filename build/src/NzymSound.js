var NzymSound = /** @class */ (function () {
    function NzymSound(engine) {
        this.engine = engine;
        this.audios = {};
    }
    NzymSound.prototype.addAudio = function (name, audio) {
        this.audios[name] = audio;
    };
    NzymSound.prototype.getAudio = function (name) {
        return this.audios[name];
    };
    /**
     * Play audio from beginning
     * @param name
     */
    NzymSound.prototype.play = function (name) {
        this.audios[name].currentTime = 0;
        this.audios[name].play();
    };
    /**
     * Start loop if not playing
     * @param name
     */
    NzymSound.prototype.loop = function (name) {
        if (!this.isPlaying(name)) {
            this.startLoop(name);
        }
    };
    /**
     * Pause audio and reset playback time
     * @param name
     */
    NzymSound.prototype.stop = function (name) {
        this.stopLoop(name);
    };
    /**
     * Pause audio
     * @param name
     */
    NzymSound.prototype.pause = function (name) {
        this.audios[name].pause();
    };
    /**
     * Play audio from current playback time
     * If playback time is finished, this will play from beginning
     * @param name
     */
    NzymSound.prototype.resume = function (name) {
        this.audios[name].play();
    };
    /**
     * Set audio loop to `true` then play from beginning
     * @param name
     */
    NzymSound.prototype.startLoop = function (name) {
        this.audios[name].loop = true;
        this.play(name);
    };
    /**
     * Pause audio and reset playback time
     * @param name
     */
    NzymSound.prototype.stopLoop = function (name) {
        this.audios[name].pause();
        this.audios[name].loop = false;
        this.audios[name].currentTime = 0;
    };
    /**
     * Returns true if audio is not paused
     * @param name
     */
    NzymSound.prototype.isPlaying = function (name) {
        return !this.audios[name].paused;
    };
    /**
     * Play audio one at a time
     * @param name
     */
    NzymSound.prototype.playAtOnce = function (name) {
        if (!this.isPlaying(name)) {
            this.play(name);
        }
    };
    NzymSound.prototype.setVolume = function (name, value) {
        this.audios[name].volume = Nzym.Common.clamp(value, 0, 1);
    };
    NzymSound.prototype.getVolume = function (name) {
        return this.audios[name].volume;
    };
    NzymSound.prototype.getDuration = function (name) {
        return this.audios[name].duration;
    };
    NzymSound.prototype.getCurrentTime = function (name) {
        return this.audios[name].currentTime;
    };
    NzymSound.prototype.getPlaybackTime = function (name) {
        return this.audios[name].currentTime / this.audios[name].duration;
    };
    NzymSound.prototype.stopAll = function () {
        for (var name_1 in this.audios) {
            this.stop(name_1);
        }
    };
    NzymSound.supportedExt = ['ogg', 'mp3', 'wav'];
    return NzymSound;
}());
