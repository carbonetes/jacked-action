import * as artifact from '@actions/artifact';

export async function uploadFile(filename: string) {
    if (filename === null || filename === '') return;
    const client = artifact.create();
    const files = [filename];
    const rootDir = ".";
    await client.uploadArtifact(filename, files, rootDir)
}