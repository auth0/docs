---
description: Learn how to test social connections for applications using the Auth0 Management Dashboard.
topics:
  - connections
  - dashboard
  - social
  - testing
contentType: 
    - how-to
useCase:
  - build-an-app
  - customize-connections
---
# Test Social Connections

This guide will show you how to test social [connections](/connections) for applications using Auth0's Dashboard. The configured social connections can be used to log in to your application.

::: warning
To properly test, you should have already [set up your social connection](/dashboard/guides/connections/set-up-connections-social).
:::

1. Navigate to [Auth0 Dashboard > Authentication > Social](${manage_url}/#/connections/social), locate the connection you want to test, expand the More Options menu (**...**), and select **Try Connection**.

    ![Try Connection](/media/articles/connections/social/dashboard-connections-social-try.png)

2. Log in and consent to allow access to your app. If you have configured everything correctly, you will see the **It Works!** page:

    ![Success](/media/articles/connections/social/connection-social-try-success.png)
