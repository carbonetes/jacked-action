const core = require('@actions/core');
const inputs_1 = require("./inputs");
const keywords_1 = require("./util/keywords");

const userInputs = new inputs_1.Inputs();
const keywords = new keywords_1.Keywords();

function checkSeverityInput(failCriteria) {
    if (userInputs.failCriteria !== "") {
        if (keywords.SEVERITY_TYPE.includes(failCriteria)) {
            console.log("InputSeverity exists in SEVERITY_TYPE");
        } else {
            const errorMessage = "InputSeverity does not exist in SEVERITY_TYPE";
            core.setFailed(errorMessage);
        }
    }
}

module.exports = {
    checkSeverityInput
};
