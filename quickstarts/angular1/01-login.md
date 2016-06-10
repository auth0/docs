---
title: Login
name: Angularjs-login
alias:
  - angular
  - angularjs
language:
  - Javascript
framework:
  - AngularJS
image: /media/platforms/angular.png
tags:
  - quickstart
  - angular
snippets:
  dependencies: /quickstarts/angular1/snippets/dependencies
  init: /quickstarts/angular1/snippets/init
  head: /quickstarts/angular1/snippets/head
alias:
  - angular
---


TODO: Find out how to configure angular-sample URL
<%= include('../_includes/_package', {
  pkgRepo: 'auth0-angular',
  pkgBranch: 'master',
  pkgPath: 'examples/widget-redirect',
  pkgFilePath: null,
  pkgType: 'js'
}) %>_

::: panel-info Running the Sample
At any point in time you can run this sample with a simple HTTP server. One example is http-server which can be installed with `npm install -g http-server`. Run `http-server` on the root directory of the sample to launch.
:::

#### 1: Configure The Angular Application
To use Auth0, your Angular app instance **MUST** depend on the Auth0 SDK:

```javascript
/* ===== ./app.js ===== */
angular.module('app', ['auth0', 'angular-storage', 'angular-jwt', 'ngRoute']);
```
We also injected the supporting dependencies as we will need them while we move on.

It is common to forget to bootstrap your app. You can do that the simple way in your entry `index.html` file (seed project already handled this):

```html
<html ng-app="YOUR-APP-NAME">
```

An Angular-Auth0 app requires basically 2 configurations:

 - Auth0's application credential configuration with the `init()`
 - Event listeners to handle authentication status

We just need the configuration for now and you can achieve that by using `auth0`'s `authProvider`:

Angular's `config()` skeleton with required dependency:
```javascript
/* ===== ./app.js ===== */
app.config( function myAppConfig (authProvider) {
  //authProvider init configuration
})
```

The `init()` method is used to configure Auth0 Angular SDK:

${snippet(meta.snippets.init)}

#### 2: Login

You have successfully configured you Angular App to use Auth0. Configs are vital but won't run an app, right? Let's add a login functionality:

```javascript
/* ===== ./login/login.js ===== */
app.controller('LoginCtrl', ['$scope', 'auth', function ($scope, auth) {

  $scope.login = function(){
    auth.signin();
  }

}]);
```

Your controller needs to depend on `auth` so as to have access to it's methods. You can bind the function as an event to an on-click even in your view:
```html
<!-- ===== ./login/login.html ===== -->
<a ng-click="login()">Login</a>
```

At this point, the lock widget will pop up showing a Sign In form,  when you click the Login button. If you choose not to use Lock, you will be redirected to Auth0 to login. The widget has options for non-existing users to signup or reset there passwords.

${browser}

Your app will need to exit and the user taken to the authentication provider when you try to login. After authentication, the user will be redirected to the app but with all states of the app lost (or rather reset). The implication is that callbacks cannot be used with `auth.signin()`, therefore, no way to get hold of user authentication details. You can use events provided in the SDK to manage lifecycle efficiently. The events are configured in the `config method`:

```javascript
/* ===== ./app.js ===== */
//Called when login is successful
authProvider.on('loginSuccess', ['$location', 'profilePromise', 'idToken', function($location, profilePromise, idToken) {
  // Successfully log in
  // Access to user profile and token
  profilePromise.then(function(profile){
    // profile
  });
  $location.url('/');
}]);

//Called when login fails
authProvider.on('loginFailure', function() {
  // If anything goes wrong
});
```

### Routes Access Restrictions
You can protect Angular routes that you do not want guest users to have access to. You do so by adding another property called `requiresLogin` to the routes configuration:

```javascript
/* ===== ./app.js ===== */
$routeProvider
  .when( '/', {
    controller: 'HomeCtrl',
    templateUrl: 'home/home.html',
    requiresLogin: true
  })
  .when( '/settings', {
    controller: 'SettingsCtrl',
    templateUrl: 'settings/settings.html',
    requiresLogin: true
  })
  .when( '/login', {
    controller: 'LoginCtrl',
    templateUrl: 'login/login.html'
  });
 // ...rest of config
```

Then in init method, add a fallback URL when a user is denied access:

```javascript
authProvider.init({
  domain: 'YOUR_DOMAIN',
  clientID: 'YOUR_CLIENT_ID',
  loginUrl: '/login'
});
```

If you choose to use UI Router:

```javascript
$stateProvider
  .state('settings', {
    url: '/settings',
    templateUrl: 'settings/settings.html',
    controller: 'SettingsCtrl',
    data: { requiresLogin: true }
  })
  .state('login', {
    url: '/login',
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
```

```javascript
authProvider.init({
  domain: 'YOUR_DOMAIN',
  clientID: 'YOUR_CLIENT_ID',
  loginState: 'login'
});
```

### Handling Tokens and Re-authenticating Users
As you have seen, it is difficult to manage states in SPA if you are dealing with a lot of redirects and page reloads. One thing you need to make available to the client (browser) no matter what actions the user perform is the authentication token. What you can do is use the Angular Storage library to persist users tokens and profile details to the browser's storage (sessionStorage or localStorage). With that strategy, you can always use the user's profile to re-authenticate them, or do a token refresh if the token is no longer valid. Update the `signin` logic to store the credentials prior to authentication:

```javascript
/* ===== ./login/login.js ===== */
app.controller('LoginCtrl', ['$scope', 'auth', 'store', function ($scope, auth, store) {

  $scope.login = function(){
    // Set popup to true to use popup
    auth.signin({popup: true}, function(profile, token){
      store.set('profile', profile);
      store.set('token', idToken);
    }, function(err){
      // If anything goes wrong
    });
  }

}]);

// ====================== OR
/* ===== ./app.js ===== */
//Called when login is successful
authProvider.on('loginSuccess', ['$location', 'profilePromise', 'idToken', 'store', function($location, profilePromise, idToken, store) {
  // Successfully log in
  // Access to user profile and token
  profilePromise.then(function(profile){
    // profile
    store.set('profile', profile);
    store.set('token', idToken);
  });
  $location.url('/');
}]);

```

With a persisted token and profile, you can do the following when you loose state (eg: page reload):

```javascript
.run(['$rootScope', 'auth', 'store', 'jwtHelper', '$''location', function($rootScope, auth, store, jwtHelper, $location) {
  // Listen to a location change event
  $rootScope.$on('$locationChangeStart', function() {
    // Grab the user's token
    var token = store.get('token');
    // Check if token was actually stored
    if (token) {
      // Check if token is yet to expire
      if (!jwtHelper.isTokenExpired(token)) {
        // Check if the user is not authenticated
        if (!auth.isAuthenticated) {
          // Re-authenticate with the user's profile
          // Calls authProvider.on('authenticated')
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        // Either show the login page
        // $location.path('/');
        // .. or
        // or use the refresh token to get a new idToken
        auth.refreshIdToken(token);
      }
    }

  });
}])
```

First thing to note is that we just introduced a dependency which is from the Angular JWT library. The `jwtHelper` helps you to check if the user's token is valid by passing the token to it's `isTokenExpired()` method. The most interesting to to note is that we listen to Angular's location change event, so some important check on the token and authentication status, and then re-authenticate the user with the stored profile. If the token is invalid, you have the option to redirect the user to login, or refresh their token with the expired token.

It is also important to remember that the following event is called after re-authenticating:

```js
authProvider.on('authenticated', function() {
  // if user is authenticated.
  // Useful in re-authentication
});
```


### Recap
You have seen how to:
- Setup Auth0 in an Angular project
- Configure Angular with Auth0 credentials and authentication status events
- Authentication
- Managing routes
- Handling tokens
- Battling SPA challenges
