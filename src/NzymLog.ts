class NzymLog {

    LOG_INFO = 0;
    LOG_WARN = 1;
    LOG_ERROR = 2;

    level = 2;

    preLog = '[Nzym-Log]:';

    constructor(name?: string) {
        if (name) {
            this.preLog = `[Nzym-${name}]:`;
        }
    }

    setLevel(level: number) {
        this.level = level;
    }

    info(...data: any[]) {
        if (this.level >= this.LOG_INFO) {
            console.log(this.preLog, ...data);
        }
    }

    warn(...data: any[]) {
        if (this.level >= this.LOG_WARN) {
            console.warn(this.preLog, ...data);
        }
    }

    error(...data: any[]) {
        if (this.level >= this.LOG_ERROR) {
            console.error(this.preLog, ...data);
        }
    }
}

Nzym.Log = new NzymLog('Main');