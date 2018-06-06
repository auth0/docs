---
title: Login
description: This tutorial demonstrates how to use the Auth0 Cordova SDK to add authentication and authorization to your mobile app.
budicon: 448
tags:
  - quickstarts
  - native
  - cordova
---

<%= include('../../../_includes/_package', {
  org: 'auth0-community',
  repo: 'auth0-cordova-samples',
  path: '01-Login',
  requirements: [
    'NodeJS 5',
    'Cordova 5.4+'
  ]
}) %>

<%= include('../_includes/_cordova_setup') %>

## Set Up URL Redirects

Use the `onRedirectUri` method from **auth0-cordova** when your app loads to properly handle redirects after authentication.

```js
var Auth0Cordova =  require('@auth0/cordova');
var App = require('./App');

function main() {
  var app = new App();
  function intentHandler(url) {
    Auth0Cordova.onRedirectUri(url);
  }
  window.handleOpenURL = intentHandler;
  app.run('#app');
}

document.addEventListener('deviceready', main);
```

::: note
**Note:** The code samples shown in this tutorial assume that your app is using some kind of bundler like browserify or webpack to make npm modules available in a client application. The downloadable sample for this tutorial uses webpack but you are free to use whichever bundler you like.
:::

## Create a Main App File and Configure Auth0

Create a main application file and initialize Auth0 in it. This file can also serve as the place where you change what is rendered in the app. This file needs methods for logging users in and out, as well as checking their authentication state. Be sure to replace `YOUR_PACKAGE_ID` with the identifier for your app in the configuration block.

${snippet(meta.snippets.use)}

## Add Login and Logout Controls

Add controls to your app to allow users to log in and log out. The buttons should have classes which can be picked up with a `querySelector` and have event listeners attached to them as is demonstrated above.

```html
<!-- www/index.html -->

<button class="btn btn-success btn-login">
  Log In
</button>

<button class="btn btn-success btn-logout">
  Log Out
</button>
```

After authentication, users will be redirected to your application where they will be taken to the `profile` route.

### Troubleshooting

#### Cannot read property 'isAvailable' of undefined

This means that you're attempting to test this in a browser. At this time you'll need to run this either in an emulator or on a device.


