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

1. Navigate to [Auth0 Dashboard > Authentication > Social](${manage_url}/#/connections/social), and select **Create Connection**.

2. Choose the connection you want to set up.

3. Copy and paste the `Client ID` and `Client Secret` from your social identity provider, select the **Attributes** (and **Permissions**, where applicable), and click **Save**.

    * **Attributes**: User data you want your app to be able to access.
    * **Permissions**: Features you want your app to be able to access on the user's behalf.

    ![Configure Connection](/media/articles/connections/social/dashboard-connections-social-create_google.png)

4. Select the **Applications** view, enable the switch for each of your Auth0 applications that should be able to use this connection, and select **Save**.

    ![Enable Applications](/media/articles/connections/social/dashboard-connections-social-edit_view-applications.png)

## Keep reading

- [Test Social Connections](/dashboard/guides/connections/test-connections-social)
