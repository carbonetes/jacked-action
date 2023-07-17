import * as path from 'path';
import * as fs from 'fs';
import { exit } from 'process';
import { exec, ExecOptions } from 'child_process';
import { Styles, Common, Strings } from '../jacked/styles'
import { uploadFile } from './upload-file';
import { Keywords } from './util/keywords';


const keywords = new Keywords();

export async function executeCommand(command: string, failureMessage: string, skipBuildFail: boolean, failCriteria: string): Promise<any> {
    const jackedBinaryPath = path.join('./bin/jacked');

    // Check if the 'jacked' binary file exists
    if (!fs.existsSync(jackedBinaryPath) || !fs.lstatSync(jackedBinaryPath).isFile()) {
        console.error(`${failureMessage}: 'jacked' binary not found`);
        exit(1);
    }

    // Check the permissions of the 'jacked' binary
    const permissions = fs.statSync(jackedBinaryPath).mode;
    const isExecutable = (permissions & fs.constants.S_IXUSR) !== 0;

    // Set executable permission if necessary
    if (!isExecutable) {
        fs.chmodSync(jackedBinaryPath, '755');
        console.log(`Executable permission set for 'jacked' binary`);
    }

    const execOptions: ExecOptions = {
        cwd: '.',
        maxBuffer: 1024 * 1024 * 250, // Set a higher value for maxBuffer (e.g., 250MB)
        shell: '/bin/bash',
    };

    const childProcess = exec(`${jackedBinaryPath} ${command}`, execOptions);
    childProcess.stdout?.on('data', (data) => {
        const log = data.toString().trim();
        console.log(data);
    });

    childProcess.stderr?.on('data', (data) => {
        // Ignore stderr output
        const log = data.toString().trim();
        console.log(data);
    });

    childProcess.on('error', (error) => {
        console.error(`Error running 'jacked' command: ${error.message}`);
        exit(1);
    });

    childProcess.on('exit', (code) => {
        let exitStatus = 0;
        console.log("***Checking Skip Build Fail: " + skipBuildFail);
        if (code === 0) {

            console.log(
                Styles.FgGreen +
                Styles.Bold +
                Strings.JACKEDASSESSMENT +
                Common.PASSED +
                Styles.Reset
            );
            return 0;

        } else {
            // Display fail
            console.error(
                Styles.FgRed +
                Styles.Bold +
                Strings.JACKEDASSESSMENT +
                Common.FAILED +
                Common.NEXTLINE +
                Strings.FAILCRITERIA +
                failCriteria +
                Common.NEXTLINE +
                Strings.RECOMMENDATION +
                Styles.Reset
            );
            exitStatus = 1;

            if (skipBuildFail) {
                console.log(
                    Styles.FgCyan +
                    Styles.Bold +
                    Strings.NOTE +
                    Strings.SKIPFAILBUILD +
                    Styles.Reset
                );
                exitStatus = 0;
            }
        }
        uploadFile(keywords.FILENAME);
        return exitStatus;
    });
}