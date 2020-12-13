/**
 * Things that are common througout all modules.
 */
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
    },
    pick(array: any[]) {
        return array[Math.floor(Math.random() * array.length)];
    },
    choose(...args: any[]) {
        return this.pick(args);
    },
    picko(object: any) {
        const values = [];
        for (const key in object) {
            values.push(object[key]);
        }
        return this.pick(values);
    }
};