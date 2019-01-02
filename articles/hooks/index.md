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
# Hooks, Webtasks, and Extensibility Points

Hooks allow you to extend the Auth0 platform with custom code.

When using [Database Connections](/connections/database), Hooks allow you to customize the behavior of Auth0 using Node.js code that executes against extensibility points (which are comparable to webhooks that come with a server). Hooks allow you modularity when configuring your Auth0 implementation, and extend the functionality of base Auth0 features.

## Hooks

Hooks are Webtasks associated with specific extensibility points of the Auth0 platform. When using [Database Connections](/connections/database), Auth0 invokes the Hooks at runtime to execute custom logic.

Manage Hooks using:

* The Dashboard
* The Command-Line Interface

### Use the Dashboard

With the Dashboard, you can [create](/hooks/guides/create-hooks-using-dashboard) or [delete](/hooks/guides/delete-hooks-using-dashboard) a Hook, [edit an existing Hook](/hooks/guides/edit-hooks-using-dashboard), and [enable or disable an existing Hook](/hooks/guides/enable-disable-hooks-using-dashboard) using the Dashboard.

### Use the command-line interface

The command-line interface offers similar functionality to the dashboard in that you can [create](/hooks/guides/create-hooks-using-cli) or [delete](/hooks/guides/delete-hooks-using-cli) a Hook, [edit an existing Hook](/hooks/guides/edit-hooks-using-cli), and [enable or disable an existing Hook](/hooks/guides/enable-disable-hooks-using-cli).

The command-line interface also offers you the ability to get [logs on your Hooks usage](/hooks/guides/logging-hooks-using-cli).

## Extensibility points

Hooks allow you to customize the behavior of Auth0 with Node.js code, but they are executed only against selected extensibility points, which are the serverless option analogous to the webhooks that come with a server. The following is a list of currently available extensibility points:

- [Credentials Exchange](/hooks/concepts/credentials-exchange-extensibility-point): change the scopes and add custom claims to the tokens issued by the Auth0 API's `POST /oauth/token` endpoint
- [Pre-User Registration](/hooks/concepts/pre-user-registration-extensibility-point): prevent user registration and add custom metadata to a newly-created user
- [Post-User Registration](/hooks/concepts/post-user-registration-extensibility-point): implement custom actions that execute asynchronously from the Auth0 authentication process after a new user registers and is added to the database

<%= include('../_includes/_ip_whitelist') %>

## Use the Webtask Editor to edit Hooks

Edit Hooks directly using the Webtask Editor. Please see the [Webtask documentation](https://webtask.io/docs/editor) for detailed information.