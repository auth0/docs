---
description: How to work around the limitation of single-page application email redirects.
topics:
  - email
  - spa
contentType: how-to
useCase: customize-emails
---
# Single-Page App Email Redirect Issue

For single-page applications (SPAs), the **Redirect To** URL may contain the hash and route for a particular state/view in the app, followed by route parameters. 

This can cause the following issue with the **Redirect To** URL:

```text
http://localhost:3000/#/register
```

Which will result in a user getting redirected to following URL:

```text
http://localhost:3000/?supportSignUp=true
  &supportForgotPassword=true
  &email=ashish.dasnurkar%40gmail.com
  &message=Your%20email%20was%20verified.%20You%20can%20continue%20using%20the%20application.
  &success=true#/register
```

This is per the [RFC 3986](https://tools.ietf.org/html/rfc3986#section-3) spec that defines the expected order of a URL as `scheme|authority|path|query|fragment`.

However, SPA frameworks (such as Angular) typically expect URLs in the `scheme|authority|path|fragment|query` format (with the query string parameters at the end). This causes the application not to enter the expected state. 

For example, with the above URL, the app will be routed to `/` instead of `/#/register`.

## Using a Query String Parameter 

To work around this limitation of SPA frameworks, it is recommended to use a server-side <dfn data-key="callback">callback URL</dfn> as the **redirect To** URL with a `route` parameter that preserves the SPA app route for the redirect. Once in this server-side URL, simply redirect to the SPA route saved in the `route` parameter along with rest of the query string.

1. Add a server-side URL as the **redirect To** URL with a `route` parameter that records the SPA route for the redirect.

```text
http://localhost:3001/register?route=register
```

2. Next, create a server-side route controller that reads the `route` and other parameters from the URL and redirects to the SPA route specified in `route` parameter. Remember to append the other parameters received from Auth0.

```js
var express = require('express');
var router = express.Router();
var qs = require('qs'); // to read query string params and stringify them

router.get('/register', function(req, res, next) {
  var route = req.query.route; // retrieve the route param that contains the SPA client side route user needs to be redirected to.

  delete req.query.route; // remove it from query params.
  res.redirect('http://localhost:3000/#/' + route + '?' +  qs.stringify(req.query)); // Send a 302 redirect for the expected route
});

module.exports = router;
```
