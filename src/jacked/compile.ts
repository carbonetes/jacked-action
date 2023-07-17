
// File Import
import { Inputs } from './inputs';
import { Keywords } from './util/keywords';
import { exit } from 'process';
import { executeCommand } from './execute';

// Class
const userInputs = new Inputs();
const keywords = new Keywords();


export async function constructArguments() {

    const args: string[] = [];
    let command: string | undefined;

    console.log("Scan Type User-input: " + userInputs.scanType);
    // CI MODE
    args.push(keywords.CIMODE);

    switch (userInputs.scanType) {
        case "tar":
            console.log('Performing tar scan');
            args.push(keywords.TAR);
            args.push(userInputs.scanName);
            break;
        case "directory":
            console.log('Performing directory scan');
            args.push(keywords.DIR);
            args.push(userInputs.scanName);
            break;
        case "image":
        default:
            console.log('Performing image scan');
            args.push(userInputs.scanName);
            break;
    }
    
    // Fail Criteria
    args.push(keywords.FAILCRITERIA);
    args.push(userInputs.failCriteria);
    
    // Skip DB Update
    if (userInputs.skipDbUpdate) {
        args.push(keywords.SKIPDBUPDATE);
    }

    // Save output file
    args.push(keywords.FILE);
    args.push(keywords.FILENAME);

    command = args.join(' ');
    let failureMessage = `Error running '${keywords.JACKED}' command`;

    // Execute Binary
    console.log(`jacked ${command}`);
    try {
        executeCommand(command, failureMessage, userInputs.skipBuildFail, userInputs.failCriteria, keywords.FILENAME);
    } catch (error) {
        console.error(error);
        exit(1);
    }
}