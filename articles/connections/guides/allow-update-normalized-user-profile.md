---
title: 
description: Learn how to allow updates to the Auth0 normalized user profile from a connection using the Auth0 Dashboard.
topics:
  - applications
  - connections
  - user-profile
contentType: how-to
useCase:
  - build-an-app
---

# Allow Updates to Normalized User Profile

This guide will show you how to change when user attributes are updated for a connection using Auth0's Dashboard.

::: warning
<%= include('../../_includes/_users_update_normalized_profile_attributes') %>
:::

1. Navigate to the [Auth0 Dashboard](${manage_url}/).

2. Click **Connections** in the lef nav and select the connection type (Social or Enterprise).

3. Click the name of a connection to see its settings.

4. Locate **Attributes**, and enable **Allow updates to Auth0 normalized profile**.

![Allow Updates for Normalized User Profile](/media/articles/connections/allow-update-normalized-user-profile.png)

5. Scroll to the bottom of the Settings page, and click **Save**.
