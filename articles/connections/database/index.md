---
description: How to create and use a database connection using either the Auth0 user store or your own user store.
crews: crew-2
url: /connections/database
topics:
    - connections
    - database
    - db-connections
contentType: 
    - index
    - concept
    - how-to
useCase:
    - customize-connections
---

# Database Identity Providers

Auth0 provides database connections to authenticate users with an email/username and password. These credentials are securely stored in the Auth0 user store or in your own database.

You can create a new database connection and manage existing ones in the [Dashboard](${manage_url}/#/connections/database):

![](/media/articles/connections/database/database-connections.png)

## Scenarios

Typical database connection scenarios include:

* [Using the Auth0 user store](#using-the-auth0-user-store)
* [Using your own user store](#using-your-own-user-store)
* [Migrating to Auth0 from a custom user store](#migrating-to-auth0-from-a-custom-user-store)
* [Requiring a username for users](/connections/database/require-username)

### Using the Auth0 user store

Auth0 provides the database infrastructure to store your users by default. This scenario provides the best performance for the authentication process since all data is stored in Auth0.

The Auth0-hosted database is highly secure. Passwords are never stored or logged in plain text but are hashed with **bcrypt**. Varying levels of password security requirements can also be enforced (see: [Password Strength in Auth0 Database Connections](/password-strength)).

::: note
For database connections, Auth0 limits the number of repeat login attempts per user and IP address. For more information, see: [Rate Limits on User/Password Authentication](/connections/database/rate-limits).
:::

### Using your own user store

If you have an existing user store, or wish to store user credentials on your own server, Auth0 enables you to connect to a database or repository and use it as the identity provider.

![](/media/articles/connections/database/custom-database.png)

In this scenario, you provide the login script to authenticate the user that will execute each time a user attempts to log in. Optionally, you can create scripts for sign-up, email verification, password reset and delete user functionality.

These custom scripts are Node.js code that run in the tenant's [Webtask](https://webtask.io/) environment. Auth0 provides templates for most common databases, such as: **ASP.NET Membership Provider**, **MongoDB**, **MySQL**, **Oracle**, **PostgreSQL**, **SQL Server**, **Windows Azure SQL Database**, and for a web service accessed by **Basic Auth**. Essentially, you can connect to any kind of database or web service with a custom script.

When using your own user database or user store:

* Latency will be greater compared to Auth0-hosted user stores
* The database or service must be reachable from the Auth0 servers. You will need to configure inbound connections if your store is behind a firewall.
* Database scripts run in the same [Webtask](https://webtask.io) container, which is shared with all other extensibility points (such as rules, webtasks or other databases) belonging to the same Auth0 domain. Therefore, you must carefully code for error handling and throttling.

::: note
Check out [Authenticate Users Using Your Database](/connections/database/custom-db) for instructions on how to set up your own user store as an identity provider for Auth0.
:::

### Migrating to Auth0 from a custom user store

In this scenario, you have a legacy user store and wish to switch to the Auth0 store. Auth0 provides an automatic migration feature that adds your users to the Auth0 database one-at-a-time as each logs in and avoids asking your users to reset their passwords all at the same time. For more information, see [Configure Automatic User Migration](/users/guides/configure-automatic-migration).
