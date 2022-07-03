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

These custom scripts are Node.js code that run in the tenant's sandbox. Auth0 provides templates for most common databases, such as: **ASP.NET Membership Provider**, **MongoDB**, **MySQL**, **PostgreSQL**, **SQLServer**, **Windows Azure SQL Database**, and for a web service accessed by **Basic Auth**. For more information on implementing these scripts, see [Authenticate Users using a Custom Database](/connections/database/mysql).

1. Navigate to the [Connections > Database](${manage_url}/#/connections/database) page in the [Auth0 Dashboard](${manage_url}/), and click **Create DB Connection**.

![Dashboard: Database Connection List](/media/articles/dashboard/connections/database/dashboard-connections-database-list.png)

2. Click the **Custom Database** tab, and enable the **Use my own database** option:

![Dashboard: Enable Use My Own Database Option](/media/articles/dashboard/connections/database/connections-db-settings-custom-1.png)

3. Click the **Settings** tab, and enable the **Import Users to Auth0** option:

![Dashboard: Enable Import Users Option](/media/articles/dashboard/connections/database/connections-db-settings-main-2.png)

## Configure the scripts 

1. Click the **Custom Database** tab, and locate **Database Action Scripts** to see the scripts you need to configure.

![Dashboard: Configure Database Action Scripts](/media/articles/dashboard/connections/database/connections-db-settings-custom-1.png)

- **Login**: Executes each time a user that is not found in the Auth0 database attempts to log in. Verifies that the user exists in the legacy database without re-prompting the user for their password.

- **Get User**: Executes following any of these actions:
    * user attempts to *sign-up*.
    * user clicks on valid [password change confirmation](/libraries/lock/customization#rememberlastlogin-boolean-) link.
    * Management API receives a call to the [update a user's email or username](/api/v2#!/Users/patch_users_by_id) endpoint.

:::panel-warning Passwords for Un-Migrated Users
If an un-migrated user confirms a password change, their user profile will be created in Auth0 with the new password. This user profile will contain all the information returned in the **Get User** script. All subsequent logins of this user will be performed in Auth0 directly.

You may see unexpected behavior if you return differing user profiles in the `login` and `get_user` scripts.
:::

## Verify the migration

After you've enabled migration, you can verify the users that have migrated by doing one or both of the following tasks:

1. Use the [List or search users](/api/v2#!/Users/get_users) Management API endpoint.

2. Navigate to the [Users](${manage_url}/#/users) page in the [Auth0 Dashboard](${manage_url}/), and review the list of users.

![View Users](/media/articles/dashboard/users-roles/users-list.png)

## Convert the database 

Once all your users are in the Auth0 database, you are ready to convert the database so that it uses only users stored in Auth0.

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

By doing this, you are changing the **Login** and **Get User** [Database Action Scripts](/connections/database/mysql#3-provide-action-scripts) to NO-OP functions, essentially making it behave as a non-custom database connection.

:::panel-warning Leave Import Users to Auth0 turned on
Make sure to leave the **Import Users to Auth0** option turned on. If you turn this option off Auth0 will only use the scripts to authenticate and perform other user actions instead of using the users that were imported locally.
:::

## Disconnect the legacy database

1. After you have verified the migration, you can disconnect your legacy database (**not** the Auth0 database). If you modified the scripts as instructed above, Auth0 will not try to connect to your legacy database.

2. Keep **Import Users to Auth0** (on the **Settings** page) enabled. This, combined with the NO-OP script changes, will ensure that only the Auth0 users database is used. 

3. Configure [rules](/rules) to execute other functions when a user authenticates to your application.

## Troubleshoot migration errors

The most common error message that you may encounter when importing users from a legacy database to an Auth0 custom database is "The user already exists." 

When a user is imported, a partial user state is first created on the Auth0 end to make this migration possible. If you delete this user from the Auth0 connection then later recreate the user, you may receive this error. In addition, the **Get User** script is called on user creation. If you attempt to create a new user in the Auth0 custom database connection and the user already exists in your external database, you will receive this error.

If you encounter a "user already exists" error message, use the Management API's [endpoint to delete a connection user](/api/management/v2#!/Connections/delete_users_by_email) to delete the user. Confirm that the user does not exist in your legacy database, then recreate the user. 

## Keep reading

* [User Migration Overview](/users/concepts/overview-user-migration)
* [Bulk User Imports](/users/guides/bulk-user-imports)
* [Bulk User Exports](/users/guides/bulk-user-exports)
* [User Import/Export Extension](/extensions/user-import-export)
* [Bulk Import Database Schema and Example](/users/references/bulk-import-database-schema-examples)
* [User Migration Scenarios](/users/references/user-migration-scenarios)
