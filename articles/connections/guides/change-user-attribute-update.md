---
title: 
description: Learn how to choose when to update user profile attributes for your connection using the Auth0 Dashboard.
topics:
  - applications
  - connections
  - user-profile
contentType: how-to
useCase:
  - build-an-app
---

# Change Update Method for User Attributes for a Connection

This guide will show you how to change when user attributes are updated for a connection using Auth0's Dashboard.

::: warning
By default, user attributes in Auth0's normalized user profile are not editable because they are updated from the identity provider each time a user logs in. If you want to be able to edit user attributes on the normalized user profile, you must specify that user attributes be updated on user profile creation only. User attributes will then be editable via the Management API.
:::

1. Navigate to the [Auth0 Dashboard](${manage_url}/).

2. Click **Connections** in the lef nav and select the connection type (Social or Enterprise).

3. Click the name of a connection to see its settings.

4. Locate **Update Attributes**, and select **On Create Only** or **On Every Login**.

5. Scroll to the bottom of the Settings page, and click **Save**.


## Keep reading

