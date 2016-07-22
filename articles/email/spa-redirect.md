---
description: How to work around the limitation of single-page application email redirects.
---

# Single-Page App Email Redirect Issue

For single-page applications, the **Redirect To** URL may contain the hash and route for a particular state/view in the app, followed by route parameters. 

This can cause the following issue with the **Redirect To** URL:

`http://localhost:3000/#/register`

Which will result in a user getting redirected to following URL:

`http://localhost:3000/?supportSignUp=true&supportForgotPassword=true&email=ashish.dasnurkar%40gmail.com&message=Your%20email%20was%20verified.%20You%20can%20continue%20using%20the%20application.&success=true#/register`

This is per the [RFC 3986](https://tools.ietf.org/html/rfc3986#section-3) spec that defines the expected order of a URL as `scheme|authority|path|query|fragment`

However, single-page application frameworks (such as Angular) typically expect URLs in the `scheme|authority|path|fragment|query` format (with the query string parameters at the end). This causes the application not to enter the expected state. 

For example, with the above URL, the app will be routed to `/` instead of `/#/register`.

## Using state 

To work around this limitation of single-page application (SPA) frameworks, it is recommended to use a server-side callback URL as the **redirect To** URL with a `state` parameter that preserves the SPA app route for the redirect. Once in this server-side URL, simply redirect to the SPA route saved in `state` parameter along with rest of the query string.

1. Add a server-side URL as the **redirect To** URL with a `state` parameter that records the SPA route for the redirect.

  `http://localhost:3001/register?state=register`

2. Next, create a server-side route controller that reads the `state` and other parameters from the URL and redirects to the SPA route specified in `state` parameter. Remember to append the other parameters received from Auth0.

```
var express = require('express');
var router = express.Router();
var qs = require('qs'); // to read query string params and stringify them

router.get('/register', function(req, res, next) {
  var state = req.query.state; // retrieve the state param that contains the SPA client side route user needs to be redirected to.

  delete req.query.state; // remove it from query params.
  res.redirect('http://localhost:3000/#/' + state + '?' +  qs.stringify(req.query)); // Send a 302 redirect for the expected route
});

module.exports = router;

```