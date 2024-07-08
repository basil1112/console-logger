import { BrowserConsoleLoggerInterface, LogType } from './consoleLogger';
import { BuildTypes } from './index';

const colors: any = {
    Reset: "color: initial; background: initial",
    Bright: "font-weight: bold",
    Dim: "opacity: 0.7",
    Underscore: "text-decoration: underline",
    Blink: "text-decoration: blink",
    Reverse: "filter: invert(1)",
    Hidden: "visibility: hidden",

    "fg": {
        "Black": "color: black",
        "Red": "color: red",
        "Green": "color: green",
        "Yellow": "color: yellow",
        "Blue": "color: blue",
        "Magenta": "color: magenta",
        "Cyan": "color: cyan",
        "White": "color: white",
        "Crimson": "color: crimson",
        "Nero": "color: #212121"
    },
    "bg": {
        "Black": "background: black",
        "Red": "background: red",
        "Green": "background: green",
        "Yellow": "background: yellow",
        "Blue": "background: blue",
        "Magenta": "background: magenta",
        "Cyan": "background: cyan",
        "White": "background: white",
        "Crimson": "background: crimson",
        "Nero": "background: #212121"
    }


};

export class BrowserConsoleLogger implements BrowserConsoleLoggerInterface {
    private static instance: BrowserConsoleLogger;
    private env: BuildTypes;

    private constructor(env: BuildTypes) {
        this.env = env;
    }

    public static getInstance(env: BuildTypes = BuildTypes.DEVELOPMENT): BrowserConsoleLogger {
        if (!BrowserConsoleLogger.instance) {
            BrowserConsoleLogger.instance = new BrowserConsoleLogger(env);
        }
        return BrowserConsoleLogger.instance;
    }

    public error(message: string, obj?: any): void;
    public error(linenumber: string, filename: string, message: string, obj?: any): void;
    public error(param1: string, param2?: string, param3?: any, param4?: any) {
        if (typeof param2 === 'string') {
            this.logMessage(LogType.ERROR, param3, param4, param1, param2);
        } else {
            this.logMessage(LogType.ERROR, param1, param2);
        }
    }

    public warn(message: string, obj?: any): void;
    public warn(linenumber: string, filename: string, message: string, obj?: any): void;
    public warn(param1: string, param2?: string, param3?: any, param4?: any) {
        if (typeof param2 === 'string') {
            this.logMessage(LogType.WARNING, param3, param4, param1, param2);
        } else {
            this.logMessage(LogType.WARNING, param1, param2);
        }
    }

    public info(message: string, obj?: any): void;
    public info(linenumber: string, filename: string, message: string, obj?: any): void;
    public info(param1: string, param2?: string, param3?: any, param4?: any) {
        if (typeof param2 === 'string') {
            this.logMessage(LogType.INFO, param3, param4, param1, param2);
        } else {
            this.logMessage(LogType.INFO, param1, param2);
        }
    }

    public debug(message: string, obj?: any): void;
    public debug(linenumber: string, filename: string, message: string, obj?: any): void;
    public debug(param1: string, param2?: string, param3?: any, param4?: any) {
        if (typeof param2 === 'string') {
            this.logMessage(LogType.DEBUG, param3, param4, param1, param2);
        } else {
            this.logMessage(LogType.DEBUG, param1, param2);
        }
    }

    public log(message: string, obj?: any): void;
    public log(linenumber: string, filename: string, message: string, obj?: any): void;
    public log(param1: string, param2?: string, param3?: any, param4?: any) {
        if (typeof param2 === 'string') {
            this.logMessage(LogType.LOG, param3, param4, param1, param2);
        } else {
            this.logMessage(LogType.LOG, param1, param2);
        }
    }

    private logMessage(logType: LogType, message: string, obj?: any, linenumber?: string, filename?: string) {
        if (this.env === BuildTypes.PRODUCTION) return;

        let color = colors.Reset;

        let callerInfo = '';
        if (linenumber && filename) {
            callerInfo = `Line:${linenumber} ${filename}`;
        }

        const errorTemp = new Error();
        const stackLines = errorTemp.stack?.split('\n');

        switch (logType) {
            case LogType.INFO:
                color = `${colors.bg.Nero};${colors.fg.Cyan}`;
                console.info(`%c${callerInfo} ${message}`, color, obj);
                break;
            case LogType.ERROR:
                color = `${colors.bg.Nero};${colors.fg.Red}`;
                console.error(`%c${callerInfo} ${message}`, color, obj);
                break;
            case LogType.WARNING:
                color = `${colors.bg.Nero};${colors.fg.Yellow}`;
                console.warn(`%c${callerInfo} ${message}`, color, obj);
                break;
            case LogType.DEBUG:
                color = `${colors.bg.Nero};${colors.fg.White}`;
                console.debug(`%c${callerInfo} ${message}`, color, obj);
                break;
            case LogType.LOG:
                color = `${colors.bg.Nero};${colors.fg.White}`;
                console.log(`%c${callerInfo} ${message}`, color, obj);
                break;
            default:
                color = `${colors.bg.Nero};${colors.fg.White}`;
                console.log(`%c${callerInfo} ${message}`, color, obj);
                break;
        }
    }
}
