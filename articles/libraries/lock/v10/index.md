---
section: libraries
toc: true
title: Lock 10 for Web
description: A widget that provides a frictionless login and signup experience for your web apps.
img: media/articles/libraries/lock-web.png
---
# Lock 10 for Web

Lock is an embeddable login form, [configurable to your needs][lock-customization] and ready for use on web apps. It enables you to easily add social identity providers to Lock, allowing your users to login seamlessly using any provider they want.

::: note
Lock is also available for use within Auth0's [Hosted Login Page](/hosted-pages/login), which is the simplest and most secure method by which to authenticate users for your applications.
:::

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

Include via our CDN (Replace `.x` and `.y` with the latest minor and patch release numbers from the [Lock Github repository](https://github.com/auth0/lock)):

```html
<!-- Latest minor release -->
<script src="https://cdn.auth0.com/js/lock/10.x/lock.min.js"></script>

<!-- Latest patch release (recommended for production) -->
<script src="https://cdn.auth0.com/js/lock/10.x.y/lock.min.js"></script>
```

::: note
It is recommended that production applications use a specific patch version, or at the very least a specific minor version. Regardless of the method by which Lock is included, the recommendation is that the version should be locked down and only manually updated, to ensure that those updates do not adversely affect your implementation.
:::

### Mobile

If you are targeting mobile audiences, Auth0 recommends that you add the following meta tag to your application's `head`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1"/>
```

### Bundling Dependencies

If you are using browserify or webpack to build your project and bundle its dependencies, after installing the `auth0-lock` module, you will need to bundle it with all its dependencies. Examples are available for [Browserify][example-browserify] and [webpack][example-webpack].

## Usage

### 1. Initializing Lock

First, you'll need to initialize a new `Auth0Lock` object, and provide it with your Auth0 client ID (the unique client ID for each Auth0 client app, which you can get from the [management dashboard](${manage_url})) and your Auth0 domain (i.e. `jeffstest.auth0.com`).

```js
// Initializing our Auth0Lock
var lock = new Auth0Lock(
  '${account.clientId}',
  '${account.namespace}'
);
```

## 2. Authenticating and Getting User Info

Next, listen using the `on` method for the `authenticated` event. When the event occurs, use the `accessToken` which was received to call the `getUserInfo` method and acquire the user's profile information (as needed). You can also save the token or profile to `localStorage` for later use.

```js
// Listening for the authenticated event
lock.on("authenticated", function(authResult) {
  // Use the token in authResult to getUserInfo() and save it to localStorage
  lock.getUserInfo(authResult.accessToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }

    document.getElementById('nick').textContent = profile.nickname;

    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('profile', JSON.stringify(profile));
  });
});
```

You can then manipulate page content and display profile information to the user (for example, displaying their name in a welcome message).

```html
 <h2>Welcome <span id="nick" class="nickname"></span></h2>
```

::: note
Note that if you are storing the user profile, you will want to `JSON.stringify` the profile object and then, when using it later, `JSON.parse` it, because it will need to be stored in `localStorage` as a string rather than a JSON object.
:::

### 3. Showing Lock

Here you're showing the Lock widget after the user clicks a login button; you can just as easily show Lock automatically when arriving at a page by just using `lock.show();` on page load.

This will show the Lock widget, and paired with the above, you're now ready to handle logins!

```js
document.getElementById('btn-login').addEventListener('click', function() {
  lock.show();
});
```

## Browser Compatibility

Browser compatibility is ensured for **Chrome**, **Safari**, **Firefox** and **IE >= 10**. Auth0 currently uses [zuul](https://github.com/defunctzombie/zuul) along with [Saucelabs](https://saucelabs.com) to run integration tests on each push.

## Next Steps

This document has shown how to use Lock 10 within a Single Page Application (SPA). Take a look at the following resources to see how Lock can be used with other kinds of web apps, or how it can be customized for your needs:

::: next-steps
* [Lock v10 API Reference][lock-api]
* [Lock Configuration Options][lock-customization]
* [Lock UI Customization][ui-customization]
:::

## Further Examples

The below widget displays brief examples of implementing Auth0 in several ways: Lock as a modal "popup" widget, Lock embedded inline in a div, Lock Passwordless, a custom UI with [Auth0.js](/libraries/auth0js), and a simple link using the API.

<%= include('../../../_includes/_lock-sdk') %>

<!--vars-->

[auth0-main]: https://auth0.com
[playground-url]: http://auth0.github.com/playground
[new-features]: /libraries/lock/v10/new-features
[example-browserify]: https://github.com/auth0/lock/tree/master/examples/bundling/browserify
[example-webpack]: https://github.com/auth0/lock/tree/master/examples/bundling/webpack
[display-modes]: /libraries/lock/v10/customization#container
[development-notes]: https://github.com/auth0/lock
[release-process]: https://github.com/auth0/lock
[sending-authentication-parameters]: /libraries/lock/v10/sending-authentication-parameters

[getting-started]: /libraries/lock#lock-10-installation
[lock-customization]: /libraries/lock/v10/customization
[ui-customization]: /libraries/lock/v10/ui-customization
[lock-api]: /libraries/lock/v10/api
[lock-auth0js]: /libraries/lock/v10/auth0js
[lock-issues]: /libraries/lock/v10/issues
[migration-guide]: /libraries/lock/v10/migration-guide
[i18n-notes]: /libraries/lock/v10/i18n
[popup-mode]: /libraries/lock/v10/popup-mode
