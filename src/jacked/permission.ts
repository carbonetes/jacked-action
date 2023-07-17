import * as fs from 'fs';
import { Keywords } from './util/keywords';

const keywords = new Keywords();

export function checkPermission() {
    // Files
    const files: string[] = [];
    files.push(keywords.JACKEDBINARYFILEPATH);

    for (const file of files) {
        setFilePermissions(file);
    }
}

function setFilePermissions(filePath: string) {
    // Set executable, readable, and writable permissions
    fs.chmodSync(filePath, 0o777); // 0o777 represents permissions rwxrwxrwx

    console.log(`File permissions set for '${filePath}'`);
}
