import * as core from '@actions/core';
// File Import
import { checkSeverityInput } from './validate';
export class Inputs {
    scanName: string;
    scanType: string;
    failCriteria: string;
    ignoreCves: string;
    ignorePackageNames: string;
    skipBuildFail: boolean;
    skipDbUpdate: boolean;

    constructor() {
        this.scanName = core.getInput('scan-name');
        this.scanType = core.getInput('scan-type');
        this.failCriteria = core.getInput('fail-criteria').toLowerCase();
        this.ignoreCves = core.getInput('ignore-cves');
        this.ignorePackageNames = core.getInput('ignore-package-names');
        this.skipBuildFail = core.getBooleanInput('skipBuildFail');
        this.skipDbUpdate = core.getBooleanInput('skipDbUpdate');
        
    }

}

// Validate Input Call
const userInputs = new Inputs();
checkSeverityInput(userInputs.failCriteria);