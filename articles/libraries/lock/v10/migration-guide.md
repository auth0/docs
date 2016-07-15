::: panel-info Lock Version
Heads up! This document is using the latest version of Lock (version 10). See changes from the old version in the [new features](/libraries/lock/v10/new-features) page, see a learn how to migrate from version 9 to version 10 in the [migration guide](/libraries/lock/10/migration-guide), or see the [Lock 9 Documentation](/libraries/lock/v9) if you're looking for information about Lock 9.
:::

# Lock 9 to Lock 10 Migration Guide

The following instructions assume you are migrating from Lock 9 to the latest Lock 10. If you are upgrading from a preview release, please refer to the [preview changes](#preview-changes).

- The `show` method no longer takes any arguments. You pass the options to the constructor and you listen for an `authenticated` event instead of providing a callback. The examples above show how to listen for this event with the `on` method.
- The `authenticated` event listener has a single argument, an `authResult` object. This object contains the following properties: `idToken`, `accessToken`, `state`, `refreshToken` and `idTokenPayload`. Most of them correspond to the arguments passed to the `show` method's callback.
- The profile is no longer fetched automatically after a successful login, you need to call `lock.getProfile`.
- Lock now uses Redirect Mode by default. To use Popup Mode, you must enable this explicitly with the `auth: { redirect: false }` option.
- You no longer need to call `parseHash` when implementing Redirect Mode. The data returned by that method is provided to the `authenticated` event listener.
- Not all languages supported by Lock v9 are supported by Lock v10.
- The `showSignin`, `showSignup` and `showReset` methods are no longer available. You can emulate the behavior of this options with the `initialScreen`, `allowLogin`, `allowSignUp` and `allowForgotPassword` options.
- Some existing options suffered changes:
  - The `authParams` option was renamed to `params` and namespaced under `auth`. Now you use it like this `auth: {params: {myparam: "myvalue"}}`.
  - The `callbackURL` option was renamed to `redirectUrl` and namespaced under `auth`. Now you use it like this `auth: {redirectUrl: "https://example.com/callback"}`.
  - The `connections` option was renamed to `allowedConnections`.
  - The `defaultUserPasswordConnection` option has been replaced by the `defaultDatabaseConnection` and the `defaultEnterpriseConnection` options.
  - The `dict` option was split into `language` and `languageDictionary`. The `language` option allows you to set the base dictionary for a given language and the `languageDictionary` option allows you to overwrite any translation. Also the structure of the dictionary has been changed, see the project's [README](https://github.com/auth0/lock/tree/v10#language-dictionary-specification) for more information.
  - The `disableResetAction` option was renamed to `allowForgotPassword`.
  - The `disableSignUpAction` option was renamed to `allowSignUp`.
  - The `focusInput` option was renamed to `autofocus`.
  - The `forceJSONP` option was removed.
  - The `gravatar` option was renamed to `avatar` and instead of taking `true` and `false` it now takes `null` or an object. See the [New Features page](/libraries/lock/v10/new-features#custom-avatar-provider) for details.
  - The `icon` option was renamed to `logo` and namespaced under `theme`. Now you use it like this `theme: {logo: "https://example.com/icon.png"}`.
  - The `popup` option was replaced by `redirect` which is namespaced under `auth`. If you previously used `popup: true` now you need to provide `auth: {redirect: false}`.
  - The `primaryColor` option was namespaced under `theme`. Now you use it like this `theme: {primaryColor: "#ec4889"}`.
  - The `resetLink` option was renamed to `forgotPasswordLink`.
  - The `responseType` option was namespaced under `auth`.  Now you use it like this `auth: {responseType: "code"}`.
  - The `socialBigButtons` option was renamed to `socialButtonStyle` and its possible values are `"small"` or `"big"` instead of `true` or `false`.
  - The `sso` option was namespaced under `auth`.  Now you use it like this `auth: {sso: false}`.
- Some other options were added, see [New Features page](/libraries/lock/v10/new-features) for details.


## Upgrading Between (or From) Preview Releases

This is a summary of what you absolutely need to know before upgrading between preview releases. For the full list of changes, please see the project's [CHANGELOG](https://github.com/auth0/lock/blob/v10/CHANGELOG.md).

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