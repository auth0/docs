---
title: Deploy CLI Options
description: Describes the Auth0 Deploy CLI tool options.
topics:
  - extensions
  - deploy-cli
contentType:
  - index
  - concept
useCase: extensibility-extensions
---
# Deploy CLI Options

The following options are supported by the Deploy CLI tool `a0deploy`.

## Commands

- `a0deploy import` Deploy Configuration
- `a0deploy export` Export Auth0 Tenant Configuration

## Options
- `--help` Show help  `[boolean]`
- `--version` Show version number  `[boolean]`
- `--debug, -d` Dump extra debug information.  `[string] [default: false]`
- `--proxy_url, -p` A url for proxying requests, only set this if you are behind a proxy.  `[string]`

## Examples

```
  a0deploy export -c config.json --strip -f yaml -o path/to/export       Dump Auth0 config to folder in YAML format
  a0deploy export -c config.json --strip -f directory -o path/to/export  Dump Auth0 config to folder in directory format
  a0deploy import -c config.json -i tenant.yaml                          Deploy Auth0 via YAML
  a0deploy import -c config.json -i path/to/files                        Deploy Auth0 via Path
```

## Keep reading

* [Install the Deploy CLI Tool](/extensions/deploy-cli/guides/install-deploy-cli)
* [Incorporate Deploy CLI into Build Environment](/extensions/deploy-cli/guides/incorporate-deploy-cli-into-build-environment)
* [Import/Export Tenant Configuration to a Directory Structure](/extensions/deploy-cli/guides/import-export-directory-structure)
* [Import/Export Tenant Configuration to a YAML File](/extensions/deploy-cli/guides/import-export-yaml-file)
* [Call Deploy CLI Tool Programmatically](/extensions/deploy-cli/guides/call-deploy-cli-programmatically)
* [Troubleshooting Deploy CLI Tool](/extensions/deploy-cli/references/troubleshooting)
