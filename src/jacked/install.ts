import * as https from 'https';
import * as fs from 'fs';
import * as core from '@actions/core';
import * as exec from '@actions/exec';
// File Import
import { constructArguments } from './compile';
import { Inputs } from './inputs';

// Class
const userInputs = new Inputs();

export async function installJacked() {
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
                await constructArguments(userInputs.scanType);
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
