---
description: Learn how to set up database connections for applications using the Auth0 Management Dashboard.
topics:
  - connections
  - dashboard
  - database
  - configuration
contentType: 
    - how-to
useCase:
  - build-an-app
  - customize-connections
---
# Set Up Database Connections

This guide will show you how to set up database [connections](/connections) for applications using Auth0's Dashboard. The configured database connections can be used to log in to your application.

1. Navigate to [Auth0 Dashboard > Authentication > Database](${manage_url}/#/connections/database), and select **+ Create DB Connection**.

    ![Create Database Connection](/media/articles/connections/database/dashboard-connections-database-list-hbms.png)

2. Enter a name for your connection, and select **Create**.

    ![Enter Details](/media/articles/connections/database/dashboard-connections-database-create_user-password-auth.png)

3. Select the **Applications** view, enable the switch for each of your Auth0 applications that should be able to use this connection, and select **Save**.

    ![Enable Applications](/media/articles/connections/database/dashboard-connections-database-edit_view-applications.png)

## Keep reading

- [Test Database Connections](/dashboard/guides/connections/test-connections-database)
