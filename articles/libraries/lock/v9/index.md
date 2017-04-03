---
section: libraries
description: Lock V9 documentation
title: Lock 9 for Web
toc: true
---

<%= include('../_includes/_lock-version-9') %>

# Lock 9 for Web

![Lock Image](/media/articles/libraries/lock/v9/lock-landing.png)

[Auth0](https://auth0.com) is an authentication broker that supports social identity providers as well as enterprise identity providers such as Active Directory, LDAP, Google Apps, Salesforce.

Lock makes it easy to integrate SSO in your app. You won't have to worry about:

* Having a professional looking login dialog that displays well on any resolution and device.
* Finding the right icons for popular social providers.
* Remembering what was the identity provider the user chose the last time.
* Solving the home realm discovery challenge with enterprise users (i.e.: asking the enterprise user the email, and redirecting to the right enterprise identity provider).
* Implementing a standard sign in protocol (OpenID Connect / OAuth2 Login)

![Lock Sign Up](/media/articles/libraries/lock/v9/lock-signup.png)

> You can try it out yourself online at our [Auth0 Lock playground][playground-url].

## Install

From [npm](https://npmjs.org):

```sh
npm install auth0-lock
```

From [bower](http://bower.io):

```sh
bower install auth0-lock
```

Or our CDN:

```html
<!-- Latest major release -->
<script src="http://cdn.auth0.com/js/lock-9.min.js"></script>

<!-- Latest minor release -->
<script src="http://cdn.auth0.com/js/lock-9.x.min.js"></script>

<!-- Latest patch release (recommended for production) -->
<script src="http://cdn.auth0.com/js/lock-9.x.y.min.js"></script>
```

Replace `.x` and `.y` with the latest minor and patch release numbers from the [Lock Github repository](https://github.com/auth0/lock).

If you are targeting mobile audiences, it's recommended that you add:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
```

### Browserify

If you are using browserify to build your project, you will need to add the following transformations required by Auth0 Lock:

``` json
{
  "devDependencies": {
    "brfs": "0.0.8",
    "ejsify": "0.1.0",
    "packageify": "^0.2.0"
  }
}
```


## Usage

You can use **Auth0Lock** with [Popup mode][popup-mode] or [Redirect mode][redirect-mode]. To learn more about these modes, you can read the [Authentication Modes][authentication-modes] page.
There are different ways of implementing them according to your application needs. To see what kind of settings you should be using you can check the [Types of Applications article][application-types].

```js
// Initialize Auth0Lock with your `clientID` and `domain`
var lock = new Auth0Lock('xxxxxx', '<account>.auth0.com');

// and deploy it
var login = document.querySelector('a#login')

login.onclick = function (e) {
  e.preventDefault();
  lock.show(function onLogin(err, profile, id_token) {
    if (err) {
      // There was an error logging the user in
      return alert(err.message);
    }

    // User is logged in
  });
};
```

This is just one example of how **Auth0Lock** could work with a **Single Page Application** (_SPA_). Read the [Single Page Applications][spa-notes] and the [Regular Web Applications][webapps-notes] articles for a full explanation on how to implement those scenarios with Auth0 Lock and when to use each.


## API

### Auth0Lock(clientID, domain[, options])

Initialize `Auth0Lock` with a `clientID` and the account's `domain`.

```js
var lock = new Auth0Lock('xxxxxx', '<account>.auth0.com');
```

> Note: For a full detail on options and parameters you can check the [Auth0Lock initialization][lock-initialization] wiki notes.


### .show([options, callback])

Open the widget on `signin` mode with `signup` and `reset` button actions if enabled for the configured/default account connection.

You may call this method with a single parameter, two or even none. The following examples ilustrate this:

```js
var lock = new Auth0Lock('xxxxxx', '<account>.auth0.com');

// using defaults and resolved configuration
// from you account details
lock.show();

// passing some options
lock.show(options);

// provide with a callback `fn` to be invoked
// at success or error authentication
lock.show(function (err, profile, token) {});

// or both options and callback
lock.show(options, function (err, profile, token) {});

```

> Check the [Auth0Lock customization][lock-customization] article for more examples and options specification. Or enter the [Authentication modes][application-types] notes to learn more about implementing different authentication mechanics.

### .showSignin([options, callback])

Open the widget on `signin` mode, but without the bottom `signup` nor `reset` button actions. This method is useful when your site has custom *signup* and *reset* links at a different form.

You may call this method with a single parameter, two or even none. The following examples ilustrate this:

```js
var lock = new Auth0Lock('xxxxxx', '<account>.auth0.com');

// using defaults and resolved configuration
// from you account details
lock.showSignin();

// passing some options
lock.showSignin(options);

// provide with a callback `fn` to be invoked
// on `reset` success or error
lock.showSignin(function (err, profile, token) {});

// or both options and callback
lock.showSignin(options, function (err, profile, token) {});
```
> Check the [Auth0Lock customization][lock-customization] article for more examples and options specification. Or enter the [Authentication modes][application-types] notes to learn more about implementing different authentication mechanics.


### .showSignup([options, callback])

Open the widget on `signup` mode, but without the `cancel` button action to go back to `signin`. This method is useful when your site has custom *signin* and *reset* links at a different form.

You may call this method with a single parameter, two or even none. The following examples ilustrate this:

```js
var lock = new Auth0Lock('xxxxxx', '<account>.auth0.com');

// using defaults and resolved configuration
// from you account details
lock.showSignup();

// passing some options
lock.showSignup(options);

// provide with a callback `fn` to be invoked
// on `reset` success or error
lock.showSignup(function (err) {});

// or both options and callback
lock.showSignup(options, function (err) {});
```
> Check the [Auth0Lock customization][lock-customization] article for more examples and options specification. Or enter the [Authentication modes][application-types] notes to learn more about implementing different authentication mechanics.


### .showReset([options, callback])

Open the widget on `reset` mode, but without the bottom `cancel` button action to go back to `signin`.  This method is useful when your site has custom *signin* and *signup* links at a different form.

You may call this method with a single parameter, two or even none. The following examples ilustrate this:

```js
var lock = new Auth0Lock('xxxxxx', '<account>.auth0.com');

// using defaults and resolved configuration
// from you account details
lock.showReset();

// passing some options
lock.showReset(options);

// provide with a callback `fn` to be invoked
// on `reset` success or error
lock.showReset(function (err) {});

// or both options and callback
lock.showReset(options, function (err) {});
```
> Check the [Auth0Lock customization][lock-customization] article for more examples and options specification. Or enter the [Authentication modes][application-types] notes to learn more about implementing different authentication mechanics.


### .hide([callback])

Close the widget and invoke `callback` when removed from DOM.

```js
var lock = new Auth0Lock('xxxxxx', '<account>.auth0.com');

// normal display
lock.show(options);

// trigger hide when esc key pressed
document.addEventListener('keypress', function(e) {
  // hide if esc
  lock.hide();
}, false);
```

### .logout([query])

Log out loggedin user with optional query parameters for the `GET` request.

```js
var lock = new Auth0Lock('xxxxxx', '<account>.auth0.com');

// Call logout with query parameters
lock.logout({ ref: window.location.href });
```

## Examples

The **example** directory has a ready-to-go app. In order to run it you need [node](http://nodejs.org/) installed.

Then execute `npm i` to install dependencies (only once) and `npm example` from the root of this project.

Finally, point your browser at `http://localhost:3000/` and play around.

## Browser Compatibility

We ensure browser compatibility in `Chrome`, `Safari`, `Firefox` and `IE >= 9`. We currently use [zuul](https://github.com/defunctzombie/zuul) along with [Saucelabs](https://saucelabs.com) to run integration tests on each push.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Resources

* [Complete API][lock-customization]
* [UI customization][ui-customization]
* [Single Page Applications][spa-notes] implementation notes.
* [Regular Web Applications][webapps-notes] implementing notes.
* [Overlay vs Embedded mode][display-modes]
* [Popup vs Redirect mode][authentication-modes] notes. **What are the authentication modes?**.
* [Error customization][error-customization] notes.
* [I18n][i18n-notes] notes.
* [Events][events-notes] notes.
* [Development][development-notes] notes.
* [Release process][release-process] notes.
* [Auth0Lock playground][playground-url]
* [Lock Authentication Parameters][sending-authentication-parameters]
* [Using Refresh Tokens](/libraries/lock/v9/using-a-refresh-token)
* Legacy **Auth0Widget** [Migration guide][migration-guide] to **Auth0Lock**

<!-- Vaaaaarrsss -->

[download1]: https://raw.github.com/auth0/lock/master/build/auth0-lock.js
[download2]: https://raw.github.com/auth0/lock/master/build/auth0-lock.min.js

[npm-image]: https://img.shields.io/npm/v/auth0-lock.svg?style=flat-square
[npm-url]: https://npmjs.org/package/auth0-lock
[strider-image]: https://ci.auth0.com/auth0/lock/badge
[strider-url]: https://ci.auth0.com/auth0/lock
[coveralls-image]: https://img.shields.io/coveralls/auth0/lock.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/auth0/lock?branch=master
[david-image]: http://img.shields.io/david/auth0/lock.svg?style=flat-square
[david-url]: https://david-dm.org/auth0/lock
[license-image]: http://img.shields.io/npm/l/auth0-lock.svg?style=flat-square
[license-url]: https://github.com/auth0/lock/blob/master/LICENSE
[downloads-image]: http://img.shields.io/npm/dm/auth0-lock.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/auth0-lock

[lock-initialization]: /libraries/lock/v9/initialization
[lock-customization]: /libraries/lock/v9/customization
[application-types]: /libraries/lock/v9/types-of-applications
[display-modes]: /libraries/lock/v9/display-modes
[spa-notes]: /libraries/lock/v9/types-of-applications#single-page-app
[webapps-notes]: /libraries/lock/v9/types-of-applications#regular-webapp
[authentication-modes]: /libraries/lock/v9/authentication-modes
[popup-mode]: /libraries/lock/v9/authentication-modes#popup-mode
[redirect-mode]: /libraries/lock/v9/authentication-modes#redirect-mode
[ui-customization]: /libraries/lock/v9/ui-customization
[error-customization]: /libraries/lock/v9/customizing-error-messages
[i18n-notes]: /libraries/lock/v9/i18n
[events-notes]: /libraries/lock/v9/events
[development-notes]: https://github.com/auth0/lock
[release-process]: https://github.com/auth0/lock
[playground-url]: http://auth0.github.com/playground
[sending-authentication-parameters]: /libraries/lock/v9/sending-authentication-parameters
[migration-guide]: /libraries/lock/v9/migration-guide
