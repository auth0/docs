---
description: How to get Hooks logs using the Auth0 Command-Line Interface
beta: true
topics:
    - hooks
    - cli
contentType: how-to
useCase: extensibility-hooks
v2: true
---

# Get Log Information About Hooks Using the Command-Line Interface

The Auth0 Command-Line Interface (CLI) allows you to gather real-time logging information on Hooks.

<%= include('./_includes/set-up-webtask-cli') %>

Use the following Auth0 CLI commands to gather information about Hooks.

**Access logs containing real-time data on Hooks:**

```bash
auth0 logs -p auth0-default
```

**List Hooks for a specific extensibility point:**

```bash
auth0 ls -t pre-user-registration -p auth0-default
```

**List of Hooks associated with Auth0 account:**

```bash
auth0 ls -p auth0-default
```
