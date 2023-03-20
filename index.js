/** import */
const https = require('https');
const fs = require('fs');
// npm
const core = require('@actions/core');
const exec = require('@actions/exec');
/**  */

/** var */
var directoryInput;
var scanOption;
var failCriteria;

/** const */
const DIRECTORY = 'directory';
const SEVERITY_TYPE = ["unknown", "negligible", "low", "medium", "high", "critical"];





/** run start */
async function run() {
    try {
        // Download the script using https
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

                // Save the script to a file
                await fs.promises.writeFile('./install.sh', script);

                // Make the script executable
                await exec.exec('chmod', ['+x', './install.sh']);

                // Run the script with the -d option to specify the installation directory
                await exec.exec('./install.sh');

                // Installation successful
                core.info('Jacked has been installed');


                // Check scan option based on user's input
                scanOption = checkUserInput();

                // Call the jacked binary
                await constructCommandExec(scanOption)
            });
        });
        request.on('error', error => {
            core.setFailed(error.message);
        });
        request.end();

    } catch (error) {
        core.setFailed(error.message);
    }
}

// Check user's input and set scan option
function checkUserInput() {
    directoryInput = core.getInput('directory', { required: true })
    if (directoryInput !== null || directoryInput !== '') {
        return DIRECTORY;
    }
}
/** run end */




/** pre-run start */
// Pre-run user input validity check
function checkConfig() {
    failCriteria = core.getInput('fail-criteria')
    failCriteria = failCriteria.toLowerCase()

    SeverityCheck(failCriteria, SEVERITY_TYPE)

}
/** pre-run-end */

async function constructCommandExec(scanOption) {
    switch (scanOption) {
        case DIRECTORY:
            if (failCriteria != "") {
                exec.exec('./bin/jacked', ['-q', '--fail-criteria', failCriteria, '-d', directoryInput]);
            } else {
                exec.exec('./bin/jacked', ['-q', '-d', directoryInput]);
            }
            break;
        default:
            core.setFailed('Scan Option not found')
            break;
    }
}

// Check if user input fail-criteria is valid
function SeverityCheck(failCriteria, severity_type) {

    if (failCriteria != "") {
        if (!severity_type.some(
            (severity) => typeof failCriteria.toLowerCase() === "string" && severity === failCriteria.toLowerCase()
        )
        ) {
            throw new Error(
                `Undefined Severity ${failCriteria} -> Please choose: unknown, negligible, low, medium, high, or critical`
            )
        }
    }
}

/** pre-run end */












/** Pre-run */
// User input validity check
checkConfig();

/** Run */
// Start Jacked-Action
run();
