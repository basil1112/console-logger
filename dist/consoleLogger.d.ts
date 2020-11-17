interface ConsoleLoggerInterface {
    info(fromFile: string, message: string, obj: any): void;
    error(fromFile: string, message: string, obj: any): void;
    warning(fromFile: string, message: string, obj: any): void;
    debug(fromFile: string, message: string, obj: any): void;
}
export declare enum BuildTypes {
    DEVELOPMENT = "D",
    STAGING = "S",
    PRODUCTION = "P"
}
export declare class ConsoleLogger implements ConsoleLoggerInterface {
    static _buildTypes: typeof BuildTypes;
    private setting;
    private colors;
    constructor(_bType?: BuildTypes);
    info(fromFile: string, message: string, obj?: any): void;
    error(fromFile: string, message: string, obj?: any): void;
    warning(fromFile: string, message: string, obj?: any): void;
    debug(fromFile: string, message: string, obj?: any): void;
    private spark_log;
}
export {};
//# sourceMappingURL=consoleLogger.d.ts.map