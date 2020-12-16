var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var NzymLog = /** @class */ (function () {
    function NzymLog(name) {
        this.LOG_INFO = 0;
        this.LOG_WARN = 1;
        this.LOG_ERROR = 2;
        this.level = 2;
        this.preLog = '[Nzym-Log]:';
        if (name) {
            this.preLog = "[Nzym-" + name + "]:";
        }
    }
    NzymLog.prototype.setLevel = function (level) {
        this.level = level;
    };
    NzymLog.prototype.info = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        if (this.level >= this.LOG_INFO) {
            console.log.apply(console, __spreadArrays([this.preLog], data));
        }
    };
    NzymLog.prototype.warn = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        if (this.level >= this.LOG_WARN) {
            console.warn.apply(console, __spreadArrays([this.preLog], data));
        }
    };
    NzymLog.prototype.error = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        if (this.level >= this.LOG_ERROR) {
            console.error.apply(console, __spreadArrays([this.preLog], data));
        }
    };
    return NzymLog;
}());
Nzym.Log = new NzymLog('Main');
