# Lock: Authentication Modes

After Auth0 Lock is opened, you can choose any of the Identity Providers (IdP) that Auth0 has, to Login. Depending on how the IdP web app is openned, a different authentication mode is used.

## Redirect Mode

If after you click on the IdP button (Facebook for example), the web app you built gets redirected to Facebook, it means you're using Redirect Mode. Once you successfully login to Facebook, Facebook will redirect you back to your app (through Auth0). This means that if you had **any state in memory in your web app, it will be lost**. This is why a successful login with Redirect mode **cannot be handled with a callback**.

![Widget redirect](http://cl.ly/image/2o423i362s2P/WidgetRedirect.gif)

```js
var lock = new Auth0Lock(
  '${account.clientId}',
  '${account.namespace}'
);

lock.on("authenticated", function(authResult) {
  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }

    localStorage.setItem('token', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
  });
});
```

When you're doing a Regular web app, after a successful login through Auth0, your app is redirected to a callback endpoint that you've created on your server. That callback endpoint will receive the `code` from Auth0 which must then [be exchanged for an `access_token` to get the user information](/protocols#3-getting-the-access-token).

This means that in this case, only [redirect mode](/libraries/lock/v10/authentication-modes#redirect-mode) makes sense.

So, when working on a **regular web app** and not a single page app, you will need to add one option to specify a `redirectUrl`, as such:

```js
var lock = new Auth0Lock(
  '${account.clientId}',
  '${account.namespace}',
  {
  	auth: {
  	  redirectUrl: "https://example.com/callback"
  	}
  }
);

lock.on("authenticated", function(authResult) {
  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }

    localStorage.setItem('token', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
  });
});
```


