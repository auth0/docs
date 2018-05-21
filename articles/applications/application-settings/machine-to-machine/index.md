---
description: Application settings for Machine to Machine Applications
toc: true
---

# Application Settings: Machine to Machine Application

::: version-warning
This document lists the settings for a Machine to Machine Application; if you're using a different Application type, please use the drop-down to select the appropriate doc.
:::

When creating an Auth0 Application, you'll be asked to indicate the *type* of Application you want to create. 

![Window for selecting application type](/media/articles/clients/create-clients.png)

If your app is a CLI, daemon, or a service running on the backend, you'll want to create a **Machine to Machine Application**.

## Settings

<%= include('../_settings') %>

- **Application Type**: The type of application you are implementing. If your app is a CLI, daemon, or a service running on the backend, use a **Machine to Machine Application**.

<%= include('../_token-endpoint-auth-method') %>

<%= include('../_settings-pt2') %>

### Advanced Settings

<%= include('../_adv-settings') %>

<%= include('../_trust-token-endpoint-ip-header') %>

<%= include('../_adv-settings-pt2') %>
