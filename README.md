
<p align="center">
<img src="assets/logo.png">
</p>

[![Carbonetes-Jacked](https://img.shields.io/badge/carbonetes-jacked-%232f7ea3)](https://github.com/carbonetes/jacked)
[![Jacked-Action](https://img.shields.io/badge/jacked-github--action--plugin-%232f7ea3)](https://github.com/marketplace/actions/jacked-scan)
# GitHub Action: Jacked


Jacked provides organizations with a more comprehensive look at their application to take calculated actions and create a better security approach. Its primary purpose is to scan vulnerabilities to implement subsequent risk mitigation measures. GitHub Action CICD Integration.

## Inputs Description

| Input Name                  | Description                                                  |
| --------------------------- | ------------------------------------------------------------ |
| scan-name \*                 | Input image name `image:tag`, tar file path, or directory path. |
| scan-type \*                 | Select Scan Type: image, tar, or directory. | 
| fail-criteria \*             | Input a severity that will be found at or above given severity([unknown negligible low medium high critical]). Default: `medium`. |
| skip-build-fail \            | Default as false. Skip build to fail based on the assessment. |
| skip-db-update \            | Skip Jacked Vulnerability Database Update. |
| ignore-package-names \            | Ignore Package names when scanning... e.g. input: dpkg,tar,bash,... |
| ignore-cves \            | Ignore CVES when scanning... e.g. input: CVE-2022-1271,CVE-2022-3715,CVE-2022-1664,... |

_\* = required inputs._


## Output Description

| Table                        | Description                                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------------------- |
| SBOM                         | Show a list of packages. |
| Vulnerability Scan           | Show list of vulnerabilities found. |
| Recommendation               | Show available recommendation to fix vulnerabilities. |
| Assessment                   | Based on fail-criteria severity. Pass-Fail Assessment. |

## Directory Scanning

```yaml
name: Jacked Action
on: [push, pull_request]
jobs:
  jacked:
    runs-on: ${{matrix.os}}
    strategy:
      matrix:
        os: [ubuntu-latest] # can add more os: windows-latest, macOS-latest
    steps:
      - name: Checkout repository # Checkout user's current repository
        uses: actions/checkout@v3

      - name: Run carbonetes/jacked # runs the github action of jacked.
        uses: carbonetes/jacked@v1.0.0 # runs the github action using this version.
        with: # user’s input reference for scanning options, results that jacked-action supported.
          scan-name: "." # Image name, Tar File Path, or Directory Path. Required*
          scan-type: "." # Type "image", "tar", or "directory". Required*
          fail-criteria: "" # Optionally specify the minimum vulnerability severity to trigger an "error".  Valid choices are "negligible", "low", "medium", "high" and "critical". Required*
          skip-build-fail: # Set build is always success, ignore assessment result.
          skip-db-update: # Skip Jacked Vulnerability Database Update.
          ignore-package-names: # Ignore Package names when scanning... e.g. input: dpkg,tar,bash,...
          ignore-cves: # Ignore CVES when scanning... e.g. input: CVE-2022-1271,CVE-2022-3715,CVE-2022-1664,...
```

## License

[Apache 2.0](https://choosealicense.com/licenses/apache-2.0/)
