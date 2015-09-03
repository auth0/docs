---
title: Cordova Tutorial
name: Cordova
alias:
  - cordova
language:
  - Javascript
framework:
  - Cordova
hybrid: true
image: /media/platforms/phonegap.png
tags:
  - quickstart
snippets:
  dependencies: native-platforms/cordova/dependencies
  setup: native-platforms/jquery/setup
  use: native-platforms/jquery/use
alias:
  - apache-cordova
---

## Cordova Tutorial

<%= include('../_includes/package', {
  pkgRepo: 'auth0-cordova',
  pkgBranch: 'master',
  pkgPath: 'examples/basic-sample',
  pkgFilePath: 'examples/basic-sample/www/js' + account.clientParam,
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

Now, you can just follow the tutorial for the FrontEnd technology that you're using. We currently support applications using [jQuery](/new/client-platforms/jquery), [AngularJS](/new/client-platforms/angularjs) and [Vanilla JS](/new/client-platforms/vanillajs).

> **Warning**: Cordova doesn't support getting dependencies from a CDN, so you're going to have to download the JS and CSS dependencies locally and then point to the downloaded files.

> **Warning**: You must use `popup` mode when configuring an application with Cordova. (All available guides currently do that by default)

### 4. Sit back and relax

Now it's time to sit back, relax and open a beer. You've implemented Login and Signup with Auth0 and Cordova.

### Troubleshooting

#### Command failed with exit code 65 when running ionic build

This means that the `InAppBrowser` plugin wasn't installed successfully by Cordova. Try any of the followings to fix this.

* Reinstall the `InAppBrowser` plugin

```bash
ionic plugin remove org.apache.cordova.inappbrowser
ionic plugin add org.apache.cordova.inappbrowser
```
* Remove the platform and re add it

```bash
ionic platform remove ios
ionic platform add ios
```

* Copy the contents from the plugin to the platform plugins

```bash
cp plugins/org.apache.cordova.inappbrowser/src/ios/* platforms/ios/[yourAppName]/Plugins/org.apache.cordova.inappbrowser/
```

#### Get a blank page with an OK after signin

This means that the `InAppBrowser` plugin wasn't installed successfully by Cordova. See the previous section to learn how to solve this.
