---
url: /libraries/lock
---

::: panel-info Lock Version
Heads up! This document is using the latest version of Lock (version 10). See changes from the old version in the [new features](/libraries/lock/v10/new-features) page, see a learn how to migrate from version 9 to version 10 in the [migration guide](/libraries/lock/v10/migration-guide), or see the [Lock 9 Documentation](/libraries/lock/v9) if you're looking for information about Lock 9.
:::

[![Auth0](https://cloudup.com/c2evgl2cz3j+)](http://auth0.com)

[Auth0][auth0-main] is an authentication broker that supports social identity providers as well as enterprise identity providers such as Active Directory, LDAP, Google Apps, Salesforce.

Lock makes it easy to integrate SSO in your app. You won't have to worry about:

* Having a professional looking login dialog that displays well at any resolution and on any device
* Finding the right icons for popular social providers
* Remembering what identity provider the user chose on their last login
* Solving the home realm discovery challenge with enterprise users (having to ask enterprise users for their email, and then attempting to redirect to the right enterprise identity provider)
* Implementing a standard sign in protocol (OpenID Connect / OAuth2 Login)

## Installation and Dependencies

Let's get started with Lock! You can install Lock 10 via several methods. Pick one of the following installation sources; whichever best suits your environment and appliation.

### Installation Sources

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
<script src="${widget_url}"></script>

<!-- Latest patch release (recommended for production) -->
<script src="http://cdn.auth0.com/js/lock/10.x.y/lock.min.js"></script>
```

_Replace `.x` and `.y` with the latest minor and patch release numbers from the [Lock Github repository](https://github.com/auth0/lock) for production environments_

### Mobile

If you are targeting mobile audiences, it's recommended that you add the following meta tag to your application's `head`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
```

### Bundling Dependencies

If using browserify or webpack to build your project and bundle its dependencies, after installing the `auth0-lock` module, you'll need bundle it up along with all of its dependencies. We have examples for [Browserify][example-browserify] and [webpack][example-webpack].

## Usage

### Implementing Lock

```js
// Initiating our Auth0Lock
var lock = new Auth0Lock(
  '${account.clientId}',
  '${account.namespace}'
);

// Listening for the authenticated event
lock.on("authenticated", function(authResult) {
  // Use the token in authResult to getProfile() and save it to localStorage
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

### Showing the Lock

```js
document.getElementById('btn-login').addEventListener('click', function() {
  lock.show();
});
```

### Displaying the User's Profile

```js
// Verify that there's a token in localStorage
var token = localStorage.getItem('idToken');
if (token) {
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

This is just one example of how **Lock 10** could work with a **Single Page Application** (_SPA_). Take a look at our [API reference][lock-api] and [customization options][lock-customization] to see how Lock can be adjusted to provide frictionless authentication for your app!

## API Reference

The [API reference][lock-api] provides more comprehensive documentation of the API and its various available methods, and the [Customization reference][lock-customization] details out the different options that you have for customizing Lock to meet your specific needs.

## Examples

The **example** directory has a ready-to-go app. In order to run it you need [node](http://nodejs.org/) installed.

Then execute `npm i` to install dependencies (only once) and `npm example` from the root of this project.

Finally, point your browser at `http://localhost:3000/` and play around.


## Using auth0.js

When using functionality from auth0.js, instead of using `getClient()`, for example, you can simply instantiate a new Auth0 object and use plain auth0.js.

```js
var auth0 = new Auth0({
  domain:       '${account.namespace}',
  clientID:     '${account.clientId}',
  callbackURL:  '{YOUR APP URL}',
  callbackOnLocationHash: true
});
```

## Browser Compatibility

We ensure browser compatibility in `Chrome`, `Safari`, `Firefox` and `IE >= 9`. We currently use [zuul](https://github.com/defunctzombie/zuul) along with [Saucelabs](https://saucelabs.com) to run integration tests on each push.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Resources

* [Lock 9 to Lock 10 Migration Guide][migration-guide]
* [Complete API][lock-api]
* [Embedding Lock (Instead of a Modal)][display-modes]
* [i18n][i18n-notes] notes. **Languages and Custom Text**
* [Popup Mode][popup-mode] is an advanced option and is not recommended for most use cases
* [Development][development-notes] notes.
* [Release process][release-process] notes.
* [Migration guide][legacy-migration-guide] for users of the Legacy **Auth0Widget** to migrate to **Auth0Lock**

<!-- Variables-->

[auth0-main]: https://auth0.com
[playground-url]: http://auth0.github.com/playground
[migration-guide]: /libraries/lock/v10/migration-guide
[new-features]: /libraries/lock/v10/new-features
[example-browserify]: https://github.com/auth0/lock/blob/v10/examples/bundling/browserify
[example-webpack]: https://github.com/auth0/lock/blob/v10/examples/bundling/webpack
[lock-customization]: /libraries/lock/v10/customization
[lock-api]: /libraries/lock/v10/api
[display-modes]: /libraries/lock/v10/customization#container
[development-notes]: https://github.com/auth0/lock
[release-process]: https://github.com/auth0/lock
[sending-authentication-parameters]: /libraries/lock/v10/sending-authentication-parameters
[legacy-migration-guide]: /libraries/lock/v9/migration-guide
[i18n-notes]: /libraries/lock/v10/i18n
[popup-mode]: /libraries/lock/v10/popup-mode
