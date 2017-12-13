3. In the web server, handle the callback, usually using a platform-specific OAuth library. This is what you would do in Node & [Passport](http://www.passportjs.org).

```js
router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/failure' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
  });
```

To use centralized login, you don't need to use any client-side library. Your application should perform these steps:

1. When the user clicks the `login` link, navigate to a `/login` route in your website. If you were using plain HTML to code the web views, it would be:

```html
<a href="/login">Log In</a>
```

2. Create a server-side route to handle `/login` that redirects to Auth0's hosted login page. You can usually do that with a platform-specific OAuth library. The example below is for Node.js and Passport. 

```js
router.get('/login', passport.authenticate('auth0', {
  clientID: '${account.clientId}',
  domain:  '${account.namespace}' ,
  redirectUri: ${account.callback},
  responseType: 'code',
  scope: 'openid profile email'}),
  function(req, res) {
    res.redirect("/");
});
```

After authentication is done, it will redirect to the `/callback` url as in the Lock-based implementation.

You can find complete examples of implementing centralized login in web applications for different technologies in our [Quickstarts](/quickstart/webapps).

<%= include('_customizing-login-page') %>
