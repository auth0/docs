---
toc: true
classes: topic-page
title: Authorization Extension
description: Control user authorization behavior during runtime with the Authorization Extension
---

<div class="topic-page-header">
  <div data-name="example" class="topic-page-badge"></div>
  <h1>Authorization Extension</h1>
  <p>
    The Authorization Extension provides support for user authorization via Groups, Roles, and Permissions. You can define the expected behavior during the login process, and your configuration settings will be captured in a <a href="/rules">rule</a> that's executed during runtime.
  </p>
  <p>
    You can store authorization data like groups, roles, or permissions in the outgoing token issued by Auth0. Your application can then consume this information by inspecting the token and take appropriate actions based on the user's current authorization context.
  </p>
</div>

## Get Started

Before you can use the extension, you'll need to install it, configure the rule controlling its behavior during login, and set up your user management.

<ul class="topic-links">
  <li>
    <i class="icon icon-budicon-715"></i><a href="/extensions/authorization-extension/v2/implementation/installation">Install the Extension</a>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/extensions/authorization-extension/v2/implementation/configuration">Configure the Extension</a>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/extensions/authorization-extension/v2/implementation/setup">Set Up the Extension</a>
  </li>
</ul>

## Data Management

You can easily move data into or out of the Extension.

<ul class="topic-links">
  <li>
    <i class="icon icon-budicon-715"></i><a href="/extensions/authorization-extension/v2/import-export-data">Importing Existing Data into/Exporting Data from the Extension</a>
  </li>
</ul>

## Add Functionality

Once your extension is up and running, you can add additional functionality to it. You can also import/export user-related data.

<ul class="topic-links">
  <li>
    <i class="icon icon-budicon-715"></i><a href="/extensions/authorization-extension/v2/api-access">Enable API Access to the Extension</a>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/extensions/authorization-extension/v2/rules">Use the Authorization Extension's Data in Rules</a>
  </li>
</ul>

## Troubleshoot

Review our tips for troubleshooting commonly-seen issues.

<ul class="topic-links">
  <li>
    <i class="icon icon-budicon-715"></i><a href="/extensions/authorization-extension/v2/troubleshooting">Troubleshoot Errors</a>
  </li>
</ul>