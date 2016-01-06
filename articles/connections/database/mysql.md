---
title: Authenticate Users with Username and Password using a Custom Database
connection: MySQL
image: /media/connections/mysql.svg
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

The script runs in a JavaScript sandbox where you can use the full power of the JavaScript language and selected libraries. The current API supports:

### Utilities
* [bcrypt](https://github.com/ncb000gt/node.bcrypt.js/) _(~0.7.5)_
* [Buffer](http://nodejs.org/docs/v0.8.26/api/buffer.html)
* [crypto](http://nodejs.org/docs/v0.8.26/api/crypto.html)
* [pbkdf2](https://github.com/davidmurdoch/easy-pbkdf2) _(0.0.2)_
* [q](https://github.com/kriskowal/q) _(~1.0.1)_
* [request](https://github.com/mikeal/request) _(~2.21.0)_
* [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js) _(~0.2.8)_
* [xmldom](https://github.com/jindw/xmldom) _(~0.1.16)_
* [xpath](https://github.com/goto100/xpath) _(0.0.5)_
* [xtend](https://github.com/Raynos/xtend) _(~1.0.3)_

### Databases
* [cassandra](https://www.npmjs.org/package/node-cassandra-cql) _(^0.4.4)_
* [couchbase](https://github.com/couchbase/couchnode) _(~1.2.1)_
* [mongo](https://github.com/mongodb/node-mongodb-native) _(~1.3.15)_
	* [BSON](http://mongodb.github.io/node-mongodb-native/api-bson-generated/bson.html)
	* [Double](http://mongodb.github.io/node-mongodb-native/api-bson-generated/double.html)
	* [Long](http://mongodb.github.io/node-mongodb-native/api-bson-generated/long.html)
	* [ObjectID](http://mongodb.github.io/node-mongodb-native/api-bson-generated/objectid.html)
	* [Timestamp](http://mongodb.github.io/node-mongodb-native/api-bson-generated/timestamp.html)
* [knex](http://knexjs.org) _(~0.6.3)_
	* The function returned by `require('knex')` is available as `Knex`.
* [mysql](https://github.com/felixge/node-mysql) _(~2.3.2)_
	* [mysql\_pool](https://github.com/felixge/node-mysql#pool-options)
* [postgres](http://github.com/brianc/node-postgres) _(~2.8.3)_
* [sqlserver](https://github.com/pekim/tedious) _(~0.1.4)_

**NOTE:** If you require support for other libraries, email Auth0 at [support@auth0.com](mailto:support@auth0.com?subject=Libraries in custom connection).

## Auth0 Login widget

After you have enabled the database connection, the Auth0 Login widget will automatically change its appearance to allow users to enter their `username` and `password`. Once entered, this data is passed to your scripts.

![](/media/articles/connections/database/mysql/db-connection-widget.png)
