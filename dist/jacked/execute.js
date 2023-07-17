"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCommand = void 0;
const path = require("path");
const fs = require("fs");
const process_1 = require("process");
const child_process_1 = require("child_process");
const styles_1 = require("../jacked/styles");
const upload_file_1 = require("./upload-file");
const keywords_1 = require("./util/keywords");
const keywords = new keywords_1.Keywords();
async function executeCommand(command, failureMessage, skipBuildFail, failCriteria) {
    var _a, _b;
    const jackedBinaryPath = path.join('./bin/jacked');
    // Check if the 'jacked' binary file exists
    if (!fs.existsSync(jackedBinaryPath) || !fs.lstatSync(jackedBinaryPath).isFile()) {
        console.error(`${failureMessage}: 'jacked' binary not found`);
        (0, process_1.exit)(1);
    }
    // Check the permissions of the 'jacked' binary
    const permissions = fs.statSync(jackedBinaryPath).mode;
    const isExecutable = (permissions & fs.constants.S_IXUSR) !== 0;
    // Set executable permission if necessary
    if (!isExecutable) {
        fs.chmodSync(jackedBinaryPath, '755');
        console.log(`Executable permission set for 'jacked' binary`);
    }
    const execOptions = {
        cwd: '.',
        maxBuffer: 1024 * 1024 * 250,
        shell: '/bin/bash',
    };
    const childProcess = (0, child_process_1.exec)(`${jackedBinaryPath} ${command}`, execOptions);
    (_a = childProcess.stdout) === null || _a === void 0 ? void 0 : _a.on('data', (data) => {
        const log = data.toString().trim();
        console.log(data);
    });
    (_b = childProcess.stderr) === null || _b === void 0 ? void 0 : _b.on('data', (data) => {
        // Ignore stderr output
        const log = data.toString().trim();
        console.log(data);
    });
    childProcess.on('error', (error) => {
        console.error(`Error running 'jacked' command: ${error.message}`);
        (0, process_1.exit)(1);
    });
    childProcess.on('exit', (code) => {
        let exitStatus = 0;
        console.log("***Checking Skip Build Fail: " + skipBuildFail);
        if (code === 0) {
            console.log(styles_1.Styles.FgGreen +
                styles_1.Styles.Bold +
                styles_1.Strings.JACKEDASSESSMENT +
                styles_1.Common.PASSED +
                styles_1.Styles.Reset);
            return 0;
        }
        else {
            // Display fail
            console.error(styles_1.Styles.FgRed +
                styles_1.Styles.Bold +
                styles_1.Strings.JACKEDASSESSMENT +
                styles_1.Common.FAILED +
                styles_1.Common.NEXTLINE +
                styles_1.Strings.FAILCRITERIA +
                failCriteria +
                styles_1.Common.NEXTLINE +
                styles_1.Strings.RECOMMENDATION +
                styles_1.Styles.Reset);
            exitStatus = 1;
            if (skipBuildFail) {
                console.log(styles_1.Styles.FgCyan +
                    styles_1.Styles.Bold +
                    styles_1.Strings.NOTE +
                    styles_1.Strings.SKIPFAILBUILD +
                    styles_1.Styles.Reset);
                exitStatus = 0;
            }
        }
        (0, upload_file_1.uploadFile)(keywords.FILENAME);
        return exitStatus;
    });
}
exports.executeCommand = executeCommand;
