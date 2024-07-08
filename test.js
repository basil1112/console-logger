
const { createLogger, BuildTypes, EnvironmentTypes } = require('./dist/index');

// Create a console instance for the desired environment
const console = createLogger(EnvironmentTypes.NODE, BuildTypes.DEVELOPMENT);

var anyObject = {
    "glossary": {
        "title": "example glossary"
    }
};

// Log some messages using the console instance
console.info("Application started", anyObject); // Log prints in cyan color



console.warn("warning message");



function someFunction() {
    // Log error message 
    try {
        throw new Error("Some Error Occurred");
    } catch (error) {
        console.error("Some Error Occurred", anyObject); // Log prints in red color
    }
}

someFunction();
