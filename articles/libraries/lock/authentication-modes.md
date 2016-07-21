# Lock: Authentication Modes

After Auth0 Lock is opened, you can choose any of the Identity Providers (IdP) that Auth0 has, to Login. Depending on how the IdP Web/App is openned, a different authentication mode is used.

## Redirect Mode

If after you click on the IdP button (Facebook for example), the Webapp you built gets redirected to Facebook, it means you're using Redirect Mode. Once you successfully login to Facebook, Facebook will redirect you back to your app (through Auth0). This means that if you had **any state in memory in your WebApp, it will be lost**. This is why a successful login with Redirect mode **cannot be handled with a callback** and must be handled with the `parseHash` method.

![Widget redirect](http://cl.ly/image/2o423i362s2P/WidgetRedirect.gif)

You can [click here](/libraries/lock/types-of-applications#redirect-mode) to learn how to implement Redirect mode with Single Page Apps, or you can [click here](/libraries/lock/types-of-applications#redirect-mode-1) to learn how to implement it with Regular WebApps.

## Popup Mode

If after you click on the IdP button (Facebook for example), a popup (new tab or window) is opened, it means you're using Popup Mode. In that popup, you'll see that Facebook page is displayed. Once you successfully login to Facebook, the popup will be closed and your WebApp will recognize that the user has been authenticated. The WebApp has **never been redirected to any other page. This means that you won't lose any state in memory that your application had**. This is why we can **handle successful login with a callback** in this case.

> WARNING: There is a known bug that prevents popup mode from functioning properly in Android or Firefox on iOS, and in Internet Explorer under certain circumstances. As such we recommend either only using redirect mode or detecting these special cases and selectively enabling redirect mode. See more info [here](https://ask.auth0.com/t/popup-login-window-is-not-closed-after-authentication/2843).

![Widget Popup](https://cloudup.com/cg8u9kVV5Vh+)

You can [click here](/libraries/lock/types-of-applications#popup-mode) to learn how to implement Popup mode with Single Page Apps.

### Database connections and popup mode

Some Auth0 features such as [MFA](/multifactor-authentication) and [SSO](/sso) between multiple applications depend on users being redirected to Auth0 to set a cookie on `https://YOUR_DOMAIN.auth0.com`.
When using popup mode, a popup window will be displayed in order to set this cookie and display MFA prompts if necessary; this popup window will be blank if users are not prompted for MFA, which might not be a desirable UX.
The reason for this is that [cross-origin requests](https://auth0.com/docs/auth-api#!#post--oauth-ro) sent from your application to Auth0 are not be able to set cookies.

If you do not want to display a popup window and do not need MFA or SSO between multiple applications, you can set `sso: false` when using Lock or auth0.js.
For example:

```js
auth.signin({
  sso: false,
  ...
}, function (err, profile, token) { ... });
```

Redirect mode is recommended whenever possible to avoid potential browser compatibility issues.
