---
sitemap: false
title: OAuth2-as-a-Service: Creating a Resource Server in Node.js
---

# OAuth2-as-a-Service: Creating a Resource Server in Node.js

After the [**Resource Server**](/oauth2-as-a-service/resource-servers) has been configured you can update your application by accepting the `access tokens` that have been issued by Auth0.

These `access tokens` are JSON Web Tokens which have been signed using RS256 (assymetric signing). Your application will need the public key from your Auth0 account in order to validate these tokens. The following command shows how to download the public key from your account:

```
curl https://${account.namespace}/pem --output key.pem
```

Store the public key in a file that is accessible by your API server (the sample code assumes the public key is in the root directory of your project).

Configure the middleware that will validate the `access tokens` in your API. Validating a token means that you are certain you can trust it's contents.

```js
var express = require('express');
var app = express();
var jwt = require('express-jwt');
var publicKey = fs.readFileSync('./key.pem');

var jwtCheck = jwt({
  secret: publicKey,
  audience: '{RESOURCE_SERVER_IDENTIFIER}',
  issuer: 'https://${account.namespace}/'
});

// All endpoints under /api should validate token
app.use('/api', jwtCheck);
```

Having performed the previous setup, you are certain tokens are valid in any subsequent middleware. You can optionally create a new middleware to handle scope authorization:

```js
var authorize = function(expected_scope){
  return function (req, res, next){
    if (!req.user.scopes.includes(expected_scope)){
      return next(new UnauthorizedError('Cannot perform action. Missing scope ' + expected_scope}));
    }

    next();
  }
};
```

And configure it to check the specific scope in each of the API's endpoints:

```js
app.use('/api/contacts', authorize('contacts'));
app.use('/api/appointments', authorize('appointments'));
```
