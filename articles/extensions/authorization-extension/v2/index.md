---
toc: true
title: Authorization Extension
description: Guidance on setting up and managing the Authorization Extension
---

<div class="topic-page-header">
  <div data-name="example" class="topic-page-badge"></div>
  <h1>Authorization Extension</h1>
  <p>
    The Authorization Extension provides support for user authorization via Groups, Roles, and Permissions.
  </p>
</div>

## What is the Authorization Extension?

The Authorization Extension provides support for user authorization via Groups, Roles, and Permissions. You can define the expected behavior during the login process, and your configuration settings will be captured in a [rule](/rules) that's executed during runtime.

:::
If you're currently using Version 1 of the Extension, see the [Migration Guide](/extensions/authorization-extension/v2/migration) for upgrade instructions.

## Get Started

Before you can use the extension, you'll need to install it, configure the rule controlling its behavior during login, and set up your user management.

* [Install the Extension](/extensions/authorization-extension/v2/implementation/installation)
* [Configure the Extension](/extensions/authorization-extension/v2/implementation/configuration)
* [Set Up the Extension](/extensions/authorization-extension/v2/implementation/setup)


<ul class="topic-links">
  <li>
    <i class="icon icon-budicon-715"></i><a href="/hooks/overview">Install the Extension</a>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/hooks/dashboard">Configure the Extension</a>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/hooks/cli">Set Up the Extension</a>
  </li>
</ul>

## Data Management

You can easily move data into or out of the Extension.

* [Importing Existing Data into/Exporting Data from the Extension](/extensions/authorization-extension/v2/import-export-data)

## Add Functionality

Once your extension is up and running, you can add additional functionality to it. You can also import/export user-related data.

* [Enable API Access to the Extension](/extensions/authorization-extension/v2/api-access)
* [Use the Authorization Extension's Data in Rules](/extensions/authorization-extension/v2/rules)

## Troubleshoot

Review our tips for troubleshooting commonly-seen issues.

* [Troubleshoot Errors](/extensions/authorization-extension/v2/troubleshooting)