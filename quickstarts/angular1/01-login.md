---
title: Setup and Authentication
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

This is the very beginning of a simple, practical and multi-step quickstart that will guide you through managing authentication in your Angular JS apps with Auth0.

Auth0 provides and manages an [AngularJS SDK](https://github.com/auth0/auth0-angular). This SDK wraps Auth0's [Lock Widget](https://github.com/auth0/lock) and Auth0.js(https://github.com/auth0/auth0.js) which makes it easy to use any of them. It uses which ever is included in your project or Lock if both are included. It is also important to keep in mind before we get down to business that Auth0 supports authentication in both redirect and pop-up modes. It is important because SPAs do not retain states after a page reloads (as well as redirect) but the SDK makes tackling this situation simple as you will see soon.

## Seed & Samples

There are two options to following along these steps. You can either download the [seed project](https://github.com/auth0-samples/auth0-angularjs-sample/tree/master/00-Starter Seed) or the samples. The seed is a regular angular app with nothing on Auth0 in it except for the dependencies included in the HTML. It just serves as a starting point as well building blocks for this quickstart. The samples are included in each step and contains the example for each of the step.


## Create an Application

TODO: Find out how to configure angular-sample URL
<%= include('../_includes/_package', {
  pkgRepo: 'auth0-angular',
  pkgBranch: 'master',
  pkgPath: 'examples/widget-redirect',
  pkgFilePath: null,
  pkgType: 'js'
}) %>_

<%= include('../_includes/_new_app') %>_

![App Dashboard](/media/articles/angularjs/app_dashboard.png)


::: panel-info Running the Sample
At any point in time you can run this sample with a simple HTTP server. One example is http-server which can be installed with `npm install -g http-server`. Run `http-server` on the root directory of the sample to launch.
:::


## Configure Callback URLs

Callback URLs are URLs that Auth0 invokes after the authentication process. Auth0 routes your application back to this URL and attaches some details to it including a token. Callback URLs can be manipulated on the fly and that could be harmful. For security reasons, you will need to add your application's URL in the app's `Allowed Callback URLs`. This will enable Auth0 to recognize the URLs as valid. If omitted, authentication will not be successful for the app instance.

![Callback error](/media/articles/angularjs/callback_error2.png)

## Authentication

Throughout the steps, the seed and samples will have the following directory structure:
```bash
|---home
|------home.html
|------home.js
|---login
|------login.html
|------login.js
|---settings
|------settings.html
|------settings.js
|---app.js
|---index.html
```

#### 1: Setup Scripts and Viewport
Some JavaScript dependencies are required for Auth0 to work as expected in an Angular app. Include the dependencies' scripts in your `index.html`:

${snippet(meta.snippets.dependencies)}

These may seem like a lot of dependencies, but each one has a very important function. Go through and figure out if each package works for your use case. Feel free to strip off the unnecessary packages.

 - **lock** is the default authentication widget provided by Auth0. It is completely optional but I suggest you stick to it as an Auth0 newbie.
 - **auth0.js** is Auth0's javascript library. This is not necessary if you choose to use Lock throughout.
 - **angular** is Angular's main library which you are building the application on.
 - **angular-cookies** is Angular's wrapper for managing client cookies.
 - **angular-route** is used to mange SPA routes in Angular application.
 - **auth0-angular**: Auth0's SDK for Angular. Exposes most of the useful methods for authentication
 - **angular-storage**: A `localStorage` and `sessionStorage` wrapper create with love by Auth0 team.
 - **angular-jwt**: Angular service that makes using JWT easy in Angular apps.

The seed project already have this files included, injected into angular (where applicable) and ready for use.

Right after including the scripts, add a viewport to make the lock widget fit in to device widths:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

With all that, our entire `<head>` will look like this:

${snippet(meta.snippets.head)}

#### 2: Configure The Angular Application
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

#### 3: Login

You have successfully configured you Angular App to use Auth0. Configs are vital but won't run an app, right? Let's add a login functionality. As mentioned at the beginning of this quickstart, you can authenticate using pop-up or redirect method. The following example shows how to handle authentication using pop-up:

```javascript
/* ===== ./login/login.js ===== */
app.controller('LoginCtrl', ['$scope', 'auth', function ($scope, auth) {

  $scope.login = function(){
    // Set popup to true to use popup
    auth.signin({popup: true}, function(profile, token){
      // Access to user profile and token
    }, function(err){
      // If anything goes wrong
    });
  }

}]);
```

Your controller needs to depend on `auth` so as to have access to it's methods. You can bind the function as an event to an on-click even in your view:
```html
<!-- ===== ./login/login.html ===== -->
<a ng-click="login()">Login</a>
```

At this point, the lock widget will pop up showing a Sign In form,  when you click the Login button. The widget has options for non-existing users to signup or reset there passwords.

${browser}

Authentication with redirects is easy as well but has one challenge. Your app will need to exit and the user taken to the authentication provider. After authentication, the user will be redirected to the app but with all states of the app lost (or rather reset). The implication is that callbacks we used in the popup example will not be called, therefore, no way to get hold of user authentication details. You can use events provided in the SDK to manage this problem efficiently. The events are configured in the `config method`:

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

All you just need to do is add the create a binding in you controller:

```javascript
function loginCtrlFunc($scope, auth){
  $scope.auth = auth;  
}
```

```html
<a ng-click="auth.signin()">Login with Redirect</a>
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

As you can see, you still have access to the profile (though as a promise), and the token in the `loginSuccess` event. There is also a `loginFailure` event to manage failed authentication.

Moving the `singin()` logic into your controller rather than leaving it in the view will give you more control:

```javaScript
//app.js
$scope.signin = function (){
  auth.signin({}, //The first argument is used to configure Auth0
    function(profile, idToken){
      $scope.token = idToken;
    },
    function(err) {
      $scope.err = err;
    });
}
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
