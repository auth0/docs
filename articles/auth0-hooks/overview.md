---
description: >-
  Auth0 hooks are JavaScript functions executed as part of the user
  authentication flow. They allow you to customize and extend Auth0's
  capabilities, and you can chain them together for modular coding.
---

# Auth0 Hooks: Overview

Auth0 Hooks, which will eventually replace [Rules](/rules), allow you to extend the Auth0 platform with custom code.

Hooks are Webtasks associated with specific extensibility points of the Auth0 platform. Auth0 invokes the Hooks at runtime to execute your custom logic.

You can manage your Hooks using:

* [The Auth0 Management Dashboard](/auth0-hooks/dashboard)
* [The Auth0 Command-Line Interface (CLI)](/auth0-hooks/cli).

## Supported Extensibility Points

You can create Hooks for the following [extensibility points](/auth0-hooks/extensibility-points):

- credentials-exchange
- pre-user-registration
- post-user-registration
