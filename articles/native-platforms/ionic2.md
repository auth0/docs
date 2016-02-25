---
title: Ionic 2 Framework Tutorial
name: Ionic 2
alias:
  - ionic2
language:
  - Javascript
framework:
  - Angular2JS
  - Cordova
hybrid: true
image: /media/platforms/phonegap.png
tags:
  - quickstart
snippets:
  dependencies: native-platforms/ionic2/dependencies
  setup: native-platforms/ionic2/setup
  use: native-platforms/ionic2/use
---

## Ionic 2 Framework Tutorial

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* NodeJS 4.2.0
* Ionic 2.0.0-alpha.48
* Angular 2.0.0-beta.0
* Cordova 6.0.0
* ios-sim 5.0.6
:::

<%= include('../_includes/_package', {
  pkgRepo: 'auth0-ionic',
  pkgBranch: 'master',
  pkgPath: 'examples/ionic2-auth0-sample',
  pkgFilePath: 'examples/ionic2-auth0-sample/app/auth0-variables.ts',
  pkgType: 'replace' + account.clientParam
}) %>

**Otherwise, if you already have an existing application, please follow the steps below.**

### 1. Setting up the callback URL in Auth0

<div class="setup-callback">
<p>Go to the <a href="${uiAppSettingsURL}">Application Settings</a> section in the Auth0 dashboard and make sure that <b>Allowed Callback URLs</b> contains the following value:</p>

<pre><code>https://${account.namespace}/mobile</pre></code>

<p>Also, if you are testing your application locally, make sure to add your local URL as an Allowed Callback URL and the following as an Allowed Origin (CORS):</p>

<pre><code>file://\*</code></pre>

</div>

### 2. Adding the Auth0 dependencies

Add the following dependencies to the `package.json` and run `npm install`:

${snippet(meta.snippets.dependencies)}

### 3. Add the references to the scripts in the `www/index.html` file

```html
<!-- Auth0 Lock -->
<script src="${widget_url_no_scheme}"></script>
```

### 4. Add `InAppBrowser` plugin

You must install the `InAppBrowser` plugin from Cordova to be able to show the Login popup. For that, just run the following command:

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

### 5. Add the module dependency and configure the service


${snippet(meta.snippets.setup)}


### 6. Let's implement the login


${snippet(meta.snippets.use)}


### 8. Configuring secure calls to our API

As we're going to call an API we did<%= configuration.api ? ' on ' + configuration.api : '' %>, we need to send the JWT
```js
// app.ts
callSecuredApi() {
    console.log("callSecuredApi");
    try {
      this.authHttp.get('http://localhost:3001/secured/ping')
          .subscribe(
              data => {
                console.log(data);
				        this.showAlert("Success", data._body); //
              },
              err => {
                console.log("There has been an error.");
                console.log(err)
                this.showAlert("Error", "You need to download the server seed and start it to call this API");
              },
              () => {
                console.log('Complete')
              }
          );
    } catch (e) {
      console.log("There has been an error.\n" + e);
      console.log(e);
      this.showAlert("Error", e + ". Please authenticate so that you can call this API");
    }
  }
```

Now, you can regularly call your API with `$http`, `$resource` or any rest client as you'd normally do and the [JWT token](/jwt) will be sent on every request.

### 9. Showing user information

After the user has logged in, we can get the `profile` property from the `auth` service which has all the user information:

```html
<!-- user-info.tpl.html -->
<span>His name is {{auth.profile.nickname}}</span>
```

```js
angular.module('starter.controllers', [])

.controller('UserInfoCtrl', function($scope, auth) {
  $scope.auth = auth;
}
```

You can [click here](/user-profile) to find out all of the available properties from the user's profile. Please note that some of this depend on the social provider being used.

### 11. Sit back and relax

Now it's time to sit back and relax. You've implemented Login and Signup with Auth0 and Ionic 2.

### Troubleshooting

#### Get a blank page with an OK after signin

This means that the `InAppBrowser` plugin wasn't installed successfully by Cordova. Please try to reinstall it.
