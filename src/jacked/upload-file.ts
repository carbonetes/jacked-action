import { Keywords } from "./util/keywords";
import * as core from '@actions/core';
import * as artifact from '@actions/artifact';

const keywords = new Keywords();

export function uploadFile() {
    let sbomFile = core.getInput(keywords.FILENAME)
    if (sbomFile === null || sbomFile === '') return
    const client = artifact.create()
    const files = [sbomFile]
    const rootDir = "."
    client.uploadArtifact(sbomFile, files, rootDir)
}