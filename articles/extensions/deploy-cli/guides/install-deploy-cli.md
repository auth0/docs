---
title: Install and Configure the Deploy CLI Tool
description: Learn how to install and configure the Deploy CLI tool.
topics:
  - extensions
  - deploy-cli
contentType:
  - how-to
useCase: extensibility-extensions
---
# Install and Configure the Deploy CLI Tool

This guide will show you how to install the Deploy CLI tool and configure it using the Deploy CLI extension. To do this, you must:

1. [Install the Deploy CLI Tool](#install-the-deploy-cli-tool)
2. [Install the Deploy CLI Extension](#install-the-deploy-cli-extension)
3. [Configure the Deploy CLI Tool](#configure-the-deploy-cli-tool)
4. [Run the Deploy CLI Tool](#run-the-deploy-cli-tool)

You can also upgrade from a previous version of the tool. The `auth0-deploy-cli` tool was completely rewritten from version 1 to [version 2 or later](/extensions/deploy-cli/references/whats-new), which means that it is not backwards compatible. Please consider the following when upgrading:

- The directory structure and format has changed to allow for additional object types.
- The command line parameters have changed to allow for additional options, such as export.

## Install the Deploy CLI Tool

To install the Deploy CLI Tool, use the command-line interface to run:

```bash
npm i -g auth0-deploy-cli
```

## Install the Deploy CLI Extension

The Deploy CLI tool must be authorized to call the Management API. To do this, the **Auth0 Deploy CLI** extension configures your tenant by creating and configuring an application named **auth0-deploy-cli-extension** and authorizing it for use with the Management API. Later, you will use the Client ID and Secret from this application to configure the Deploy CLI Tool.

1. Navigate to the [Extensions](${manage_url}/#/extensions) page in the [Auth0 Dashboard](${manage_url}), locate the **Auth0 Deploy CLI** extension, and click the extension.

![Find Deploy CLI Extension](/media/articles/extensions/deploy-cli/deploy-cli-find-extension.png)

2. Click **Install**.

![Install Deploy CLI Extension](/media/articles/extensions/deploy-cli/deploy-cli-install-extension.png)

3. From the list of installed extensions, click **Auth0 Deploy CLI**, then click **Accept** to consent to allow the extension to access your data. 

::: note
If necessary, you can also [manually create and configure the **auth0-deploy-cli-extension** application](/extensions/deploy-cli/guides/create-deploy-cli-application-manually#create-the-initial-deploy-cli-application) and [manually modify required scopes](/extensions/deploy-cli/guides/create-deploy-cli-application-manually#modify-deploy-cli-application-scopes).
:::

## Configure the Deploy CLI Tool

To configure the Deploy CLI tool to use the Deploy CLI application, create a **config.json** file, including the **Client ID** and **Client Secret** from the **auth0-deploy-cli-extension** application. You can find this application on the [Applications](${manage_url}/#/applications) page in the [Auth0 Dashboard](${manage_url}).

```json
{
  "AUTH0_DOMAIN": "${account.namespace}",
  "AUTH0_CLIENT_ID": "${account.clientId}",
  "AUTH0_CLIENT_SECRET": "YOUR_CLIENT_SECRET",
  "AUTH0_KEYWORD_REPLACE_MAPPINGS": { "AUTH0_TENANT_NAME": "${account.tenant}" },
  "AUTH0_ALLOW_DELETE": false,
  "AUTH0_EXCLUDED_RULES": [ "rule-1-name" ]
}
```

## Run the Deploy CLI Tool

To run the Deploy CLI Tool, use the command-line interface to run:

```bash
a0deploy export -c config.json -f yaml -o <your repo directory>
```

## Keep reading

* [Incorporate Deploy CLI into Build Environment](/extensions/deploy-cli/guides/incorporate-deploy-cli-into-build-environment)
* [Call Deploy CLI Tool Programmatically](/extensions/deploy-cli/guides/call-deploy-cli-programmatically)
* [Deploy CLI Tool Options](/extensions/deploy-cli/references/deploy-cli-options)
* [Import/Export Tenant Configuration to a Directory Structure](extensions/deploy-cli/guides/import-export-directory-structure)
* [Import/Export Tenant Configuration to a YAML File](/extensions/deploy-cli/guides/import-export-yaml-file)
* [Troubleshooting the Deploy CLI Tool](/extensions/deploy-cli/references/troubleshooting)
