---
title: Auth0 Cordova SDK Tutorial
description: This tutorial will show you how to use the Auth0 Cordova SDK to add authentication and authorization to your mobile app.
---

## Cordova Tutorial

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* NodeJS 5
* Cordova 5.4
:::

<%= include('../_includes/_package', {
  pkgRepo: 'auth0-cordova',
  pkgBranch: 'master',
  pkgPath: 'examples/basic-sample',
  pkgFilePath: 'examples/basic-sample/www/js',
  pkgType: 'js'
}) %>

**Otherwise, if you already have an existing application, please follow the steps below.**

### 1. Setting up the callback URL in Auth0

<div class="setup-callback">
<p>Go to the <a href="${uiAppSettingsURL}">Application Settings</a> section in the Auth0 dashboard and make sure that <b>Allowed Callback URLs</b> contains the following value:</p>

<pre><code>https://${account.namespace}/mobile</pre></code>

<p>Also, if you are testing your application locally, make sure to add your local URL as an Allowed Callback URL and the following as an Allowed Origin (CORS):</p>

<pre><code>file://\*</code></pre>

</div>

### 2. Add `InAppBrowser` plugin

You must install the `InAppBrowser` plugin from Cordova to be able to show the Login popup. For that, just run the following command:

${snippet(meta.snippets.dependencies)}

and then add the following configuration to the `config.xml` file:

```xml
<feature name="InAppBrowser">
  <param name="ios-package" value="CDVInAppBrowser" />
  <param name="android-package" value="org.apache.cordova.inappbrowser.InAppBrowser" />
</feature>
```

### 3. Follow the guide specific to the FrontEnd technology you're using

Now, you can just follow the tutorial for the FrontEnd technology that you're using. We currently support applications using [jQuery](/client-platforms/jquery), [AngularJS](/client-platforms/angularjs) and [Vanilla JS](/client-platforms/vanillajs).

> **Warning**: Cordova doesn't support getting dependencies from a CDN, so you're going to have to download the JS and CSS dependencies locally and then point to the downloaded files.

> **Warning**: You must use `popup` mode when configuring an application with Cordova. (All available guides currently do that by default)

### 4. Sit back and relax

Now it's time to sit back, relax and open a beer. You've implemented Login and Signup with Auth0 and Cordova.

### Troubleshooting

#### Command failed with exit code 65 when running cordova build

This means that the `InAppBrowser` plugin wasn't installed successfully by Cordova. Try any of the followings to fix this.

* Reinstall the `InAppBrowser` plugin

```bash
cordova plugin remove cordova-plugin-inappbrowser
cordova plugin add cordova-plugin-inappbrowser
```
* Remove the platform and re add it

iOS:

```bash
cordova platform remove ios
cordova platform add ios
```
Android:

```bash
cordova platform remove android
cordova platform add android
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
#### Get a blank page with an OK after signin

This may be caused by the default setting like below
```
lock.show(function(err, profile, token) {
});
```
You must configure the lock as shown below, to avoid the blank screen popup with the OK button.
```
lock.show({sso: false},function(err, profile, token) {
});
```
