---
title: Install the Deploy CLI Tool
description: Learn how to install the Deploy CLI tool.
topics:
  - extensions
  - deploy-cli
contentType:
  - how-to
useCase: extensibility-extensions
---
# Install the Deploy CLI Tool

There are three ways to install the Deploy CLI tool:

1. Using the Dashboard
2. Using the command-line interface
3. Manually

You can also upgrade from a previous version of the tool. The `auth0-deploy-cli` tool was completely rewritten from version 1 to version 2 which means it is not backwards compatible. Please consider the following when upgrading:

- The directory structure and format has changed to allow for additional object types.
- The command line parameters have changed to allow for additional options such as export.

## Prerequisites

For this tool to function it must be authorized to the Auth0 Management API. You can do this by creating an application in your Auth0 service that has access to the management API with the following [scopes](#scopes-required) before.

Use the Auth0 Deploy CLI Extension to create the application. At the bottom of the README are instructions for doing this by hand instead.

## Install the the Deploy CLI tool using the Dashboard

1. Go to the [Extensions](${manage_url}/#/extensions) tab in the Dashboard. 

   ![Entensions Tab](/media/articles/extensions/deploy-cli/step1-extensions-overview.png)

2. Search for the Auth0 Deploy CLI extension.

3. Click **Install**.

4. Click the checkmark to allow the extension access to your data. 

   You can now open the extension, which will show instructions on how you can use it:

   ![Deploy CLI Homepage](/media/articles/extensions/deploy-cli/step3-auth0-deploy-cli-homepage.png)

   It should create a machine-to-machine application named `auth0-deploy-cli-extension`. This application contains the Client ID and Secret that you use to configure the cli.

## Install the Deploy CLI tool using the command-line interface

To install the Deploy CLI tool using the command-line interface, run:

```bash
npm i -g auth0-deploy-cli
```

## Install the Deploy CLI tool manually

To create the client application manually: 

1. Log into your Dashboard.
2. Click the Applications tab.
3. Click **CREATE APPLICATION**.
    - Provide a name for your application (e.g. **Deploy Client**).
    - Select **Machine-to-Machine** as the application type.
    - Click **Create**.
4. Use the **Select an API** dropdown to choose **Auth0 Management API**.
5. Select the [scopes](#scopes-required) as defined below.
6. Click **Authorize**.

### Scopes required

The Deploy CLI tool must be authorized to call the Management API. You can do this by creating an application that grants access to the Management API with the following scopes:

```js
read:client_grants
create:client_grants
delete:client_grants
update:client_grants
read:clients
update:clients
delete:clients
create:clients
read:client_keys
update:client_keys
delete:client_keys
create:client_keys
read:connections
update:connections
delete:connections
create:connections
read:resource_servers
update:resource_servers
delete:resource_servers
create:resource_servers
read:rules
update:rules
delete:rules
create:rules
read:rules_configs
update:rules_configs
delete:rules_configs
read:email_provider
update:email_provider
delete:email_provider
create:email_provider
read:tenant_settings
update:tenant_settings
read:grants
delete:grants
read:guardian_factors
update:guardian_factors
read:email_templates
create:email_templates
update:email_templates
read:roles
create:roles
delete:roles
update:roles
```

## Keep reading

* [Incorporate Deploy CLI into Build Environment](/extensions/deploy-cli/guides/incorporate-deploy-cli-into-build-environment)
* [Call Deploy CLI Tool Programmatically](/extensions/deploy-cli/guides/call-deploy-cli-programmatically)
* [Deploy CLI Tool Options](/extensions/deploy-cli/references/deploy-cli-options)
* [Import/Export Tenant Configuration to a Directory Structure](extensions/deploy-cli/guides/import-export-directory-structure)
* [Import/Export Tenant Configuration to a YAML File](/extensions/deploy-cli/guides/import-export-yaml-file)
* [Troubleshooting Deploy CLI Tool](/extensions/deploy-cli/references/troubleshooting)
