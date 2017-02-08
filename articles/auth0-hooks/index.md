---
url: /auth0-hooks
toc: true
description: >-
  Auth0 hooks are JavaScript functions executed as part of the user
  authentication flow. They allow you to customize and extend Auth0's
  capabilities, and you can chain them together for modular coding.
---

# Auth0 Hooks

Auth0 Hooks allow you to extend the Auth0 platform with custom code. You can manage your Hooks using the Auth0 Command-Line Interface (CLI).

## Under the Hood

Auth0 Hooks are Webtasks associated with specific extensibility points of the Auth0 platform. Auth0 invokes the Hooks at runtime to execute your custom logic.

## Installing the Webtask Command-Line Interface

You can find instructions for installing the Webtask Command-Line Interface in the [Auth0 Management Dashboard's Webtask page](${manage_url}/#/account/webtasks).

## Sample Hook

For information on how Auth0 hooks work and how you can leverage them, please see our [example using the `pre-user-registration` extensibility point](/auth0-hooks/example).
