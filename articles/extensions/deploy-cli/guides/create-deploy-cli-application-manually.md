---
title: Create and Configure the Deploy CLI Application Manually
description: Learn how to create and configure the Deploy CLI application for use with the Deploy CLI tool. This can be done programmatically using the Auth0 Deploy CLI extension.
topics:
  - extensions
  - deploy-cli
  - dashboard
contentType:
  - how-to
useCase: extensibility-extensions
---
# Create and Configure the Deploy CLI Application Manually

To use the Deploy CLI tool, your tenant must be configured appropriately.

::: note
Generally, you do this programmatically by [installing the **Auth0 Deploy CLI** extension](/extensions/deploy-cli/guides/install-deploy-cli#install-the-deploy-cli-extension), which will create and configure an Application that is authorized to call the Management API.
:::

Sometimes, you may wish to create and configure this application manually. At a later time, you may also want to modify scopes for an application that has been created previously.

## Create the Initial Deploy CLI Application

To create and configure the initial Deploy CLI Application:

1. Navigate to the [Applications](${manage_url}/#/applications) page in the [Auth0 Dashboard](${manage_url}), and click **+ Create Application**.

2. Enter `auth0-deploy-cli-extension` as the name for your Application, select **Machine to Machine Applications**, and click **Create**.

![Select Application Name and Type](/media/articles/applications/create-client-popup.png)

3. When asked which API you want to call from your application, select **Auth0 Management API**.

![Select API](/media/articles/applications/m2m-select-api.png)

4. Select the [required scopes](#required-scopes) to enable them for your Application, and click **Authorize**. These scopes will be issued as part of your Application's Access Token.

![Select Scopes](/media/articles/applications/m2m-select-scopes.png)

## Modify Deploy CLI Application Scopes
To modify permissions (scopes) for an application that has been created previously:

1. Navigate to the [Applications](${manage_url}/#/applications) page in the [Auth0 Dashboard](${manage_url}/), and click the `auth0-deploy-cli-extension` application.

![View Applications](/media/articles/extensions/deploy-cli/deploy-cli-app-list.png)

2. Click the **APIs** tab, expand the **Auth0 Management API**, and enable any [required scopes](#required-scopes) that appear to have been disabled.

![Enable Permissions](/media/articles/extensions/deploy-cli/deploy-cli-enable-permissions.png)

::: warning
If the APIs tab is not visible:

1. For **Application Type**, and select **Machine to Machine**. 

2. Click **Save Changes**, then refresh the page. The APIs tab should now be visible.
:::

## Required Scopes

The following scopes are required to be enabled on the `auth0-deploy-cli-extension` Application to ensure it is configured for proper access to the Management API.

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
    - read:hooks
    - create:hooks
    - update:hooks
    - delete:hooks
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