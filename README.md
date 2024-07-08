# Node Console Logger

A simple and flexible console logger for both Node.js and browser environments, providing different levels of logging with colored outputs.

## Installation

To install the package, use the following npm command:

```bash
npm install node-console-logger
```
## Usage
#### Creating Logger Instances
You can create logger instances for both Node.js and React (browser) environments using the createLogger function
##### Node.js Environment

To create a logger instance for the Node.js environment, use the following code:

```
import { createLogger, EnvironmentTypes, BuildTypes } from 'console-logger-dev';

const console = createLogger(EnvironmentTypes.NODE, BuildTypes.DEVELOPMENT);

var anyObject = {
    "glossary": {
        "title": "example glossary"
    }
};

// Log some messages using the console instance
console.info("Application started", anyObject); // Log prints in cyan color

```

##### React (Browser) Environment

To create a logger instance for the React (browser) environment, use the following code:

```
import React, { useEffect } from 'react';
import { createLogger, EnvironmentTypes, BuildTypes } from 'console-logger-dev';

const App = () => {
    const console = createLogger(EnvironmentTypes.BROWSER, BuildTypes.DEVELOPMENT);

    useEffect(() => {
    //two parameter message and obj to print if any
        browserLogger.warn('Warning message', { warning: 'Be careful' });
        
        //here we are passing multiple params,line number, filename,message, object 
        
        console.warn('App.js', 61, 'Warning message', { warning: 'Be careful' });
        console.info('App.js', 62, 'Info message', { info: 'Just so you know' });
        console.debug('App.js', 63, 'Debug message', { debug: 'Debugging info' });
        console.log('App.js', 64, 'Log message', { log: 'General log info' });
    }, []);

    return (
        <div>
            <h1>Check the console for log messages</h1>
        </div>
    );
};

export default App;


```

#### browser usage two types 

with two parameter

```
console.warn('Warning message', { warning: 'Be careful' });
```
here the obj console is the object of browser instance 

with four parameter 
```
 console.warn(61,'App.js', 'Warning message', { warning: 'Be careful' });
```
here the obj console is the object of browser instance 

Certainly! As a developer, passing all parameters manually can be awkward. That's why I've created a code snippet autofill for VSCode editor integration. Front end developers You can find it below:


### Log Levels
The logger provides different levels of logging, each with its corresponding method:

1. error: Logs error messages.
2. error: Logs error messages.
3. warn: Logs warning messages
4. info: Logs informational messages.
5. debug: Logs debugging messages.
6. log: Logs general messages.


### Build Types
There are two build types supported by the logger:

* DEVELOPMENT: For development environment. Logs will be printed.
* PRODUCTION: For production environment. No logs will be printed.


## Images

![sample image in node terminal](/image/Screenshot 2024-07-08 173016.png "This is a sample image.")

## VS Code Snippets [react developers]

For ease of use, you can configure VS Code snippets for quick integration. Follow the steps below:

1.Press `Ctrl + Shift + P` in `VS Code

2. Type `Configure User Snippets` and select `javascript.json`
3. Copy and paste the following JSON into the file:

```
{
    "Import Logger": {
        "prefix": "ilog",
        "body": [
            "import { createLogger, BuildTypes, EnvironmentTypes } from 'node-console-logger';"
        ],
        "description": "Import statement from node-console-logger"
    },
    "Console Log with Details": {
        "prefix": "clog",
        "body": [
            "console.log('${TM_FILENAME}', ${TM_LINE_NUMBER}, '${1:message}', ${2:obj});"
        ],
        "description": "Print filename, line number, message, and object in console log"
    }
}
```

after adding the snippet json, come to your js file and type 
`ilog` for import statement 
and `clog` for autofilling the filename and line number your are in :) 


### License
This project is licensed under the MIT License



