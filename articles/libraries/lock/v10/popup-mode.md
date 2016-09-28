---
description: Details about Popup Mode with Lock V10.
---

<%= include('../_includes/_lock-version') %>

# Popup Mode

## The Default: Redirect Mode

If after you click on the IdP button (Facebook for example), the web app you built gets redirected to Facebook, it means you're using Redirect Mode. Redirect Mode is the default with Lock 10, and is the recommended mode for almost all use cases. Once you successfully login to Facebook, Facebook will redirect you back to your app (through Auth0). 

## Using Popup Mode

If after you click on the IdP button (Facebook for example), a popup (new tab or window) is opened, it means you're using Popup Mode. In that popup, you'll see that Facebook page is displayed. Once you successfully login to Facebook, the popup will be closed and your WebApp will recognize that the user has been authenticated. The WebApp has **never been redirected to any other page**.

::: panel-warning Popup Mode
There is a known bug that prevents popup mode from functioning properly in Android or Firefox on iOS, and in Internet Explorer under certain circumstances. As such we recommend either only using redirect mode or detecting these special cases and selectively enabling redirect mode. See more info [here](https://ask.auth0.com/t/popup-login-window-is-not-closed-after-authentication/2843).
:::

![Widget Popup](/media/articles/libraries/lock/v10/widget-popup.gif)

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
The reason for this is that [cross-origin requests](/auth-api#!#post--oauth-ro) sent from your application to Auth0 are not be able to set cookies.

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

<%= include('../_includes/_lock-toc') %>

