---
description: How to use the Command-Line Interface with Hooks
url: /hooks/cli
---

# Auth0 Command-Line Interface

The Auth0 Command-Line Interface (CLI) allows you to create, edit, enable/disable, and delete Hooks associated with specific extensibility points within the Auth0 platform. You can also use the CLI to identify Hooks and gather real-time logging information.

## Install and Set Up the Auth0 Command-Line Interface

You can find instructions for installing and configuring the Webtask Command-Line Interface (CLI) in the [Auth0 Management Dashboard's Webtask page](${manage_url}/#/account/webtasks). The `wt-cli` package also includes the `auth0` binary, allowing you to use the Auth0 CLI.

![Install Webtasks Instructions](/media/articles/hooks/mgmt-dashboard-webtasks.png)

## Work with Hooks Using the Command-Line Interface

Once you have installed and set up the Auth0 Command-Line Interface (CLI), you can use it to create new Hooks and manage/delete existing Hooks. You can also use it to gather real-time log data on your Hooks.

:::panel-info Profile Name
The Auth0 CLI examples use `auth0-profile` as the name of the profile. This is the same profile name used when installing `wt-cli`, and you can obtain it from *Step 2* of the instructions set located on [Auth0 Management Dashboard's Webtask page](${manage_url}/#/account/webtasks).
:::

* [Create/Delete Hooks](/hooks/cli/create-delete)
* [Edit Existing Hooks](/hooks/cli/edit)
* [Enable/Disable Existing Hooks](/hooks/cli/enable-disable)
* [Identify and Get Log Data from Your Hooks](/hooks/cli/logs)
