---
description: How to delete Hooks using the Auth0 Command-Line Interface
beta: true
topics:
    - hooks
    - cli
contentType: how-to
useCase: extensibility-hooks
v2: true
---
# Delete Hooks Using the Command-Line Interface

The Auth0 Command-Line Interface (CLI) allows you to delete Hooks associated with specific extensibility points within the Auth0 platform if you no longer need them.

::: warning
Tenants created after **July 16, 2018** will not have access to the underlying Webtask Sandbox via the Webtask CLI. Please contact [Auth0](https://auth0.com/?contact=true) to request access.
:::

## Prerequisite: set up the CLI

Before proceeding, you'll need to set up the Webtask CLI. You can find instructions for installing and configuring the Webtask CLI in the [Dashboard > Webtask page](${manage_url}/#/account/webtasks). 

The `wt-cli` package also includes the `auth0` binary, allowing you to use the Auth0 CLI.

![Install Webtasks Instructions](/media/articles/hooks/mgmt-dashboard-webtasks.png)

::: note
The Auth0 CLI examples use `auth0-profile` as the name of the profile. This is the same profile name used when installing `wt-cli`, and you can obtain it from *Step 2* of the instructions set located on [Auth0 Management Dashboard's Webtask page](${manage_url}/#/account/webtasks).
:::

## Delete an existing Hook

If you need to delete an existing Hook, you can do so using the following command:

`auth0 rm my-extension-1 -p auth0-default`
