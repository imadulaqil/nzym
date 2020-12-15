/**
 * Things that are common througout all modules.
 */
Nzym.Common = {
    ID: 0,
    LOG_INFO: 0,
    LOG_WARN: 1,
    LOG_ERROR: 2,
    logLevel: 2,
    preLog: '[Nzym]:',
    RAD_TO_DEG: 180 / Math.PI,
    DEG_TO_RAD: Math.PI / 180,
    getID() {
        return this.ID++;
    },
    setLogLevel(level: number) {
        this.logLevel = level;
    },
    LogInfo(...data: any[]) {
        if (this.logLevel >= this.LOG_INFO) {
            console.log(this.preLog, ...data);
        }
    },
    LogWarn(...data: any[]) {
        if (this.logLevel >= this.LOG_WARN) {
            console.warn(this.preLog, ...data);
        }
    },
    LogError(...data: any[]) {
        if (this.logLevel >= this.LOG_ERROR) {
            console.error(this.preLog, ...data);
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
        for (const prop in object) {
            values.push(object[prop]);
        }
        return this.pick(values);
    },
    toString(object: any) {
        const values = [];
        for (const prop in object) {
            const value = object[prop];
            if (typeof value === 'number' ||  typeof value === 'string') {
                values.push(`${prop}: ${value}`);
            }
        }
        return values.join('\n');
    },
    range(min: number, max: number = 0) {
        return min + Math.random() * (max - min);
    },
    radtodeg(radians: number) {
        return radians * this.RAD_TO_DEG;
    },
    degtorad(degrees: number) {
        return degrees * this.DEG_TO_RAD;
    }
};