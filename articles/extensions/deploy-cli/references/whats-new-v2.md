---
title: What's New in Deploy CLI Tool v2
description: Understand how the Auth0 Deploy Command Line Interface (CLI) tool works.
topics:
  - extensions
  - deploy-cli
contentType:
  - index
  - concept
useCase: extensibility-extensions
---
# What's New in Deploy CLI Tool v2

The `auth0-deploy-cli` tool was updated to include the following changes.

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
