# Console Logger

## What is this?

`console-logger-dev` is a simple utility logger for TypeScript and JavaScript. It provides different logging levels (info, error, warning, debug) and supports colored output. It also includes a singleton pattern for easy instantiation and use across your project.

## Installation

```bash
npm install console-logger-dev
```
# Usage
## Importing and Initializing
You can import the logger and create a singleton instance for your desired build environment `(DEVELOPMENT, STAGING, PRODUCTION)`. The build type determines the behavior of the logger, especially for production where logs are suppressed.

```bash
const { ConsoleLogger, BuildTypes } = require('console-logger-dev');

// Create a console instance for the desired environment
const console = ConsoleLogger.getInstance(BuildTypes.DEVELOPMENT);


```

## Logging Messages
You can log messages at different levels. The logger automatically includes the calling file and function name in each log message.

```bash
const { ConsoleLogger, BuildTypes } = require('./dist/consoleLogger');

// Create a console instance for the desired environment
const console = ConsoleLogger.getInstance(BuildTypes.DEVELOPMENT);

var anyObject = {
    "glossary": {
        "title": "example glossary",
        "GlossDiv": {
            "title": "S",
            "GlossList": {
                "GlossEntry": {
                    "ID": "SGML",
                    "SortAs": "SGML",
                    "GlossTerm": "Standard Generalized Markup Language",
                    "Acronym": "SGML",
                    "Abbrev": "ISO 8879:1986",
                    "GlossDef": {
                        "para": "A meta-markup language, used to create markup languages such as DocBook.",
                        "GlossSeeAlso": ["GML", "XML"]
                    },
                    "GlossSee": "markup"
                }
            }
        }
    }
}

// Log some messages using the console instance
console.info("Application started", anyObject); // log prints in cyan color
console.info("No object to print only message"); // log prints in cyan color

const normalFnc = (obj) => {
    console.log("log message inside a function", anyObject);
}

function someFunction() {
    // creating a error to show error message
    try {
        throw new Error("Some Error Occurred");
    } catch (error) {
        console.error("Some Error Occurred", error); // log prints in red color
    }


}


//calling the above function 
someFunction();
normalFnc();
```



# Features

### Singleton Pattern:
Ensures a single instance of the logger throughout the application.
Colored Output: Different log levels are displayed in different colors for better readability.
### Build Types: 
Configurable build types (DEVELOPMENT, STAGING, PRODUCTION) to control logging behavior.
Automatic Caller Info: Automatically includes the calling file and function name in log messages.
### Pretty JSON Output:
If an object is passed, it prints in a pretty JSON format.