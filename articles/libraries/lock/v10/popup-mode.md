# Popup Mode

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

    localStorage.setItem('token', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
  });
});
```

## Database connections and popup mode

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