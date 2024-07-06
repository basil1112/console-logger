import { BrowserConsoleLogger } from './browserConsoleLogger';
import { LogType, ConsoleLoggerInterface, BrowserConsoleLoggerInterface } from './consoleLogger';

export enum BuildTypes {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
}

export enum EnvironmentTypes {
    NODE = 'node',
    BROWSER = 'browser',
}

let logger: ConsoleLoggerInterface;
let browserLogger: BrowserConsoleLoggerInterface;


export function createLogger(environment: EnvironmentTypes = EnvironmentTypes.NODE, buildType: BuildTypes = BuildTypes.DEVELOPMENT): ConsoleLoggerInterface | BrowserConsoleLoggerInterface {
    if (environment === EnvironmentTypes.NODE) {
        // Dynamically import the NodeConsoleLogger only if in Node environment
        const NodeConsoleLogger = require('./nodeConsoleLogger').NodeConsoleLogger;
        logger = NodeConsoleLogger.getInstance(buildType);
        return logger;
    } else if (environment === EnvironmentTypes.BROWSER) {
        browserLogger = BrowserConsoleLogger.getInstance(buildType);
        return browserLogger
    } else {
        throw new Error(`Unsupported environment type: ${environment}`);
    }
}