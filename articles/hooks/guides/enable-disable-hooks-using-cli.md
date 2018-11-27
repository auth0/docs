---
description: How to enable/disable Hooks using the Auth0 Command-Line Interface
beta: true
topics:
    - hooks
    - cli
contentType: how-to
useCase: extensibility-hooks
v2: true
---
# Enable or Disable Hooks Using the Command-Line Interface

The Auth0 Command-Line Interface (CLI) allows you to enable or disable existing Hooks associated with specific extensibility points within the Auth0 platform.

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

## Hooks status

For each extensibility point, you may have either no associated Hooks enabled or **one** associated Hook enabled.

By default, the Auth0 CLI creates new Hooks in a disabled state.

## Enable Your Hook

The following command enables your Hook:

  `auth0 enable my-extension-1 -p auth0-default`

By enabling a given Hook, the Auth0 CLI disables all other Hooks associated with the same extensibility point.

## Disable Your Hook

The following command disables your Hook:

  `auth0 disable my-extension-1 -p auth0-default`
