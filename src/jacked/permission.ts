
import * as fs from 'fs';
import { Keywords } from './util/keywords';

const keywords = new Keywords();

export function checkPermission() {

    // Files
    const files: string[] = [];
    files.push(keywords.JACKEDBINARYFILEPATH);
    files.push(keywords.JACKEDCIYAMLFILEPATH);

    for (const file of files) {
        filesPermission(file);
    }
    
}

function filesPermission(filePath: string) {

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