---
description: How to use the Command-Line Interface with Auth0 Hooks
url: /auth0-hooks/cli
---

# Auth0 Command-Line Interface

The Auth0 Command-Line Interface (CLI) allows you to create, manage, and delete Hooks associated with specific extensibility points within the Auth0 platform. You can also use the CLI to identify Hooks and gather real-time logging information.

## Install and Set Up the Auth0 Command-Line Interface

You can find instructions for installing and configuring the Webtask Command-Line Interface (CLI) in the [Auth0 Management Dashboard's Webtask page](${manage_url}/#/account/webtasks). This package also includes the `Auth0` binary, allowing you to use the Auth0 CLI.

:::panel-info Auth0 Beta
While the Auth0 CLI is undergoing beta testing, you must install `wt-cli` using the version available via [GitHub](https://github.com/auth0/wt-cli), *not* the public npm registry. To do so, run the following command in Step 1:

`npm i -g auth0/wt-cli#auth0`
:::

![Install Webtasks Instructions](/media/articles/auth0-hooks/mgmt-dashboard-webtasks.png)

## Work with Hooks Using the Command-Line Interface

Once you have installed and set up the Auth0 Command-Line Interface (CLI), you can use it to create new Hooks and manage/delete existing Hooks. You can also use it to gather real-time log data on your Hooks.

* ### [Create New Hooks](/auth0-hooks/cli/working-with-hooks#create-a-new-hook)
* ### [Manage/Delete Existing Hooks](/auth0-hooks/cli/working-with-hooks#manage-existing-hooks)
* ### [Identify and Get Log Data from Your Hooks](/auth0-hooks/cli/working-with-hooks#gather-information-about-your-hooks)
