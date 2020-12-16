var NzymLoader = /** @class */ (function () {
    function NzymLoader(engine) {
        this.engine = engine;
        this.events = {};
        this.list = {
            image: []
        };
        this.isLoaded = false;
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
    NzymLoader.prototype.loadImage = function (name, src) {
        var _this = this;
        if (src === undefined) {
            src = name;
            name = src.split('/').pop().split('.')[0];
        }
        var img = new Image();
        img.src = src;
        this.list['image'].push(img);
        this.engine.Draw.addImage(name, img);
        img.addEventListener('load', function () { return _this.onLoadEvent(img); });
    };
    return NzymLoader;
}());
;