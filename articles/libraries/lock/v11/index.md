---
section: libraries
toc: true
title: Lock v11 for Web
description: A widget that provides a frictionless login and signup experience for your web apps.
img: media/articles/libraries/lock-web.png
topics:
  - libraries
  - lock
contentType:
  - how-to
  - index
useCase:
  - add-login
---
# Lock v11 for Web

Lock is an embeddable login form that can be [configured to your needs](/libraries/lock/v11/configuration) and is recommended for use in single-page apps, preferably in conjunction with [Universal Login](/universal-login), which should be used whenever possible. Lock enables you to easily add social identity providers, so that your users can log in seamlessly using any desired provider.

<%= include('../../../_includes/_embedded_login_warning') %>

## Lock Installation

You can install Lock v11 via several methods. Select any of the following installation sources that best suit your environment and application.

### Installation Sources

Install via [npm](https://npmjs.org):

```sh
npm install auth0-lock
```

Install via [bower](http://bower.io):

```sh
bower install auth0-lock
```

Include via our CDN (Replace `.x` and `.y` with the latest minor and patch release numbers from the [Lock Github repository](https://github.com/auth0/lock/releases):

```html
<!-- Latest minor release -->
<script src="https://cdn.auth0.com/js/lock/11.x/lock.min.js"></script>

<!-- Latest patch release (recommended for production) -->
<script src="https://cdn.auth0.com/js/lock/11.x.y/lock.min.js"></script>
```

::: panel Updating patch versions
It is recommended that production applications use a specific patch version, or at the very least a specific minor version. Regardless of the method by which Lock is included, the recommendation is that the version should be locked down and only manually updated, to ensure that those updates do not adversely affect your implementation. Check the [GitHub repository](https://github.com/auth0/lock/releases) for a current list of releases.
:::

### Mobile

If you are targeting mobile audiences, Auth0 recommends that you add the following meta tag to your application's `head`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1"/>
```

### Bundling Dependencies

If you are using browserify or webpack to build your project and bundle its dependencies, after installing the `auth0-lock` module, you will need to bundle it with all its dependencies. Examples are available for [Browserify](https://github.com/auth0/lock/tree/master/examples/bundling/browserify) and [webpack](https://github.com/auth0/lock/tree/master/examples/bundling/webpack).

### Cross-Origin Authentication

<%= include('../../../_includes/_embedded_login_warning') %>

Embedding Lock within your application requires [cross-origin authentication](/cross-origin-authentication) to be properly configured. Specifically, you need to set the **Allowed Web Origins** property to the domain making the request. You can find this field in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings).

![Allowed Web Origins](/media/articles/libraries/lock/allowed-origins.png)

Make sure you read about the [limitations of cross-origin authentication](/cross-origin-authentication#limitations) before implementing Lock. 

## Usage

### 1. Initializing Lock

First, you'll need to initialize a new `Auth0Lock` object, and provide it with your Auth0 client ID (the unique client ID for each Auth0 application, which you can get from the [management dashboard](${manage_url})) and your Auth0 domain (for example `yourname.auth0.com`).

```js
// Initializing our Auth0Lock
var lock = new Auth0Lock(
  '${account.clientId}',
  '${account.namespace}'
);
```

### 2. Authenticating and Getting User Info

Next, listen using the `on` method for the `authenticated` event. When the event occurs, use the `accessToken` which was received to call the `getUserInfo` method and acquire the user's profile information (as needed).

```js
var Auth = (function() {

  var wm = new WeakMap();
  var privateStore = {};
  var lock;

  function Auth() {
    this.lock = new Auth0Lock(
      '<YOUR_CLIENT_ID>',
      '<YOUR_DOMAIN>'
    );
    wm.set(privateStore, {
      appName: "example"
    });
  }

  Auth.prototype.getProfile = function() {
    return wm.get(privateStore).profile;
  };

  Auth.prototype.authn = function() {
    // Listening for the authenticated event
    this.lock.on("authenticated", function(authResult) {
      // Use the token in authResult to getUserInfo() and save it if necessary
      this.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          // Handle error
          return;
        }

        //we recommend not storing Access Tokens unless absolutely necessary
        wm.set(privateStore, {
          accessToken: authResult.accessToken
        });

        wm.set(privateStore, {
          profile: profile
        });

      });
    });
  };
  return Auth;
}());

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

## Passwordless

::: note
Lock's <dfn data-key="passwordless">Passwordless</dfn> Mode is only available in Lock v11.2.0 and later. Please use the [latest release of Lock](https://github.com/auth0/lock/releases) for this feature!
:::

You can use Lock's Passwordless Mode to allow users to authenticate using just an email or mobile number. They will receive the code and then return to input it, or click the link, and they can be authenticated without remembering a password.

In Lock v11, in order to implement Passwordless Mode, you initialize Lock in a slightly different manner, with `Auth0LockPasswordless` rather than with `Auth0Lock`:

```js
var lockPasswordless = new Auth0LockPasswordless(
 '${account.clientId}',
 '${account.namespace}'
);
```

### Passwordless options

Additionally, Lock's Passwordless Mode has a couple of configuration options that are unique to it.

In order to indicate which connection type you would like, you initialize Lock with the `allowedConnections` option with either `email` or `sms` as the value:

```js
var passwordlessOptions = {
  allowedConnections: ['sms']
}
```

::: note
Remember to enable the passwordless connection of your choice in the [Dashboard](${manage_url}) under **Connections -> Passwordless**, and then to enable it for your application, that way when Lock tries to use it, it is already set up and linked to the application.
:::

If you choose to use `email`, you have one more option to select - whether you wish your users to receive a code to input, or a "magic link" to use. This is done via the `passwordlessMethod` option, which takes values of `code` or `link`.

```js
var passwordlessOptions = {
  allowedConnections: ['email'],
  passwordlessMethod: 'code'
}
```

### Passwordless example

```js
var passwordlessOptions = {
  allowedConnections: ['email'],
  passwordlessMethod: 'code',
  auth: {
    redirectUrl: 'http://localhost:3000/callback',   
    responseType: 'token id_token',
    params: {
      scope: 'openid email'               
    }          
  }
}

var lockPasswordless = new Auth0LockPasswordless(
 '${account.clientId}',
 '${account.namespace}',
 passwordlessOptions
);
```

<%= include('../../_includes/_embedded_sso') %>

<%= include('../../../_includes/_co_authenticate_errors', { library : 'Lock v11'}) %>

## Browser Compatibility

Browser compatibility is ensured for **Chrome**, **Safari**, **Firefox** and **IE >= 10**. Auth0 currently uses [zuul](https://github.com/defunctzombie/zuul) along with [Saucelabs](https://saucelabs.com) to run integration tests on each push.

## More Examples

The below widget displays brief examples of implementing Auth0 in several ways: Lock as a modal "popup" widget, Lock embedded inline in a div, Lock Passwordless, a custom UI with [Auth0.js](/libraries/auth0js), and a simple link using the API.

<%= include('../../../_includes/_lock-sdk') %>

## Next Steps

This document has shown how to use Lock 11 within a Single-Page Application (SPA). Take a look at the following resources to see how Lock can be used with other kinds of web apps, or how it can be customized for your needs:

::: next-steps
* [Lock v11 API Reference](/libraries/lock/v11/api)
* [Lock Configuration Options](/libraries/lock/v11/configuration)
* [Lock UI Customization](/libraries/lock/v11/ui-customization)
:::
