---
title: Automatic User Migration with Custom Database Connections
description: Auth0 supports automatic migration of users to Auth0 from a custom database connection. This feature adds your users to the Auth0 database as each person logs in and avoids asking your users to reset their passwords due to migration.
crews: crew-2
toc: true
- tags:
  - users
  - user-management
  - migrations
  - automatic-user-migration
  - custom-db
---

# Automatic User Migration with Custom Database Connections

Auth0 supports automatic migration of users from a [custom database connection](/connections/database/custom-db) to Auth0. By activating this feature, your users are moved to Auth0 the first time they log in after you set up the integration. Your users are not asked to reset their password as a result of the migration.

::: panel Feature availability
- Only **Developer**, **Developer Pro**, and **Enterprise** subscription plans include the database migration feature.
- Only **Enterprise** subscription plans include the ability to connect to an existing store or database via JavaScript running on Auth0's servers for every authentication request.

For more information refer to [Auth0 pricing plans](https://auth0.com/pricing).
:::

## The Migration Process

When a user authenticates via a custom database connection marked for import to Auth0, the following process takes place:

![Migration Diagram](/media/articles/connections/database/migrating-diagram.png)

Auth0 authenticates migrated users against the Auth0 database.

If the user has not been migrated, Auth0 executes your custom login script and, upon successfully log in, adds the user to the Auth0 database.

Subsequent logins result in the user's credentials retrieved from Auth0, **NOT** your custom database.

New users are automatically added to the Auth0 database.

::: note
Auth0 can only assist users in the Auth0 database with password reset.
:::

## Enable Data Validation

There are certain validations that Auth0 can run before adding the user to the Auth0 database:

- The email must be set and unique
- If the connection requires a username (for example, the **Requires Username** toggle is enabled at the connection's settings), then one must be set
- If a username is set, then it must be unique
- The email format must be valid

Additionally, both the email and the username will be converted to lowercase before they are stored.

You can enable these validations for a connection using the [Update a connection endpoint](/api/management/v2#!/Connections/patch_connections_by_id) of the Management APIv2.

```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/connections/{connection-id}",
  "httpVersion": "HTTP/1.1",
  "cookies": [],
  "headers": [
    { "name": "Authorization", "value": "Bearer {access-token}" }, 
    { "name": "Content-Type", "value": "application/json"}
  ],
  "queryString": [],
  "postData": {
    "mimeType": "application/json",
    "text": "{ \"options\": { \"strategy_version\": 2, \"nextOptionParam\": \"...\" } }"
  },
  "headersSize": -1,
  "bodySize": -1,
  "comment": ""
}
```

- The parameter that enables the validations is the `"strategy_version": 2`. However, when you update `options`, the whole object is overridden, so all the parameters should be present. You can use the [Get a connection endpoint](/api/management/v2#!/Connections/get_connections_by_id) to get the whole object. Replace the `"nextOptionParam": "..."` placeholder with the list of parameters you get.
- You should replace `{connection-id}` with the Id of the custom database connection you want to update. If you don't know it, you can use the [Get all connections endpoint](/api/management/v2#!/Connections/get_connections) to find it.
- To access any Management APIv2 endpoint you need an Access Token (which you should set at the `{access-token}` placeholder of the `Authorization` header). For information on how to get one refer to [The Auth0 Management APIv2 Token](/api/management/v2/tokens).

## Enable Automatic Migration

### 1. Create a Custom Database

You can create a new database connection in the [Connections > Database](${manage_url}/#/connections/database) section of the Dashboard.

On the **Custom Database** page, enable the **Use my own database** option:

![DB Login Page in Dashboard](/media/articles/connections/database/custom-database.png)

### 2. Turn on Automatic Migration

On the **Settings** page for your database, enable the **Import Users to Auth0** option:

![Dashboard Import Users Option](/media/articles/connections/database/import-users.png)

### 3. Configure the Database Action Scripts

On the **Custom Database** page, under *Database Action Scripts*, you will see the *Login* and *GetUser* scripts you need to configure.

![Database Action Scripts page](/media/articles/connections/database/import-scripts.png)

These custom scripts are *Node.js* code that run in the tenant's sandbox. Auth0 provides templates for most common databases, such as: **ASP.NET Membership Provider**, **MongoDB**, **MySQL**, **Oracle**, **PostgreSQL**, **SQLServer**, **Windows Azure SQL Database**, and for a web service accessed by **Basic Auth**. For more information on implementing these scripts, see [Authenticate Users using a Custom Database](/connections/database/mysql).

The **Login** script executes each time a user that is not found in Auth0 database attempts to log in. It verifies that the user exists in the legacy database without prompting the user for their password again.

The **Get User** script executes following any of these actions:

* A user attempts to *sign-up*.
* A user clicks on a valid [password change confirmation](/libraries/lock/customization#rememberlastlogin-boolean-) link.
* The Management API receives a call to the [update a user's email or username](/api/v2#!/Users/patch_users_by_id) endpoint.

:::panel-warning Passwords for Un-Migrated Users
If an un-migrated user confirms a password change, their user profile will be created in Auth0 with the new password. This user profile will contain all the information returned in the **Get User** script. All subsequent logins of this user will be performed in Auth0 directly.

You may see unexpected behavior if you return differing user profiles in the `login` and `get_user` scripts.
:::

### 4. Complete the Migration

After you've enabled migration, you can verify the users that have migrated by:

* Using the [List or search users](/api/v2#!/Users/get_users) Management API endpoint;
* Reviewing the [Users](${manage_url}/#/users) list on the Dashboard.

![Database Users](/media/articles/connections/database/migrated-users.png)

Once all your users are in the Auth0 database, you are ready to convert the database to Auth0.

1. Go to your custom database connection on the [Dashboard](${manage_url}/#/connections/database).

2. Update the **Login** Database Action Script to the following:

```
function login (email, password, callback) {
  return callback(null, null);
}
```

3. Update the **Get User** Database Action Script to the following:

```
function getByEmail (email, callback) {
  return callback(null, null);
}
```

By doing this, you are changing the **Login** and **Get User** [Database Action Scripts](/connections/database/mysql#3-provide-action-scripts) to NO-OP functions.

At this point, you can disconnect your legacy database (**not** the Auth0 database). You will also want to keep **Import Users to Auth0** (on the **Settings** page) enabled. Your users will then be directed to use the new database workflow. You can configure [rules](/rules) to execute other functions when a user authenticates to your application.
