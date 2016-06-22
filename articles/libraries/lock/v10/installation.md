## Migrating to Lock 10

::: panel-warning Version Notice
Because this is an early preview of Lock 10, we recommend installing the full version (10.0.0-rc.1).
:::

You can get the required Lock installation package from several sources.

CDN:

```html
<script src="https://cdn.auth0.com/js/lock/10.0.0-rc.1/lock.min.js"></script>
```

[Bower](http://bower.io):

```sh
bower install auth0-lock#10.0.0-rc.1
```

```html
<script src="bower_components/auth0-lock/build/lock.min.js"></script>
```

[npm](https://npmjs.org):

```sh
npm install --save auth0-lock@rc
```

After installing the `auth0-lock` module, you will need bundle it up. We have examples for [browserify](https://github.com/auth0/lock/tree/v10/examples/bundling/browserify) and [webpack](https://github.com/auth0/lock/tree/v10/examples/bundling/webpack).

If you are targeting mobile audiences, we recommend adding the following to the `head` element of your HTML:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
```

## Usage

If you have used Lock in the past you may also want to take a look at the [Migration Guide](#migration-guide). Otherwise, you can keep reading. The full [API documentation](https://github.com/auth0/lock/tree/v10#api) is also available in the [github repository](https://github.com/auth0/lock/tree/v10).

### Implementing Lock with Redirect Mode

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

### Implementing Lock with Popup Mode

__Note:__ Auth0 recommends using Redirect Mode over Popup Mode.

To implement Popup Mode in lieu of Redirect Mode, pass `false` to the auth `redirect` parameter:

```js
var lock = new Auth0Lock(
  '${account.clientId}',
  '${account.namespace}',
  {
    auth: { redirect: false }
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

### Showing the Lock

Call the `show` method to display the widget.

```js
document.getElementById('btn-login').addEventListener('click', function() {
  lock.show();
});
```

### Displaying the User's Profile

Use the `idToken` and `profile` you've saved in `localStorage` to display the user's profile. This method also keeps the user logged in after a page refresh.

```js
// Verify that there's a token in localStorage
var idToken = localStorage.getItem('idToken');
if (idToken) {
  showLoggedIn();
}

// Display the user's profile
function showLoggedIn() {
  var profile = JSON.parse(localStorage.getItem('profile'));
  document.getElementById('nick').textContent = profile.nickname;
}
```

```html
 <h2>Welcome <span id="nick" class="nickname"></span></h2>
```

## Migration Guide

The following instructions assume you are migrating from Lock v9 to the latest v10 preview. If you are upgrading from a preview release, please refer to the [preview changes](#preview-changes).

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

### Preview changes

This is a summary of what you absolutely need to know before upgrading between preview releases. For the full list of changes, please see the project's [CHANGELOG](https://github.com/auth0/lock/blob/v10/CHANGELOG.md).

#### Upgrading from v10.0.0-beta.1 to v10.0.0-beta.2

- Renamed `close` method to `hide`.
- Renamed `connections` option to `allowedConnections`.
- Renamed `signUp.footerText` dict key to `signUp.terms`.
- Requiring the npm package has been fixed, you need to `require('auth0-lock')` instead of `require('auth0-lock/lib/classic')`.

#### Upgrading from v10.0.0-beta.2 to v10.0.0-beta.3

- The profile is no longer fetched automatically after a successful login. To obtain it you need to call `lock.getProfile` (see the examples above for the details).

#### Upgrading from v10.0.0-beta.3 to v10.0.0-beta.4

- The `jsonp` option was removed.

#### Upgrading from v10.0.0-beta.4 to v10.0.0-beta.5

- The constructor no longer takes a callback. See the examples above to learn how to use events instead.
- The `language` option has been added, and the structure of the `languageDictionary` option has been updated.

#### Upgrading from v10.0.0-beta.5 to v10.0.0-rc.1

- No API changes were made in this release.
