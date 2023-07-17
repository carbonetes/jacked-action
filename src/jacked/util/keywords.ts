
export class Keywords {
    // Binary Arguments 
    JACKED = "jacked";
    JACKEDBINARYFILEPATH = "./bin/jacked";
    FAILCRITERIA = "--fail-criteria";
    CIMODE = "--ci";
    DIR = "--dir";
    TAR = "--tar";
    SBOM = "--sbom";
    FILE = "--file"
    SKIPDBUPDATE = "--skip-db-update";
    IGNOREPACKAGENAMES = "--ignore-package-names";
    IGNORECVES = "--ignore-cves";
    FILENAME = "jacked_result.txt";
    // YAML FILES
    JACKEDCIYAMLFILEPATH = "/root/.jackedci.yaml";
    // Severities
    SEVERITY_TYPE: string[] = ["unknown", "negligible", "low", "medium", "high", "critical"];
}