# Issue with Single Page App Email Redirects

For single page applications, the **Redirect To** url can contain the hash and route for a particular state/view in the app, this can also be followed by any route parameters. 

This can cause the following issue with the **Redirect To** url:

    http://localhost:3000/#/register

Which results in a user getting redirected to following url:

    http://localhost:3000/?supportSignUp=true&supportForgotPassword=true&email=ashish.dasnurkar%40gmail.com&message=Your%20email%20was%20verified.%20You%20can%20continue%20using%20the%20application.&success=true#/register

This is per the [RFC 3986](https://tools.ietf.org/html/rfc3986#section-3) spec that defines the expected order of url as `scheme|authority|path|query|fragment`

However single page application frameworks such as Angular typically expect urls in  `scheme|authority|path|fragment|query` format (note the query string parameters being at the end instead of in the middle as expected in the spec). This causes the application to not enter the state as expected. For example in the above url, instead of routing to `/#/register`, the app is routed to `/`.

## Using `state` as an Alternative

To get around this limitation of single page applications(SPA) frameworks such as Angular, it is recommended to use a server-side callback url as the **redirect To** url with a `state` that preserves which SPA app route for the redirect. Once in this server-side url, simply redirect to the SPA route in `state` parameter along with rest of the query string parameters.

1. Add a server-side url as the **redirect To** url with a `state` parameter that records the SPA route for the redirect.

```
http://localhost:3001/register?state=register
```

2. Next, create a server-side route controller that reads the `state` and other parameters from the url and redirects to the SPA route specified in `state` parameter. Remember to append the other parameters received from Auth0.

```
var express = require('express');
var router = express.Router();
var qs = require('qs'); // to read querystring params and stringify them

router.get('/register', function(req, res, next) {
  var state = req.query.state; // retrieve the state param that contains the SPA client side route user needs to be redirected to.

  delete req.query.state; // remove it from query params.
  res.redirect('http://localhost:3000/#/' + state + '?' +  qs.stringify(req.query)); // Send a 302 redirect for the expected route
});

module.exports = router;

```