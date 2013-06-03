# Authenticating username and password from a database

Suppose you already have your own users database in your application and want to start using all the features of Auth0. In this tutorial we will guide you thru a series of steps to plug your users database to Auth0.

## Create the database connection

Log in into Auth0, click connections and then database. Create a new database connection, the name is not important at this time.

![](/img/db-connection-create.png)

## Customize the database connection

Now we want to tell auth0 how to validate a username/password and how to retrieve a profile.

![](/img/db-connection-login-script.png)

as you can see there is a __Templates__ picker. You can choose one of those templates to start, let's pick "MySQL":


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

As you can see this script connects to a MySQL database and execute a query, then validate the password. You can tweak this script in order to make it work with your database.

##Configuration

There is a section at the bottom to securely store configuration settings. Store your database password there:

![](/img/db-connection-create.png)

Now you can change the script, to use ```configuration.MYSQL_PASSWORD``` instead.

##Debug and throubleshoting

Use the try button to exercise your script. If the result is okay you will see a green border and the resulting profile:

![](/img/db-connection-try-ok.png)

If the script failed for some reason you will see a red border and the error details:

![](/img/db-connection-create.png)

You can take advantage of JavaScript's `console.log` to output more details:

![](/img/db-connection-console-log.png)

##The login widget

After you have enabled the database connection, Auth0's widget will automatically change the apperance to allow users directly login with username and passwords.

![](/img/db-connection-widget.png)


