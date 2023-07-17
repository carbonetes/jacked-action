"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installJacked = void 0;
const https = require("https");
const fs = require("fs");
const core = require("@actions/core");
const exec = require("@actions/exec");
// File Import
const compile_1 = require("./compile");
async function installJacked() {
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
                await (0, compile_1.constructArguments)();
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
exports.installJacked = installJacked;
