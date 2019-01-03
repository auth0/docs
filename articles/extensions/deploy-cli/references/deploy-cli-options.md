---
title: Deploy CLI Options
description: Describes the Auth0 Deploy CLI options.
topics:
  - extensions
  - deploy-cli
contentType:
  - index
  - concept
useCase: extensibility-extensions
---
# Deploy CLI Options

## CLI Options

The following options are supported by the cli.

`a0deploy --help`

Auth0 Deploy CLI

Commands:
  a0deploy import  Deploy Configuration
  a0deploy export  Export Auth0 Tenant Configuration

Options:
  --help           Show help  [boolean]
  --version        Show version number  [boolean]
  --verbose, -v    Dump extra debug information.  [string] [default: false]
  --proxy_url, -p  A url for proxying requests, only set this if you are behind a proxy.  [string]

Examples:
  a0deploy export -c config.json --strip -f yaml -o path/to/export       Dump Auth0 config to folder in YAML format
  a0deploy export -c config.json --strip -f directory -o path/to/export  Dump Auth0 config to folder in directory format
  a0deploy import -c config.json -i tenant.yaml                          Deploy Auth0 via YAML
  a0deploy import -c config.json -i path/to/files                        Deploy Auth0 via Path

## Keep reading

* 
