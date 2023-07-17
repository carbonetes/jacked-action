"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inputs = void 0;
const core = require("@actions/core");
// File Import
const validate_1 = require("./validate");
class Inputs {
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
exports.Inputs = Inputs;
// Validate Input Call
const userInputs = new Inputs();
(0, validate_1.checkSeverityInput)(userInputs.failCriteria);
