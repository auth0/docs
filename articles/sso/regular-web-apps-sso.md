# Server-side SSO (Regular Web Apps)

Let's say we have three applications

* App 1: app1.com (single page app)
* App 2: app2.com (single page app)
* App 3: app3.com (regular web app)

> You can see an example of a Regular Web App configured to use SSO in [this github repository](https://github.com/auth0/auth0-sso-sample/tree/master/app3.com)

## Case 1: The user is already logged in and clicks on a link that redirects to a specific URL app3.com

The user logs in on app1.com and clicks on a link that should take them to a particular URL on app3.com. In this case, you can create an endpoint on the target application (app3) that will redirect to the URL the user wanted to go after SSO. For example:

```
https://app3.com/sso?targetUrl=/foo/bar
```

This endpoint would check if the user is already logged in to this app. If they are, then redirect to the target URL. If the user is not logged in to the application, then redirect to Auth0 for SSO:

```
handle("/sso")
  if (user is already logged in)
    redirect to targetUrl
  else
    redirect to "https://YOURS.auth0.com/authorize?client_id=…&redirect_uri=http://urlTo/callback&response_type=code&state=' + targetUrl
```

Here is an example in node.js:

```js
app.get('/sso', function(req,res, next) {
  if (req.isAuthenticated()) {
    if (/^http/.test(req.query.targetUrl)) return res.send(400, "url must be relative");
    // Here we'd redirect to req.query.targetUrl like following
    // res.redirect(req.query.targetUrl);
    // But in this case we'll go to User anyway
    res.redirect('/user?targetUrl=' + req.query.targetUrl);
  } else {
    console.log("Authenticating with Auth0 for SSO");
    passport.authenticate('auth0', {
      state: req.query.targetUrl
    })(req, res, next);
  }
});
```

When the user comes back from Auth0 you should check for the `state` parameter and redirect to the original target URL.

```
handle("/callback")
  // process login with SDK
  if (state) redirect to url on state parameter
  else redirect to base logged in URL
```

Here is an example in node.js:

```js
app.get('/callback',
    passport.authenticate('auth0'),
    function(req, res) {
      if (req.query.state) {
        res.redirect(req.query.state);
      } else {
        res.redirect("/user");
      }
    });
```

## Case 2: The user is already logged in and goes to app3.com

The user is logged in on app1.com and opens a new tab and goes to app3.com. You would expect the user to be automatically signed in. To do that, you need to redirect the user to the following URL in a filter or a middleware:

```
https://YOURS.auth0.com/authorize?client_id=…&response_type=code&redirect_uri=http://urlTo/callback
```

Here is an example in node.js:

```js
app.get('/',
    // This redirects to https://YOURS.auth0.com....
    passport.authenticate('auth0', {}),
    function(req, res) {
      // Once user is logged in, redirect to the user page
      res.redirect('/user');
    });
```

If the user was already logged in before, then Auth0 will automatically redirect back to the application with a new token. If not, then it will show the Auth0 Login Page.

## Case 3: The user has never logged in

The user has never logged in to any app. In this case, the filter or middleware mentioned in the previous point checks if the user is authenticated or not, and in the case they're not, redirects the user to the following URL:

```
https://YOURS.auth0.com/authorize?client_id=…&response_type=code&redirect_uri=http://urlTo/callback
```
