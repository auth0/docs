---
description: Learn how to create a database connection.
toc: true
topics:
    - connections
    - custom-database
contentType: how-to
useCase: customize-connections
---
# Create Custom Database Connections

<%= include('./_includes/_panel-feature-availability') %>

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

    ![Database connections](/media/articles/connections/database/database-connections.png)

3. Configure the connection's **settings** as requested.

    | **Parameter** | **Definition** |
    | - | - |
    | **Name** | The name of the connection. The name must start and end with an alphanumeric character, contain only alphanumeric characters and dashes, and not exceed 35 characters. |
    | **Requires Username** | Forces users to provide a username *and* email address during registration. |
    | **Username length** | Sets the minimum and maximum length for a username. |
    | **Disable Sign Ups** | Prevents sign-ups to your application. You will still be able to create users with your API credentials or via the Dashboard, however. |

4. Click **Create**.

    Once Auth0 creates your connection, you'll have the following tabs (in addition to the **Settings** tab):

    * Password Policy
    * Custom Database
    * Applications
    * Try Connection

4. Click the **Custom Database** tab, and enable the **Use my own database** option.

    ![Enable Use Own Database Option](/media/articles/dashboard/connections/database/connections-db-settings-custom-1.png)

## Create database action scripts

Toggling the **Use my own database** switch enables the **Database Action Scripts** area where you will create scripts to configure how authentication works when using your database. You can write your database action scripts, or you can select a template from the **Templates** dropdown and modifying it as necessary. 

You **must** configure a `login` script; additional scripts for user functionality are optional.

The available database action scripts are:

**Name** | **Description** | **Parameters**
-------|-------------|-----------
**Login** <br/><span class="label label-danger">Required</span> | Executes each time a user attempts to log in. | `email`, `password`
**Create** | Executes when a user signs up. | `user.email`, `user.password`
**Verify** | Executes after a user follows the verification link. | `email`
**Change Password** | Executes when a user clicks on the confirmation link after a reset password request. | `email`, `newPassword`
**Get User** | Retrieves a user profile from your database without authenticating the user. | `email`
**Delete** | Executes when a user is deleted from the API or Auth0 dashboard. | `id`
**Change Email** | Executes when a change in the email address, or the email address status, for a user occurs. | `email`, `newEmail`, `verified`, `callback`

See [Custom Database Action Script Templates](/connections/database/custom-db/templates) and [Custom Database Action Script Execution Best Practices](/best-practices/custom-db-connections/execution) for details on all the scripts.

### Create a Login script

::: panel Avoid User ID Collisions with Multiple Databases
The `id` (or alternatively `user_id`) property in the returned user profile will be used by Auth0 to identify the user. 

If you are using multiple custom database connections, then **id** value **must be unique across all the custom database connections** to avoid **user ID** collisions. Our recommendation is to prefix the value of **id** with the connection name (omitting any whitespace). See [Identify Users](/users/normalized/auth0/identify-users) for more information on user IDs.
:::

The following steps use an example for a MySQL database login script.

1. After toggling the **Use my own database** switch, the **Database Action Scripts** area is enabled. Make sure you are on the **Login** tab.
3. Use the **Templates** dropdown to select the MySQL database script template.

```js
function login(email, password, callback) {
  var connection = mysql({
    host: 'localhost',
    user: 'me',
    password: 'secret',
    database: 'mydb'
  });

  connection.connect();

  var query = "SELECT id, nickname, email, password " +
    "FROM users WHERE email = ?";

  connection.query(query, [email], function (err, results) {
    if (err) return callback(err);
    if (results.length === 0) return callback(new WrongUsernameOrPasswordError(email));
    var user = results[0];

    bcrypt.compare(password, user.password, function (err, isValid) {
      if (err) {
        callback(err);
      } else if (!isValid) {
        callback(new WrongUsernameOrPasswordError(email));
      } else {
        callback(null, {
          // This prefix (replace with your own custom DB name)
          // ensure uniqueness across different custom DBs if there's the
          // possibility of collisions (e.g. if the user ID is an email address or an integer)
          id: 'MyConnection1|' + user.id.toString(),
          nickname: user.nickname,
          email: user.email
        });
      }
    });
  });
}
```

The above script connects to a MySQL database and executes a query to retrieve the first user with `email == user.email`.

With the **bcrypt.compareSync** method, it then validates that the passwords match, and if successful, returns an object containing the user profile information including **id**, **nickname**, and **email**.

This script assumes that you have a **users** table containing these columns. The **id** returned by Login script is used to construct the **user ID** attribute of the user profile. 

4. Click **Save**.
5. Click **Try** to test the script. (This step will also save your script.)

  Script templates are not used by Auth0 until you click **Save** or **Try**. This is true even if you only modify one script and haven't made changes to any others. You must click **Save** at least once for all the scripts to be in place.

## Add configuration parameters

You can store parameters, like the credentials required to connect to your database, in the **Settings** section below the script editor. These will be available for all of your scripts, and you can access the parameter values using the `configuration` object in your database action scripts (i.e., `configuration.MYSQL_PASSWORD`).

![Custom database settings](/media/articles/connections/database/mysql/db-connection-parameters.png)

Use the added parameters in your scripts to configure the connection. For example, you might add the following to the MySQL Login script:

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

## Keep reading

* [Custom Database Connection and Action Script Best Practices](/best-practices/custom-db-connections)
* [Custom Database Error Handling and Troubleshooting](/connections/database/custom-db/error-handling)
* [Migrate Users to Auth0](/users/concepts/overview-user-migration)
