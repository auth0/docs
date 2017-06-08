---
title: Login
default: true
description: This tutorial demonstrates how to add authentication and authorization to an Ionic 2 app
budicon: 448
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ionic2-samples',
  path: '01-Login',
  requirements: [
    'Ionic 3.x',
    'Angular 4+'
  ]
}) %>

## Overview

To integrate Auth0 in a hybrid Ionic app, you can use the `@auth0/cordova` package available on npm. This package provides an interface with cordova which allows you to use the [Proof Key for Code Exchange](https://tools.ietf.org/html/rfc7636) spec. PKCE is recommended for native and hybrid applications to mitigate the threat of authorization code interception.

::: note

Please note that PKCE authentication requires testing on either an emulated or real device. Attempting authentication when testing in the browser will fail because PKCE requires a device browser.

:::

## Set Up Your Package Identifier

To set up or get your package identifier (used several times throughout this tutorial), you should take a look at your config.xml and get it from this line:

```xml
<widget id="YOUR_PACKAGE_ID" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
```

## Set Up the Client

<div class="setup-callback">
<p>Go to the <a href="${manage_url}/#/applications/${account.clientId}/settings">Application Settings</a> section in the Auth0 dashboard and make sure that the <b>Allowed Callback URLs</b> contains the following value (replace `YOUR_PACKAGE_ID` with your app identifier):</p>

<pre><code>YOUR_PACKAGE_ID://${account.namespace}/cordova/YOUR_PACKAGE_ID/callback</pre></code>

<p>Make sure that <b>Allowed Origin (CORS)</b> has the following value:</p>

<pre><code>file://*</code></pre>

<p>Lastly, make sure that <b>Client Type</b> is set to Native</p>

</div>

## Install Dependencies

You'll need these libraries:

* **[auth0-js](https://github.com/auth0/auth0.js)** to get profile information from Auth0

* **[@auth0/cordova](https://github.com/auth0/auth0-cordova)** to handle authentication with Auth0

```bash
npm install auth0-js @auth0/cordova --save
```

After **@auth0/cordova** is installed, it needs to be configured by modifying your `app.component.ts` to set up URL redirects:

${snippet(meta.snippets.cordova)}

## Add Cordova Plugins

You must install the `SafariViewController` plugin from Cordova to be able to show the Login popup. The seed project already has this plugin added, but if you are adding Auth0 to your own application you need to run the following command:

```bash
ionic plugin add cordova-plugin-safariviewcontroller
```

You'll also need to install the `CustomURLScheme` from Cordova to handle redirects properly. The seed project has it already, but if you're adding Auth0 to your own project, you'll need to run this command (replace `YOUR_PACKAGE_ID` with your app identifier):

```bash
ionic plugin add cordova-plugin-customurlscheme --variable URL_SCHEME={YOUR_PACKAGE_ID} --variable ANDROID_SCHEME={YOUR_PACKAGE_ID} --variable ANDROID_HOST=${account.namespace} --variable ANDROID_PATHPREFIX=/cordova/{YOUR_PACKAGE_ID}/callback
```

## Modify config.xml

Add `<preference name="AndroidLaunchMode" value="singleTask" />` to your config.xml. This will allow the Auth0 dialog to properly redirect back to your app.

## Create an Authentication Service and Configure Auth0

To coordinate authentication tasks, it's best to set up an injectable service that can be reused across the application. This service needs methods for logging users in and out, as well as checking their authentication state. Be sure to replace `YOUR_PACKAGE_ID` with your apps identifier in the configuration block.

${snippet(meta.snippets.use)}

The service can now be injected wherever it is needed.

## View Auth0 Data After Logging In

You will likely want some kind of profile area for users to see their information. Depending on your needs, this can also serve as the place for them to log in and out.

For a demo in your component, simply inject the `AuthService`.

${snippet(meta.snippets.profile)}

The `AuthService` is now accessible in the view and can be used to conditionally hide and show elements depending on whether the user has a valid JWT in local storage.

${snippet(meta.snippets.profiletemplate)}

### Troubleshooting

#### Cannot read property 'isAvailable' of undefined

This means that you're attempting to test this in a browser. At this time you'll need to run this either in an emulator or on a device.

#### Completely blank page when launching the app

This could either mean that you've built the seed project using Ionic 1, or that the device where you are testing it isn't entirely supported by Ionic 2 yet. Be sure to check the console for errors.
