
# jacked-action
Jacked provides organizations with a more comprehensive look at their application to take calculated actions and create a better security approach. Its primary purpose is to scan vulnerabilities to implement subsequent risk mitigation measures. GitHub Action CICD Integration.

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
          scanName: "." # Image name, Tar File Path, or Directory Path. Required*
          scanType: "." # Type "image", "tar", or "directory". Required*
          fail-criteria: "" # Optionally specify the minimum vulnerability severity to trigger an "error".  Valid choices are "negligible", "low", "medium", "high" and "critical". Required*
          skipBuildFail: # Set build is always success, ignore assessment result.
          skipDbUpdate: # Skip Jacked Vulnerability Database Update.
          ignorePackageNames: # Ignore Package names when scanning... e.g. input: dpkg,tar,bash,...
          ignoreCves: # Ignore CVES when scanning... e.g. input: CVE-2022-1271,CVE-2022-3715,CVE-2022-1664,...
```

## License

[Apache 2.0](https://choosealicense.com/licenses/apache-2.0/)
