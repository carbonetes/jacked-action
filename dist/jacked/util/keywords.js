"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keywords = void 0;
class Keywords {
    constructor() {
        // Binary Arguments 
        this.JACKED = "jacked";
        this.JACKEDBINARYFILEPATH = "./bin/jacked";
        this.FAILCRITERIA = "--fail-criteria";
        this.CIMODE = "--ci";
        this.DIR = "--dir";
        this.TAR = "--tar";
        this.SBOM = "--sbom";
        this.FILE = "--file";
        this.SKIPDBUPDATE = "--skip-db-update";
        this.IGNOREPACKAGENAMES = "--ignore-package-names";
        this.IGNORECVES = "--ignore-cves";
        this.FILENAME = "jacked_result.txt";
        // YAML FILES
        this.JACKEDCIYAMLFILEPATH = "/root/.jackedci.yaml";
        // Severities
        this.SEVERITY_TYPE = ["unknown", "negligible", "low", "medium", "high", "critical"];
    }
}
exports.Keywords = Keywords;
