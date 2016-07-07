---
url: /libraries/lock/v10
---

::: panel-info Lock Version
Heads up! This document is using the latest version of Lock (version 10). See changes from the old version in the [new features](/libraries/lock/v10/new-features) page, see a learn how to migrate from version 9 to version 10 in the [migration guide](/libraries/lock/v10/migration-guide), or see the [Lock 9 Documentation](/libraries/lock/v9) if you're looking for information about Lock 9.
:::

[![Auth0](https://cloudup.com/c2evgl2cz3j+)](http://auth0.com)

[Auth0][auth0-main] is an authentication broker that supports social identity providers as well as enterprise identity providers such as Active Directory, LDAP, Google Apps, Salesforce.

Lock makes it easy to integrate SSO in your app. You won't have to worry about:

* Having a professional looking login dialog that displays well on any resolution and device.
* Finding the right icons for popular social providers.
* Remembering what was the identity provider the user chose the last time.
* Solving the home realm discovery challenge with enterprise users (having to ask enterprise users for their email, and then attempt to redirect to the right enterprise identity provider).
* Implementing a standard sign in protocol (OpenID Connect / OAuth2 Login)

> You can try it out yourself online at our [Auth0 Lock playground][playground-url].

::: panel-info Lock 9.x Users 
If you area Lock 9 user, please check here about [how to upgrade to Lock 10][migration-guide], or here for more detailed information on [new features in Lock 10][new-features].
:::

## What's New

* Lock now uses Redirect Mode by default. To use Popup Mode, you must enable this explicitly.
* The Lock Public API has been updated so there are not significant differences between Redirect and Popup Mode. This makes Redirect Mode, which is the recommended mode, much easier to use. Also, related options are grouped together.
* The current release candidate of Lock does not support as many foreign languages as the previous version. You can still translate the widget via `languageDictionary`.
* You can create simple Lock themes using JavaScript to via `primaryColor` and `logo` properties of the `theme` option. You may also make customizations with CSS.
* The improved Lock UX comes with smoother transitions and animations and is keyboard friendly.
* Lock comes with support for pre-filled fields and custom avatar implementations.
* Lock comes with support for custom sign up fields.

Please see [New Features in Lock 10](/libraries/lock/v10/new-features) for additional information.

## Installation and Dependencies

### Installation Sources

You can install Lock via a variety of methods. Pick one of the following that best suits your environment and appliation:

Install via [npm](https://npmjs.org):

```sh
npm install auth0-lock
```

Install via [bower](http://bower.io):

```sh
bower install auth0-lock
```

Include via our CDN:

```html
<!-- Latest minor release -->
<script src="http://cdn.auth0.com/js/lock/10.x/lock.min.js"></script>

<!-- Latest patch release (recommended for production) -->
<script src="http://cdn.auth0.com/js/lock/10.x.y/lock.min.js"></script>
```

Replace `.x` and `.y` with the latest minor and patch release numbers from the [Lock Github repository](https://github.com/auth0/lock).

### Mobile

If you are targeting mobile audiences, it's recommended that you add the following meta tag to your application's `head`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
```

### Bundling Dependencies

If using browserify or webpack to build your project and bundle its dependencies, after installing the `auth0-lock` module, you'll need bundle it up along with all of its dependencies. We have examples for [browserify][example-browserify] and [webpack][example-webpack].

## Usage

You can use **Auth0Lock** with [Redirect mode][redirect-mode] or [Popup mode][popup-mode], but Redirect mode is the recommended mode for most use cases. To learn more about these modes, you can read the [Authentication Modes][authentication-modes] page.

### Implementing Lock
```js
var lock = new Auth0Lock(
  'YOUR_CLIENT_ID',
  'YOUR_NAMESPACE'
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

```js
document.getElementById('btn-login').addEventListener('click', function() {
  lock.show();
});
```

### Displaying the User's Profile

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

This is just one example of how **Lock 10** could work with a **Single Page Application** (_SPA_). Read the [Authentication modes][authentication-modes] page for more details on different authentication modes, and how to implement them in different types of applications such as Single Page Applications (SPA) or Regular Web Applications.

## API Reference

The [API reference][lock-api] provides more comprehensive documentation of the API and its various available methods, and the [Customization reference][lock-customization] details out the different options that you have for customizing Lock to meet your specific needs.

## Examples

The **example** directory has a ready-to-go app. In order to run it you need [node](http://nodejs.org/) installed.

Then execute `npm i` to install dependencies (only once) and `npm example` from the root of this project.

Finally, point your browser at `http://localhost:3000/` and play around.

## Browser Compatibility

We ensure browser compatibility in `Chrome`, `Safari`, `Firefox` and `IE >= 9`. We currently use [zuul](https://github.com/defunctzombie/zuul) along with [Saucelabs](https://saucelabs.com) to run integration tests on each push.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Resources

* [Lock 9 to Lock 10 Migration Guide][migration-guide]
* [Complete API][lock-customization]
* [UI customization][ui-customization]
* [Overlay vs Embedded mode][display-modes]
* [Popup vs Redirect mode][authentication-modes] notes. **What are the authentication modes?**.
* [Error customization][error-customization] notes.
* [I18n][i18n-notes] notes.
* [Events][events-notes] notes.
* [Development][development-notes] notes.
* [Release process][release-process] notes.
* [Auth0Lock playground][playground-url]
* [Lock Authentication Parameters][sending-authentication-parameters]
* [Using Refresh Tokens](/libraries/lock/using-a-refresh-token)
* Legacy **Auth0Widget** [Migration guide][legacy-migration-guide] to **Auth0Lock**

## Start using Auth0Lock

${lockSDK}

<!-- Vaaaaarrsss -->

[auth0-main]: https://auth0.com
[playground-url]: http://auth0.github.com/playground
[migration-guide]: /libraries/lock/v10/migration-guide
[new-features]: /libraries/lock/v10/new-features
[example-browserify]: https://github.com/auth0/lock/blob/v10/examples/bundling/browserify
[example-webpack]: https://github.com/auth0/lock/blob/v10/examples/bundling/webpack
[authentication-modes]: /libraries/lock/v10/authentication-modes
[popup-mode]: /libraries/lock/v10/authentication-modes#popup-mode
[redirect-mode]: /libraries/lock/v10/authentication-modes#redirect-mode
[lock-customization]: /libraries/lock/v10/customization
[lock-api]: /libraries/lock/v10/api.md
[ui-customization]: /libraries/lock/v10/ui-customization
[display-modes]: /libraries/lock/v10/display-modes
[error-customization]: /libraries/lock/v10/customizing-error-messages
[i18n-notes]: /libraries/lock/v10/i18n
[events-notes]: /libraries/lock/v10/events
[development-notes]: https://github.com/auth0/lock
[release-process]: https://github.com/auth0/lock
[sending-authentication-parameters]: /libraries/lock/sending-authentication-parameters
[legacy-migration-guide]: /libraries/lock/legacy-migration-guide
