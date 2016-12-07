---
description: Server-side SSO with regular web applications.
---

# Server-side SSO (Regular Web Apps)

To log a user in silently (i.e. without displaying the Lock screen) the following conditions need to be met:

1. The Client needs to be configured to **Use Auth0 instead of the IdP to do Single Sign On** in the [Clients section of the Auth0 Management Dashboard](${manage_url}/#/clients)
2. An SSO cookie must exist for the tenant's domain. In other words the user must have signed in previously, and the SSO cookie which was saved is still valid.
3. When calling the Auth0 authentication endpoint, the connection name is passed along for which the user must be signed in. This connection name as specified in the SSO cookie. You can pass the connection name along either as a parameter when calling the `signin` function of the [**auth0.js** Library](https://auth0.com/docs/libraries/auth0js), or by passing the `connection` query string parameter when calling the `/authorize` endpoint of the [Authentication API](/api/authentication)

## The SSO scenario

In our SSO scenario, let's say we have 3 applications

* App 1: app1.com (Single Page App)
* App 2: app2.com (Single Page App)
* App 3: app3.com (Regular Web app)

It a user signs in to any of these applications, and then subsequently navigates from this application to any of the other applications, we would want the user to be signed in automatically. 

In this document we will be looking specifically how to achieve this in a Regular Web Application

## Case 1: The user is already logged in and clicks on a link that redirects to a specific URL app3.com

The user logs in on one of the Single Page Applications and click on a link that should take them to a particular URL on app3.com. In this case, you can create an endpoint on the target application (app3) that will redirect to the URL the user wanted to go after SSO. For example:

```text
https://app3.com/sso?targetUrl=/foo/bar&connection=<connection name>
```

This endpoint would check if the user is already logged in to this app. If they are, then redirect to the target URL. If the user is not logged in to the application, then redirect to Auth0 for SSO, passing along the name of the connection to use:

```text
handle("/sso")
  if (user is already logged in)
    redirect to targetUrl
  else
    redirect to "https://${account.namespace}/authorize?client_id=…&connection=<connection name>&redirect_uri=http://urlTo/callback&response_type=code&state=' + targetUrl
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
      state: req.query.targetUrl,
      connection: req.query.connection
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
https://${account.namespace}/authorize?client_id=…&response_type=code&redirect_uri=http://urlTo/callback
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
https://${account.namespace}/authorize?client_id=…&response_type=code&redirect_uri=http://urlTo/callback
```
