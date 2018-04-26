---
title: Login
default: true
description: This tutorial will show you how to use the Auth0 Phonegap SDK to add authentication and authorization to your mobile app.
budicon: 448
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-cordova-samples',
  path: '01-Login',
  requirements: [
    'NodeJS 4.3',
    'Phonegap 5.5'
  ]
}) %>

### 1. Setting up the callback URL in Auth0

<div class="setup-callback">
<p>Go to the <a href="${manage_url}/#/applications/${account.clientId}/settings">Application Settings</a> section in the Auth0 dashboard and make sure that <b>Allowed Callback URLs</b> contains the following value:</p>

<pre><code>https://${account.namespace}/mobile</pre></code>

<p>Also, if you are testing your application locally, make sure to add your local URL as an Allowed Callback URL and the following as an Allowed Origin (CORS):</p>

<pre><code>file://\*</code></pre>

</div>

### 2. Add `InAppBrowser` plugin

You must install the `InAppBrowser` plugin to be able to show the Login popup. For that, just run the following command:

::: note
If you're using __Phonegap Build__ service, you need to add the plugin using the `<plugin name="cordova-plugin-inappbrowser" />` tag between the `<widget>` tags inside your __config.xml__ file. Please check [this phonegap guide for more information](http://docs.build.phonegap.com/en_US/configuring_plugins.md.html#importing-config).
:::

### 3. Follow the guide specific to the frontend technology you're using

Now, you can just follow the tutorial for the frontend technology that you're using. We currently support applications using [jQuery](/application-platforms/jquery), [AngularJS](/application-platforms/angularjs) and [Vanilla JS](/application-platforms/vanillajs).

::: note
Phonegap doesn't support getting dependencies from a CDN, so you're going to have to download the JS and CSS dependencies locally and then point to the downloaded files.
:::

::: note
You must use `popup` mode when configuring an application with Phonegap (all available guides currently do that by default).
:::

### 4. Sit back and relax

Now it's time to sit back, relax and open a beer. You've implemented Login and Signup with Auth0 and Phonegap.

### Troubleshooting

#### Command failed with exit code 65 when running Phonegap build

This means that the `InAppBrowser` plugin wasn't installed successfully. Try any of the followings to fix this.

* Reinstall the `InAppBrowser` plugin

```bash
phonegap plugin remove cordova-plugin-inappbrowser
phonegap plugin add cordova-plugin-inappbrowser
```
* Remove the platform and re-add it

iOS:

```bash
phonegap platform remove ios
phonegap platform add ios
```
Android:

```bash
phonegap platform remove android
phonegap platform add android
```

* Copy the contents from the plugin to the platform plugins

iOS:

```bash
cp plugins/cordova-plugin-inappbrowser/src/ios/* platforms/ios/[yourAppName]/Plugins/cordova-plugin-inappbrowser/
```
Android:
```bash
cp plugins/cordova-plugin-inappbrowser/src/android/* platforms/android/[yourAppName]/Plugins/cordova-plugin-inappbrowser/
```
#### Get a blank page with an `OK` after signin

This could mean that the `InAppBrowser` plugin wasn't installed successfully.

#### Get error `We could not reach the server. Please try again`

This means you need to install `cordova-plugin-whitelist` by running following command:

```bash
ionic plugin add cordova-plugin-whitelist
```

After that, configure your `config.xml` by adding or overriding following instructions:

```
<allow-navigation href="*.auth0.com" />
<access origin="*.auth0.com" />
```
