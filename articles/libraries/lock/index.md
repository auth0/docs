---
url: /libraries/lock
---

![Auth0 Lock 10](/media/articles/libraries/lock/lock-10.png)

<%= include('/_includes/_lock-version') %>

[Auth0][auth0-main] is an authentication broker that supports social identity providers as well as enterprise identity providers such as Active Directory, LDAP, Google Apps, and Salesforce.

Lock makes it easy to integrate SSO in your app. You won't have to worry about:

* Having a professional login dialog that displays well at any resolution on any device
* Finding the proper icons for popular social providers
* Remembering which identity provider the user chose on their last login
* Solving the home realm discovery challenge with enterprise users (having to ask enterprise users for their email, and then attempting to redirect to the correct enterprise identity provider)
* Implementing a standard sign in protocol (OpenID Connect / OAuth2 Login)

## Lock 10 Installation

You can install Lock 10 via several methods. Select any of the following installation sources that best suit your environment and application.

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

**NOTE**: Replace `.x` and `.y` with the latest minor and patch release numbers from the [Lock Github repository](https://github.com/auth0/lock) for production environments.

### Mobile

If you are targeting mobile audiences, Auth0 recommendeds that you add the following meta tag to your application's `head`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
```

### Bundling Dependencies

If you are using browserify or webpack to build your project and bundle its dependencies, after installing the `auth0-lock` module, you will need to bundle it with all its dependencies. Examples are available for [Browserify][example-browserify] and [webpack][example-webpack].

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

### Showing Lock

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

**NOTE**: This example demonstrates using Lock 10 with a Single Page Application (SPA). To learn how Lock can be modified to provide frictionless authentication for any app, see the [API Reference][lock-api] and [Customization Reference][lock-customization].

## API Reference

The [API Reference][lock-api] provides comprehensive documentation of the API and its available methods. The [Customization Reference][lock-customization] details all available options for customizing Lock to meet your specific needs.

## Using auth0.js

If you try to use `auth0.js` along with Lock 10, you will not be able to call `getClient()`. Instead, you should instantiate a second `Auth0` object.

If you included the script from the Auth0 CDN or installed Lock from bower, you only need to instantiate the `Auth0` object to use Lock (see below). 

If you installed Lock from npm, you must include `auth0-js` in your project dependencies and import it. Before instantiating the `Auth0` object, you will need to require `auth0-js`:

```js
var Auth0 = require('auth0-js');
```

Then, to use `auth0.js`, simply instantiate a new `Auth0` object:

```js
var client = new Auth0({
  domain:       '${account.namespace}',
  clientID:     '${account.clientId}',
  callbackURL:  '{YOUR APP URL}',
  callbackOnLocationHash: true
});
```

## Start using Lock

${lockSDK}

## Browser Compatibility

Browser compatibility is ensured for **Chrome**, **Safari**, **Firefox** and **IE >= 9**. Auth0 currently uses [zuul](https://github.com/defunctzombie/zuul) along with [Saucelabs](https://saucelabs.com) to run integration tests on each push.

## Issue Reporting

If you find a bug or have a feature request, report them in Github at [Auth0 Lock Issues](https://github.com/auth0/lock/issues). However, do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Resources

* [Lock 9 to Lock 10 Migration Guide][migration-guide]
* [Complete API][lock-api]
* [Embedding Lock (Instead of a Modal)][display-modes]
* [i18n - Languages and Custom Text][i18n-notes]
* [Popup Mode][popup-mode] - an advanced option (not recommended in most cases)
* [Development][development-notes notes]
* [Release process][release-process notes]
* [Migration guide][legacy-migration-guide] for users of the legacy **Auth0 Widget**

<!-- Variables-->

[auth0-main]: https://auth0.com
[playground-url]: http://auth0.github.com/playground
[migration-guide]: /libraries/lock/v10/migration-guide
[new-features]: /libraries/lock/v10/new-features
[example-browserify]: https://github.com/auth0/lock/tree/master/examples/bundling/browserify
[example-webpack]: https://github.com/auth0/lock/tree/master/examples/bundling/webpack
[lock-customization]: /libraries/lock/v10/customization
[lock-api]: /libraries/lock/v10/api
[display-modes]: /libraries/lock/v10/customization#container
[development-notes]: https://github.com/auth0/lock
[release-process]: https://github.com/auth0/lock
[sending-authentication-parameters]: /libraries/lock/v10/sending-authentication-parameters
[legacy-migration-guide]: /libraries/lock/v9/migration-guide
[i18n-notes]: /libraries/lock/v10/i18n
[popup-mode]: /libraries/lock/v10/popup-mode
