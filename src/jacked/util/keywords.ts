
export class Keywords {
    // Binary Arguments 
    JACKED = "jacked";
    JACKEDCOMMAND = "./bin/jacked";
    FAILCRITERIA = "--fail-criteria";
    CIMODE = "--ci";
    DIR = "--dir";
    TAR = "--tar";
    SBOM = "--sbom";
    FILE = "--file"
    SKIPDBUPDATE = "--skip-db-update";
    IGNOREPACKAGENAMES = "--ignore-package-names";
    IGNORECVES = "--ignore-cves";
    FILENAME = "jacked_result";
    // Severities
    SEVERITY_TYPE: string[] = ["unknown", "negligible", "low", "medium", "high", "critical"];
}