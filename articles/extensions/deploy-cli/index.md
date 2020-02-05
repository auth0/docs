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

<%= include('./_includes/_upgrade-v4') %>

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

## Keep reading

* [Install the Deploy CLI Tool](/extensions/deploy-cli/guides/install-deploy-cli)
* [Incorporate Deploy CLI into Build Environment](/extensions/deploy-cli/guides/incorporate-deploy-cli-into-build-environment)
* [Deploy CLI Tool Options](/extensions/deploy-cli/references/deploy-cli-options)
* [Environment Variables and Keyword Mappings](/extensions/deploy-cli/references/environment-variables-keyword-mappings)
* [What's New in Deploy CLI Tool](/extensions/deploy-cli/references/whats-new)
* [Troubleshooting Deploy CLI Tool](/extensions/deploy-cli/references/troubleshooting)