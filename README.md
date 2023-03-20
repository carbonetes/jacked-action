
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
        uses: actions/checkout@v2

      - name: Run carbonetes/jacked # runs the github action of jacked.
        uses: carbonetes/jacked@v1.0.0 # runs the github action using this version.
        with: # user’s input reference for scanning options, results that jacked-action supported.
          directory: "."
          fail-criteria: "" # user's input severity reference to be considered as failed-build when detected from the scan result.

```

## License

[Apache 2.0](https://choosealicense.com/licenses/apache-2.0/)
