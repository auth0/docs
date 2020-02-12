---
title: Hooks
description: Learn about Auth0 Hooks for Database Connections and Passwordless Connections.
beta: true
topics:
    - hooks
    - extensibility-points
contentType:
  - index
  - concept
useCase: extensibility-hooks
---
# Hooks

<%= include('../_includes/_ip_whitelist') %>

Hooks are secure, self-contained functions that allow you to customize the behavior of Auth0 when executed for selected [extensibility points](/hooks/extensibility-points) of the Auth0 platform. Auth0 invokes Hooks during runtime to execute your custom Node.js code.

Depending on the extensibility point, you can use Hooks with [Database Connections](/connections/database) and/or [Passwordless Connections](/connections/passwordless).

## Manage Hooks

You can create, update, delete, enable/disable, and view Hooks from the Dashboard or Management API. To learn more, see:

- [Create Hooks](/hooks/create)
- [Update Hooks](/hooks/update)
- [Delete Hooks](/hooks/delete)
- [Enable/Disable Hooks](/hooks/enable-disable)
- [View Hooks](/hooks/view)

Hooks may also be imported and exported using the [Deploy Command-Line Interface (CLI) Extension](/extensions/deploy-cli).

<%= include('./_includes/_handle_rate_limits') %>

## Manage Hook Secrets

Hooks feature integrated secret management to securely store secrets while making them conveniently available in code. To learn more, see [Hook Secrets](/hooks/secrets).

## Test Hooks

The Hooks editor in the Dashboard has an integrated Runner, which allows you to test your code without leaving the editor.

<%= include('./_includes/_test_runner_save_warning') %>

## View Logs

You can view real-time logging information for specific configured Hooks using the Dashboard. To learn more, see [View Logs for Hooks](/hooks/view-logs).
