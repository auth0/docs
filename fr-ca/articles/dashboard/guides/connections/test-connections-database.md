---
description: Learn how to test database connections for applications using the Auth0 Management Dashboard.
topics:
  - connections
  - dashboard
  - database
  - testing
contentType: 
    - how-to
useCase:
  - build-an-app
  - customize-connections
---
# Test Database Connections

This guide will show you how to test database [connections](/connections) for applications using Auth0's Dashboard. The configured database connections can be used to log in to your application.

::: warning
To properly test, you should have already [set up your database connection](/dashboard/guides/connections/set-up-connections-database) and [created a user](/dashboard/guides/users/create-users) for your database connection.
:::

1. Navigate to [Auth0 Dashboard > Authentication > Database](${manage_url}/#/connections/database), and select the Try arrow next to the connection you want to test.

    ![Try Connection](/media/articles/connections/database/dashboard-connections-database-try.png)

2. Enter your test user's username and password. If you have configured everything correctly, you will see the **It Works!** page:

    ![Success](/media/articles/connections/social/connection-social-try-success.png)