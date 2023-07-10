"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSeverityInput = void 0;
// File Import
const inputs_1 = require("./inputs");
const keywords_1 = require("./util/keywords");
// Class
const userInputs = new inputs_1.Inputs();
const keywords = new keywords_1.Keywords();
// Check if user input failCriteria is valid severity
function checkSeverityInput(failCriteria) {
    if (userInputs.failCriteria !== "") {
        if (keywords.SEVERITY_TYPE.includes(failCriteria)) {
            console.log("InputSeverity exists in SEVERITY_TYPE");
        }
        else {
            console.log("InputSeverity does not exist in SEVERITY_TYPE");
            process.exit(1); // Exit with a non-zero status code indicating an error
        }
    }
}
exports.checkSeverityInput = checkSeverityInput;
