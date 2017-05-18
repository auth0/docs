---
description: >-
  Hooks are JavaScript functions executed as part of the user
  authentication flow. They allow you to customize and extend Auth0's
  capabilities, and you can chain them together for modular coding.
beta: true
---

# Hooks: Overview

Hooks, which will eventually replace [Rules](/rules), allow you to extend the Auth0 platform with custom code.

Hooks are Webtasks associated with specific extensibility points of the Auth0 platform. Auth0 invokes the Hooks at runtime to execute your custom logic.

You can manage your Hooks using:

* [The Auth0 Management Dashboard](/hooks/dashboard)
* [The Auth0 Command-Line Interface (CLI)](/hooks/cli).

## Supported Extensibility Points

You can create Hooks for the following [extensibility points](/hooks/extensibility-points):

- credentials-exchange
- pre-user-registration
- post-user-registration
