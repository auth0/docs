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

1. Navigate to the [Connections > Database](${manage_url}/#/connections/database) page in the [Auth0 Dashboard](${manage_url}/), and click the **Try** icon next to the name of the connection you want to test.

2. Enter your test user's username and password.

If you have configured everything correctly, you will see the **It Works!** page:
