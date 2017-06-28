---
description: Client settings for Non Interactive Clients
url: /clients/client-settings/non-interactive
toc: true
---

# Client Settings: Non Interactive Client

When creating an Auth0 Client, you'll be asked to indicate the *type* of Client you want to create. 

![Window for selecting client type](/media/articles/clients/create-clients.png)

If your app is a CLI, daemon, or a service running on the backend, you'll want to create a **Non Interactive Client**.

## Settings

<%= include('../../_settings') %>

<%= include('../../_token-endpoint-auth-method') %>

<%= include('../../_settings2') %>

### Advanced Settings

<%= include('../../_adv-settings') %>

<%= include('../../_trust-token-endpoint-ip-header') %>

<%= include('../../_adv-settings2') %>