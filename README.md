# console-logger
# What is this ?
console-logger-dev is a simple utility logger for typescript and javascript

# Installation
    npm i console-logger-dev


# Usage
     const sparkLogger = require('./sparkLogger');

     const instanceLog = new sparkLogger(sparkLogger._buildTypes.DEVELOPMENT); 

     instanceLog.info('test.js','HAPPY');


    const Logger = require('console-logger-dev')
    var log = new Logger.ConsoleLogger(Logger.ConsoleLogger._buildTypes.DEVELOPMENT);

    var anyObject = {
        "firstname":"developer",
        "application":"console modifier"
    }
    log.info('filefrom',"Message to print",anyObject);

