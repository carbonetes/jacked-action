"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const artifact = require("@actions/artifact");
async function uploadFile(filename) {
    if (filename === null || filename === '')
        return;
    const client = artifact.create();
    const files = [filename];
    const rootDir = ".";
    await client.uploadArtifact(filename, files, rootDir);
}
exports.uploadFile = uploadFile;
