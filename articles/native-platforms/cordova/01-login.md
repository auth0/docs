---
title: Login
description: This tutorial will show you how to use the Auth0 Cordova SDK to add authentication and authorization to your mobile app.
budicon: 448
---

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

<%= include('../../_includes/_package', {
  pkgOrg:'auth0-samples',
  pkgRepo:'auth0-cordova-samples',
  githubUrl:'https://github.com/auth0-samples/auth0-cordova-samples/tree/master/00-Starter-Seed/basic-sample',
  pkgBranch:'master',
  pkgPath:'00-Starter-Seed/basic-sample',
  pkgFilePath:'00-Starter-Seed/basic-sample/www/js',
  pkgType:'js'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* NodeJS 5
* Cordova 5.4 or later
:::



## 1. Setting Up the Callback URL

<div class="setup-callback">
<p>Go to the <a href="${manage_url}/#/applications/${account.clientId}/settings">Application Settings</a> section in the Auth0 dashboard and make sure that <b>Allowed Callback URLs</b> contains the following value:</p>

<pre><code>https://${account.namespace}/mobile</pre></code>

<p>Also, if you are testing your application locally, make sure to add your local URL as an Allowed Callback URL and the following as an Allowed Origin (CORS):</p>

<pre><code>file://\*</code></pre>

</div>

## 2. Add `InAppBrowser` Plugin

You must install the `InAppBrowser` plugin from Cordova to be able to show the Login popup. For that, just run the following command:

${snippet(meta.snippets.dependencies)}

and then add the following configuration to the `config.xml` file:

```xml
<feature name="InAppBrowser">
  <param name="ios-package" value="CDVInAppBrowser" />
  <param name="android-package" value="org.apache.cordova.inappbrowser.InAppBrowser" />
</feature>
```

## 3. Follow the Front End Quickstarts

Follow the [quickstart guide](/quickstart/spa) for the specific technology you are using in your Cordova app.

> **Note**: Cordova doesn't support getting dependencies from a CDN, so it is necessary to download the JavaScript and CSS dependencies locally and then point to the downloaded files.

> **Note**: You must use `popup` mode when configuring an application with Cordova. This can be done by setting `redirect: false` in the options object for Lock. See the [Lock customization](/libraries/lock/v9/customization) documentation for more.

### Troubleshooting

#### Command failed with exit code 65 when running cordova build

This means that the `InAppBrowser` plugin wasn't installed successfully by Cordova. Try any of the following:

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

#### Blank page with an OK after signin

This may be caused by the default setting like below

```js
lock.show(function(err, profile, token) {

});
```

You must configure Lock as shown below, to avoid the blank screen popup with the OK button.

```js
lock.show({sso: false},function(err, profile, token) {

});
```

#### Lock is displaying errors when using cordova serve command

Debug your app inside the simulator for your platform or an actual device. Running Lock from inside a browser using `cordova serve` is not supported at this time.
