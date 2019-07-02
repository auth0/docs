---
description: Learn how to set up social connections for applications using the Auth0 Management Dashboard.
topics:
  - connections
  - dashboard
  - social
  - configuration
contentType: 
    - how-to
useCase:
  - build-an-app
  - customize-connections
---
# Set Up Social Connections

This guide will show you how to set up social [connections](/connections) for applications using Auth0's Dashboard. The configured social connections can be used to log in to your application.

::: warning
You should already have set up credentials for your application in the social identity provider with which you want to allow users to log in to your application. To learn how to do so, select your identity provider from our list of [social connections](/connections#social).
:::

1. Navigate to the [Connections > Social](${manage_url}/#/connections/social) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the connection you want to set up.

![Select Connection](/media/articles/connections/social/connection-social-list-unconfigured.png)

2. Copy and paste the `Client ID` and `Client Secret` from your social identity provider, select the **Attributes** (and **Permissions**, where applicable), and click **Save**.

* **Attributes**: User data you want your app to be able to access.
* **Permissions**: Features you want your app to be able to access on the user's behalf.

![Configure Connection](/media/articles/connections/social/connection-social-settings.png)

3. Click the **Applications** tab, enable the toggle for each of your Auth0 applications that you want to be able to use this connection, and click **Save**.

![Enable Applications](/media/articles/connections/social/connection-social-applications.png)

## Keep reading

- [Test Social Connections](/dashboard/guides/connections/test-connections-social)
