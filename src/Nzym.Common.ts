var Nzym = Nzym || {};

Nzym.Common = {
    LOG_INFO: 0,
    LOG_WARN: 1,
    LOG_ERROR: 2,
    logLevel: 2,
    setLogLevel(level: number) {
        this.logLevel = level;
    },
    LogInfo(...data: any[]) {
        if (this.logLevel >= this.LOG_INFO) {
            console.log(...data);
        }
    },
    LogWarn(...data: any[]) {
        if (this.logLevel >= this.LOG_WARN) {
            console.warn(...data);
        }
    },
    LogError(...data: any[]) {
        if (this.logLevel >= this.LOG_ERROR) {
            console.error(...data);
        }
    }
};