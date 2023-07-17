import * as artifact from '@actions/artifact';

export function uploadFile(filename: string) {
    if (filename === null || filename === '') return 'No saved file uploaded'
    const client = artifact.create()
    const files = [filename]
    const rootDir = "."
    client.uploadArtifact(filename, files, rootDir)
}