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

This article will walk you through installing Auth0's Deploy CLI tool.

## Prerequisites

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
```

## Install the Deploy CLI tool

There are three ways to install the Deploy CLI tool:

1. Using the Dashboard
2. Using the command-line interface
3. Manually

### Install the the Deploy CLI tool using the Dashboard

1. Go to the [Extensions](${manage_url}/#/extensions) tab in the Dashboard. 

   ![Entensions Tab](/media/articles/extensions/deploy-cli/step1-extensions-overview.png)

2. Click **CREATE EXTENSION** and install the extension from the [Deploy CLI Extension repository](https://github.com/auth0-extensions/auth0-deploy-cli-extension).

   ![Extension Link](/media/articles/extensions/deploy-cli/step2-extension-link.png)
   
3. Click **Install**.

4. Click the checkmark to allow the extension access to your data. 

   You can now open the extension, which will show instructions on how you can use it:

   ![Deploy CLI Homepage](/media/articles/extensions/deploy-cli/step3-auth0-deploy-cli-homepage.png)

### Install the the Deploy CLI tool using the command-line interface

To install the the Deploy CLI tool using the command-line interface, run:

```bash
npm i -g auth0-deploy-cli
```

### Install the the Deploy CLI tool manually

To create the client application manually: 

1. Log into your Dashboard.
2.  Click the Applications tab.
3.  Click **CREATE APPLICATION**.
    - Provide a name for your application (e.g. **Deploy Client**).
    - Select **Machine-to-Machine** as the application type.
    - Click **Create**.
4.  Use the **Select an API** dropdown to choose **Auth0 Management API**.
5.  Select the [scopes](#scopes) as defined above.
6.  Click **Authorize**.

## Keep reading

* [Incorporate Deploy CLI into Build Environment](/extensions/deploy-cli/guides/incorporate-deploy-cli-into-build-environment)
* [Call Deploy CLI Tool Programmatically](/extensions/deploy-cli/guides/call-deploy-cli-programmatically)
* [Deploy CLI Tool Options](/extensions/deploy-cli/references/deploy-cli-options)
* [Import/Export Tenant Configuration to a Directory Structure](extensions/deploy-cli/guides/import-export-directory-structure)
* [Import/Export Tenant Configuration to a YAML File](/extensions/deploy-cli/guides/import-export-yaml-file)
