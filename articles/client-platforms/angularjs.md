---
title: AngularJS Tutorial
name: Angular.js
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
snippets:
  dependencies: client-platforms/angularjs/dependencies
  setup: client-platforms/angularjs/setup
  use: client-platforms/angularjs/use
alias:
  - angular
---

## AngularJS Tutorial

One of the most painful aspects of an Angular App is authentication. It becomes increasingly more complex when there is an app with routes that require authentication. Auth0 cares about authentication deeply and that is why by the end of this tutorial, you will not only be able to add Auth0 to an Angular app, but you will gain insights on how you can use JWT in a regular Angular application as well.

<%= include('../_includes/_package', {
  pkgRepo: 'auth0-angular',
  pkgBranch: 'master',
  pkgPath: 'examples/widget-redirect',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

### Prerequisites
::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* NodeJS 4.4
* Angular version 1.5.0-rc.0
:::

#### Create an Application Instance

Let's start with first and simplest step. Create an Auth0 account and an authentication application via the dashboard. Once you create an app, you'll be provided with credentials (Domain, Client ID, and Client Secret) which should be stored somewhere safe (do not commit this information to your git repo!).

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

::: panel-info System Requirements
Every instance of the seed project comes configured with your `Default App` credentials. Awesome right?
:::

#### Configure Callback URLs

Callback URLs are URLs that Auth0 invokes after the authentication process. It is especially useful in OAuth. Callback URLs can be manipulated on the fly and that could be harmful.

For security reasons, you will need to add your application's URL in the app's `Allowed Callback URLs`. This will enable Auth0 to recognize the URLs as valid. If omitted, authentication will not be successful for the app instance.

![Callback error](/media/articles/angularjs/callback_error.png)

### Authentication in 3 Steps

We will stick with a simple structure for this tutorial:
```bash
|---app.js
|---templates
|------login.html
|------home.html
|---index.html
```
A lot of our angular applications will look like this one.

Going through these following steps, you'll be able to replicate this process on your own Angular applications.

#### Step 1: Setup Scripts and Viewport
Some JavaScript dependencies are required for Auth0 to work as expected in an Angular app. Include the dependencies' scripts in yout `index.html`:

${snippet(meta.snippets.dependencies)}

These may seem like a lot of dependencies, but each one has a very important function. Go through and figure out if each package works for your use case. Feel free to strip off the unnecessary packages.

 - **lock** is the default authentication widget provided by Auth0. It is completely optional but I suggest you stick to it as an Auth0 newbie.
 - **angular** is Angular's main library which you are building the application on.
 - **angular-cookies** is Angular's wrapper for managing client cookies.
 - **angular-route** is used to mange SPA routes in Angular application.
 - **auth0-angular**: Auth0's SDK for Angular. Exposes most of the useful methods for authentication
 - **angular-storage**: A `localStorage` and `sessionStorage` wrapper create with love by Auth0 team.
 - **angular-jwt**: Angular service that makes using JWT easy in Angular apps

Right after including the scripts, add a viewport to make the lock widget fit in to device widths:

```markup
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

With all that, our entire `<head>` will basically look like this:

${snippet(meta.snippets.head)}

#### Step 2: Configure The Angular Application
To use Auth0, your Angular App need to depend on the Auth0 SDK and other helpful dependencies like `ngRoute`, `angular-storage` and `angular-jwt`:

```javascript
//app.js
var app = angular.module('YOUR-APP-NAME', ['auth0', 'angular-storage', 'angular-jwt', 'ngRoute'])
```
An Angular-Auth0 app requires basically 3 configurations:

 - The route configuration
 - Auth0's credential config with `init()`
 - Event listeners to handle authentication status
 - Secured calls with HTTP interceptors

Let's break it down.

Angular's `config()` skeleton with required dependencies:
```javascript
app.config( function myAppConfig ( $routeProvider, authProvider, $httpProvider, $locationProvider,
  jwtInterceptorProvider) {

})
```

The `authProvider` dependency is Auth0's API that exposes some methods which we will see how to make use of in a jiffy.

Next, configure the routes you need:

```javascript
 // ...config
 // Confugure routes for your application
  $routeProvider
    .when( '/', {
      controller: 'HomeCtrl',
      templateUrl: 'templates/home.html',
      requiresLogin: true
    })
    .when( '/login', {
      controller: 'LoginCtrl',
      templateUrl: 'templates/login.html',
      pageTitle: 'Login'
    });
   // ...config
```

Notice that the routes that allow only authenticated users have a property `requiresLogin` set to `true`.

> If you want to use UI-Router, see [UI-Router](https://github.com/auth0/auth0-angular/blob/master/docs/routing.md#ui-router)

Now configure Auth0's credentials with the `init()` method:

${snippet(meta.snippets.auth_init)}

The `loginUrl` is the URL to be redirected to if authentication is not successful.

Event listeners are available to handle different status of authentication. They are also configured in the `config()` method:

```javascript
//Called when login is successful
authProvider.on('loginSuccess', function($location, profilePromise, idToken, store) {
console.log("Login Success");
profilePromise.then(function(profile) {
  store.set('profile', profile);
  store.set('token', idToken);
});
$location.path('/');
});

//Called when login fails
authProvider.on('loginFailure', function() {
  alert("Error");
});

//Called when user is authenticated (Authentication flag is true)
authProvider.on('authenticated', function($location) {
  console.log("Authenticated");
});
```

The most prominent part of this code is the `loginSuccess` where we store the credentials and redirect the user after a successful login.

AngularJS interceptors offer a convenient way to modify request made by the $http service both before they are sent and after they return. This makes them handful for securing API endpoints:

```javascript
//Angular HTTP Interceptor function
jwtInterceptorProvider.tokenGetter = function(store) {
    return store.get('token');
}
//Push interceptor function to $httpProvider's interceptors
$httpProvider.interceptors.push('jwtInterceptor');
```

With just that little bit of code, Angular will now attach the JWT token to any $http call created within your Angular application.

####Step 3: Login and Logout

You have successfully configured you Angular App to use Auth0. Configs are vital but won't run an app, right? Let's add a login functionality:

```javascript
app.controller( 'LoginCtrl', function ( $scope, auth) {

  $scope.auth = auth;

});
```
 `auth` is one of the goodies you get for including `auth0` as one of the dependencies. With `$scope.auth`, you can make a binding to the view:

```markup
<a href="#" ng-click="auth.signin()">Sign In</a>
```
IMAGE HERE (The lock screen image)

 At this point, the lock widget will pop up showing a Sign In form,  when you click the `Sign In` button. You can change this behavior and make it show the Sign Up form:

```markup
<a href="#" ng-click="auth.signup()">Sign Up</a>
```

The event listeners that we created in our app's config will be called to handle the sign in process.

Logout is always a straight-forward process - sign out, then clear stored credentials:

```javascript
$scope.logout = function() {
  auth.signout();
  store.remove('profile');
  store.remove('token');
  $location.path('/login');
}
```

`auth` still to the rescue exposes a mothod `signout()` that simply logs the user out. The `store`'s `remove()` methods takes in an argument of what value it should clear from `localStorage`.

### Password Reset
The password reset trip is a breeze. Just like `signup()`, `signin()` and `signout()`, the `auth` object also provides a method for resetting password which is `reset()`:


```javascript
app.controller( 'LoginCtrl', function ( $scope, auth) {

//... login logic

$scope.resetPassword = function(){
   auth.reset({
      connection: 'Username-Password-Authentication'
    });
};

});
```

`Username-Password-Authentication` is the name of my connection which is available via your dashboard. You can go ahead to add the reset button in your template:

```markup
<a href="#" ng-click="auth.reset()">Reset Password</a>
```

### Authorization with Rules

Authorization is assigning responsibilities and boundaries to users using roles. Such roles could be admin, moderator, author, doctor, or whatever suites the context of your application.

All authenticated users are not to have access to the same resource and to restrict them, we use authorization. Auth0 uses a concept called "rules" to manage filters and restrictions. Rules is the best fit for implementing authorization in an Auth0 powered app.

#### Create a Rule With an Existing Template

> Rule Templates make creating rules very simple. Most situations you can think of already have a template so you do not have to create from scratch

Rules are managed via your [dashboard](https://manage.auth0.com/#/rules). You can create a fresh rule or select a template if one suits you. A situation like roles already has a template named "Set roles to user" under the "Access Control" section. Click on the template and update the `addRolesToUser` function:

![Rules templates](/media/articles/angularjs/rule_template.png)

```javascript
function (user, context, callback) {
//  ...
  var addRolesToUser = function(user, cb) {
    if (user.email.indexOf('YOUR_EMAIL_HERE') > -1) {
      cb(null, ['admin']);
    } else {
      cb(null, ['user']);
    }
  };
// ...
}
```

The only change to the entire function snippet is just to update the filter that adds roles to a user. For the tutorial, use your email so you alone can be set as admin.

Believe me, that is all it takes to assign a role to a user. You can log the `profile` of a user in the `loginSuccess` event listener and inspect the available roles.

![JSON Log](/media/articles/angularjs/json_log.png)

### How About Page Reloads?

Page reload is a nightmare in Single Page Applications. If states are not managed well, once a page is refreshed, the states are lost. It is simple to keep things in sync even after a refresh thanks to this bit of code:

```javascript
app.run(function($rootScope, auth, store, jwtHelper, $location) {
  $rootScope.$on('$locationChangeStart', function() {

    var token = store.get('token');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          //Re-authenticate user if token is valid
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        // Either show the login page or use the refresh token to get a new idToken
        $location.path('/');
      }
    }
  });
})
```
Angular's `run()` has become handy here. The `run()` method is called every time angular is instantiated therefore giving us the power to restore the state of our application with the data in our stores (`localStorage` or `cookies`).

The logic just checks for an available token that is yet to expire and then re-authenticates the user. If not, the user is sent back to the login page.

### Conclusion

We have just touched the tip of the iceberg. There are lots of cool features available with Auth0 and the Auth0 Angular SDK. See [Auth0 and AngularJS](https://github.com/auth0/auth0-angular/blob/master/README.md) for more details and use cases for integrating Auth0 into your own apps.
