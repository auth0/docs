---
description: How to get Hooks logs using the Auth0 Command-Line Interface
beta: true
topics:
    - hooks
    - cli
contentType: how-to
useCase: extensibility-hooks
v2: true
---
# Get Log Information About Hooks Using the Command-Line Interface

The Auth0 Command-Line Interface (CLI) allows you to gather real-time logging information on your Hooks.

::: warning
Tenants created after **July 16, 2018** will not have access to the underlying Webtask Sandbox via the Webtask CLI. Please contact [Auth0](https://auth0.com/?contact=true) to request access.
:::

## Set up the CLI

You can find instructions for installing and configuring the Webtask CLI in the [Dashboard > Webtask page](${manage_url}/#/account/webtasks). 

The `wt-cli` package also includes the `auth0` binary, allowing you to use the Auth0 CLI.

![Install Webtasks Instructions](/media/articles/hooks/mgmt-dashboard-webtasks.png)

::: note
All of the examples on this page use `auth0-profile` as the name of the profile. This is the same profile name used when installing `wt-cli` and can be obtained from *Step 2* of the instructions set located on [Auth0 Management Dashboard's Webtask page](${manage_url}/#/account/webtasks).
:::

You can use the following Auth0 CLI commands to gather information about your Hooks:

* To get a list of Hooks for a specific extensibility point:
  `auth0 ls -t pre-user-registration -p auth0-default`
* To get a list of Hooks associated with your Auth0 account:
  `auth0 ls -p auth0-default`
* To access logs containing real-time data on your Hooks:
  `auth0 logs -p auth0-default`
