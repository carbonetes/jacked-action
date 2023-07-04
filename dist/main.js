"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const fs = require("fs");
const core = require("@actions/core");
const exec = require("@actions/exec");
let directoryInput;
let scanOption;
let failCriteria;
const DIRECTORY = 'directory';
const SEVERITY_TYPE = ["unknown", "negligible", "low", "medium", "high", "critical"];
async function run() {
    try {
        const options = {
            hostname: 'raw.githubusercontent.com',
            path: '/carbonetes/jacked/main/install.sh',
            method: 'GET'
        };
        const request = https.request(options, response => {
            let script = '';
            response.on('data', chunk => {
                script += chunk;
            });
            response.on('end', async () => {
                await fs.promises.writeFile('./install.sh', script);
                await exec.exec('chmod', ['+x', './install.sh']);
                await exec.exec('./install.sh');
                core.info('Jacked has been installed');
                scanOption = checkUserInput();
                await constructCommandExec(scanOption);
            });
        });
        request.on('error', error => {
            core.setFailed(error.message);
        });
        request.end();
    }
    catch (error) {
        if (error instanceof Error) {
            core.setFailed(error.message);
        }
        else {
            core.setFailed(String(error));
        }
    }
}
function checkUserInput() {
    directoryInput = core.getInput('directory', { required: true });
    if (directoryInput !== null && directoryInput !== '') {
        return DIRECTORY;
    }
    throw new Error("Invalid directory input");
}
function checkConfig() {
    failCriteria = core.getInput('fail-criteria');
    failCriteria = failCriteria.toLowerCase();
    SeverityCheck(failCriteria, SEVERITY_TYPE);
}
async function constructCommandExec(scanOption) {
    switch (scanOption) {
        case DIRECTORY:
            if (failCriteria !== "") {
                await exec.exec('./bin/jacked', ['-q', '--fail-criteria', failCriteria, '-d', directoryInput]);
            }
            else {
                await exec.exec('./bin/jacked', ['-q', '-d', directoryInput]);
            }
            break;
        default:
            core.setFailed('Scan Option not found');
            break;
    }
}
function SeverityCheck(failCriteria, severity_type) {
    if (failCriteria !== "") {
        if (!severity_type.includes(failCriteria)) {
            throw new Error(`Undefined Severity ${failCriteria} -> Please choose: unknown, negligible, low, medium, high, or critical`);
        }
    }
}
checkConfig();
run();
