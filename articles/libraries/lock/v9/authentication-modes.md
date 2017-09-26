---
section: libraries
description: Lock v9 doc on the different types of authentication modes.
---
# Lock: Authentication Modes

<%= include('../_includes/_lock-version-9') %>

After Auth0 Lock is opened, you can choose any of the Identity Providers (IdP) that Auth0 has, to Login. Depending on how the IdP Web/App is openned, a different authentication mode is used.

## Redirect Mode

If after you click on the IdP button (Facebook for example), the Webapp you built gets redirected to Facebook, it means you're using Redirect Mode. Once you successfully login to Facebook, Facebook will redirect you back to your app (through Auth0). This means that if you had **any state in memory in your WebApp, it will be lost**. This is why a successful login with Redirect mode **cannot be handled with a callback** and must be handled with the `parseHash` method.

![Widget redirect](/media/articles/libraries/lock/v9/WidgetRedirect.gif)

You can [click here](/libraries/lock/v9/types-of-applications#redirect-mode) to learn how to implement Redirect mode with Single Page Apps, or you can [click here](/libraries/lock/v9/types-of-applications#redirect-mode-1) to learn how to implement it with Regular WebApps.

### Redirect Mode Implementation Examples

#### Redirect Mode in SPA

In this first example you'll see that a `callbackURL` isn't set. That's because by default the `callbackURL` is set to `location.href` which means the current URL.

Optionally, [you can set the callbackURL to whatever you need](/libraries/lock/v9/configuration#callbackurl-string). Please bear in mind that if you do, you'll also need to specify `responseType: token` as part of the options.

````js
var lock = new Auth0Lock(${account.clientId}, ${account.namespace');

var hash = lock.parseHash();

if (hash) {
  if (hash.error) {
    console.log("There was an error logging in", hash.error);
  } else {
    lock.getProfile(hash.id_token, function(err, profile) {
      if (err) {
        console.log('Cannot get user :(', err);
        return;
      }

      console.log("Hey dude", profile);
    });
  }
}

lock.show();
````

### Redirect Mode in Regular Web Apps

When you're doing a Regular web app, you need that after a successful login through Auth0, your app is redirected to a callback endpoint that you've created in your server. That callback endpoint will receive the `code` from Auth0 which must then [be exchanged for an `access_token` to get the user information](/protocols#3-getting-the-access-token).

This means that in this case, only redirect mode makes sense.

```js
var lock = new Auth0Lock(${account.clientId}, ${account.namespace);

lock.show({
  callbackURL: 'http://myUrl.com/auth/callback'
});
```

## Popup Mode

If after you click on the IdP button (Facebook for example), a popup (new tab or window) is opened, it means you're using Popup Mode. In that popup, you'll see that Facebook page is displayed. Once you successfully login to Facebook, the popup will be closed and your WebApp will recognize that the user has been authenticated. The WebApp has **never been redirected to any other page. This means that you won't lose any state in memory that your application had**. This is why we can **handle successful login with a callback** in this case.

::: warning
There is a known bug that prevents popup mode from functioning properly in Android or Firefox on iOS, and in Internet Explorer under certain circumstances. As such we recommend either only using redirect mode or detecting these special cases and selectively enabling redirect mode.
:::

![Widget Popup](/media/articles/libraries/lock/v10/widget-popup.gif)

### Database connections and popup mode

Some Auth0 features such as [MFA](/multifactor-authentication) and [SSO](/sso) between multiple applications depend on users being redirected to Auth0 to set a cookie on `https://YOUR_DOMAIN.auth0.com`.
When using popup mode, a popup window will be displayed in order to set this cookie and display MFA prompts if necessary; this popup window will be blank if users are not prompted for MFA, which might not be a desirable UX.
The reason for this is that [cross-origin requests](/api/authentication/reference#resource-owner) sent from your application to Auth0 are not be able to set cookies.

If you do not want to display a popup window and do not need MFA or SSO between multiple applications, you can set `sso: false` when using Lock or auth0.js.
For example:

```js
auth.signin({
  sso: false,
  ...
}, function (err, profile, token) { ... });
```

### Popup Mode Implementation Example

### Popup Mode in SPA

Below is an example of an implementation of popup mode in a Single Page Application:

````js
var lock = new Auth0Lock(${account.clientId}, ${account.namespace);

lock.show(function(err, profile, id_token) {
  if (err) {
    console.log("There was an error :/", err);
    return;
  }

  console.log("Hey dude", profile);
})
````

::: note
Redirect mode is recommended whenever possible to avoid potential browser compatibility issues.
:::
