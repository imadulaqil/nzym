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
    NzymSound.prototype.play = function (name) {
        this.audios[name].currentTime = 0;
        this.audios[name].play();
    };
    NzymSound.prototype.loop = function (name) {
        if (!this.isPlaying(name)) {
            this.startLoop(name);
        }
    };
    NzymSound.prototype.stop = function (name) {
        if (this.isPlaying(name)) {
            this.stopLoop(name);
        }
    };
    NzymSound.prototype.pause = function (name) {
        this.audios[name].pause();
    };
    NzymSound.prototype.resume = function (name) {
        this.audios[name].play();
    };
    NzymSound.prototype.startLoop = function (name) {
        this.audios[name].loop = true;
        this.audios[name].currentTime = 0;
        this.audios[name].play();
    };
    NzymSound.prototype.stopLoop = function (name) {
        this.audios[name].pause();
        this.audios[name].loop = false;
        this.audios[name].currentTime = 0;
    };
    NzymSound.prototype.isPlaying = function (name) {
        return !this.audios[name].paused;
    };
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
    NzymSound.prototype.stopAll = function () {
        for (var name_1 in this.audios) {
            this.stop(name_1);
        }
    };
    NzymSound.supportedExt = ['ogg', 'mp3', 'wav'];
    return NzymSound;
}());
