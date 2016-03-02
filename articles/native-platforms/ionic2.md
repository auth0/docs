---
title: Ionic 2 Framework Tutorial
name: Ionic 2
alias:
  - ionic2
language:
  - Typescript
framework:
  - Angular2JS
  - Cordova
hybrid: true
image: /media/platforms/ionic.jpeg
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

### 2. Add the Auth0 dependencies

Add the following dependencies to the `package.json` and run `npm install`:

${snippet(meta.snippets.dependencies)}

### 3. Add the reference to Lock in the `www/index.html` file

```html
<!-- Auth0 Lock -->
<script src="${widget_url_no_scheme}"></script>
```

### 4. Add the `InAppBrowser` plugin

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
### 5. Import dependencies

To set up a simple component, you'll need some standard Angular 2 imports, as well as the `AuthHttp` class and `tokenNotExpired` function from `angular2-jwt` if you want to make secure calls to your API.

```ts
//app.ts
import {Alert, NavController} from 'ionic-framework/ionic';
import {NgZone} from 'angular2/core';
import {Http} from 'angular2/http';
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';

```

### 6. Configure Auth0Lock

Create an instance of the service.

${snippet(meta.snippets.setup)}

### 7. Implement the login

To implement the login, call the .show() method of Auth0's lock instance and then save the `id_token` and the `profile` in localStorage.

${snippet(meta.snippets.use)}

__Note:__ There are multiple ways of implementing a login. The example above displays the Login Widget. However you may implement your own login UI by changing the line <script src="//cdn.auth0.com/js/lock-8.2.min.js"></script> to <script src="//cdn.auth0.com/w2/auth0-6.8.js"></script>

### 8. Add a logout button

You can just remove the `id_token` and the `profile` from localStorage.

```js
logout() {
    this.zone.run(() => {
      localStorage.removeItem('profile');
      localStorage.removeItem('id_token');
    });
  }
```

```html
<button full (click)="logout()">Logout</button>
```

### 9. Configure secure calls to your API

As we're going to call an API we did <%= configuration.api ? ' on ' + configuration.api : '' %>, we need to send the JWT on the Authorization Header. For that we can use the `AuthHttp` class of the [angular2-jwt](https://github.com/auth0/angular2-jwt) package, which will provide a default configuration that obtains the JWT token from localStorage and establishes aspects such as header name, prefix and token name.

```js
// app.ts

constructor(public authHttp: AuthHttp) {}

callSecuredApi() {
    console.log("callSecuredApi");
    try {
      this.authHttp.get('http://example.com/api/secret')
          .subscribe(
              data => {
                console.log(data);
                this.showAlert("Success", data._body);
              },
              err => {
                console.log("There has been an error.");
                console.log(err)
                this.showAlert("Error");
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

If you want to call unsecured APIs you can simply make a `http.get` request.

### 10. Show user information

```js
//app.ts
this.user_name = profile.name;
this.user_email = profile.email;
```

```html
<!-- app.html -->
<span>Hi {{user_name}}!<br/>Your e-mail is:{{user_email}}</span><br/>
```

You can [click here](/user-profile) to find out all of the available properties from the user's profile. Please note that some of this depend on the social provider being used.

### 11. Sit back and relax

Now it's time to sit back and relax. You've implemented Login and Signup with Auth0 and Ionic 2.

### Troubleshooting

#### Get a blank page with an OK after signin

This means that the `InAppBrowser` plugin wasn't installed successfully by Cordova. Please try to reinstall it.

#### Get a completly blank page when launching the App

This could mean that either you've built the seed project using Ionic 1, or that the device where you are testing it isn't entirely supported by Ionic 2 yet.
