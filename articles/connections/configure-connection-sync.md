---
title: Configure Connection Sync with Auth0
description: Learn how to allow updates to the Auth0 normalized user profile from a connection using the Auth0 Dashboard.
topics:
  - connections
  - identity-providers
  - user-profile
  - dashboard
contentType: how-to
useCase:
  - build-an-app
  - customize-connections
  - manage-users
---

# Configure Connection Sync with Auth0

This guide will show you how to update connection preferences for an upstream [Identity Provider](/connections) to control when updates to user profile root attributes will be allowed using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/connections/configure-connection-sync).

::: warning
<%= include('../../../_includes/_users_update_normalized_profile_attributes') %>
:::

1. Navigate to the [Auth0 Dashboard](${manage_url}/#/), and click **Connections** in the left nav.

2. Select a connection type:

- [Database](${manage_url}/#/connections/database)
- [Social](${manage_url}/#/connections/social)
- [Enterprise](${manage_url}/#/connections/enterprise)

3. Click the name of a connection to see its settings.

4. Toggle **Sync user profile attributes at each login** to the desired setting, and click **Save**.

![Sync user profile attributes at each login](/media/articles/connections/allow-update-normalized-user-profile.png)