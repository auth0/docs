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

<%= include('../_includes/set-up-webtask-cli') %>

## Hooks status

For each extensibility point, you may have either no associated Hooks enabled or **one** associated Hook enabled.

By default, the Auth0 CLI creates new Hooks in a disabled state.

## Enable your Hook

The following command enables your Hook:

  `auth0 enable my-extension-1 -p auth0-default`

By enabling a given Hook, the Auth0 CLI disables all other Hooks associated with the same extensibility point.

## Disable your Hook

The following command disables your Hook:

  `auth0 disable my-extension-1 -p auth0-default`
