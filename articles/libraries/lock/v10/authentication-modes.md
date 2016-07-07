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

    localStorage.setItem('idToken', authResult.idToken);
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

    localStorage.setItem('idToken', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
  });
});
```

## Popup Mode

If after you click on the IdP button (Facebook for example), a popup (new tab or window) is opened, it means you're using Popup Mode. In that popup, you'll see that Facebook page is displayed. Once you successfully login to Facebook, the popup will be closed and your WebApp will recognize that the user has been authenticated. The WebApp has **never been redirected to any other page. This means that you won't lose any state in memory that your application had**. This is why we can **handle successful login with a callback** in this case.

::: panel-warning Popup Mode
There is a known bug that prevents popup mode from functioning properly in Android or Firefox on iOS, and in Internet Explorer under certain circumstances. As such we recommend either only using redirect mode or detecting these special cases and selectively enabling redirect mode. See more info [here](https://ask.auth0.com/t/popup-login-window-is-not-closed-after-authentication/2843).
:::

![Widget Popup](https://cloudup.com/cg8u9kVV5Vh+)

Implementing Lock with Popup Mode is again a simple change of an option from its default.

```js
var lock = new Auth0Lock(
  '${account.clientId}',
  '${account.namespace}',
  {
    auth: { 
      redirect: false 
    }
  }
);

lock.on("authenticated", function(authResult) {
  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }

    localStorage.setItem('idToken', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
  });
});
```

### Database connections and popup mode

Some Auth0 features such as [MFA](/multifactor-authentication) and [SSO](/sso/single-sign-on) between multiple applications depend on users being redirected to Auth0 to set a cookie on `'${account.namespace}'`.
When using popup mode, a popup window will be displayed in order to set this cookie and display MFA prompts if necessary; this popup window will be blank if users are not prompted for MFA, which might not be a desirable UX.
The reason for this is that [cross-origin requests](https://auth0.com/docs/auth-api#!#post--oauth-ro) sent from your application to Auth0 are not be able to set cookies.

If you do not want to display a popup window and do not need MFA or SSO between multiple applications, you can set `sso: false` when using Lock or auth0.js.
For example:

```js
var options = {
  auth: {
    sso: false
  }
}
```

**Redirect mode is recommended whenever possible to avoid potential browser compatibility issues.**
