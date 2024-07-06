// consoleLogger.ts

import { BuildTypes, EnvironmentTypes } from './index';

export interface ConsoleLoggerInterface {
    error(message: string, obj?: any): void;
    warn(message: string, obj?: any): void;
    info(message: string, obj?: any): void;
    debug(message: string, obj?: any): void;
    log(message: string, obj?: any): void;
}


export interface BrowserConsoleLoggerInterface {
    error(message: string, obj?: any): void;
    error(linenumber: string, filename: string, message: string, obj?: any): void;

    warn(message: string, obj?: any): void;
    warn(linenumber: string, filename: string, message: string, obj?: any): void;

    info(message: string, obj?: any): void;
    info(linenumber: string, filename: string, message: string, obj?: any): void;

    debug(message: string, obj?: any): void;
    debug(linenumber: string, filename: string, message: string, obj?: any): void;

    log(message: string, obj?: any): void;
    log(linenumber: string, filename: string, message: string, obj?: any): void;
}




export enum LogType {
    ERROR = 'ERROR',
    WARNING = 'WARNING',
    INFO = 'INFO',
    DEBUG = 'DEBUG',
    LOG = 'LOG',
}
