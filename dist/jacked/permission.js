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
        setFilePermissions(file);
    }
}
exports.checkPermission = checkPermission;
function setFilePermissions(filePath) {
    // Set executable, readable, and writable permissions
    fs.chmodSync(filePath, 0o777); // 0o777 represents permissions rwxrwxrwx
    console.log(`File permissions set for '${filePath}'`);
}
