
interface ConsoleLoggerInterface {
    info(fromFile: string, message: string, obj: any): void;
    error(fromFile: string, message: string, obj: any): void;
    warning(fromFile: string, message: string, obj: any): void;
    debug(fromFile: string, message: string, obj: any): void;
}


enum LogType {
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
    DEBUG = 'debug',
}

enum BuildTypes {
    DEVELOPMENT = "D",
    STAGING = "S",
    PRODUCTION = "P"
}

class ConsoleLogger implements ConsoleLoggerInterface {

    public static _buildTypes = BuildTypes;

    private setting = {
        ENV: ConsoleLogger._buildTypes.DEVELOPMENT
    }

    private colors: any = {
        Reset: "\x1b[0m",
        Bright: "\x1b[1m",
        Dim: "\x1b[2m",
        Underscore: "\x1b[4m",
        Blink: "\x1b[5m",
        Reverse: "\x1b[7m",
        Hidden: "\x1b[8m",
        fg: {
            Black: "\x1b[30m",
            Red: "\x1b[31m",
            Green: "\x1b[32m",
            Yellow: "\x1b[33m",
            Blue: "\x1b[34m",
            Magenta: "\x1b[35m",
            Cyan: "\x1b[36m",
            White: "\x1b[37m",
            Crimson: "\x1b[38m"
        },
        bg: {
            Black: "\x1b[40m",
            Red: "\x1b[41m",
            Green: "\x1b[42m",
            Yellow: "\x1b[43m",
            Blue: "\x1b[44m",
            Magenta: "\x1b[45m",
            Cyan: "\x1b[46m",
            White: "\x1b[47m",
            Crimson: "\x1b[48m"
        }
    };

    constructor(_bType?: BuildTypes) {
        this.setting.ENV = typeof _bType != 'undefined' ? _bType : BuildTypes.PRODUCTION;
    }


    public info(fromFile: string, message: string, obj?: any) {
    
        this.spark_log(LogType.INFO, fromFile, message, obj)
    }

    public error(fromFile: string, message: string, obj?: any) {
        this.spark_log(LogType.ERROR, fromFile, message, obj)
    }
    public warning(fromFile: string, message: string, obj?: any) {
        this.spark_log(LogType.WARNING, fromFile, message, obj)
    }
    public debug(fromFile: string, message: string, obj?: any) {
        this.spark_log(LogType.DEBUG, fromFile, message, obj)
    }

    private spark_log(w: LogType, x: string, y: string, z?: any) {

        switch (w) {
            case LogType.INFO:
                this.setting.ENV == 'D' ? (typeof z != 'undefined' ? console.log(this.colors.bg.Black, this.colors.fg.Cyan, `${new Date().toISOString()} | [${w}] | ${x} | ${y} | `, z, this.colors.Reset) : console.log(this.colors.bg.Black, this.colors.fg.Cyan, `${new Date().toISOString()} | [${w}] | ${x} | ${y} | `, this.colors.Reset)) : null;
                break
            case LogType.ERROR:
                console.log(this.colors.bg.White, this.colors.fg.Red, 'ERROR', this.colors.Reset);
                this.setting.ENV == 'D' ? (typeof z != 'undefined' ? console.log(this.colors.bg.Black, this.colors.fg.Red, `${new Date().toISOString()} | [${w}] | ${x} | ${y} | `, z, this.colors.Reset) : console.log(this.colors.bg.Black, this.colors.fg.Red, `${new Date().toISOString()} | [${w}] | ${x} | ${y} | `, this.colors.Reset)) : null;
                break;
            case LogType.WARNING:
                this.setting.ENV == 'D' ? (typeof z != 'undefined' ? console.log(this.colors.bg.Black, this.colors.fg.Yellow, `${new Date().toISOString()} | [${w}] | ${x} | ${y} | `, z, this.colors.Reset) : console.log(this.colors.bg.Black, this.colors.fg.Yellow, `${new Date().toISOString()} | [${w}] | ${x} | ${y} | `, this.colors.Reset)) : null;
                break;
            default:
                this.setting.ENV == 'D' ? (typeof z != 'undefined' ? console.log(this.colors.bg.Black, this.colors.fg.White, `${new Date().toISOString()} | [${w}] | ${x} | ${y} | `, z, this.colors.Reset) : console.log(this.colors.bg.Black, this.colors.fg.White, `${new Date().toISOString()} | [${w}] | ${x} | ${y} | `, this.colors.Reset)) : null;
                break
        }

    }


}


export = ConsoleLogger;