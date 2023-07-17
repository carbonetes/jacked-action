"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSeverityInput = void 0;
// File Import
const keywords_1 = require("./util/keywords");
// Class
const keywords = new keywords_1.Keywords();
// Check if user input failCriteria is valid severity
function checkSeverityInput(failCriteria) {
    if (failCriteria !== "") {
        if (!keywords.SEVERITY_TYPE.includes(failCriteria)) {
            console.log("InputSeverity does not exist in SEVERITY_TYPE");
            process.exit(1); // Exit with a non-zero status code indicating an error
        }
    }
}
exports.checkSeverityInput = checkSeverityInput;
