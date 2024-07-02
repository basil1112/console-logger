import { BrowserConsoleLogger } from './browserConsoleLogger';
import { LogType, ConsoleLoggerInterface } from './consoleLogger';

export enum BuildTypes {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
}

export enum EnvironmentTypes {
    NODE = 'node',
    BROWSER = 'browser',
}

let logger: ConsoleLoggerInterface;

export function createLogger(environment: EnvironmentTypes = EnvironmentTypes.NODE, buildType: BuildTypes = BuildTypes.DEVELOPMENT): ConsoleLoggerInterface {
    if (environment === EnvironmentTypes.NODE) {
        // Dynamically import the NodeConsoleLogger only if in Node environment
        const NodeConsoleLogger = require('./nodeConsoleLogger').NodeConsoleLogger;
        logger = NodeConsoleLogger.getInstance(buildType);
    } else if (environment === EnvironmentTypes.BROWSER) {
        logger = BrowserConsoleLogger.getInstance(buildType);
    } else {
        throw new Error(`Unsupported environment type: ${environment}`);
    }
    return logger;
}
