# Authenticating Users on a database with username and password

Often times, applications rely on user databases for authentication. ASP.NET Membership is an example of a commonly used one.

Auth0 allows you to easily connect with these repositories, reuse them as identity providers, preserving their existing credentials, but also adding all the other awesome features Auth0 has.

In this tutorial we will guide you through a series of steps to plug your users database to Auth0.

## Create the database connection

Log in into Auth0, select the __Connections__ menu option, and then __Database__. Create a new name for the database connection. You can choose any name. It is not important at this time.

![](/img/db-connection-create.png)

## Customize the database connection

Auth0 ships with multiple templates to connect with common and widely used database systems: __MySQL__, __SQL Server__, __SQL Azure__, __MongoDb__, among others.

In this tutorial, we will use __MySQL__. Select __MySQL__ from one of the templates available:

![](/img/db-connection-login-script.png)

The following code will be generated from for you in the editor below:

	function login (username, password, callback) {
	  var connection = mysql({
	    host     : 'localhost',
	    user     : 'me',
	    password : 'secret',
	    database : 'mydb'
	  });

	  connection.connect();

	  var query = "SELECT Id, Nickname, Email, FirstName, LastName, Password " + 
	              "FROM MyUsers WHERE Nickname = ?";

	  connection.query(query, [username], function (err, results) {
	    if (err) return callback(err);
	    if (results.length === 0) return callback();
	    var user = results[0];

	    if (!bcrypt.compareSync(password, user.Password)) return callback();
	    
	    callback(null,   {
	      id:           user.Id.toString(),
	      username:     user.Email, 
	      displayName:  (user.FirstName || '') + ' ' + (user.LastName || ''),
	      name: {
	        givenName:  user.FirstName,
	        familyName: user.LastName
	      }, 
	      emails:   [ {value: user.Email} ]
	    });
	  });
	}

As you can see, this script connects to a __MySQL__ database and executes a query to retrieve the first user with a `Nickname == username`. It then validates that the passwords match (with the `bcrypt.compareSync` method), and if successful, it will finally return an object with some user profile information: `id`, `username`, `displayName`, `emails`. 

This script assumes you have a `MyUsers` table with all these columns. You can of course tweak this script in order to adjust it to your own requirements.

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

You can test the script using the ```try``` button. If the result is okay you will see a green border and the resulting profile:

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

-  [mongo](http://mongodb.github.io/node-mongodb-native/)
-  [mysql](https://github.com/felixge/node-mysql)
-  [postgres](http://github.com/brianc/node-postgres)
-  [sqlserver](https://github.com/pekim/tedious)
-  [Buffer](http://nodejs.org/api/buffer.html)
-  [request](https://github.com/mikeal/request)
-  [bcrypt](https://github.com/ncb000gt/node.bcrypt.js/)
-  [crypto](http://nodejs.org/api/crypto.html)
-  [pbkdf2](https://github.com/davidmurdoch/easy-pbkdf2)
-  [xmldom](https://github.com/jindw/xmldom)
-  [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js)
-  [xpath](https://github.com/goto100/xpath)


> Do you need support for other libraries? Contact us: [support@auth0.com](mailto:support@auth0.com?subject=Libraries in custom connection) 
