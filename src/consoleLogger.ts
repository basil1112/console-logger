import * as path from 'path';

interface ConsoleLoggerInterface {
    info(message: string, obj?: any): void;
    error(message: string, obj?: any): void;
    warning(message: string, obj?: any): void;
    debug(message: string, obj?: any): void;
    log(message: string, obj?: any): void;
}

enum LogType {
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
    DEBUG = 'debug',
    LOG = 'log'
}

export enum BuildTypes {
    DEVELOPMENT = "D",
    STAGING = "S",
    PRODUCTION = "P"
}

export class ConsoleLogger implements ConsoleLoggerInterface {

    public static _buildTypes = BuildTypes;
    private static instance: ConsoleLogger | null = null;

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

    private constructor(_bType: BuildTypes) {
        this.setting.ENV = _bType;
    }

    public static getInstance(_bType: BuildTypes): ConsoleLogger {
        if (!ConsoleLogger.instance || ConsoleLogger.instance.setting.ENV !== _bType) {
            ConsoleLogger.instance = new ConsoleLogger(_bType);
        }
        return ConsoleLogger.instance;
    }

    public info(message: string, obj?: any) {
        this.logMessage(LogType.INFO, message, obj);
    }

    public error(message: string, obj?: any) {
        this.logMessage(LogType.ERROR, message, obj);
    }

    public warning(message: string, obj?: any) {
        this.logMessage(LogType.WARNING, message, obj);
    }

    public debug(message: string, obj?: any) {
        this.logMessage(LogType.DEBUG, message, obj);
    }

    public log(message: string, obj?: any) {
        this.logMessage(LogType.LOG, message, obj);
    }

    private logMessage(type: LogType, message: string, obj?: any) {
        if (this.setting.ENV === BuildTypes.PRODUCTION && type !== LogType.ERROR) {
            return;
        }

        const timestamp = new Date().toISOString();
        const color = this.getColor(type);
        const reset = this.colors.Reset;
        const { callerFile, callerFunction } = this.getCallerInfo();

        const formattedMessage = `${timestamp} | [${type}] | ${callerFile} | ${callerFunction} | ${message} |`;

        if (obj !== undefined) {
            if (typeof obj === 'object') {
                console.log(color, formattedMessage, JSON.stringify(obj, null, 2), reset);
            } else {
                console.log(color, formattedMessage, obj, reset);
            }
        } else {
            console.log(color, formattedMessage, reset);
        }
    }

    private getColor(type: LogType): string {
        switch (type) {
            case LogType.ERROR:
                return `${this.colors.bg.Black}${this.colors.fg.Red}`;
            case LogType.WARNING:
                return `${this.colors.bg.Black}${this.colors.fg.Yellow}`;
            case LogType.INFO:
                return `${this.colors.bg.Black}${this.colors.fg.Cyan}`;
            case LogType.DEBUG:
            case LogType.LOG:
                return `${this.colors.bg.Black}${this.colors.fg.White}`;
            default:
                return `${this.colors.bg.Black}${this.colors.fg.White}`;
        }
    }

    private getCallerInfo(): { callerFile: string, callerFunction: string } {
        const originalFunc = Error.prepareStackTrace;

        let callerFile: string | undefined = 'unknown';
        let callerFunction: string | undefined = 'unknown';
        try {
            const err = new Error();
            Error.prepareStackTrace = (err, stack) => stack;
            const stack = err.stack as unknown as NodeJS.CallSite[];
            const currentFile = stack.shift()?.getFileName();

            while (stack.length) {
                const stackFrame = stack.shift();
                if (stackFrame) {
                    callerFile = stackFrame.getFileName() || 'unknown';
                    callerFunction = stackFrame.getFunctionName() || '-';
                    if (currentFile !== callerFile) break;
                }
            }
        } catch (err) {
            callerFile = 'unknown';
            callerFunction = 'unknown';
        }

        Error.prepareStackTrace = originalFunc;

        return { callerFile: path.basename(callerFile || 'unknown'), callerFunction };
    }
}
