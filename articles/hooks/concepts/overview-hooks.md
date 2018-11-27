---
description: Describes what Hooks and Extensibility Points are
beta: true
topics:
    - hooks
    - extensibility-points
contentType:
  - concept
useCase: extensibility-hooks
---
# What are Hooks?

Hooks allow you to extend the Auth0 platform with custom code.

When using [Database Connections](/connections/database), Hooks allow you to customize the behavior of Auth0 using Node.js code that is executed against extensibility points (which are comparable to webhooks that come with a server). Hooks allow you modularity when configuring your Auth0 implementation, and extend the functionality of base Auth0 features.

## Hooks, Webtasks, and Extensibility Points

Hooks are Webtasks associated with specific extensibility points of the Auth0 platform. When using [Database Connections](/connections/database), Auth0 invokes the Hooks at runtime to execute your custom logic.

You can manage your Hooks using:

* The Dashboard
* The Command-Line Interface

### Use the Dashboard

With the Dashboard, you can [create or delete a new Hook](/hooks/guides/create-delete-hooks-using-dashboard), [edit an existing Hook](/hooks/guides/edit-hooks-using-dashboard), and [enable or disable an existing Hook](/hooks/guides/enable-disable-hooks-using-dashboard) using the Dashboard.

### Use the command-line interface

The command-line interface offers similar functionality to the dashboard in that you can [create or delete a new Hook](/hooks/guides/create-delete-hooks-using-cli), [edit an existing Hook](/hooks/guides/edit-hooks-using-cli), and [enable or disable an existing Hook](/hooks/guides/enable-disable-hooks-using-cli).

The command-line interface also offers you the ability to get [logs on your Hooks usage](/hooks/guides/logging-hooks-using-cli).

## Supported Extensibility Points

You can create Hooks for the following [extensibility points](/hooks/extensibility-points):

- [Credentials Exchange](/hooks/guides/credentials-exchange-extensibility-point)
- [Pre-User Registration](/hooks/guides/pre-user-registration-extensibility-point)
- [Post-User Registration](/hooks/guides/post-user-registration-extensibility-point)

<%= include('../_includes/_ip_whitelist') %>

## Use the Webtask Editor to Edit Hooks

You can edit Hooks directly using the Webtask Editor. Please see the [Webtask documentation](https://webtask.io/docs/editor) for detailed information.