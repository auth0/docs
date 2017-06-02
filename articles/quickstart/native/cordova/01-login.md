---
title: Login
description: This tutorial will show you how to use the Auth0 Cordova SDK to add authentication and authorization to your mobile app.
budicon: 448
---

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-cordova-samples',
  path: '00-Starter-Seed/basic-sample',
  requirements: [
    'NodeJS 5',
    'Cordova 5.4 or later'
  ]
}) %>

## 1. Setting Up the Callback URL

<div class="setup-callback">
Go to the <a href="${manage_url}/#/applications/${account.clientId}/settings">Client Settings</a> section in the Auth0 dashboard and make sure that <b>Allowed Callback URLs</b> contains the following value:

```text
https://${account.namespace}/mobile
```

Also, if you are testing your application locally, make sure to add your local URL as an Allowed Callback URL and the following as an Allowed Origin (CORS): `file://\*`

</div>

## 2. Add `InAppBrowser` and `WhiteList` Plugin

You must install the `InAppBrowser` and `WhiteList` plugins from Cordova to be able to show the Login popup and communicate with Auth0 endpoints. For that, just run the following commands:

${snippet(meta.snippets.dependencies)}

and then add the following configuration to the `config.xml` file:

```xml
<feature name="InAppBrowser">
  <param name="ios-package" value="CDVInAppBrowser" />
  <param name="android-package" value="org.apache.cordova.inappbrowser.InAppBrowser" />
</feature>

<!-- Allow links to auth0 -->
<access origin="*.auth0.com" />
```

In addition to the whitelist, you must update the [Content Security Policy](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-whitelist/#content-security-policy) in your application to match the requirements of your application. Please note that you'll need to set the CSP in every page of the application for SPAs this usually the `index.html`. To do so add teh following to the `<head>` of the `.html` files in your application:

```xml
    <!-- Good default declaration:
    * gap: is required only on iOS (when using UIWebView) and is needed for JS->native communication
    * https://ssl.gstatic.com is required only on Android and is needed for TalkBack to function properly
    * Disables use of eval() and inline scripts in order to mitigate risk of XSS vulnerabilities. To change this:
        * Enable inline JS: add 'unsafe-inline' to default-src
        * Enable eval(): add 'unsafe-eval' to default-src
    * https://${account.namespace}.auth0.com is required to make calls to the authentication api
    * https://cdn.auth0.com/ is needed to load scripts from Auth0
    * Create your own at http://cspisawesome.com
    -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: 'unsafe-inline' https://ssl.gstatic.com https://${account.namespace}.auth0.com; style-src 'self' 'unsafe-inline' https://cdn.auth0.com; media-src *; img-src https:; font-src https://cdn.auth0.com;" />
```

## 3. Follow the Front End Quickstarts

Follow the [quickstart guide](/quickstart/spa) for the specific technology you are using in your Cordova app.

::: note
Cordova doesn't support getting dependencies from a CDN, so it is necessary to download the JavaScript and CSS dependencies locally and then point to the downloaded files.
:::

::: note
You must use `popup` mode when configuring an application with Cordova. This can be done by setting `redirect: false` in the options object for Lock. See the [Lock customization](/libraries/lock/v9/customization) documentation for more.
:::

## 4. Logout

To implement logout you need to simply delete stored token and show login page. With using JQuery you can do it like this:

```html
//index.html

<button class="btn btn-lg btn-primary btn-logout">Logout</button>
```

```js
//app.js
$('.btn-logout').click(function(e) {
  e.preventDefault();
  $('.login-box').show();
  $('.logged-in-box').hide();
  localStorage.removeItem('userToken');
});
```

### Troubleshooting

#### Command failed with exit code 65 when running cordova build

This means that the `InAppBrowser` plugin wasn't installed successfully by Cordova. Try any of the following:

* Reinstall the plugins

```bash
cordova plugin remove cordova-plugin-inappbrowser
cordova plugin remove cordova-plugin-whitelist
cordova plugin add cordova-plugin-inappbrowser
cordova plugin add cordova-plugin-whitelist
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
cp plugins/cordova-plugin-whitelist/src/ios/* platforms/ios/[yourAppName]/Plugins/cordova-plugin-whitelist/
```
Android:
```bash
cp plugins/cordova-plugin-inappbrowser/src/android/* platforms/android/[yourAppName]/Plugins/cordova-plugin-inappbrowser/
cp plugins/cordova-plugin-whitelist/src/android/* platforms/android/[yourAppName]/Plugins/cordova-plugin-whitelist/
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
