---
lodash: true
title: Phonegap Tutorial
name: Phonegap
alias:
  - phonegap
language: Javascript
hybrid: true
image: //auth0.com/lib/platforms-collection/img/phonegap.png
tags:
  - quickstart
snippets:
  dependencies: native-platforms/phonegap/dependencies
  setup: native-platforms/jquery/setup
  use: native-platforms/jquery/use
---

## Phonegap tutorial

# To Run the example

<p>In order to run the project, you need to have `node`, `cordova` and `ios-sim` installed.
Once you have that, just clone the project and run the following:</p>

<pre><code>cordova build ios</code></pre>
<pre><code>cordova emulate ios</code></pre>

<% if (configuration.api && configuration.thirdParty) { %>

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="/auth0-cordova/master/create-package?path=examples/phonegap-basic-sample&type=js&filePath=examples/phonegap-basic-sample/www/js@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

<% } else  { %>

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="/auth0-cordova/master/create-package?path=examples/phonegap-basic-sample&type=js&filePath=examples/phonegap-basic-sample/www/js@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

<% } %>

**Otherwise, if you already have an existing application, please follow the steps below.**

### 0. Setting up the callback URL in Auth0



<div class="setup-callback">
<p>Go to the <a href="@@uiAppSettingsURL@@">Application Settings</a> section in the Auth0 dashboard and make sure that <b>Allowed Callback URLs</b> contains the following value:</p>

<pre><code>https://@@account.namespace@@/mobile</pre></code>

<p>Also, if you are testing your application locally, make sure to add your local URL as an Allowed Callback URL and the following as an Allowed Origin (CORS):</p>

<pre><code>file://\*</code></pre>

</div>

### 1. Add `InAppBrowser` plugin

You must install the `InAppBrowser` plugin from Cordova to be able to show the Login popup. For that, just run the following command:

@@snippet(meta.snippets.dependencies)@@

> **Note**: If you're using __Phonegap Build__ service, you need to add the plugin using `<gap:plugin`. Please check [this phonegap guide for more information](http://docs.build.phonegap.com/en_US/configuring_plugins.md.html#importing-native)

### 2. Follow the guide specific to the FrontEnd technology you're using

Now, you can just follow the tutorial for the FrontEnd technology that you're using. We currently support applications using [jQuery](/new/client-platforms/jquery), [AngularJS](/new/client-platforms/angularjs) and [Vanilla JS](/new/client-platforms/vanillajs).

> **Warning**: Phonegap doesn't support getting dependencies from a CDN, so you're going to have to download the JS and CSS dependencies locally and then point to the downloaded files.

> **Warning**: You must use `popup` mode when configuring an application with Phonegap. (All available guides currently do that by default)

### 3. Sit back and relax

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

This could mean that the `InAppBrowser` plugin wasn't installed successfully by Cordova. If you are seeing this error only when viewing your app in the ionic viewer app, <a href="http://forum.ionicframework.com/t/does-ionic-view-support-cordova-inappbrowser/18021/3">this article</a>  suggests that `InAppBrowser` is not yet supported. You can verify this by running the app in your emulator or in the browser. See the previous section to learn how to solve this.
