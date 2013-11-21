# Using Auth0 in Node.js APIs

@@includes.apinote@@

Install the following package which will provide an express middleware that validates a JSON Web Token.

	 npm install express-jwt

Add the following to your express application:

  	var jwt = require('express-jwt');

  	var authenticate = jwt({
  	  secret: new Buffer('@@account.clientSecret@@', 'base64')
  	  audience: '@@account.clientId@@'
  	});

  	app.configure(function() {
  	  ...
  	  // intercept all /api calls and validate the token
  	  app.use('/api', authenticate);
  	  ...
  	});

> If you are not using express you can use the [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) package which provides the underlying token validation functionallity used by `express-jwt`.

