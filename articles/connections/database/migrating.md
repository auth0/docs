---
title: Migrating Users to Auth0
description: Auth0 supports the automatic migration of users to Auth0 from a custom database connection. This feature adds your users to the Auth0 database one-at-a-time as each logs in and avoids asking your users to reset their passwords all at the same time.
---
# Migrate Users to Auth0

At Auth0, the focus has always been not only on greenfield projects but also on existing applications that would benefit from an extension to their authentication capabilities. For these added features, you may wish to migrate your existing users to Auth0 from a legacy user store.

Auth0 supports the automatic migration of users to Auth0 from a custom database connection. This feature adds your users to the Auth0 database one-at-a-time as each logs in and avoids asking your users to reset their passwords all at the same time.

You can read more about database connections and the several user store options at [Database Identity Providers](/connections/database).

## The migration process

When a user authenticates using a custom database connection marked for **import to Auth0**, the following process takes place:

![](/media/articles/connections/database/migrating-diagram.png)

If a user has already been migrated to Auth0, they are authenticated against the Auth0 database; if not, your custom login script is executed. When the login is successful, the user is automatically added to the Auth0 database.

The next time that user attempts to log in, their credentials and profile are retrieved from Auth0 and not from your custom database.

New users are registered to Auth0 directly.

**NOTE:** The password reset procedure is only available for users stored in the Auth0 database.

## Enable automatic migration

### 1. Create a new custom database

You can create a new database connection or configure an existing one in the [Connections > Database](${uiURL}/#/connections/database) section of the Dashboard.

On the **Custom Database** page, enable the **Use my own database** option:

![](/media/articles/connections/database/custom-database.png)

### 2. Turn on automatic migration:

On the **Settings** page for your database, enable the **Import Users to Auth0** option:

![](/media/articles/connections/database/import-users.png)

### 3. Configure the database action scripts

On the **Custom Database** page, under *Database Action Scripts*, you will see the *Login* and *GetUser* scripts that you will need to complete.

![](/media/articles/connections/database/import-scripts.png)

These custom scripts are *Node.js* code that run in the tenant's sandbox. Auth0 provides templates for most common databases, such as: **ASP.NET Membership Provider**, **MongoDB**, **MySQL**, **PostgreSQL**, **SQLServer**, **Windows Azure SQL Database**, and for a web service accessed by **Basic Auth**. For more information on implementing these scripts, see the tutorial at: [Authenticate Users with Username and Password using a Custom Database](/connections/database/mysql).

The **Login** script to authenticate the user will execute each time a user that is not found in Auth0 database attempts to log in.

The **Get User** script will execute when any of the following actions are performed:

* A user attempts to *sign-up*.
* A user clicks on a valid [password change confirmation](/libraries/lock/customization#rememberlastlogin-boolean-) link.
* A Management API call is made to [update a user's email or username](/api/v2#!/Users/patch_users_by_id).

This script is needed because none of these actions require authentication on the user's behalf. The **Get User** script must provide a way of verifying that a user exists in the legacy database without requiring their password.

If an un-migrated user confirms a password change, their user profile will be created in Auth0 with the new password. This user profile will contain all the information returned in the **Get User** script. All subsequent logins of this user will be performed in Auth0 directly.

### 4. Complete the migration

After importing users for a time, many of your users will have been migrated to the Auth0 database. You can verify this with the [List or search users](/api/v2#!/Users/get_users) Management API endpoint or by reviewing the [Users](${uiURL}/#/users) list on the Dashboard.

![](/media/articles/connections/database/migrated-users.png)

Once all your users are in the Auth0 database, you are ready to turn off the import users feature and convert the database to Auth0.

Go to your custom database connection on the [Dashboard](${uiURL}/#/connections/database) and:

* Disable the **Import Users to Auth0** option under **Settings** page.
* Disable the **Use my own database** option on the **Custom Database** page.
