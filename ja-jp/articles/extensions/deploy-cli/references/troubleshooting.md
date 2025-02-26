---
title: Troubleshoot the Deploy CLI Tool
description: Describes troubleshooting information for the Auth0 Deploy Command Line Interface (CLI) tool.
topics:
  - extensions
  - deploy-cli
contentType:
  - index
  - concept
useCase: extensibility-extensions
---
# Troubleshoot the Deploy CLI tool

## Warning log entries after a Google Apps connection is recreated

**Symptoms**: you see warnings in the logs with messages like `Unable to get extended attributes: unauthorized` or `Unable to get groups: unauthorized`.

When you first create a Google Apps connection and enable one of the checkboxes to get extended information about the user, you'll need to go through a consent flow by having a Google Apps administrator follow the link under the "Setup instructions" button next to the connection. After completing this flow, some token information is stored on the connection's `options` object that is used to retrieve extended information when a user logs in.

If you have a Google Apps connection, you'll need to ensure that the consent flow is completed before exporting the connection information using the CLI. By doing this, the necessary tokens will be included in the exported script and the administrator won't have to go through the consent flow every time the connection is recreated.

::: warning
The tokens stored in the connection's `options` object is sensitive information that should be treated securely as any other system credential.
:::

## Keep reading

* [Deploy CLI Tool Overview](/extensions/deploy-cli)
* [Import/Export Tenant Configuration to a Directory Structure](/extensions/deploy-cli/guides/import-export-directory-structure)
* [Import/Export Tenant Configuration to a YAML File](/extensions/deploy-cli/guides/import-export-yaml-file)
