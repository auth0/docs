# Authenticating Users on a database with username and password

Often times, applications rely on user databases for authentication. ASP.NET Membership is an example of a commonly used one.

Auth0 allows you to easily connect with these repositories, reuse them as identity providers, preserving their existing credentials, but also adding all the other awesome features Auth0 has.

In this tutorial we will guide you through a series of steps to plug your users database to Auth0.

## Create the database connection

Log in into Auth0, select the __Connections__ menu option, and then __Database__. Create a new name for the database connection. You can choose any name. It is not important at this time.

![](/img/db-connection-create.png)

## Customize the database connection

Auth0 ships with multiple templates to connect with common and widely used database systems: __MySQL__, __SQL Server__, __SQL Azure__, __MongoDb__, __Couchbase__, __Postgres__, among others.

In this tutorial, we will use __MySQL__. Select __MySQL__ from one of the templates available:

![](/img/db-connection-login-script.png)

The following code will be generated for you in the editor below:

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

As you can see, this script connects to a __MySQL__ database and executes a query to retrieve the first user with `email == user.email`. It then validates that the passwords match (with the `bcrypt.compareSync` method), and if successful, it will finally return an object with some user profile information: `id`, `nickname`, `email`.

This script assumes you have a `users` table with all these columns. You can of course tweak this script in order to adjust it to your own requirements.

## Configuration

At the bottom of the editor you will find a way of storing parameters securely. This is convenient for storing the credentials used to connect to the database:

![](/img/db-connection-configurate.png)

In the script you would refer to these parameters as: ```configuration.PARAMETER_NAME```. For example, you could write:

	function login (username, password, callback) {
	  var connection = mysql({
	    host     : 'localhost',
	    user     : 'me',
	    password : configuration.MYSQL_PASSWORD,
	    database : 'mydb'
	  });

## Debugging and troubleshooting

You can test the script using the ```try``` button. If the result is okay you will see the resulting profile:

![](/img/db-connection-try-ok.png)

If the script failed for some reason, you will see a red border and the errors that occurred:

![](/img/db-connection-try-fail.png)

JavaScript's `console.log` is supported, so you can output more details:

![](/img/db-connection-console-log.png)

## Auth0 Login Widget

After you have enabled the database connection, Auth0's widget will automatically change the appearance to allow users to enter `username` and `password`. These will be inputs to your script.

![](/img/db-connection-widget.png)

## How it works

The script runs in a JavaScript sandbox where you can use the full power of the language and selected libraries. The current API supports:

###Utilities
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

###Databases
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

###Errors

To return an error simple call the callback with an error as the first parameter:

	callback(error);

There are three different types of errors you can return from a DB Connection:

- `new WrongUsernameOrPasswordError(<email or user_id>, <message>)`: Use this error when you know who is the user and you want to keep track of the wrong password.
- `new ValidationError(<error code>, <message>)`: Generic error with an error code.
- `new Error(<message>)`: Simple errors (no error code).

Example:

	callback(new ValidationError('email-too-long', 'Email is too long.'));

> Do you need support for other libraries? Contact us: [support@auth0.com](mailto:support@auth0.com?subject=Libraries in custom connection)
