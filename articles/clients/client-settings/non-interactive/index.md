---
description: Client settings for Non Interactive Clients
url: /clients/client-settings/non-interactive
toc: true
---

# Client Settings: Non Interactive Client

::: version-warning
This document lists the settings for a Non Interactive Client; if you're using a different Client type, please use the drop-down to select the appropriate doc.
:::

When creating an Auth0 Client, you'll be asked to indicate the *type* of Client you want to create. 

![Window for selecting client type](/media/articles/clients/create-clients.png)

If your app is a CLI, daemon, or a service running on the backend, you'll want to create a **Non Interactive Client**.

## Settings

<%= include('../_settings') %>

- **Client Type**: The type of client you are implementing. If your app is a CLI, daemon, or a service running on the backend, use a **Non Interactive Client**.

<%= include('../_token-endpoint-auth-method') %>

<%= include('../_settings-pt2') %>

### Advanced Settings

<%= include('../_adv-settings') %>

<%= include('../_trust-token-endpoint-ip-header') %>

<%= include('../_adv-settings-pt2') %>
