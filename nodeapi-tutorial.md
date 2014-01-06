# Using Auth0 in Node.js APIs

@@includes.apinote@@

Installing the following package will provide an Express middleware that validates a [JSON Web Token](jwt).

	 npm install express-jwt

Add the following to your express application:

  	var jwt = require('express-jwt');

  	var authenticate = jwt({
  	  secret: new Buffer('@@account.clientSecret@@', 'base64'),
  	  audience: '@@account.clientId@@'
  	});

  	app.configure(function() {
  	  ...
  	  // intercept all /api calls and validate the token
  	  app.use('/api', authenticate);
  	  ...
  	});

> If you are not using Express you can use the [jsonwebtoken package](https://github.com/auth0/node-jsonwebtoken) which provides the underlying token validation functionality used by `express-jwt`.

