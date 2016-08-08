::: panel-info Lock Version
Heads up! This document is using the latest version of Lock (version 10). See changes from the old version in the [new features](/libraries/lock/v10/new-features) page, see a learn how to migrate from version 9 to version 10 in the [migration guide](/libraries/lock/10/migration-guide), or see the [Lock 9 Documentation](/libraries/lock/v9) if you're looking for information about Lock 9.
:::

# Lock 9 to Lock 10 Migration Guide

The following instructions assume you are migrating from **Lock 9** to the latest **Lock 10**. If you are upgrading from a preview release of Lock 10, please refer to the [preview changes](#preview-changes). Otherwise, read on!

## General Changes and Additions

### User Profiles
- The profile is no longer fetched automatically after a successful login, you need to call [lock.getProfile](/libraries/lock/v10/api#getprofile-token-callback-).

### Redirect Mode vs Popup Mode
- Lock now uses Redirect Mode by default. To use [Popup Mode](/libraries/lock/v10/popup-mode), you must enable this explicitly with the [redirect](/libraries/lock/v10/customization#redirect-boolean-) option `auth: { redirect: false }`.
- You no longer need to call `parseHash` when implementing Redirect Mode. The data returned by that method is provided to the `authenticated` event listener.

### Customizing Options
- The `show` method no longer takes any arguments. You pass the options to the constructor and you listen for an `authenticated` event instead of providing a callback. You can listen for this event with the [on](/libraries/lock/v10/api#on-event-callback-) method.

### Authenticated Event
- The `authenticated` event listener has a single argument, an `authResult` object. This object contains the following properties: `idToken`, `accessToken`, `state`, `refreshToken` and `idTokenPayload`. Most of them correspond to the arguments passed to the `show` method's callback.

### Internationalization
- Not all languages supported by Lock v9 are supported by Lock v10.

### Removed Methods
- The `showSignin`, `showSignup` and `showReset` methods are no longer available. You can emulate the behavior of this options with the [initialScreen](/libraries/lock/v10/customization#initialscreen-string-), [allowLogin](/libraries/lock/v10/customization#allowlogin-boolean-), [allowSignUp](/libraries/lock/v10/customization#allowsignup-boolean-) and [allowForgotPassword](/libraries/lock/v10/customization#allowforgotpassword-boolean-) options.
- The `getClient` method is no longer available. You can, instead, simply instantiate `Auth0` when using functionality from `auth0.js`. If you need help with how to do this, see the [Lock 10 documentation](/libraries/lock#using-auth0-js).

---

## Changes to Customization Options
Some existing options suffered changes, in addition to the beforementioned removals and additions. Please see below for brief descriptions, or consult the [customization reference](/libraries/lock/v10/customization) for more information.

### Display Options
  - The `connections` option was renamed to [allowedConnections](/libraries/lock/v10/customization#allowedconnections-array-).
  - The `focusInput` option was renamed to [autofocus](/libraries/lock/v10/customization#autofocus-boolean-).  
  - The `gravatar` option was renamed to [avatar](/libraries/lock/v10/customization#avatar-object-) and instead of taking `true` and `false` it now takes `null` or an object.
  - The `dict` option was split into [language](/libraries/lock/v10/customization#language-string-) and [languageDictionary](/libraries/lock/v10/customization#languagedictionary-object-). The `language` option allows you to set the base dictionary for a given language and the `languageDictionary` option allows you to overwrite any translation. Also, the structure of the dictionary has been changed. 

### Theming Options
  - The `icon` option was renamed to [logo](/libraries/lock/v10/customization#logo-string-) and namespaced under `theme`. Now you use it like this `theme: {logo: "https://example.com/icon.png"}`.
  - The [primaryColor](/libraries/lock/v10/customization#primarycolor-string-) option was namespaced under `theme`. Now you use it like this `theme: {primaryColor: "#ec4889"}`.

### Social Options
  - The `socialBigButtons` option was renamed to [socialButtonStyle](/libraries/lock/v10/customization#socialbuttonstyle-string-) and its possible values are `"small"` or `"big"` instead of `true` or `false`.

### Authentication Options
  - The `authParams` option was renamed to [params](/libraries/lock/v10/customization#params-object-) and namespaced under `auth`. Now you use it like this `auth: {params: {myparam: "myvalue"}}`.
  - The `popup` option was replaced by [redirect](/libraries/lock/v10/customization#redirect-boolean-) which is namespaced under `auth`. If you previously used `popup: true` now you need to provide `auth: {redirect: false}`.
  - The `callbackURL` option was renamed to [redirectUrl](/libraries/lock/v10/customization#redirecturl-string-) and namespaced under `auth`. Now you use it like this `auth: {redirectUrl: "https://example.com/callback"}`.
  - The [responseType](/libraries/lock/v10/customization#responsetype-string-) option was namespaced under `auth`.  Now you use it like this `auth: {responseType: "code"}`.
  - The [sso](/libraries/lock/v10/customization#sso-boolean-) option was namespaced under `auth`.  Now you use it like this `auth: {sso: false}`.

### Database Options
  - The `disableResetAction` option was renamed to [allowForgotPassword](/libraries/lock/v10/customization#allowforgotpassword-boolean-).
  - The `disableSignUpAction` option was renamed to [allowSignUp](/libraries/lock/v10/customization#allowsignup-boolean-).
  - The `defaultUserPasswordConnection` option has been replaced by the [defaultDatabaseConnection](/libraries/lock/v10/customization#defaultdatabaseconnection-string-) and the [defaultEnterpriseConnection](/libraries/lock/v10/customization#defaultenterpriseconnection-string-) options.
  - The `resetLink` option was renamed to [forgotPasswordLink](/libraries/lock/v10/customization#forgotpasswordlink-string-).

### Other Options
  - The `forceJSONP` option was removed.

---

## Further Reading
  - Some other options were added, see [New Features page](/libraries/lock/v10/new-features) for details.
  - Check out the [customization page](/libraries/lock/v10/customization) for more details on all of the customization options that are available.
  - Take a look at the [api page](/libraries/lock/v10/api) for more details on Lock 10's API.

## Upgrading From Preview Releases

**This section is only pertinent if you are currently using a pre-release version of Lock 10, and wish to update to the release version.** It is a summary of what you absolutely need to know before upgrading between preview releases. For the full list of changes, please see the project's [CHANGELOG](https://github.com/auth0/lock/blob/master/CHANGELOG.md).

### Upgrading from v10.0.0-beta.1 to v10.0.0-beta.2

- Renamed `close` method to `hide`.
- Renamed `connections` option to `allowedConnections`.
- Renamed `signUp.footerText` dict key to `signUp.terms`.
- Requiring the npm package has been fixed, you need to `require('auth0-lock')` instead of `require('auth0-lock/lib/classic')`.

### Upgrading from v10.0.0-beta.2 to v10.0.0-beta.3

- The profile is no longer fetched automatically after a successful login. To obtain it you need to call `lock.getProfile` (see the examples above for the details).

### Upgrading from v10.0.0-beta.3 to v10.0.0-beta.4

- The `jsonp` option was removed.

### Upgrading from v10.0.0-beta.4 to v10.0.0-beta.5

- The constructor no longer takes a callback. See the examples above to learn how to use events instead.
- The `language` option has been added, and the structure of the `languageDictionary` option has been updated.

### Upgrading from v10.0.0-beta.5 to v10.0.0-rc.1

- No API changes were made in this release.
