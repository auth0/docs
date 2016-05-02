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

## Setup and Authentication

One of the most aching aspects of an Angular App is authentication. It becomes worse when you have routes to protect, page refresh to deal with, tokens to manage, multi-factor authentication, and so on. This quickstart is planned to help you tackle these challenges.

This is the very beginning of a simple, practical and multi-step quickstart that will guide you through managing authentication in your Angular JS apps with Auth0.

TODO: Find out how to configure angular-sample URL
<%= include('../_includes/_package', {
  pkgRepo: 'auth0-angular',
  pkgBranch: 'master',
  pkgPath: 'examples/widget-redirect',
  pkgFilePath: null,
  pkgType: 'js'
}) %>_

::: panel-info Running the Sample
At any point in time, you can run the sample with `http-server`. First install with `npm install -g http-server` then run `http-server` on the root directory of the sample.
:::

### Create an Application Instance

Create an [Auth0 account](https://manage.auth0.com/login) and an authentication application from the [dashboard](https://manage.auth0.com/#/). Once you create an app, you'll be provided with credentials (Domain, Client ID, and Client Secret) which should be stored somewhere safe (do not commit this information to your git repo!).

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

::: panel-info Default Configuration
Every instance of the seed project comes configured with your `Default App` credentials. Awesome right?
:::

### Configure Callback URLs

Callback URLs are URLs that Auth0 invokes after the authentication process. It is especially useful in OAuth. Callback URLs can be manipulated on the fly and that could be harmful.

For security reasons, you will need to add your application's URL in the app's `Allowed Callback URLs`. This will enable Auth0 to recognize the URLs as valid. If omitted, authentication will not be successful for the app instance.

![Callback error](/media/articles/angularjs/callback_error2.png)

### Authentication in 3 Steps

We will stick with a simple structure for this section:
```bash
|---app.js
|---index.html
```

Going through these following sub-steps, you'll be able to replicate this process on your own Angular applications.

#### 1: Setup Scripts, Viewport and Basic Style
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

 ::: panel-info Note
 Some of the includes like angular-route and angular-storage will not be used in this step but will be useful in subsequent steps
 :::

Right after including the scripts, add a viewport to make the lock widget fit in to device widths:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

One more thing you can do in setting up is add a simple style sheet so the app does not look so boring:

```html
<link href="https://cdn.auth0.com/styleguide/4.4.24/index.css" rel="stylesheet" />
```

With all that, our entire `<head>` will look like this:

${snippet(meta.snippets.head)}

#### 2: Configure The Angular Application
To use Auth0, your Angular app instance **MUST** depend on the Auth0 SDK:

```javascript
//app.js
var app = angular.module('YOUR-APP-NAME', ['auth0']);
```

Next, go ahead and add the app name in your html:

```html
<html ng-app="YOUR-APP-NAME">
```

An Angular-Auth0 app requires basically 2 configurations:

 - Auth0's credential config with `init()`
 - Event listeners to handle authentication status

Let's break it down.

Angular's `config()` skeleton with required dependencies:
```javascript
app.config( function myAppConfig (authProvider) {
  //authProvider init configuration
})
```

The `authProvider` dependency is Auth0's API that exposes some methods including the `init()` method for for configuration:

${snippet(meta.snippets.init)}

Event listeners are available to handle different status of authentication. They are also configured in the `config()` method with `authProvider`:

```javascript
//Called when login is successful
authProvider.on('loginSuccess', function(idToken) {
  console.log("Login successful with token " + idToken);
});

//Called when login fails
authProvider.on('loginFailure', function() {
  alert("Error");
});

//Called when user is authenticated (Authentication flag is true)
authProvider.on('authenticated', function() {
  console.log("Authenticated");
});
```

#### 3: Login

You have successfully configured you Angular App to use Auth0. Configs are vital but won't run an app, right? Let's add a login functionality:

```javascript
app.controller( 'LoginCtrl', function ( $scope, auth) {
  // Add auth to $scope object so we can bind to view
  $scope.auth = auth;

});
```
`auth` is one of the goodies (service) you get for including `auth0` as one of the dependencies. Passing `auth` to `$scope.auth` gives you the power to bind `auth` data and events to the view:

```html
<!-- Inside index.html <body> -->
<div ng-controller="LoginCtrl">
  <a href="#" class="btn btn-default" ng-click="auth.signin()">Sign In</a>
</div>
```

At this point, the lock widget will pop up showing a Sign In form,  when you click the `Sign In` button.

${browser}

You can change this behavior and make it show the Sign Up form:

```html
<a href="#" class="btn btn-default" ng-click="auth.signup()">Sign Up</a>
```

The event listeners that we created in our app's config will be called to handle the sign in process.

Moving the `singin()` logic into your controller rather than leaving it in the view will give you more manipulation power:

```javaScript
//app.js
$scope.signin = function (){
  auth.signin({}, //The first argument is scope of data you need to return
    function(profile, idToken){
      $scope.token = idToken;
    },
    function(err) {
      $scope.err = err;
    });
}
```
Now you have access to the profile and token:

```html
<!-- Show when not signed in -->
<a ng-if="!token" class="btn btn-success btn-lg" ng-click="signin()">Sign In</a>
<!-- Show token when signed in -->
<p ng-if="token">{{token}}</p>
```

### Recap and Round Up
At this point, you have learned how to:
- Setup Auth0 in an Angular project
- Configure Angular with Auth0 credentials and authentication status events
- Login

As mentioned earlier, this is just the beginning of a multi-step quickstart. You can continue to the next step when you are done here.

::: panel-info Next Step
**[User Profile]()**
:::
