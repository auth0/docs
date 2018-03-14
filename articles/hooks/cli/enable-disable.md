---
description: How to enable/disable Hooks using the Auth0 Command-Line Interfance
beta: true
---

# Enable or Disable Existing Hooks Using the Auth0 Command-Line Interface

::: note
All of the examples on this page use `auth0-profile` as the name of the profile. This is the same profile name used when installing `wt-cli` and can be obtained from *Step 2* of the instructions set located on [Auth0 Management Dashboard's Webtask page](${manage_url}/#/account/webtasks).
:::

For each extensibility point, you may have either no associated Hooks enabled or **one** associated Hook enabled.

By default, the Auth0 CLI creates new Hooks in a disabled state.

## Enable Your Hook

The following command enables your Hook:

  `auth0 enable my-extension-1 -p auth0-default`

By enabling a given Hook, the Auth0 CLI disables all other Hooks associated with the same extensibility point.

## Disable Your Hook

The following command disables your Hook:

  `auth0 disable my-extension-1 -p auth0-default`