// app.js

// Importing CommonJS modules
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
};

// Log some messages using the console instance
console.info("Application started", anyObject); // Log prints in cyan color
console.info("No object to print only message"); // Log prints in cyan color
console.log("Normal Message", anyObject); // Log prints in white color

function someFunction() {
    // Log error message 
    try {
        throw new Error("Some Error Occurred");
    } catch (error) {
        console.error("Some Error Occurred", error); // Log prints in red color
    }
}

someFunction();
