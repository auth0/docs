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

The Authorization Extension provides support for user authorization via Groups, Roles, and Permissions. You can define the expected behavior during the login process, and your configuration settings will be captured in a [rule](/rules) that's executed during runtime.

You can store authorization data like groups, roles, or permissions in the outgoing token issued by Auth0. Your application can then consume this information by inspecting the token and take appropriate actions based on the user's current authorization context.

Currently, roles and permissions are set on a per-application basis. If you need the same roles or permissions on another application, you'll have to create them separately.

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
