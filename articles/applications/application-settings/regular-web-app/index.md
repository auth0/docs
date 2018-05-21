---
description: Application settings for Web Apps
url: /applications/application-settings/regular-web-app
toc: true
tags:
  - applications
  - regular-web-apps
---
# Application Settings: Regular Web Applications

::: version-warning
This document lists the settings for a Regular Web App; if you're using a different Application type, please use the drop-down to select the appropriate doc.
:::

When creating an Auth0 Application, you'll be asked to indicate the *type* of Application you want to create. 

![Window for selecting application type](/media/articles/clients/create-clients.png)

If you're working with a traditional web app that has the ability to refresh its pages, you'll want to create a Regular Web Application.

## Settings

<%= include('../_settings') %>

- **Application Type**: The type of application you are implementing. If you're working with a traditional web app that has the ability to refresh its pages, use a Regular Web Applications.

<%= include('../_token-endpoint-auth-method') %>

<%= include('../_settings-pt2') %>

### Advanced Settings

<%= include('../_adv-settings') %>

<%= include('../_trust-token-endpoint-ip-header') %>

<%= include('../_adv-settings-pt2') %>
