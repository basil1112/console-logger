# console-logger
# What is this ?
console-logger-dev is a simple utility logger for typescript and javascript

# Installation
    npm i console-logger-dev


# Usage
        const Logger = require('console-logger-dev')
        var log = new Logger.ConsoleLogger(Logger.ConsoleLogger._buildTypes.DEVELOPMENT); // DEVELOPMENT,PRODUCTION

        var anyObject = {
            "firstname": "developer",
            "application": "console modifier"
        }

        //log with objects passing 
        log.info('From which page filename', "Message to print", anyObject); //log prints in blue color

        //log without objects
        log.info('From which page filename', "No object to print only message"); //log prints in blue color

        //log error message 
        try {
            throw new Error();
        } catch (error) {
            log.error('Filename.js',"Some Error Occured",error);
        }

        //log warning message
        log.warning("Filename.js","This is a warning message",anyObject); // log prints in yellow color
        log.warning("Filename.js","This is a warning message without object");


        //log Debug message
        log.debug("Filename.js","This is a debug message",anyObject); // log prints in white color // normal 
        log.debug("Filename.js","This is a debug message without object");

