---
title: Install the Deploy CLI Tool
description: Learn how to install and configure the Deploy CLI Tool.
topics:
  - extensions
  - deploy-cli
contentType:
  - how-to
useCase: extensibility-extensions
---
# Install and Configure the Deploy CLI Tool

This guide will show you how to install the Deploy CLI Tool and configure it using the Deploy CLI Extension. To do this, you must:

1. [Install the Deploy CLI Tool](#install-the-deploy-cli-tool)
2. [Create the Deploy CLI Application](#create-the-deploy-cli-application)
3. [Configure the Deploy CLI Application](#configure-the-deploy-cli-application)
4. [Configure the Deploy CLI Tool](#configure-the-deploy-cli-tool)
5. [Run the Deploy CLI Tool](#run-the-deploy-cli-tool)

You can also upgrade from a previous version of the tool. The `auth0-deploy-cli` tool was completely rewritten from version 1 to [version 2](/extensions/deploy-cli/references/what-new-v2), which means that it is not backwards compatible. Please consider the following when upgrading:

- The directory structure and format has changed to allow for additional object types.
- The command line parameters have changed to allow for additional options, such as export.

## Install the Deploy CLI Tool

To install the Deploy CLI Tool, use the command-line interface to run:

```bash
npm i -g auth0-deploy-cli
```

## Create the Deploy CLI Application

The Deploy CLI Tool must be authorized to call the Management API. To do this, you must install the **Auth0 Deploy CLI** extension and then configure the application. Once installed, the extension creates an application named `auth0-deploy-cli-extension`, which you can then configure. Later, you will use the Client ID and Secret from this application to configure the Deploy CLI Tool.

1. Navigate to the [Extensions](${manage_url}/#/extensions) page in the [Auth0 Dashboard](${manage_url}), search for the **Auth0 Deploy CLI** extension, and click the Extension to install.

![Find Deploy CLI Extension](/media/articles/extensions/deploy-cli/deploy-cli-find-extension.png)

2. Click **Install**.

![Install Deploy CLI Extension](/media/articles/extensions/deploy-cli/deploy-cli-install-extension.png)

3. From the list of installed extensions, click **Auth0 Deploy CLI**, then click **Accept** to consent to allow the extension to access your data. 

## Configure the Deploy CLI Application

The Deploy CLI Application must be configured to grant it access to the Management API with the [required scopes](#required-scopes). 

1. Navigate to the [Applications](${manage_url}/#/applications) page in the [Auth0 Dashboard](${manage_url}/), and click the `auth0-deploy-cli-extension` application.

![View Applications](/media/articles/extensions/deploy-cli/deploy-cli-app-list.png)

2. Locate **Client ID** and **Client Secret**. Make note of these values; you will need them later.

3. Locate **Application Type**, select **Machine to Machine**, and click **Save Changes**.

4. Repeat step 1 to refresh the available Application options. Once refreshed, note that on the **APIs** tab, under **Auth0 Management API**, the [required scopes](#required-scopes) should already be enabled.

![Enable Permissions](/media/articles/extensions/deploy-cli/deploy-cli-enable-permissions.png)

### Required Scopes

The following scopes are required to be enabled on the `auth0-deploy-cli-extension` Application to ensure it is configured for proper access to the Management API. The **Auth0 Deploy CLI** extension should have already automatically enabled these permissions when creating the `auth0-deploy-cli-extension`.

    - read:client_grants
    - create:client_grants
    - delete:client_grants
    - update:client_grants
    - read:clients
    - update:clients
    - delete:clients
    - create:clients
    - read:client_keys
    - update:client_keys
    - delete:client_keys
    - create:client_keys
    - read:connections
    - update:connections
    - delete:connections
    - create:connections
    - read:resource_servers
    - update:resource_servers
    - delete:resource_servers
    - create:resource_servers
    - read:rules
    - update:rules
    - delete:rules
    - create:rules
    - read:rules_configs
    - update:rules_configs
    - delete:rules_configs
    - read:email_provider
    - update:email_provider
    - delete:email_provider
    - create:email_provider
    - read:tenant_settings
    - update:tenant_settings
    - read:grants
    - delete:grants
    - read:guardian_factors
    - update:guardian_factors
    - read:email_templates
    - create:email_templates
    - update:email_templates
    - read:roles
    - create:roles
    - delete:roles
    - update:roles
    - read:prompts
    - update:prompts
    - read:branding
    - update:branding

## Configure the Deploy CLI Tool

To configure the Deploy CLI Tool to use the Deploy CLI Application, create a **config.json** file, including the **Client ID** and **Client Secret** you located when configuring the Deploy CLI Application:

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
* [Troubleshooting Deploy CLI Tool](/extensions/deploy-cli/references/troubleshooting)
