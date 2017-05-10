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

To integrate Auth0 in a native Ionic app, you can use the `@auth0/cordova` package available on npm. This package provides an interface with cordova which allows you to use the [Proof Key for Code Exchange](https://tools.ietf.org/html/rfc7636) spec. PKCE is recommended for native applications to mitigate the threat of authorization code interception.

## Set Up the Client

<div class="setup-callback">
<p>Go to the <a href="${manage_url}/#/applications/${account.clientId}/settings">Application Settings</a> section in the Auth0 dashboard and make sure that the <b>Allowed Callback URLs</b> contains the following value (replace `YOUR_PACKAGE_ID` with your app identifier):</p>

<pre><code>YOUR_PACKAGE_ID://${account.namespace}/cordova/YOUR_PACKAGE_ID/callback</pre></code>

<p>Make sure that <b>Allowed Origin (CORS)</b> has the following value:</p>

<pre><code>file://\*</code></pre>

<p>Lastly, make sure that <b>Client Type</b> is set to Native</p>

</div>

## Install Dependencies

You'll need these libraries:

* **[angular2-jwt](https://github.com/auth0/angular2-jwt)** to make authenticated HTTP requests

* **[auth0-js](https://github.com/auth0/auth0.js)** to get profile information from Auth0

* **[@auth0-cordova](https://github.com/auth0/auth0-cordova)** to handle authentication with Auth0

```bash
npm install angular2-jwt auth0-js @auth0/cordova --save
```

After **angular2-jwt** is installed, it needs to be configured and included in the `providers` array in your application's `@NgModule`.

${snippet(meta.snippets.configure)}

After **@auth0-cordova** is installed, it needs to be configured by modifying your `app.component.ts` to set up URL redirects:

${snippet(meta.snippets.cordova)}

## Add Cordova Plugins

You must install the `SafariViewController` plugin from Cordova to be able to show the Login popup. The seed project already has this plugin added, but if you are adding Auth0 to your own application you need to run the following command:

```bash
ionic cordova plugin add cordova-plugin-safariviewcontroller
```

You'll also need to install the `CustomURLScheme` from Cordova to handle redirects properly. The seed project has it already, but if you're adding Auth0 to your own project, you'll need to run this command (replace `YOUR_PACKAGE_ID` with your app identifier):

```bash
ionic cordova plugin add cordova-plugin-customurlscheme --variable URL_SCHEME={YOUR_PACKAGE_ID} --variable ANDROID_SCHEME={YOUR_PACKAGE_ID} --variable ANDROID_HOST=${account.namespace} --variable ANDROID_PATHPREFIX=/cordova/{YOUR_PACKAGE_ID}/callback
```

## Set Up Auth0 Variables

It's best to separate your variables out so they're not interspersed throughout your code. We'll create an `auth0-variables.ts` file to hold them (replace `YOUR_PACKAGE_ID` with your app identifier):

${snippet(meta.snippets.variables)}

## Create an Authentication Service and Configure Auth0

To coordinate authentication tasks, it's best to set up an injectable service that can be reused across the application. This service needs methods for logging users in and out, as well as checking their authentication state.

${snippet(meta.snippets.use)}

The service can now be injected wherever it is needed.

## View Auth0 Data After Logging In

You will likely want some kind of profile area for users to see their information. Depending on your needs, this can also serve as the place for them to log in and out.

For a demo in your component, simply inject the `AuthService`.

${snippet(meta.snippets.profile)}

The `AuthService` is now accessible in the view and can be used to conditionally hide and show elements depending on whether the user has a valid JWT in local storage.

${snippet(meta.snippets.profiletemplate)}

![auth0 lock](/media/articles/native-platforms/ionic2/ionic2-auth-5.png)

## Optional: Implement Refresh Tokens

[Refresh tokens](/refresh-token) are special tokens that are used to retrieve a new JWT for the user so that they can remain authenticated.

In Angular 1.x, obtaining a new JWT with a refresh token can be accomplished using HTTP interceptors. However, Angular 2 doesn't have the concept of HTTP interceptors, so another approach is needed. There are several different ways to implement token refreshing in Angular 2, and one of them is to use observables. This code in the `AuthService` handles refresh tokens:

${snippet(meta.snippets.refresh)}

When the user logs in, a refresh gets scheduled with an interval equal to the amount of time the JWT is valid for. If the user closes the application, their state will be lost and the scheduled refresh will no longer exist the next time they open it. We need a slightly different approach for setting up a refresh when the application is first opened again because the amount of time that the JWT is valid for (if there is still an unexpired JWT in local storage) will be less than that of a "fresh" token. We need to first check for an unexpired JWT, and if there is one, schedule a one-time refresh to take place when the JWT expires.

To run the token refresh when the application is started, call the `startupTokenRefresh` method when the app is ready.

${snippet(meta.snippets.configurerefresh)}

## Make Authenticated HTTP Requests

To make HTTP requests to a secure endpoint, simply use `AuthHttp` which will automatically attach the JWT as an `Authorization` header.

${snippet(meta.snippets.http)}

### Troubleshooting

#### Completely blank page when launching the app

This could either mean that you've built the seed project using Ionic 1, or that the device where you are testing it isn't entirely supported by Ionic 2 yet. Be sure to check the console for errors.
