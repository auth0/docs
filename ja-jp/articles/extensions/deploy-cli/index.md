---
title: Deploy CLI Tool
description: Understand how the Auth0 Deploy CLI tool works.
topics:
  - extensions
  - deploy-cli
contentType:
  - index
useCase: extensibility-extensions
---
# Deploy CLI Tool

Auth0 supports continuous integration and deployment (CI/CD) of Auth0 tenants through our [source control extensions](/extensions#deploy-hosted-pages-rules-and-database-connections-scripts-from-external-repositories) and integration into existing CI/CD pipelines using the Deploy CLI tool.

The Deploy CLI tool (`auth0-deploy-cli`) supports two methods to import and export the following Auth0 tenant configuration objects: 

- Tenant settings
- Rules (including secrets/settings)
- Hooks
- Hook Secrets
- Connections
- Custom databases
- Clients/applications
- Resource servers (APIs)
- Pages
- Email templates and providers
- Guardian settings

You can export the data to a predefined [directory structure](/extensions/deploy-cli/guides/import-export-directory-structure) or a [YAML configuration file](/extensions/deploy-cli/guides/import-export-yaml-file). You can call the tool [programmatically](/extensions/deploy-cli/guides/call-deploy-cli-programmatically). You can also use the tool to replace environment variables. 

::: warning
This tool can be destructive to your Auth0 tenant. Please ensure you have read the documentation and tested the tool on a development tenant before using it in production.
:::

## Upgrade to latest version

For version 5, the `auth0-deploy-cli` tool was updated to add support for Node.js v14 and drop support for Node.js versions earlier than v8.

If you are upgrading `auth0-deploy-cli` from versions earlier than v4, please upgrade the **Auth0 Deploy CLI** extension by following the instructions for [Deploy CLI Tool v4](#deploy-cli-tool-v4) below.

## Previous versions

Features released in previous versions of the Deploy CLI Tool are listed below. For a complete list of changes, see the [changelog](https://github.com/auth0/auth0-deploy-cli/blob/master/CHANGELOG.md).


### Deploy CLI Tool v4

For version 4, the `auth0-deploy-cli` tool was updated to add support for Hooks and Hook Secrets.

<%= include('./_includes/_upgrade-v4') %>


### Deploy CLI Tool v3

For version 3, the `auth0-deploy-cli` tool was updated to include the following changes.

- Added options to the config:
  - INCLUDED_PROPS: Enables export of properties that are excluded by default (e.g., client_secret)
  - EXCLUDED_PROPS: Provides ability to exclude any unwanted properties from exported objects
- Removed `--strip` option from `export` command. IDs will now be stripped by default; to override, use `--export_ids` or `AUTH0_EXPORT_IDENTIFIERS: true`.

### Deploy CLI Tool v2

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

### Keep reading

* [Install the Deploy CLI Tool](/extensions/deploy-cli/guides/install-deploy-cli)
* [Incorporate Deploy CLI into Build Environment](/extensions/deploy-cli/guides/incorporate-deploy-cli-into-build-environment)
* [Deploy CLI Tool Options](/extensions/deploy-cli/references/deploy-cli-options)
* [Environment Variables and Keyword Mappings](/extensions/deploy-cli/references/environment-variables-keyword-mappings)
* [Troubleshooting Deploy CLI Tool](/extensions/deploy-cli/references/troubleshooting)
