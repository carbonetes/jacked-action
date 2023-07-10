
// File Import
import { Inputs } from './inputs';
import { Keywords } from './util/keywords';
import { exit } from 'process';
import { executeCommand } from './execute';

// Class
const userInputs = new Inputs();
const keywords = new Keywords();


export async function constructArguments(scanOption: string) {

    const args: string[] = [];
    let command: string | undefined;


    // CI MODE
    args.push(keywords.JACKEDCOMMAND);
    args.push(keywords.CIMODE);

    switch (scanOption) {
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

    command = args.join(' ');
    let failureMessage = `Error running '${keywords.JACKED}' command`;

    // Execute Binary
    try {
        executeCommand(command, failureMessage, userInputs.skipBuildFail);
    } catch (error) {
        console.error(error);
        exit(1);
    }
}