"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const keywords_1 = require("./util/keywords");
const core = require("@actions/core");
const artifact = require("@actions/artifact");
const keywords = new keywords_1.Keywords();
function uploadFile() {
    let sbomFile = core.getInput(keywords.FILENAME);
    if (sbomFile === null || sbomFile === '')
        return;
    const client = artifact.create();
    const files = [sbomFile];
    const rootDir = ".";
    client.uploadArtifact(sbomFile, files, rootDir);
}
exports.uploadFile = uploadFile;
