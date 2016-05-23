---
title: Authenticate Users with Username and Password using a Custom Database
connection: MySQL
image: /media/connections/mysql.svg
seo_alias: mysql
---

# Authenticate Users with Username and Password using a Custom Database

Applications often rely on user databases for authentication. Auth0 enables you to easily connect to these repositories and use them as identity providers while preserving user credentials and providing many additional features. You can read more about database connections and the different user store options at [Database Identity Providers](/connections/database).

In this tutorial, you will be guided through a series of steps to connect your custom user store to Auth0.

## 1. Create a database connection

Log into Auth0, and select the [Connections > Database](${uiURL}/#/connections/database) menu option. Click the **New Database Connection** button and provide a name for the database, or select a database you have created previously.

![](/media/articles/connections/database/database-connections.png)

## 2. Customize the database connection

Click **Custom Database** and turn on the **Use my own database** switch.

![](/media/articles/connections/database/custom-database.png)

## 3. Provide action scripts

You have to provide a login script to authenticate the user that will execute each time a user attempts to log in. Optionally, you can create scripts for sign-up, email verification, password reset and delete user functionality.

These custom scripts are *Node.js* code that run in the tenant's sandbox. Auth0 provides templates for most common databases, such as: **ASP.NET Membership Provider**, **MongoDB**, **MySQL**, **PostgreSQL**, **SQLServer**, **Windows Azure SQL Database**, and for a web service accessed by **Basic Auth**. Essentially, you can connect to any kind of database or web service with a custom script.

This tutorial uses **MySQL** as an example. In the **Templates** drop-down, select **MySQL**:

![](/media/articles/connections/database/mysql/db-connection-login-script.png)

The following code is generated for you in the connection editor:

```js
function login (email, password, callback) {
  var connection = mysql({
    host     : 'localhost',
    user     : 'me',
    password : 'secret',
    database : 'mydb'
  });

  connection.connect();

  var query = "SELECT id, nickname, email, password " +
             "FROM users WHERE email = ?";

  connection.query(query, [email], function (err, results) {
    if (err) return callback(err);
    if (results.length === 0) return callback();
    var user = results[0];

    if (!bcrypt.compareSync(password, user.password)) {
      return callback();
    }

    callback(null,   {
      id:          user.id.toString(),
      nickname:    user.nickname,
      email:       user.email
    });

  });

}
```

This script connects to a **MySQL** database and executes a query to retrieve the first user with `email == user.email`. With the `bcrypt.compareSync` method, it then validates that the passwords match, and if successful, returns an object containing the user profile information including `id`, `nickname`, and `email`. This script assumes that you have a `users` table containing these columns. You can tweak this script in the editor to adjust it to your own requirements.

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
