---
section: libraries
toc: true
title: Lock 10 for Web
description: A widget that provides a frictionless login and signup experience for your web apps.
img: media/articles/libraries/lock-web.png
---
# Lock 10 for Web

Lock is an embeddable login form, [configurable to your needs][lock-customization] and ready for use on web apps. It enables you to easily add social identity providers to Lock, allowing your users to login seamlessly using whichever provider they want.

::: note
Check out our [Lock GitHub repository](https://github.com/auth0/lock).
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

### Implementing Lock

```js
// Initiating our Auth0Lock
var lock = new Auth0Lock(
  '${account.clientId}',
  '${account.namespace}'
);

// Listening for the authenticated event
lock.on("authenticated", function(authResult) {
  // Use the token in authResult to getUserInfo() and save it to localStorage
  lock.getUserInfo(authResult.accessToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }

    localStorage.setItem('accessToken', authResult.accessToken);
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
var token = localStorage.getItem('accessToken');
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

::: note
This example demonstrates using Lock 10 with a Single Page Application (SPA). To learn how Lock can be modified to provide frictionless authentication for any app, see the [API Reference][lock-api] and the [Configuration Options Reference][lock-customization]. For details specifically about customizing the look and feel of Lock in your app, please take a look at the [UI Customization][ui-customization] page.
:::

## Start Using Lock

<%= include('../../../_includes/_lock-sdk') %>

## Browser Compatibility

Browser compatibility is ensured for **Chrome**, **Safari**, **Firefox** and **IE >= 10**. Auth0 currently uses [zuul](https://github.com/defunctzombie/zuul) along with [Saucelabs](https://saucelabs.com) to run integration tests on each push.

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
