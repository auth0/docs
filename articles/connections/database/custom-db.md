---
title: Authenticate Users using a Custom Database
connection: MySQL
image: /media/connections/mysql.svg
seo_alias: mysql
description: How to authenticate users with username and password using a Custom Database.
crews: crew-2
toc: true
---

# Authenticate Users using a Custom Database

Applications often rely on user databases for authentication. Auth0 enables you to connect to these repositories and use them as identity providers while preserving user credentials and providing additional features. You can read more about database connections and the different user store options at [Database Identity Providers](/connections/database).

This tutorial will guide you through a series of steps to connect your custom user store to Auth0. If you are looking to manage authentication in your application, see [Next Steps](#next-steps) below.

::: note
Please also read the section on [Updating Users using a Custom Database](/user-profile/customdb), as it contains important information about how to update fields of the User Profile.
:::

## 1. Create a database connection

Log into Auth0, and select the [Connections > Database](${manage_url}/#/connections/database) menu option. Click the **New Database Connection** button and provide a name for the database, or select a database you have created.

![](/media/articles/connections/database/database-connections.png)

## 2. Customize the database connection

Click **Custom Database** and turn on the **Use my own database** switch.

![](/media/articles/connections/database/custom-database.png)

## 3. Provide action scripts

You have to provide a login script to authenticate the user that will execute each time a user attempts to log in. Optionally, you can create scripts for sign-up, email verification, password reset and delete user functionality.

::: note
When creating users, Auth0 calls the **Get User** script before the **Create** script. Be sure that you have implemented both. Refer to the [Dashboard](${manage_url}) for sample scripts.
:::

These custom scripts are *Node.js* code that run in the domain's sandbox. Auth0 provides templates for most common databases, such as: **ASP.NET Membership Provider**, **MongoDB**, **MySQL**, **Oracle**, **PostgreSQL**, **SQLServer**, **Windows Azure SQL Database**, and for a web service accessed by **Basic Auth**. Essentially, you can connect to any kind of database or web service with a custom script.

This article shows how to implement the login script for **MySQL**. If you want a sample script for another action (sign-up, password reset, etc) or another database, use the dropdown options at the [Dashboard](${manage_url}).

In the **Templates** drop-down, select **MySQL**:

![](/media/articles/connections/database/mysql/db-connection-login-script.png)

You will see the following sample code in the Connection editor:

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

This script connects to a **MySQL** database and executes a query to retrieve the first user with `email == user.email`. With the `bcrypt.compareSync` method, it then validates that the passwords match, and if successful, returns an object containing the user profile information including `id`, `nickname`, and `email`. This script assumes that you have a `users` table containing these columns. You can tweak this script in the editor to adjust it to your own requirements.

You can also [cache connections](/rules#cache-expensive-resources) such that it will survive individual execution.

::: note
If you are using [IBM's DB2](https://www.ibm.com/analytics/us/en/technology/db2/) product, [click here](/connections/database/db2-script) for a sample login script.
:::

::: note
You can use the [auth0-custom-db-testharness library](https://www.npmjs.com/package/auth0-custom-db-testharness) to deploy, execute, and test the output of Custom DB Scripts using a Webtask sandbox environment.
:::

### Database Field Requirements

Of course, your custom database will need to have fields in it that will provide the information to populate user profiles. In the above example, the script is checking for an `id`, `nickname`, `email`, and `password`.

For more information on Auth0 user profile schema and the fields that are expected, as well as additional ones that are available, take a look at the [Auth0 Normalized User Profile](/user-profile/normalized) documentation.


## 4. Add configuration parameters

You can securely store the credentials needed to connect to your database in the **Settings** section at the bottom of the page.

![](/media/articles/connections/database/mysql/db-connection-configurate.png)

In the connection script, refer to these parameters as: `configuration.PARAMETER_NAME`. For example, you could enter:

```js
function login (username, password, callback) {
  var connection = mysql({
    host     : 'localhost',
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
