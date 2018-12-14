---
title: Configure Automatic Migration from Your Database
description: Learn how to enable automatic user migration with your custom database. 
topics:
  - users
  - user-management
  - migrations
  - automatic-user-migration
  - custom-db
contentType: how-to
useCase:
  - manage-users
  - migrate
---
# Configure Automatic Migration from Your Database

After you create a database connection in the Dashboard, you enable user migration from that database and create custom scripts to determine how the migration happens. 

These custom scripts are *Node.js* code that run in the tenant's sandbox. Auth0 provides templates for most common databases, such as: **ASP.NET Membership Provider**, **MongoDB**, **MySQL**, **Oracle**, **PostgreSQL**, **SQLServer**, **Windows Azure SQL Database**, and for a web service accessed by **Basic Auth**. For more information on implementing these scripts, see [Authenticate Users using a Custom Database](/connections/database/mysql).

1. Create a new database connection in the [Connections > Database](${manage_url}/#/connections/database) section of the Dashboard.

2. On the **Custom Database** page, enable the **Use my own database** option:

![DB Login Page in Dashboard](/media/articles/connections/database/custom-database.png)

3. On the **Settings** page for your database, enable the **Import Users to Auth0** option:

![Dashboard Import Users Option](/media/articles/connections/database/import-users.png)

## Configure the scripts 

On the **Custom Database** page, under *Database Action Scripts*, you will see the *Login* and *GetUser* scripts you need to configure.

![Database Action Scripts page](/media/articles/connections/database/import-scripts.png)

- The **Login** script executes each time a user that is not found in Auth0 database attempts to log in. It verifies that the user exists in the legacy database without prompting the user for their password again.

- The **Get User** script executes following any of these actions:

* A user attempts to *sign-up*.
* A user clicks on a valid [password change confirmation](/libraries/lock/customization#rememberlastlogin-boolean-) link.
* The Management API receives a call to the [update a user's email or username](/api/v2#!/Users/patch_users_by_id) endpoint.

:::panel-warning Passwords for Un-Migrated Users
If an un-migrated user confirms a password change, their user profile will be created in Auth0 with the new password. This user profile will contain all the information returned in the **Get User** script. All subsequent logins of this user will be performed in Auth0 directly.

You may see unexpected behavior if you return differing user profiles in the `login` and `get_user` scripts.
:::

## Verify the migration

After you've enabled migration, you can verify the users that have migrated by doing one or both of the following tasks:

1. Use the [List or search users](/api/v2#!/Users/get_users) Management API endpoint.

2. Review the [Users](${manage_url}/#/users) list on the Dashboard.

![Database Users](/media/articles/connections/database/migrated-users.png)

## Convert the database 

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

## Disconnect the legacy database

1. After you have verified the migration, you can disconnect your legacy database (**not** the Auth0 database). 

2. Keep **Import Users to Auth0** (on the **Settings** page) enabled. Your users will then be directed to use the new database workflow. 

3. Configure [rules](/rules) to execute other functions when a user authenticates to your application.

## Keep reading

* [User Migration Overview](/users/concepts/overview-user-migration)
* [Bulk User Imports with the Management API](/users/guides/bulk-user-import)
* [User Import/Export Extension](/extensions/user-import-export)
* [Bulk Import Database Schema and Example](/users/references/bulk-import-database-schema-examples)
* [User Migration Scenarios](/users/references/user-migration-scenarios)
