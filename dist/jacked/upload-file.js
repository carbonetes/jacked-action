"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const keywords_1 = require("./util/keywords");
const core = require("@actions/core");
const artifact = require("@actions/artifact");
const keywords = new keywords_1.Keywords();
function uploadFile() {
    let file = core.getInput(keywords.FILENAME);
    if (file === null || file === '')
        return 'No saved file uploaded';
    const client = artifact.create();
    const files = [file];
    const rootDir = ".";
    client.uploadArtifact(file, files, rootDir);
}
exports.uploadFile = uploadFile;
