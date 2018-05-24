---
title: Login
description: This tutorial demonstrates how to add user login to an Cordova application using Auth0.
budicon: 448
github:
  path: 01-Login
---
<%= include('../_includes/_getting_started', { library: 'Cordova') %>

<%= include('../../_includes/_callback_url') %>

The **Callback URL** to be used for your application includes your app's package ID which is found in the `config.xml` file for your app.

Go to the <a href="${manage_url}/#/applications/${account.clientId}/settings">Application Settings</a> section in your Auth0 dashboard and set your **Callback URL** in the **Allowed Callback URLs** box.

```bash
# replace YOUR_PACKAGE_ID with your app package ID
YOUR_PACKAGE_ID://${account.namespace}/cordova/YOUR_PACKAGE_ID/callback
```

Add `file` as an allowed origin to the **Allowed Origins (CORS)** box.

```bash
file://*
```

Lastly, be sure that the **Application Type** for your application is set to **Native** in its settings.

${snippet(meta.snippets.dependencies)}

::: note
Please note that Cordova authentication requires testing on either an emulated or real device. Attempting authentication when testing in the browser will fail because the PKCE OAuth flow requires a device browser.
:::

${snippet(meta.snippets.setup)}

## Integrate Auth0 in your Application

### Set Up URL Redirects

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

### Create a Main App File and Configure Auth0

Create a main application file and initialize Auth0 in it. This file can also serve as the place where you change what is rendered in the app. This file needs methods for logging users in and out, as well as checking their authentication state. Be sure to replace `YOUR_PACKAGE_ID` with the identifier for your app in the configuration block.

${snippet(meta.snippets.use)}

#### Add Login and Logout Controls

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


