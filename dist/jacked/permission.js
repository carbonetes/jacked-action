"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermission = void 0;
const fs = require("fs");
const keywords_1 = require("./util/keywords");
const keywords = new keywords_1.Keywords();
function checkPermission() {
    // Files
    const files = [];
    files.push(keywords.JACKEDBINARYFILEPATH);
    files.push(keywords.JACKEDCIYAMLFILEPATH);
    for (const file of files) {
        filesPermission(file);
    }
}
exports.checkPermission = checkPermission;
function filesPermission(filePath) {
    // Check the permissions of the 'jacked' binary
    let file = filePath;
    const permissions = fs.statSync(file).mode;
    const isExecutable = (permissions & fs.constants.S_IXUSR) !== 0;
    // Set executable permission if necessary
    if (!isExecutable) {
        fs.chmodSync(file, '755');
        console.log(`Executable permission set for 'jacked' binary`);
    }
}
