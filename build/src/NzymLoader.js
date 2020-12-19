var NzymLoader = /** @class */ (function () {
    function NzymLoader(engine) {
        this.engine = engine;
        this.events = {};
        this.isLoaded = false;
        this.list = {
            image: [],
            sound: []
        };
    }
    NzymLoader.prototype.getLoadAmount = function () {
        var amount = 0;
        for (var tag in this.list) {
            amount += this.list[tag].length;
        }
        return amount;
    };
    NzymLoader.prototype.getLoadedCount = function () {
        var count = 0;
        for (var tag in this.list) {
            for (var _i = 0, _a = this.list[tag]; _i < _a.length; _i++) {
                var data = _a[_i];
                if (data['isLoaded']) {
                    count++;
                }
            }
        }
        return count;
    };
    NzymLoader.prototype.getErrorCount = function () {
        var count = 0;
        for (var tag in this.list) {
            for (var _i = 0, _a = this.list[tag]; _i < _a.length; _i++) {
                var data = _a[_i];
                if (data['isError']) {
                    count++;
                }
            }
        }
        return count;
    };
    NzymLoader.prototype.getLoadProgress = function () {
        var n = this.getLoadAmount();
        return n < 1 ? 1 : this.getLoadedCount() / n;
    };
    NzymLoader.prototype.completeLoad = function () {
        this.isLoaded = true;
        Nzym.Events.trigger(this, 'loaded');
    };
    NzymLoader.prototype.onLoadEvent = function (data) {
        data['isLoaded'] = true;
        if (this.getLoadedCount() >= this.getLoadAmount()) {
            this.completeLoad();
        }
    };
    NzymLoader.prototype.onErrorEvent = function (data) {
        data['isError'] = true;
        if (data instanceof HTMLImageElement) {
            this.engine.Log.error("Failed to load source: \"" + data.src + "\" Make sure it's exists or, if you are working with local server, in some browser, you can't use \"C:Users/user/...\" It has to be relative to where your document exists, try add \"file:///C:Users/user/...\"");
        }
    };
    NzymLoader.prototype.loadImage = function (name, src) {
        var _this = this;
        if (src === undefined) {
            src = name;
            name = Nzym.Common.getFilenameFromPath(src).split('.')[0];
        }
        var img = new Image();
        img.addEventListener('load', function () { return _this.onLoadEvent(img); });
        img.addEventListener('error', function () { return _this.onErrorEvent(img); });
        img.src = src;
        this.list.image.push(img);
        this.engine.Draw.addImage(name, img);
    };
    NzymLoader.prototype.loadSound = function (name) {
        var _this = this;
        var srcs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            srcs[_i - 1] = arguments[_i];
        }
        if (srcs.length === 0) {
            srcs = [name];
            name = Nzym.Common.getFilenameFromPath(name).split('.')[0];
        }
        var sources = [];
        for (var _a = 0, srcs_1 = srcs; _a < srcs_1.length; _a++) {
            var src = srcs_1[_a];
            var ext = src.split('.').pop();
            if (NzymSound.supportedExt.indexOf(ext) >= 0) {
                var type = ext;
                if (ext === 'mp3') {
                    type = 'mpeg';
                }
                sources.push("<source src=\"" + src + "\" type=\"audio/" + type + "\">");
            }
            else {
                this.engine.Log.warn("Sound file extension not supported: ." + ext);
            }
        }
        if (sources.length > 0) {
            var audio_1 = new Audio();
            audio_1.addEventListener('canplaythrough', function () { return _this.onLoadEvent(audio_1); });
            audio_1.addEventListener('error', function () { return _this.onErrorEvent(audio_1); });
            audio_1.innerHTML = sources.join('');
            this.list.sound.push(audio_1);
            this.engine.Sound.addAudio(name, audio_1);
        }
    };
    return NzymLoader;
}());
