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
async function constructArguments() {
    const args = [];
    let command;
    // CI MODE
    args.push(keywords.CIMODE);
    switch (userInputs.scanType) {
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
    if (userInputs.skipDbUpdate) {
        args.push(keywords.SKIPDBUPDATE);
    }
    // Ignore Package names
    if (userInputs.ignorePackageNames != "") {
        args.push(keywords.IGNOREPACKAGENAMES);
        args.push(userInputs.ignorePackageNames);
    }
    // Ignore CVEs
    if (userInputs.ignoreCves != "") {
        args.push(keywords.IGNORECVES);
        args.push(userInputs.ignoreCves);
    }
    // Save output file
    args.push(keywords.FILE);
    args.push(keywords.FILENAME);
    command = args.join(' ');
    let failureMessage = `Error running '${keywords.JACKED}' command`;
    // Execute Binary
    console.log(`jacked ${command}`);
    try {
        (0, execute_1.executeCommand)(command, failureMessage, userInputs.skipBuildFail, userInputs.failCriteria);
    }
    catch (error) {
        console.error(error);
        (0, process_1.exit)(1);
    }
}
exports.constructArguments = constructArguments;
