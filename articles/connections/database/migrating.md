# Importing users to Auth0

Our focus has always been not only greenfield projects but also existing applications that want to extend their Authentication capabilities.  In this case it is possible that you want to migrate your existing users from a legacy user store to Auth0.

We have released a new feature that enables migration of users from a **custom database connection** to Auth0. This migration is useful when you don't want to have all your users resetting their passwords at once, but rather migrating them gradually as they login over time.

You can read more about Database Connections, and the different user store options [here](/connections/database).

## Migration Process

When a user authenticates using a custom database connection marked for **import to Auth0**, the following process takes place:

![](/media/articles/connections/database/migrating-diagram.png)

If user is already migrated to Auth0, it is authenticated against Auth0 database. If not, your custom login script is executed. If it is successful, the user would be automatically created in Auth0's database.
The next time that user attempts to log in, their credentials and information would be retrieved from Auth0 and not from your custom database.

> Note: New users will be registered to Auth0 directly, and password resets will affect the users stored in Auth0 only.

## Enabling automatic migration

### 1. Create a new Custom Database
You can create a new Database Connection or configure an existing one within the [Admin Dashboard > Connections > Database](${uiURL}/#/connections/database) section.

A custom database connection will have the **Use my own database** flag turned on:

![](/media/articles/connections/database/custom-database.png)

### 2. Check the "Import Users to Auth0" option under connection settings:

![](/media/articles/connections/database/import-users.png)

### 3. Configure the **Login** and **GetUser** scripts

Notice that after turning on the **Import Users to Auth0** flag, you will have two scripts to complete under the Custom Database section:

![](/media/articles/connections/database/import-scripts.png)

The custom scripts are Node.js scripts that run in the tenant's sandbox. Auth0 provides templates for the most common databases: **ASP.NET Membership Provider**, **MongoDB**, **MySQL**, **PostgreSQL**, **SQLServer** and **Windows Azure SQL Database**, and for "a Web Service accessed by Basic Auth" as well. You can read more about how to implement these scripts in the [custom database connection](/connections/database/mysql) doc.

The **Login** script will be executed each time a user which is not found within Auth0 Database attempts to login, to validate the authenticity of the user.

The **Get User** script will be executed whenever any of the following actions are performed:

* A user attempts to **sign up**
* A user clicks on a valid [password change confirmation](/libraries/lock/customization#rememberlastlogin-boolean-1) link
* An [API call is made](/api/v2#!/Users/patch_users_by_id) to update a user's email

This script is needed because none of these actions require authentication on the user's behalf; the Get User must provide a way of verifying whether a user exists in a legacy database without needing their password.

If an unmigrated user confirms a password change, their user profile will be created in Auth0 with the new password they have just confirmed. This user profile will contain all the information returned in the Get User script, and any following logins will be performed in Auth0 directly.

### 4. Turn off import after all users are migrated

After you've been importing users for a while, it is probably that all (or most of) the users are migrated to the Auth0 database. You can check it out using the [API](/api/v2#!/Users/get_users) or looking at the Users list within the [dashboard](${uiURL}/#/users):

![](/media/articles/connections/database/migrated-users.png)

In this case you are ready to turn off the users import and convert the database to an Auth0 one. Go to your custom database connection and:
* Turn off the **User my own database** switch under Custom Database 
* Turn off the **Import Users to Auth0** switch under Settings

Migration is completed!
