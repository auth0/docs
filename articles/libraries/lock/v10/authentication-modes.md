---
section: libraries
description: Details about Authentication Modes with Lock V10.
toc: true
tags:
  - libraries
  - lock
---
# Lock: Authentication Modes

<%= include('../../../_includes/_version_warning_lock') %>

Lock can function in two different modes. The default mode is **redirect mode**. In this mode, your user is redirected to be authenticated, and then is returned to the application. In the second mode, **popup mode**, a popup window allows the user to authenticate with the identity provider without leaving the application.

## Redirect Mode

![Lock - Redirect](/media/articles/libraries/lock/v10/gif/redirect.gif)

When you click the IdP button (For example, Facebook) with redirect mode, you are redirected to Facebook momentarily. Redirect mode is the default with Lock 10, and is the recommended mode for almost all use cases. Once you successfully login (to Facebook, in this example), Facebook will redirect you back to your app (through Auth0). The majority of examples or samples in the reference documentation employ redirect mode.

![Lock - Social Redirect](/media/articles/libraries/lock/v10/gif/social-redirect.gif)

## Popup Mode

![Lock - Redirect](/media/articles/libraries/lock/v10/gif/social-popup.gif)

If after you click on the IdP button (Facebook for example), a popup (new tab or window) is opened, it means you are using popup mode. In that popup, you'll see that Facebook page is displayed. Once you successfully login to Facebook, the popup will be closed and your web app will recognize that the user has been authenticated. The web app has **never been redirected to any other page**.

::: warning
There is a known bug that prevents popup mode from functioning properly in Android or Firefox on iOS, and in Internet Explorer under certain circumstances. As such we recommend only using redirect mode (or if popup mode is absolutely required, detecting these special cases in which popup mode will fail and selectively enabling redirect mode).
:::

Implementing Lock with Popup Mode is again a simple change of the `redirect` option from its default.

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
```

## Database connections and popup mode

![Lock - Popup](/media/articles/libraries/lock/v10/gif/popup.gif)

Some Auth0 features such as [MFA](/multifactor-authentication) and [SSO](/sso/single-sign-on) between multiple applications depend on users being redirected to Auth0 to set a cookie on `'${account.namespace}'`.

When using popup mode, a popup window will be displayed in order to set this cookie and display MFA prompts if necessary; this popup window will be blank if users are not prompted for MFA, which might not be a desirable UX. The reason for this is that cross-origin requests sent from your application to Auth0 are not be able to set cookies.

If you do not want to display a popup window and do not need MFA or SSO between multiple applications, you can set `sso: false` when using Lock or auth0.js.

For example:

```js
var options = {
  auth: {
    sso: false
  }
}
```
