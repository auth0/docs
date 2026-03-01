---
title: Auth0 User Store
description: Describes creating and using a database connection with the Auth0 user store.
topics:
    - connections
    - database
    - db-connections
useCase:
    - customize-connections
---

# Auth0 User Store

Auth0 provides the database infrastructure to store your users by default. This scenario provides the best performance for the authentication process since all data is stored in Auth0.

The Auth0-hosted database is highly secure. Passwords are never stored or logged in plain text but are hashed with **bcrypt**. Varying levels of password security requirements can also be enforced. To learn more, read [Password Strength in Auth0 Database Connections](/password-strength).

::: note
For database connections, Auth0 limits the number of repeat login attempts per user and IP address. To learn more, read [Rate Limits on User/Password Authentication](/policies/rate-limit-policy/database-connections-rate-limits).
:::

## Migrating to Auth0 from a custom user store

In this scenario, you have a legacy user store and wish to switch to the Auth0 store. Auth0 provides an automatic migration feature that adds your users to the Auth0 database one-at-a-time as each logs in and avoids asking your users to reset their passwords all at the same time. To learn more, read [Configure Automatic User Migration](/users/guides/configure-automatic-migration).