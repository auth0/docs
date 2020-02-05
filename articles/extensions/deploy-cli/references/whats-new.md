---
title: What's New in Deploy CLI Tool
description: Learn about features released in new versions of the Auth0 Deploy Command Line Interface (CLI) tool.
topics:
  - extensions
  - deploy-cli
contentType:
  - index
  - concept
useCase: extensibility-extensions
---
# What's New in Deploy CLI Tool

Features released in each version of the Deploy CLI Tool are listed below. For a complete list of changes, see the [changelog](https://github.com/auth0/auth0-deploy-cli/blob/master/CHANGELOG.md).

## Deploy CLI Tool v4

For version 4, the `auth0-deploy-cli` tool was updated to include the following changes.

- Added support for Hooks and Hook Secrets

<%= include('../_includes/_upgrade-v4') %>

## Deploy CLI Tool v3

For version 3, the `auth0-deploy-cli` tool was updated to include the following changes.

- Added options to the config:
  - INCLUDED_PROPS: Enables export of properties that are excluded by default (e.g., client_secret)
  - EXCLUDED_PROPS: Provides ability to exclude any unwanted properties from exported objects
- Removed `--strip` option from `export` command. IDs will now be stripped by default; to override, use `--export_ids` or `AUTH0_EXPORT_IDENTIFIERS: true`.

## Deploy CLI Tool v2

For version 2, the `auth0-deploy-cli` tool was updated to include the following changes.

- Added YAML support
- Added support for export (deprecation of separate auth0 dump tool)
- Delete support - The tool will, if configured via `AUTH0_ALLOW_DELETE`, delete objects if does not exist within the deploy configuration.
- Support for additional Auth0 objects
  - Connections including Social, Enterprise and <dfn data-key="passwordless">Passwordless</dfn> configurations.
  - Improved support for database connections and associated configuration.
  - Email Templates
  - Email Provider
  - Client Grants
  - Rule Configs (Import Only)
  - Guardian config
  - Better support for pages
  - Tenant level settings
- Added support to be called programmatically
- Improved logging
- To simplify the tool the slack hook was removed. You can invoke the tool programmatically to support calling your own hooks
- Support referencing clients by their name vs client_id (automatic mapping during export/import)
- Simplified to support future Auth0 object types

## Keep reading

* [Deploy CLI Tool Overview](/extensions/deploy-cli)
* [Import/Export Tenant Configuration to a Directory Structure](/extensions/deploy-cli/guides/import-export-directory-structure)
* [Import/Export Tenant Configuration to a YAML File](/extensions/deploy-cli/guides/import-export-yaml-file)
* [Troubleshooting Deploy CLI Tool](/extensions/deploy-cli/references/troubleshooting)
