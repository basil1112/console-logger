// nodeConsoleLogger.ts

import { ConsoleLoggerInterface, LogType } from './consoleLogger';
import { BuildTypes, EnvironmentTypes } from './index';
//import path from 'path';

const colors: any = {
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


interface LoggerSettings {
    ENV: BuildTypes;
    ENV_TYPE: EnvironmentTypes;
}

let path: any;


export class NodeConsoleLogger implements ConsoleLoggerInterface {
    private static instance: NodeConsoleLogger;
    private setting: LoggerSettings;

    private constructor(env: BuildTypes, envType: EnvironmentTypes) {
        this.setting = { ENV: env, ENV_TYPE: envType };
    }

    public static getInstance(env: BuildTypes = BuildTypes.DEVELOPMENT, envType: EnvironmentTypes = EnvironmentTypes.NODE): NodeConsoleLogger {
        if (!NodeConsoleLogger.instance) {
            NodeConsoleLogger.instance = new NodeConsoleLogger(env, envType);
        }

        try {
            if (typeof process !== 'undefined' && process.env.NODE_ENV === 'node' && envType === EnvironmentTypes.NODE) {
                path = require('path');
            }
        } catch (error) {
            try {
                path = require('path-browserify');
            } catch (browserError) {
                console.log("Path module not found in the browser environment");
            }
        }

        return NodeConsoleLogger.instance;
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
        if (this.setting.ENV === BuildTypes.PRODUCTION) return;

        if (this.setting.ENV_TYPE === EnvironmentTypes.NODE) {
            const stack = new Error().stack;
            const callerInfo = this.getCallerInfo(stack);
            const logPrefix = `${this.getFormattedDate()} | [${logType}] | ${callerInfo.file} | ${callerInfo.function} | ${message}`;
            this.logToNode(logType, logPrefix, obj);
        } else {
            this.logToBrowser(logType, message, obj);
        }
    }

    private getFormattedDate(): string {
        return new Date().toISOString();
    }

    private getCallerInfo(stack: string | undefined) {
        const stackLines = stack?.split('\n') || [];
        const callerStackLine = stackLines[3] || '';
        const callerFileMatch = callerStackLine.match(/at\s+(.*)\s+\((.*):(\d+):(\d+)\)/) || callerStackLine.match(/at\s+(.*):(\d+):(\d+)/);
        const callerFunction = callerFileMatch && callerFileMatch[1] ? callerFileMatch[1].split(' ')[0] : 'Top Level';
        const callerFilePath = callerFileMatch && callerFileMatch[2] ? callerFileMatch[2] : callerFileMatch && callerFileMatch[1] ? callerFileMatch[1] : 'unknown';
        const callerFile = path ? path.basename(callerFilePath) : callerFilePath;

        return { file: callerFile, function: callerFunction === 'Object.<anonymous>' ? '_mainFn' : callerFunction };
    }

    private logToNode(logType: LogType, message: string, obj?: any) {
        let logSuffix = '';

        if (obj !== undefined) {
            //logSuffix = JSON.stringify(obj, null, 2);
            logSuffix = JSON.stringify(obj, null, 2).split('\n').map(line => `${colors.bg.Black}${colors.fg.Cyan}${line}${colors.Reset}`).join('\n');
        }

        switch (logType) {
            case LogType.INFO:
                console.log(colors.bg.Black, colors.fg.Cyan, `${message}`, colors.Reset, logSuffix);
                break;
            case LogType.ERROR:
                console.error(colors.bg.Black, colors.fg.Red, 'ERROR', colors.Reset);
                console.error(colors.bg.Black, colors.fg.Red, `${message}`, colors.Reset, logSuffix);
                break;
            case LogType.WARNING:
                console.warn(colors.bg.Black, colors.fg.Yellow, `${message}`, colors.Reset, logSuffix);
                break;
            case LogType.DEBUG:
                console.log(colors.bg.Black, colors.fg.White, `${message}`, colors.Reset, logSuffix);
                break;
            case LogType.LOG:
                console.log(colors.bg.Black, colors.fg.White, `${message}`, colors.Reset, logSuffix);
                break;
            default:
                console.log(colors.bg.Black, colors.fg.White, `${message}`, colors.Reset, logSuffix);
                break;
        }
    }

    private logToBrowser(logType: LogType, message: string, obj?: any) {
        let logSuffix = '';

        if (obj !== undefined) {
            logSuffix = JSON.stringify(obj, null, 2);
        }

        switch (logType) {
            case LogType.INFO:
                console.info(message, logSuffix);
                break;
            case LogType.ERROR:
                console.error(message, logSuffix);
                break;
            case LogType.WARNING:
                console.warn(message, logSuffix);
                break;
            case LogType.DEBUG:
                console.debug(message, logSuffix);
                break;
            case LogType.LOG:
                console.log(message, logSuffix);
                break;
            default:
                console.log(message, logSuffix);
                break;
        }
    }
}
