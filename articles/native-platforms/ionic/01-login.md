---
title: Login
description: This tutorial will show you how to use the Auth0 Ionic SDK to add authentication and authorization to your mobile app.
---

## Ionic Framework Tutorial

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* NodeJS 4.3.0
* Ionic 1.7.14
* Cordova 6.0.0
* ios-sim 5.0.6
:::

<%= include('../../_includes/_package', {
  pkgRepo: 'auth0-ionic',
  pkgBranch: 'master',
  pkgPath: 'examples/refresh-token-sample',
  pkgFilePath: 'examples/refresh-token-sample/www/js',
  pkgType: 'js'
}) %>

**Otherwise, if you already have an existing application, please follow the steps below.**

### 1. Set up the callback URL in Auth0

<div class="setup-callback">
<p>Go to the <a href="${uiAppSettingsURL}">Application Settings</a> section in the Auth0 dashboard and make sure that <b>Allowed Callback URLs</b> contains the following value:</p>

<pre><code>https://${account.namespace}/mobile</pre></code>

<p>Also, if you are testing your application locally, make sure to add your local URL as an Allowed Callback URL and the following as an Allowed Origin (CORS):</p>

<pre><code>file://\*</code></pre>

</div>

### 2. Add the Auth0 dependencies

Add the following dependencies to the `bower.json` and run `bower install`:

${snippet(meta.snippets.dependencies)}

### 3. Add the references to the scripts in the `www/index.html` file

```html
<!-- Auth0 Lock -->
<script src="lib/auth0-lock/build/auth0-lock.js"></script>
<!-- auth0-angular -->
<script src="lib/auth0-angular/build/auth0-angular.js"></script>
<!-- angular storage -->
<script src="lib/a0-angular-storage/dist/angular-storage.js"></script>
<!-- angular-jwt -->
<script src="lib/angular-jwt/dist/angular-jwt.js"></script>
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

### 5. Add the module dependencies and configure the service

Add the `auth0`, `angular-storage` and `angular-jwt` module dependencies to your angular app definition and configure `auth0` by calling the `init` method of the `authProvider`

${snippet(meta.snippets.setup)}

> Note: there are more properties available in `authProvider.init({...})`. For more details [check the GitHub repo](https://github.com/auth0/auth0-angular#authproviderinitoptions--authinitoptions).

### 6. Implement the login

Now we're ready to implement the Login. We can inject the `auth` service in any controller and just call the `signin` method to show the Login / SignUp popup.
In this case, we'll add the call in the `login` method of the `LoginCtrl` controller. On login success, we'll save the user's profile, token and [refresh token](/refresh-token) into `localStorage`

${snippet(meta.snippets.use)}

> Note: there are multiple ways of implementing the login. What you see above is the Login Widget, but if you want to have your own UI you can change `<script src="lib/auth0-lock/build/auth0-lock.js"></script>` for `<script src="//cdn.auth0.com/w2/auth0-6.8.js"></script>`. For more details [check the GitHub repo](https://github.com/auth0/auth0-angular#using-auth0-lock-no-need-to-build-a-custom-ui).

### 7. Add a logout button

You can just call the `signout` method of Auth0 to log the user out. You should also remove the information saved into `localStorage`:

```js
$scope.logout = function() {
  auth.signout();
  store.remove('profile');
  store.remove('token');
}
```

```html
<input type="submit" ng-click="logout()" value="Log out" />
```
### 8. Configure secure calls to your API

As we're going to call an API we did<%= configuration.api ? ' on ' + configuration.api : '' %>, we need to make sure we send the [JWT token](/jwt) we receive on the login on every request. For that, we need to add the `jwtInterceptor` to the list of `$http` interceptors. Also, as JWTs expire, we'll use the `refreshToken` to get a new JWT if the one we have is expired:

```js
// app.js
myApp.config(function (authProvider, $routeProvider, $httpProvider, jwtInterceptorProvider) {
  // ...

  jwtInterceptorProvider.tokenGetter = function(store, jwtHelper, auth) {
    var idToken = store.get('token');
    var refreshToken = store.get('refreshToken');
    // If no token return null
    if (!idToken || !refreshToken) {
      return null;
    }
    // If token is expired, get a new one
    if (jwtHelper.isTokenExpired(idToken)) {
      return auth.refreshIdToken(refreshToken).then(function(idToken) {
        store.set('token', idToken);
        return idToken;
      });
    } else {
      return idToken;
    }
  }

  $httpProvider.interceptors.push('jwtInterceptor');
  // ...
});
```

Now, you can regularly call your API with `$http`, `$resource` or any rest client as you'd normally do and the [JWT token](/jwt) will be sent on every request.

### 9. Show the user's information

After the user has logged in, we can get the `profile` property from the `auth` service which has all the user information:

```html
<!-- user-info.html -->
<span>His name is {{auth.profile.nickname}}</span>
```

```js
angular.module('starter.controllers', [])

.controller('UserInfoCtrl', function($scope, auth) {
  $scope.auth = auth;
}
```

You can [click here](/user-profile) to find out all of the available properties from the user's profile. Please note that some of these depend on the social provider being used.

### 10. Keep the user logged in after app switching

When the user exits your app, the mobile OS (iOS or Android) may unload your app at will to recover some RAM.

We already saved the user profile and tokens into `localStorage`. We just need to check for their existence and, if possible, fetch them when your app loads and let `auth0-angular` know that the user is already authenticated.

```js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'auth0', 'angular-storage', 'angular-jwt'])
.run(function($ionicPlatform, $rootScope, auth, store, jwtHelper, $location) {
  $ionicPlatform.ready(function() {...});
  //This hooks all auth avents
  auth.hookEvents();
  //This event gets triggered on URL change
  var refreshingToken = null;
  $rootScope.$on('$locationChangeStart', function() {
    var token = store.get('token');
    var refreshToken = store.get('refreshToken');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        if (refreshToken) {
          if (refreshingToken === null) {
            refreshingToken = auth.refreshIdToken(refreshToken).then(function(idToken) {
              store.set('token', idToken);
              auth.authenticate(store.get('profile'), idToken);
            }).finally(function() {
              refreshingToken = null;
            });
          }
          return refreshingToken;
        } else {
          $location.path('/login');// Notice: this url must be the one defined
        }                          // in your login state. Refer to step 5.
      }
    }
  });
});
```


### 11. Sit back and relax

Now it's time to sit back, relax and open a beer. You've implemented Login and Signup with Auth0 and Ionic.


### Troubleshooting

#### Command failed with exit code 65 when running ionic build

This means that the `InAppBrowser` plugin wasn't installed successfully by Cordova. Try any of the followings to fix this.

* Reinstall the `InAppBrowser` plugin

```bash
ionic plugin remove cordova-plugin-inappbrowser
ionic plugin add cordova-plugin-inappbrowser
```
* Remove the platform and re add it

```bash
ionic platform remove ios
ionic platform add ios
```

* Copy the contents from the plugin to the platform plugins

```bash
cp plugins/cordova-plugin-inappbrowser/src/ios/* platforms/ios/[yourAppName]/Plugins/cordova-plugin-inappbrowser/
```

#### Get a blank page with an OK after signin

This means that the `InAppBrowser` plugin wasn't installed successfully by Cordova. See the previous section to learn how to solve this.

#### Get error `We could not reach the server. Please try again`

This means you need to install `cordova-plugin-whitelist` by running following command:

```bash
ionic plugin add cordova-plugin-whitelist
```

After that configure your `config.xml` by adding or overriding following instructions:

```
<allow-navigation href="*.auth0.com" />
<access origin="*.auth0.com" />
```
