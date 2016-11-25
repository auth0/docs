---
title: Login
description: This tutorial demonstrates how to use the Auth0-Chrome SDK to add authentication and authorization to your Chrome extension
budicon: 448
---

<%= include('../../_includes/_package', {
  org: 'auth0-community',
  repo: 'auth0-chrome-sample',
  path: '00-Starter-Seed'
}) %>

This quickstart demonstrates how to add authentication to a Chrome extension with Auth0. The tutorial is based on a sample application which uses Auth0's hosted Lock widget and Chrome's `launchWebAuthFlow`.

## Overview

To integrate Auth0 in a Chrome extension, you can use the `auth0-chrome` package available on npm. This package provides a generic `PKCEClient.js` file which allows you to use the [Proof Key for Code Exchange](https://tools.ietf.org/html/rfc7636) spec. PKCE is recommended for native applications to mitigate the threat of authorization code interception.

## Configure Your Auth0 Application

When loading your application as an unpacked extension, a unique ID will be generated for it. In your [application settings](${manage_url}/#/applications/${account.clientId}/settings), you must whitelist your callback URL (the URL that Auth0 will return to once authentication is complete) and the allowed origin URL.

In the **Allowed Callback URLs** section, whitelist your callback URL.

```bash
https://<YOUR_EXTENSION_ID>.chromiumapp.org/auth0
```

In the **Allowed Origins** section, whitelist your chrome extension as an origin.

```bash
chrome-extension://<YOUR_EXTENSION_ID>
```

## Install the Dependencies

Install `auth0-chrome` and `jwt-decode` with npm. The `jwt-decode` library is useful for decoding JSON Web Tokens and will be used to check the expiry time in this example.

```bash
npm install auth0-chrome jwt-decode --save
```

The `dist` folder of `Auth0Chrome` contains a webpack bundle for the package, including a minified version.

Configure your `manifest.json` file to run the `auth0chrome` script, along with an `env.js` and `main.js` script for your project. The `default_popup` should be set to a file called `browser_action.html` which will be used to provide a view to the popup.

```js
{
  ...
  "browser_action": {
    "default_title": "Auth0",
    "default_popup": "src/browser_action/browser_action.html"
  },
  "background": {
    "scripts": [
      "./env.js",
      "node_modules/auth0-chrome/dist/auth0chrome.min.js",
      "src/main.js"
    ],
    "persistent": false
  },
  "permissions": [
    "identity",
    "notifications"
  ]
}
```

## Set Your Auth0 Credentials

The **client ID** and **domain** for your application are used to connect to Auth0 and these will be required when instantiating `Auth0Chrome`. Create an `env.js` file and populate it with your application keys. Alternatively, you can pass these keys to the `Auth0Chrome` constructor directly.

```js
// env.js

window.env = {
  AUTH0_DOMAIN: '<%= account.clientId %>',
  AUTH0_CLIENT_ID: '<%= account.namespace %>',
};
```

> **Note:** When downloading the sample project above, these values will come prepopulated for you.

## Create the Main Popup

Create a `browser_action.html` file in `src/browser_action` and provide a view for your extension's popup. In this example the view has controls for allowing the user to log in and log out, as well as an area for displaying the user's profile after authentication.

```html
<!-- src/browser_action/browser_action.html -->
...
<body>
  <div id="mainPopup">
    <div class="profile hidden">
      <div class="picture"></div>
      <div class="floater-profile">
        <div class="floater-background"></div>
        <div class="user-info">
          <h5 class="nickname"></h5>
          <h5 class="name"></h5>
        </div>
        <hr />
        <button class="btn btn-danger logout-button">Log Out</button>
      </div>
    </div>
    <div class="loading hidden">
      <div class="loading-bar"></div>
      <div class="loading-bar"></div>
      <div class="loading-bar"></div>
      <div class="loading-bar"></div>
    </div>
    <div class="default">
      <div class="text-center">
        <h3>Chrome Demo</h1>
        <button class="btn btn-success login-button">Log In With Auth0</button>
        <p class="caption">Press the Log In button above to log in.</p>
      </div>
    </div>
  </div>
  <script src="../../env.js"></script>
  <script src="./browser_action.js"></script>
  <script src="../../node_modules/jwt-decode/build/jwt-decode.js"></script>
</body>
```

The `jwt-decode` library is included within a `script` tag, as is a `browser_action.js` file. It's the `browser_action.js` file that will be used to control the view.

> **Note:** For this example, `document.querySelector` and `document.querySelectorAll` are used as a minimal way to mimic jQuery. Keep in mind that the specific technologies used to power the Chrome extension are at your discretion.

At a minimum, the Chrome extension needs to have views and logic to handle two cases: when the user is authenticated and when they are not. JWT authentication is stateless by nature, so the best indication we have that the user is authenicated is whether they have an unexpired token saved.

When the user is authenticated, a profile area should be displayed. When they aren't authenticated (they don't have a JWT or it becomes expired), the "Log In" button should be shown.

```js
// src/browser_action/browser_action.js

function isLoggedIn(token) {
  // The user is logged in if their token isn't expired
  return jwt_decode(token).exp > Date.now() / 1000;
}

function logout() {
  // Remove the idToken from storage
  localStorage.clear();
  main();
}

// Minimal jQuery
const $$ = document.querySelectorAll.bind(document);
const $  = document.querySelector.bind(document);


function renderProfileView(authResult) {
  $('.default').classList.add('hidden');
  $('.loading').classList.remove('hidden');
  fetch(`https://<%= "${env.AUTH0_DOMAIN}" %>/userinfo`, {
    headers: {
      'Authorization': `Bearer <%= "${authResult.access_token}" %>`
    }
  }).then(resp => resp.json()).then((profile) => {
    ['picture', 'name', 'nickname'].forEach((key) => {

       const element = $('.' +  key);
       if( element.nodeName === 'DIV' ) {
         element.style.backgroundImage = 'url(' + profile[key] + ')';
         return;
       }

       element.textContent = profile[key];
    });
    $('.loading').classList.add('hidden');
    $('.profile').classList.remove('hidden');
    $('.logout-button').addEventListener('click', logout);
  }).catch(logout);
}


function renderDefaultView() {
  $('.default').classList.remove('hidden');
  $('.profile').classList.add('hidden');
  $('.loading').classList.add('hidden');

  $('.login-button').addEventListener('click', () => {
    $('.default').classList.add('hidden');
    $('.loading').classList.remove('hidden');
    chrome.runtime.sendMessage({
      type: "authenticate"
    });
  });
}

function main () {
  const authResult = JSON.parse(localStorage.authResult || '{}');
  const token = authResult.id_token;
  if (token && isLoggedIn(token)) {
    renderProfileView(authResult);
  } else {
    renderDefaultView();
  }
}

document.addEventListener('DOMContentLoaded', main);
```

Two functions are provided to handle the scenarios described above. The `renderProfileView` function fetches the user's profile from Auth0's API at the `/userinfo` endpoint and shows the profile in the popup. The `renderDefaultView` function displays the Log In button and emits a message to trigger the authentication flow when clicked. Note that the user's `access_token` is attached as an `Authorization` header in the call to the `/userinfo` endpoint.

The `main` function takes the `authResult` object saved in local storage and renders the profile view if the user's `id_token` is unexpired, or the default view if it is expired.

![popup](/media/articles/native-platforms/chrome/01-popup.png)

## Initiate the Authentication Flow

The `browser_action.js` file controls the popup view and responds to button clicks, but the logic for the authentication flow still needs to be implemented.

Create a `main.js` file in the `src` directory and set it up to listen for the `authenticate` message that is emitted when the Log In button is clicked.

```js
// src/main.js

chrome.runtime.onMessage.addListener(function (event) {
  if (event.type === 'authenticate') {

    // scope
    //  - openid if you want an id_token returned
    //  - offline_access if you want a refresh_token returned
    // device
    //  - required if requesting the offline_access scope.
    let options = {
      scope: 'openid offline_access',
      device: 'chrome-extension'
    };

    new Auth0Chrome(env.AUTH0_DOMAIN, env.AUTH0_CLIENT_ID)
      .authenticate(options)
      .then(function (authResult) {
        localStorage.authResult = JSON.stringify(authResult);
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icons/icon128.png',
          title: 'Login Successful',
          message: 'You can use the app now'
        });
      }).catch(function (err) {
        chrome.notifications.create({
          type: 'basic',
          title: 'Login Failed',
          message: err.message,
          iconUrl: 'icons/icon128.png'
        });
      });
  }
});
``` 

When the `authenticate` message is received, an `Auth0Chrome` instance is created and its `authenticate` method is called, which opens a new window showing Auth0's hosted Lock.

The `Auth0Chrome` constructor takes the **domain** and **client ID** for your application, and the `authenticate` method takes an `options` object which allows you to customize the authentication flow. The `authenticate` method returns a promise and the result from the authentication process can be retrieved when it resolves. In this example, the result is saved in local storage immediately for future use and a Chrome notification is created to let the user know they have successfully logged in.

![hosted-lock](/media/articles/native-platforms/chrome/02-hosted-lock.png)

## Further Reading

With authentication implemented in your Chrome extension, you'll likely want to make secure calls to a remote API. For more information on how to set up an API in your Auth0 dashboard and how to use access tokens to make requests for protected resources, see the [API authorization docs](https://auth0.com/docs/api-auth).
