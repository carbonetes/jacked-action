import * as https from 'https';
import * as fs from 'fs';
import * as core from '@actions/core';
import * as exec from '@actions/exec';

let directoryInput: string;
let scanOption: string;
let failCriteria: string;

const DIRECTORY = 'directory';
const SEVERITY_TYPE: string[] = ["unknown", "negligible", "low", "medium", "high", "critical"];

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

    } catch (error: unknown) {
        if (error instanceof Error) {
            core.setFailed(error.message);
        } else {
            core.setFailed(String(error));
        }
    }
}

function checkUserInput(): string {
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

async function constructCommandExec(scanOption: string) {
  switch (scanOption) {
    case DIRECTORY:
      if (failCriteria !== "") {
        await exec.exec('./bin/jacked', ['-q', '--fail-criteria', failCriteria, '-d', directoryInput]);
      } else {
        await exec.exec('./bin/jacked', ['-q', '-d', directoryInput]);
      }
      break;
    default:
      core.setFailed('Scan Option not found');
      break;
  }
}

function SeverityCheck(failCriteria: string, severity_type: string[]) {
  if (failCriteria !== "") {
    if (!severity_type.includes(failCriteria)) {
      throw new Error(`Undefined Severity ${failCriteria} -> Please choose: unknown, negligible, low, medium, high, or critical`);
    }
  }
}

checkConfig();
run();
