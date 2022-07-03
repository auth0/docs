---
toc: true
classes: topic-page
title: Authorization Extension
description: Control user authorization behavior during runtime with the Authorization Extension
topics:
  - extensions
  - authorization_v2
contentType:
  - how-to
  - concept
useCase: extensibility-extensions
---

# Authorization Extension

::: panel Breaking Changes
Authorization Extension 2.6 contains breaking changes that result from changed logic for storing and handling the API Key; these require you to perform additional steps upon upgrade, as detailed below. Failing to complete these steps will result in either an `InvalidApiKey` or `You are not allowed to access this application` error on rule execution. For more info, see the [changelog](https://github.com/auth0/auth0-authorization-extension/blob/master/CHANGELOG.md).

Upgrades from version 2.6 or later do not have breaking changes and require no further action. 

**If you are upgrading from a version before 2.6, you must:**

Upgrade the Authorization Extension

1. Navigate to the [Extensions](${manage_url}/#/extensions) page in the [Auth0 Dashboard](${manage_url}), and click the **Installed Extensions** tab. 
2. Locate **Auth0 Authorization**, click **Upgrade**, and confirm. Wait for the upgrade to complete.

Rotate the extension's API Key

1. Click on **Auth0 Authorization** to open the extension.
2. From the dropdown menu in the top-right of the extension dashboard, select **Configuration**.
3. Locate the **API Key** section, and click **Rotate**.

Republish the extension's Rule

1. Click **Publish Rule**.

Delete the old extension Rule, if it exists

1. Navigate to the [Rules](${manage_url}/#/rules) page in the [Auth0 Dashboard](${manage_url})
2. Locate the `auth0-authz` rule. If it does not exist, you are done.; otherwise, continue with these steps:
3. Locate the `auth0-authorization-extension` rule and drag it into the position below the `auth0-authz` rule.
4. Check that the `auth0-authz` rule:
    * was authored by the Authorization Extension and has not been modified manually
    * will not change the authorization flow in a way that will grant access or privileges to undesired users if it is removed
5. If the above conditions are true, use the toggle to disable the `auth0-authz` rule. After verifying that everything works appropriately, you can decide whether to leave the rule disabled or remove it entirely.
:::

::: note
<%= include('../../../_includes/_rbac_methods') %>
:::

<%= include('../../../_includes/_rbac_vs_extensions') %>

The Authorization Extension provides support for user authorization via Groups, <dfn data-key="role">Roles</dfn>, and Permissions. You can define the expected behavior during the login process, and your configuration settings will be captured in a [rule](/rules) that's executed during runtime.

With the Authorization Extension, you can store authorization data like groups, roles, or permissions in the outgoing token issued by Auth0. Your application can then consume this information by inspecting the token and take appropriate actions based on the user's current authorization context.

With the Authorization Extension, roles and permissions are set on a per-application basis. If you need the same roles or permissions on another application, you'll have to create them separately. Conversely, the [Authorization Core](/authorization/concepts/core-vs-extension) feature set provides much more flexibility with roles and permissions.

## Get Started

Before you can use the extension, you'll need to install it, configure the rule controlling its behavior during login, and set up your user management.

<ul class="topic-links">
  <li>
    <i class="icon icon-budicon-715"></i><a href="/extensions/authorization-extension/v2/implementation/installation">Install the Extension</a>
    <p>Walk through the process of installing the Authorization Extension.</p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/extensions/authorization-extension/v2/implementation/setup">Set Up the Extension</a>
    <p>Learn the basics of users, groups, roles, and permissions, and how to configure them.</p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/extensions/authorization-extension/v2/implementation/configuration">Configure the Extension</a>
    <p>Configure how the extension will behave during the login transaction.</p>
  </li>
</ul>

## Data Management

You can easily move data into or out of the Extension.

<ul class="topic-links">
  <li>
    <i class="icon icon-budicon-715"></i><a href="/extensions/authorization-extension/v2/import-export-data">Importing Existing Data into/Exporting Data from the Extension</a>
    <p>Learn how you can import or export authorization data using a JSON file.</p>
  </li>
</ul>

## Add Functionality

Once your extension is up and running, you can add additional functionality to it. You can also import/export user-related data.

<ul class="topic-links">
  <li>
    <i class="icon icon-budicon-715"></i><a href="/extensions/authorization-extension/v2/api-access">Enable API Access to the Extension</a>
    <p>Learn how you can automate provisioning and query the authorization context of your users in real-time, using the extension's API.</p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/api/authorization-extension">Authorization Extension API Explorer</a>
    <p>Learn about the Authorization Extension's API endpoints and how you can use them.</p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/extensions/authorization-extension/v2/rules">Use the Authorization Extension's Data in Rules</a>
    <p>Learn how you can use rules to configure extra logic to your logins.</p>
  </li>
</ul>

## Troubleshoot

Review our tips for troubleshooting commonly-seen issues.

<ul class="topic-links">
  <li>
    <i class="icon icon-budicon-715"></i><a href="/extensions/authorization-extension/v2/troubleshooting">Troubleshoot Errors</a>
    <p>Common problems and tips to help you identify their cause.</p>
  </li>
</ul>
