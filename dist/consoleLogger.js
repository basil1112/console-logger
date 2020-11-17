"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = exports.BuildTypes = void 0;
var LogType;
(function (LogType) {
    LogType["ERROR"] = "error";
    LogType["WARNING"] = "warning";
    LogType["INFO"] = "info";
    LogType["DEBUG"] = "debug";
})(LogType || (LogType = {}));
var BuildTypes;
(function (BuildTypes) {
    BuildTypes["DEVELOPMENT"] = "D";
    BuildTypes["STAGING"] = "S";
    BuildTypes["PRODUCTION"] = "P";
})(BuildTypes = exports.BuildTypes || (exports.BuildTypes = {}));
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger(_bType) {
        this.setting = {
            ENV: ConsoleLogger._buildTypes.DEVELOPMENT
        };
        this.colors = {
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
        this.setting.ENV = typeof _bType != 'undefined' ? _bType : BuildTypes.DEVELOPMENT;
    }
    ConsoleLogger.prototype.info = function (fromFile, message, obj) {
        this.spark_log(LogType.INFO, fromFile, message, obj);
    };
    ConsoleLogger.prototype.error = function (fromFile, message, obj) {
        this.spark_log(LogType.ERROR, fromFile, message, obj);
    };
    ConsoleLogger.prototype.warning = function (fromFile, message, obj) {
        this.spark_log(LogType.WARNING, fromFile, message, obj);
    };
    ConsoleLogger.prototype.debug = function (fromFile, message, obj) {
        this.spark_log(LogType.DEBUG, fromFile, message, obj);
    };
    ConsoleLogger.prototype.spark_log = function (w, x, y, z) {
        switch (w) {
            case LogType.INFO:
                this.setting.ENV == 'D' ? (typeof z != 'undefined' ? console.log(this.colors.bg.Black, this.colors.fg.Cyan, new Date().toISOString() + " | [" + w + "] | " + x + " | " + y + " | ", z, this.colors.Reset) : console.log(this.colors.bg.Black, this.colors.fg.Cyan, new Date().toISOString() + " | [" + w + "] | " + x + " | " + y + " | ", this.colors.Reset)) : null;
                break;
            case LogType.ERROR:
                console.log(this.colors.bg.White, this.colors.fg.Red, 'ERROR', this.colors.Reset);
                this.setting.ENV == 'D' ? (typeof z != 'undefined' ? console.log(this.colors.bg.Black, this.colors.fg.Red, new Date().toISOString() + " | [" + w + "] | " + x + " | " + y + " | ", z, this.colors.Reset) : console.log(this.colors.bg.Black, this.colors.fg.Red, new Date().toISOString() + " | [" + w + "] | " + x + " | " + y + " | ", this.colors.Reset)) : null;
                break;
            case LogType.WARNING:
                this.setting.ENV == 'D' ? (typeof z != 'undefined' ? console.log(this.colors.bg.Black, this.colors.fg.Yellow, new Date().toISOString() + " | [" + w + "] | " + x + " | " + y + " | ", z, this.colors.Reset) : console.log(this.colors.bg.Black, this.colors.fg.Yellow, new Date().toISOString() + " | [" + w + "] | " + x + " | " + y + " | ", this.colors.Reset)) : null;
                break;
            default:
                this.setting.ENV == 'D' ? (typeof z != 'undefined' ? console.log(this.colors.bg.Black, this.colors.fg.White, new Date().toISOString() + " | [" + w + "] | " + x + " | " + y + " | ", z, this.colors.Reset) : console.log(this.colors.bg.Black, this.colors.fg.White, new Date().toISOString() + " | [" + w + "] | " + x + " | " + y + " | ", this.colors.Reset)) : null;
                break;
        }
    };
    ConsoleLogger._buildTypes = BuildTypes;
    return ConsoleLogger;
}());
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=consoleLogger.js.map