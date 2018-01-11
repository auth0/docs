---
title: Authenticate Users Using Your Database
connection: MySQL
image: /media/connections/mysql.svg
seo_alias: mysql
description: Learn how to authenticate users using your database as an identity provider.
crews: crew-2
toc: true
---

# Authenticate Users Using Your Database

If you have your own user database, you can use that database as an identity provider in Auth0 to authenticate users. To set up and use your database for authentication you'll need to:

* Create a [database connection](/connections/database) on the [Auth0 dashboard](${manage_url}).
* Ensure your database has fields to populate user profiles such as: `id`, `nickname`, `email`, and `password`. See [Auth0 Normalized User Profile](/user-profile/normalized) for details on Auth0's user profile schema and expected fields.
* Provide database action scripts to configure the database as an identity provider.

In this tutorial you'll learn how to connect your user database to Auth0 and configure it as an identity provider.

## Before You Begin

Here are some things to know before you start this process.

* Database action scripts are written in Javascript and run in a [Webtask](https://webtask.io/) environment. In the environment you can use the full JavaScript language and [these Node.js libraries](https://tehsis.github.io/webtaskio-canirequire/).
* Auth0 provides templates for most common databases, such as: **ASP.NET Membership Provider**, **MongoDB**, **MySQL**, **Oracle**, **PostgreSQL**, **SQLServer**, **Windows Azure SQL Database**, and for a web service accessed by **Basic Auth**. Essentially, you can connect to any kind of database or web service with a custom script.
* You can use the [auth0-custom-db-testharness library](https://www.npmjs.com/package/auth0-custom-db-testharness) to deploy, execute, and test the output of database action scripts using a Webtask sandbox environment.
* The [Update Users using a Custom Database](/user-profile/customdb) article has information on updating user profile fields.

## Create the database connection

To create the database connection for your database, follow these steps.

1. Navigate to [Connections > Database](${manage_url}/#/connections/database) on the Auth0 dashboard.
2. Click the **+ Create DB Connection** button.
3. Provide a name for the database and configure the available options.

![](/media/articles/connections/database/database-connections.png)

3. Navigate to the **Custom Database** tab.
4. Toggle on the **Use my own database** switch.

![](/media/articles/connections/database/custom-database.png)

## Create database action scripts

Create scripts in the **Database Action Scripts** section to configure how authentication works when using your database.

A Login script is required. Additional scripts for user functionality, such as password resets, are optional. You can write your own scripts or select a template from the **Templates** dropdown and adjust it to your requirements.

The available actions are:

Name | Description | Parameters
-------|-------------|-----------
Login (Required) | Executes each time a user attempts to log in. | `email`, `password`
Create | Executes when a user signs up. | `user.email`, `user.password`
Verify | Executes after a user follows the verification link. | `email`
Change Password | Executes when a user clicks on the confirmation link after a reset password request. | `email`, `newPassword`
Get User | Retrieves a user profile from your database without authenticating the user. | `email`
Delete | Executes when a user is deleted from the API or Auth0 dashboard. | `id`

::: note
When creating users, Auth0 calls the **Get User** script before the **Create** script. Be sure that you have implemented both.
:::

### Create the Login script

Create the required Login script to authenticate users. The Login script will run each time a user attempts to log in. You can write your own Login script or select a template from the **Templates** dropdown.

::: note
If you are using [IBM's DB2](https://www.ibm.com/analytics/us/en/technology/db2/) product, [click here](/connections/database/db2-script) for a sample login script.
:::

![](/media/articles/connections/database/mysql/db-connection-login-script.png)

For example, the MySQL Login template:

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
          id: user.id.toString(),
          nickname: user.nickname,
          email: user.email
        });
      }
    });

  });
}

```

The above script connects to a MySQL database and executes a query to retrieve the first user with `email == user.email`. With the `bcrypt.compareSync` method, it then validates that the passwords match, and if successful, returns an object containing the user profile information including `id`, `nickname`, and `email`. This script assumes that you have a `users` table containing these columns.

## Add configuration parameters

Store the credentials required to connect to your database in the **Settings** section below the script editor. Parameters stored there are available in all of your scripts.

You can access parameter values using the `configuration` object in your database action scripts, for example: `configuration.PARAMETER_NAME`.

![](/media/articles/connections/database/mysql/db-connection-configurate.png)

Heads up! You can use this section to store values which are available in all scripts. 
The values are accessible through the global configuration object.

Use the added parameters in your scripts to configure the connection. For example, in the MySQL Login template:

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

## Error Handling

To return an error, call the callback with an error as the first parameter:

```js
callback(error);
```

There are three different errors you can return from a DB Connection:

* `new WrongUsernameOrPasswordError(<email or user_id>, <message>)`: when you know who the user is and want to keep track of a wrong password.
* `new ValidationError(<error code>, <message>)`: a generic error with an error code.
* `new Error(<message>)`: simple errors (no error code).

For example:

```js
callback(new ValidationError('email-too-long', 'Email is too long.'));
```

## Troubleshoot

Test the script using the **TRY** button. If your settings are correct you should see the resulting profile:

![](/media/articles/connections/database/mysql/db-connection-try-ok.png)

If you add a `console.log` statement to the script you will be able to see the output here.

::: note
The [auth0-custom-db-testharness library](https://www.npmjs.com/package/auth0-custom-db-testharness) can be used to deploy, execute, and test the output of database action scripts using a Webtask sandbox environment.
:::

## Auth0 Login widget

After you enabling the database connection, the Auth0 Login widget will automatically change its appearance to allow users to enter their `username` and `password`. Once entered, this data is passed to your scripts.

![](/media/articles/connections/database/mysql/db-connection-widget.png)

<%= include('../_quickstart-links.md') %>
