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

1. Navigate to the [Connections > Social](${manage_url}/#/connections/social) page in the [Auth0 Dashboard](${manage_url}/), and click **Try** next to the logo of the connection you want to test.

![Try Connection](/media/articles/connections/social/connection-social-list-configured.png)

2. Log in and consent to allow access to your app.

![Choose Account](/media/articles/connections/social/connection-social-try-choose-account.png)

If you have configured everything correctly, you will see the **It Works!** page:

![Success](/media/articles/connections/social/connection-social-try-success.png)
