import { Keywords } from "./util/keywords";
import * as core from '@actions/core';
import * as artifact from '@actions/artifact';

const keywords = new Keywords();

export function uploadFile() {
    let file = core.getInput(keywords.FILENAME)
    if (file === null || file === '') return 'No saved file uploaded'
    const client = artifact.create()
    const files = [file]
    const rootDir = "."
    client.uploadArtifact(file, files, rootDir)
}