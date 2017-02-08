---
url: /auth0-hooks
toc: true
description: >-
  Auth0 hooks are JavaScript functions executed as part of the user
  authentication flow. They allow you to customize and extend Auth0's
  capabilities, and you can chain them together for modular coding.
---

# Auth0 Hooks

Auth0 Hooks allow you to extend the Auth0 platform with custom code.

## Under the Hood

Auth0 Hooks are Webtasks associated with specific extensibility points of the Auth0 platform.

:::panel-info Extensibility Points
Extensibility points are like webhooks that come with a server.
:::

Auth0 invokes the Hooks at runtime to execute your custom logic. You can manage your Hooks using:

* The Auth0 Management Dashboard
* The Auth0 Command-Line Interface (CLI).

## Supported Extensibility Points

You can create Hooks for the following [extensibility points](/auth0-hooks/extensibility-points):

- client-credentials-exchange
- password-exchange
- pre-user-registration
- post-user-registration

Each of the extensibility points supports more than one Hook, but you can enable **one** Hook at a time. Disabled hooks are useful for staging new functionality.
