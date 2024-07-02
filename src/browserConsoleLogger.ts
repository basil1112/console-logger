import { ConsoleLoggerInterface, LogType } from './consoleLogger';
import { BuildTypes } from './index';

const colors: any = {
    Reset: "color: initial; background: initial",
    Bright: "font-weight: bold",
    Dim: "opacity: 0.7",
    Underscore: "text-decoration: underline",
    Blink: "text-decoration: blink",
    Reverse: "filter: invert(1)",
    Hidden: "visibility: hidden",
    fg: {
        Black: "color: black",
        Red: "color: red",
        Green: "color: green",
        Yellow: "color: yellow",
        Blue: "color: blue",
        Magenta: "color: magenta",
        Cyan: "color: cyan",
        White: "color: white",
        Crimson: "color: crimson"
    },
    bg: {
        Black: "background: black",
        Red: "background: red",
        Green: "background: green",
        Yellow: "background: yellow",
        Blue: "background: blue",
        Magenta: "background: magenta",
        Cyan: "background: cyan",
        White: "background: white",
        Crimson: "background: crimson"
    }
};

export class BrowserConsoleLogger implements ConsoleLoggerInterface {
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

    public error(message: string, obj?: any) {
        this.logMessage(LogType.ERROR, message, obj);
    }

    public warn(message: string, obj?: any) {
        this.logMessage(LogType.WARNING, message, obj);
    }

    public info(message: string, obj?: any) {
        this.logMessage(LogType.INFO, message, obj);
    }

    public debug(message: string, obj?: any) {
        this.logMessage(LogType.DEBUG, message, obj);
    }

    public log(message: string, obj?: any) {
        this.logMessage(LogType.LOG, message, obj);
    }

    private logMessage(logType: LogType, message: string, obj?: any) {
        if (this.env === BuildTypes.PRODUCTION) return;

        let logSuffix = '';
        let color = colors.Reset;

        if (obj !== undefined) {
            logSuffix = JSON.stringify(obj, null, 2);
        }

        switch (logType) {
            case LogType.INFO:
                color = `${colors.bg.Black};${colors.fg.Cyan}`;
                console.info(`%c${message}`, color, logSuffix);
                break;
            case LogType.ERROR:
                color = `${colors.bg.Black};${colors.fg.Red}`;
                console.error(`%c${message}`, color, logSuffix);
                break;
            case LogType.WARNING:
                color = `${colors.bg.Black};${colors.fg.Yellow}`;
                console.warn(`%c${message}`, color, logSuffix);
                break;
            case LogType.DEBUG:
                color = `${colors.bg.Black};${colors.fg.White}`;
                console.debug(`%c${message}`, color, logSuffix);
                break;
            case LogType.LOG:
                color = `${colors.bg.Black};${colors.fg.White}`;
                console.log(`%c${message}`, color, logSuffix);
                break;
            default:
                color = `${colors.bg.Black};${colors.fg.White}`;
                console.log(`%c${message}`, color, logSuffix);
                break;
        }
    }
}
