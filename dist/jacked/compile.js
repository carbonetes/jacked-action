"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructArguments = void 0;
// File Import
const inputs_1 = require("./inputs");
const keywords_1 = require("./util/keywords");
const process_1 = require("process");
const execute_1 = require("./execute");
// Class
const userInputs = new inputs_1.Inputs();
const keywords = new keywords_1.Keywords();
async function constructArguments(scanOption) {
    const args = [];
    let command;
    // CI MODE
    args.push(keywords.JACKEDCOMMAND);
    args.push(keywords.CIMODE);
    switch (scanOption) {
        case "tar":
            console.log('Performing tar scan');
            args.push(keywords.TAR);
            args.push(userInputs.scanName);
            break;
        case "directory":
            console.log('Performing directory scan');
            args.push(keywords.DIR);
            args.push(userInputs.scanName);
            break;
        case "image":
        default:
            console.log('Performing image scan');
            args.push(userInputs.scanName);
            break;
    }
    // Fail Criteria
    args.push(keywords.FAILCRITERIA);
    args.push(userInputs.failCriteria);
    // Skip DB Update
    if (userInputs.skipDbUpdate == "true") {
        args.push(keywords.SKIPDBUPDATE);
    }
    // Save output file
    args.push(keywords.FILE);
    args.push("jacked_result");
    command = args.join(' ');
    let failureMessage = `Error running '${keywords.JACKED}' command`;
    // Execute Binary
    try {
        (0, execute_1.executeCommand)(command, failureMessage, userInputs.skipBuildFail);
    }
    catch (error) {
        console.error(error);
        (0, process_1.exit)(1);
    }
}
exports.constructArguments = constructArguments;
