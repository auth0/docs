---
description: Client settings for Web App Clients
url: /clients/client-settings/regular-web-app
toc: true
---
# Client Settings: Regular Web Applications

::: version-warning
This document lists the settings for a Regular Web App Client; if you're using a different Client type, please use the drop-down to select the appropriate doc.
:::

When creating an Auth0 Client, you'll be asked to indicate the *type* of Client you want to create. 

![Window for selecting client type](/media/articles/clients/create-clients.png)

If you're working with a traditional web app that has the ability to refresh its pages, you'll want to create a Regular Web Applications Client.

## Settings

<%= include('../_settings') %>

- **Client Type**: The type of client you are implementing. If you're working with a traditional web app that has the ability to refresh its pages, use a Regular Web Applications Client.

<%= include('../_token-endpoint-auth-method') %>

<%= include('../_settings-pt2') %>

### Advanced Settings

<%= include('../_adv-settings') %>

<%= include('../_trust-token-endpoint-ip-header') %>

<%= include('../_adv-settings-pt2') %>
