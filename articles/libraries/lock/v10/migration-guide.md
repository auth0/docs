---
section: libraries
toc: true
description: Lock 9 to Lock 10 Migration Guide
tags:
  - libraries
  - lock
  - migrations
---
# Lock 9 to Lock 10 Migration Guide

The following instructions assume you are migrating from **Lock 9** to the latest **Lock 10**. If you are upgrading from a preview release of Lock 10, please refer to the [preview changes](#upgrading-from-preview-releases). Otherwise, read on!

If you just want a quick list of new features to see what changes Lock 10 has introduced, take a look at the [new features page](/libraries/lock/v10/new-features).

The goal of this migration guide is to provide you with all of the information you would need to update your Lock 9 installation to Lock 10. Of course, your first step is to install or include the latest version of Lock 10 rather than Lock 9. Beyond that, take a careful look at each of the areas on this page. You will need to change your implementation to reflect the new changes, not only the initialization of Lock and your calls to Lock methods, but especially any configuration options you were implementing may need inspected and changed. Take a look below for more information!

## General Changes and Additions

### User Profiles

- The profile is no longer fetched automatically after a successful login, you need to call [lock.getUserInfo](/libraries/lock/v10/api#getuserinfo-).

### Redirect Mode vs Popup Mode

- Lock now uses Redirect Mode by default. To use [Popup Mode](/libraries/lock/v10/popup-mode), you must enable this explicitly with the [redirect](/libraries/lock/v10/configuration#redirect-boolean-) option `auth: { redirect: false }`.
- You no longer need to call `parseHash` when implementing Redirect Mode. The data returned by that method is provided to the `authenticated` event listener.

### Configuration and Customization Options

- The show method is no longer the place to include options to configure Lock's appearance or behavior. You instead pass the options to the constructor and then you [listen for an authenticated event](/libraries/lock/v10/api#on-) instead of providing a callback.

```js
var options = {
  theme: {
    logo: 'https://example.com/logo.png',
    primaryColor: '#31324F'
  }
};
```

```js
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}', options);
```

::: note
Lock 10 does _allow_ some configuration methods to be added to the show() method in order to override the defaults for special use cases. See more [in the Lock api doc](/libraries/lock/v10/api#show-).
:::

### Events Changed

- Events have significantly changed between Lock 9 and Lock 10. The events that were emitted [in Lock 9](/libraries/lock/v9/events) are no longer used in Lock 10. The new events list for Lock 10 can be found on the [Lock 10 API page](/libraries/lock/v10/api#on-).
- Important notes about the new `authenticated` event: The `authenticated` event listener has a single argument, an `authResult` object. This object contains the following properties: `idToken`, `accessToken`, `state`, `refreshToken` and `idTokenPayload`. Most of them correspond to the arguments which were previously passed to the `show` method's callback.

### Internationalization

- Not all languages supported by Lock v9 are supported by Lock v10. Please see the [i18n directory](https://github.com/auth0/lock/tree/master/src/i18n) in the GitHub repository for a current list of supported languages in Lock.

### Removed Methods

- The `showSignin`, `showSignup` and `showReset` methods are no longer available. You can emulate the behavior of this options with the [initialScreen](/libraries/lock/v10/configuration#initialscreen-string-), [allowLogin](/libraries/lock/v10/configuration#allowlogin-boolean-), [allowSignUp](/libraries/lock/v10/configuration#allowsignup-boolean-) and [allowForgotPassword](/libraries/lock/v10/configuration#allowforgotpassword-boolean-) options.
- The `getClient` method and the `$auth0` property are no longer available. You can, instead, simply instantiate `Auth0` when using functionality from `auth0.js`. If you need help with how to do this, see the [Using Lock with auth0js page](/libraries/lock/v10/auth0js).

## Changes to configuration Options

Some existing options suffered changes, in addition to the beforementioned removals and additions. Please see below for brief descriptions, or consult the [configuration reference](/libraries/lock/v10/configuration) for more information.

### Display Options

- The `connections` option was renamed to [allowedConnections](/libraries/lock/v10/configuration#allowedconnections-array-).
- The `focusInput` option was renamed to [autofocus](/libraries/lock/v10/configuration#autofocus-boolean-).
- The `gravatar` option was renamed to [avatar](/libraries/lock/v10/configuration#avatar-object-) and instead of taking `true` and `false` it now takes `null` or an object.
- The `dict` option was split into [language](/libraries/lock/v10/configuration#language-string-) and [languageDictionary](/libraries/lock/v10/configuration#languagedictionary-object-). The `language` option allows you to set the base dictionary for a given language and the `languageDictionary` option allows you to overwrite any translation. Also, the structure of the dictionary has been changed.

### Theming Options

- The `icon` option was renamed to [logo](/libraries/lock/v10/configuration#logo-string-) and namespaced under `theme`. Now you use it like this `theme: {logo: "https://example.com/icon.png"}`.
- The [primaryColor](/libraries/lock/v10/configuration#primarycolor-string-) option was namespaced under `theme`. Now you use it like this `theme: {primaryColor: "#ec4889"}`.

### Social Options

- The `socialBigButtons` option was renamed to [socialButtonStyle](/libraries/lock/v10/configuration#socialbuttonstyle-string-) and its possible values are `"small"` or `"big"` instead of `true` or `false`.

### Authentication Options

- The `authParams` option was renamed to [params](/libraries/lock/v10/configuration#params-object-) and namespaced under `auth`. Now you use it like this `auth: {params: {myparam: "myvalue"}}`.
- The `connection_scopes` parameter under `authParams` is now `connectionScopes` (under the `auth` option) `auth: {connectionScopes: {'facebook': ['scope1', 'scope2']}}`.
- The `popup` option was replaced by [redirect](/libraries/lock/v10/configuration#redirect-boolean-) which is namespaced under `auth`. If you previously used `popup: true` now you need to provide `auth: {redirect: false}`.
- The `callbackURL` option was renamed to [redirectUrl](/libraries/lock/v10/configuration#redirecturl-string-) and namespaced under `auth`. Now you use it like this `auth: {redirectUrl: "https://example.com/callback"}`.
- The [responseType](/libraries/lock/v10/configuration#responsetype-string-) option was namespaced under `auth`.  Now you use it like this `auth: {responseType: "code"}`.
- The [sso](/libraries/lock/v10/configuration#sso-boolean-) option was namespaced under `auth`.  Now you use it like this `auth: {sso: false}`.

### Database Options

- The `disableResetAction` option was renamed to [allowForgotPassword](/libraries/lock/v10/configuration#allowforgotpassword-boolean-).
- The `disableSignUpAction` option was renamed to [allowSignUp](/libraries/lock/v10/configuration#allowsignup-boolean-).
- The `defaultUserPasswordConnection` option has been replaced by the [defaultDatabaseConnection](/libraries/lock/v10/configuration#defaultdatabaseconnection-string-) and the [defaultEnterpriseConnection](/libraries/lock/v10/configuration#defaultenterpriseconnection-string-) options.
- The `resetLink` option was renamed to [forgotPasswordLink](/libraries/lock/v10/configuration#forgotpasswordlink-string-).
- The `signupLink` option was renamed to [signUpLink](/libraries/lock/v10/configuration#signuplink-string-) (change in casing).

### Other Options

- The `forceJSONP` option was removed.

## Further Reading

- Some other options were added, see [New Features page](/libraries/lock/v10/new-features) for details.
- Check out the [configuration page](/libraries/lock/v10/configuration) for more details on all of the configuration options that are available.
- Take a look at the [api page](/libraries/lock/v10/api) for more details on Lock 10's API.
