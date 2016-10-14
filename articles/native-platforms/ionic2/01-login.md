---
title: Login
default: true
description: This tutorial demonstrates how to add authentication and authorization to an Ionic 2 app
budicon: 448
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-ionic2-sample',
  path: '01-Login'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* NodeJS 6.3.0
* Ionic 2.0.0-rc.0
* Angular 2.0.0
:::

## Set Up the Callback URL

<div class="setup-callback">
<p>Go to the <a href="${manage_url}/#/applications/${account.clientId}/settings">Application Settings</a> section in the Auth0 dashboard and make sure that <b>Allowed Callback URLs</b> contains the following value:</p>

<pre><code>https://${account.namespace}/mobile</pre></code>

<p>Also, if you are testing your application locally, make sure to add your local URL as an Allowed Callback URL and the following as an Allowed Origin (CORS):</p>

<pre><code>file://\*</code></pre>

</div>

## Install angular2-jwt

You can use **[angular2-jwt](https://github.com/auth0/angular2-jwt)** to make authenticated HTTP requests.

${snippet(meta.snippets.dependencies)}

After **angular2-jwt** is installed, it needs to be configured and included in the `providers` array in your application's `@NgModule`.

${snippet(meta.snippets.configure)}

## Add the Lock Widget

Add Auth0's Lock widget and auth0.js library to your `index.html`.

${snippet(meta.snippets.setup)}

## Add the `InAppBrowser` Plugin

You must install the `InAppBrowser` plugin from Cordova to be able to show the Login popup. The seed project already has this plugin added, but if you are adding Auth0 to your own application you need to run the following command:

```bash
ionic plugin add cordova-plugin-inappbrowser
```

and then add the following configuration to the `config.xml` file:

```xml
<feature name="InAppBrowser">
  <param name="ios-package" value="CDVInAppBrowser" />
  <param name="android-package" value="org.apache.cordova.inappbrowser.InAppBrowser" />
</feature>
```

## Create an Authentication Service and Configure Lock

To coordinate authentication tasks, it's best to set up an injectable service that can be reused across the application. This service needs methods for logging users in and out, as well as checking their authentication state.

This is also where `Auth0Lock` can be configured with your Auth0 credentials. Be sure to configure Auth0Lock in Popup mode by setting `redirect` to `false`.

${snippet(meta.snippets.use)}

The service can now be injected wherever it is needed.

## Create a Profile Page

You will likely require some kind of profile area for users to see their information. Depending on your needs, this can also serve as the place for them to log in and out.

For the `profile` page component, simply inject the `AuthService`.

${snippet(meta.snippets.profile)}

The `AuthService` is now accessible in the view and can be used to conditionally hide and show elements depending on whether the user has a valid JWT in local storage.

${snippet(meta.snippets.profiletemplate)}

![auth0 lock](/media/articles/native-platforms/ionic2/ionic2-auth-5.png)

## Optional: Implement Refresh Tokens

[Refresh tokens](/refresh-token) are special tokens that are used to retrieve a new JWT for the user so that they can remain authenticated.

In Angular 1.x, obtaining a new JWT with a refresh token can be accomplished using HTTP interceptors. However, Angular 2 doesn't have the concept of HTTP interceptors, so another approach is needed. There are several different ways to implement token refreshing in Angular 2, and one of them is to use observables.

${snippet(meta.snippets.refresh)}

When the user logs in, a refresh gets scheduled with an interval equal to the amount of time the JWT is valid for. If the user closes the application, their state will be lost and the scheduled refresh will no longer exist the next time they open it. We need a slightly different approach for setting up a refresh when the application is first opened again because the amount of time that the JWT is valid for (if there is still an unexpired JWT in local storage) will be less than that of a "fresh" token. We need to first check for an unexpired JWT, and if there is one, schedule a one-time refresh to take place when the JWT expires.

To run the token refresh when the application is started, call the `startupTokenRefresh` method when the app is ready.

${snippet(meta.snippets.configurerefresh)}

## Make Authenticated HTTP Requests

To make HTTP requests to a secure endpoint, simply use `AuthHttp` which will automatically attach the JWT as an `Authorization` header.

${snippet(meta.snippets.http)}

### Troubleshooting

#### Completly blank page when launching the app

This could either mean that you've built the seed project using Ionic 1, or that the device where you are testing it isn't entirely supported by Ionic 2 yet. Be sure to check the console for errors.
