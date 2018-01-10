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

If you have your own user database, you can use that database as an identity provider in Auth0 to authenticate users by creating a [database connection](/connections/database). In this tutorial you'll learn how to connect your user database to Auth0.

::: note
Check out [Update Users using a Custom Database](/user-profile/customdb) for information on updating user profile fields.
:::

## Before You Begin

Here are some things to know before you start this process.

* Your database will need fields to populate user profiles such as: `id`, `nickname`, `email`, and `password`. See [Auth0 Normalized User Profile](/user-profile/normalized) for details on Auth0's user profile schema and expected fields.
* Configuring your database as an identity provider in Auth0 involves creating custom scripts for login and get user actions. These database actions scripts execute each time a user performs an action, such as attempting to log in.
* Database action scripts are written in Javascript and run in a Javascript sandbox. In the sandbox you can use the full JavaScript language and [these Node.js libraries](https://tehsis.github.io/webtaskio-canirequire/).
* Auth0 provides templates for most common databases, such as: **ASP.NET Membership Provider**, **MongoDB**, **MySQL**, **Oracle**, **PostgreSQL**, **SQLServer**, **Windows Azure SQL Database**, and for a web service accessed by **Basic Auth**. Essentially, you can connect to any kind of database or web service with a custom script.
* You can use the [auth0-custom-db-testharness library](https://www.npmjs.com/package/auth0-custom-db-testharness) to deploy, execute, and test the output of database action scripts using a Webtask sandbox environment.

## Create and configure a database connection

To connect your database to Auth0 and use it to authenticate users, follow these steps.

1. Navigate to [Connections > Database](${manage_url}/#/connections/database) on the Auth0 dashboard.
2. Click the **+ Create DB Connection** button.
3. Provide a name for the database and configure the available options.

![](/media/articles/connections/database/database-connections.png)

3. Navigate to the **Custom Database** tab.
4. Toggle on the **Use my own database** switch.

![](/media/articles/connections/database/custom-database.png)

5. In the **Database Action Scripts** section, provide a Login script to authenticate users. This script is required, and will execute each time a user attempts to log in. You can write your own script or select a template from the **Templates** dropdown.

::: note
If you are using [IBM's DB2](https://www.ibm.com/analytics/us/en/technology/db2/) product, [click here](/connections/database/db2-script) for a sample login script.
:::

![](/media/articles/connections/database/mysql/db-connection-login-script.png)

For example, the MySQL Login template:

```
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

This script connects to a MySQL database and executes a query to retrieve the first user with `email == user.email`. With the `bcrypt.compareSync` method, it then validates that the passwords match, and if successful, returns an object containing the user profile information including `id`, `nickname`, and `email`. This script assumes that you have a `users` table containing these columns. You can change this script in the editor to adjust it to your own requirements.

6. Optionally, provide scripts for sign-up, verification, password resets, and delete user functionality.

::: note
When creating users, Auth0 calls the **Get User** script before the **Create** script. Be sure that you have implemented both.
:::


7. Store the credentials required to connect to your database in the **Settings** section, below the **Datbase Action Scripts** editor.

![](/media/articles/connections/database/mysql/db-connection-configurate.png)

8. Use the parameters you added in your scripts to configure the connection. Refer to your parameters using `configuration.PARAMETER_NAME`, for example:

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

## 5. Error handling

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

## 6. Debug and troubleshoot

Test the script using the **TRY** button. If your settings are correct you should see the resulting profile:

![](/media/articles/connections/database/mysql/db-connection-try-ok.png)

If you add a `console.log` statement to the script you will be able to see the output here.


## The script container

The script runs in a JavaScript sandbox where you can use the full power of the JavaScript language and selected Node.js libraries. [You can `require` any library listed here](https://tehsis.github.io/webtaskio-canirequire/).

## Auth0 Login widget

After you have enabled the database connection, the Auth0 Login widget will automatically change its appearance to allow users to enter their `username` and `password`. Once entered, this data is passed to your scripts.

![](/media/articles/connections/database/mysql/db-connection-widget.png)

<%= include('../_quickstart-links.md') %>
