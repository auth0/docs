---
description: Learn how to create a database connection.
toc: true
topics:
    - connections
    - custom-database
contentType: how-to
useCase: customize-connections
---
# Create Custom Database Database Connections

::: panel Feature availability
Only **Enterprise** subscription plans include the ability to use a custom database for authentication requests. For more information refer to [Auth0 pricing plans](https://auth0.com/pricing).
:::

If you have your own user database, you can use it as an identity provider in Auth0 to authenticate users. In this process, you will create the custom database connection, create database action scripts, and add configuration parameters. 

::: note
Make sure that your database has the appropriate fields to store user profiles attributes, such as **id**, **nickname**, **email**, and **password**. See [Normalized User Profile](/users/normalized) for details on Auth0's user profile schema and the expected fields. Also, see [Update User Profile Using Your Database](/users/guides/update-user-profiles-using-your-database) for more information.
:::

Auth0 allows you to create connections and scripts for most of the commonly-used databases, including:

  * ASP.NET Membership Provider
  * MongoDB
  * MySQL
  * Oracle
  * PostgreSQL
  * SQLServer
  * Windows Azure SQL Database
  * Web services accessed via Basic Auth

You can connect to any kind of database or web service with a properly-configured custom script.

<%= include('../../../_includes/_ip_whitelist') %>

## Create the connection in the Dashboard

1. Log in to the Dashboard and navigate to [Connections > Database](${manage_url}/#/connections/database).
2. Click **+ Create DB Connection**.
3. Configure the connection's **settings** as requested.

    | **Parameter** | **Definition** |
    | - | - |
    | **Name** | The name of the connection. The name must start and end with an alphanumeric character, contain only alphanumeric characters and dashes, and not exceed 35 characters. |
    | **Requires Username** | Forces users to provide a username *and* email address during registration. |
    | **Username length** | Sets the minimum and maximum length for a username. |
    | **Disable Sign Ups** | Prevents sign-ups to your application. You will still be able to create users with your API credentials or via the Dashboard, however. |

4. Click **Create**.

    ![Database connections](/media/articles/connections/database/database-connections.png)

    Once Auth0 creates your connection, you'll have the following tabs (in addition to the **Settings** tab):

    * Password Policy
    * Custom Database
    * Applications
    * Try Connection

4. Select the **Custom Database** tab.

5. Toggle the **Use my own database** switch to enable the feature.

    ![Custom database tab](/media/articles/connections/database/custom-database.png)

## Create database action scripts

Toggling the **Use my own database** switch enables the **Database Action Scripts** area. This area is where you will create scripts to configure how authentication works when using your database. You can write your database action scripts, or you can begin by selecting a template from the **Templates** dropdown and modifying it as necessary. The available database action scripts are as follows:

Name | Description | Parameters
-------|-------------|-----------
Login <br/><span class="label label-danger">Required</span> | Executes each time a user attempts to log in. | `email`, `password`
Create | Executes when a user signs up. | `user.email`, `user.password`
Verify | Executes after a user follows the verification link. | `email`
Change Password | Executes when a user clicks on the confirmation link after a reset password request. | `email`, `newPassword`
Get User | Retrieves a user profile from your database without authenticating the user. | `email`
Delete | Executes when a user is deleted from the API or Auth0 dashboard. | `id`

::: warning
Script templates, including the default templates, are not used until you click **Save**. This is true even if you only modify one script and haven't made changes to any others. You must click **Save** at least once for all the scripts to be in place. 
:::

### Before you begin

* Review the [Script template best practices](/best-practices/custom-database-connections#script-template-best-practices).

### Create a Login script

You **must** configure a `login` script; additional scripts for user functionality, such as password resets, are optional.

::: panel Avoid User ID Collisions with Multiple Databases
The `id` (or alternatively `user_id`) property in the returned user profile will be used by Auth0 to identify the user. 

If you are using multiple custom database connections, then **id** value **must be unique across all the custom database connections** to avoid **user ID** collisions. Our recommendation is to prefix the value of **id** with the connection name (omitting any whitespace). See [Identify Users](/users/normalized/auth0/identify-users) for more information on user IDs.
:::

## Add configuration parameters

You can store parameters, like the credentials required to connect to your database, in the **Settings** section below the script editor. These will be available to all of your scripts, and you can access them using the global configuration object.

You can access parameter values using the `configuration` object in your database action scripts (i.e. `configuration.MYSQL_PASSWORD`).

![Custom database settings](/media/articles/connections/database/mysql/db-connection-configurate.png)

Use the added parameters in your scripts to configure the connection. For example, you might add the following the MySQL Login template:

```js
function login (username, password, callback) {
  var connection = mysql({
    host     : configuration.MYSQL_HOST,
    user     : 'me',
    password : configuration.MYSQL_PASSWORD,
    database : 'mydb'
  });
}
```

## Summary

In this article, we showed you how to configure your database for use with Auth0 as an identity provider. You: 

1. Created an Auth0 database connection
2. Created database action scripts
3. Added configuration parameters

At this point, your database is now ready to act as an Auth0 identity provider.

### Keep reading

* [Handle Errors and Troubleshoot Your Custom DB Scripts](/connections/database/custom-db/error-handling)
* [Migrate Your Users to Auth0](/users/concepts/overview-user-migration)
