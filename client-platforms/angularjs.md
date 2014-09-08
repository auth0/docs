---
lodash: true
---

## AngularJS Tutorial

<% if (configuration.api && configuration.thirdParty) { %>

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="https://docs.auth0.com/auth0-angular/master/create-package?path=examples/widget-with-thirdparty-api&type=js@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
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
    <a href="https://docs.auth0.com/auth0-angular/master/create-package?path=examples/widget-with-api&type=js@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %> 
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a> 
  </blockquote>
</div>

<% } %>

**Otherwise, if you already have an existing application, please follow the steps below.**

@@includes.callback@@

### 1. Adding the Auth0 scripts and setting the right viewport

````html
<!-- We use client cookies to save the user credentials -->
<script src="//code.angularjs.org/1.2.16/angular-cookies.min.js"></script>

<!-- Auth0 widget script and AngularJS module -->
<script src="@@widget_url_no_scheme@@"></script>
<script src="//cdn.auth0.com/w2/auth0-angular-2.js"> </script>

<!-- Setting the right viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

We're including Auth0's angular module and its dependencies to the `index.html`.

### 2. Add the module dependency and configure the service

Add the `auth0` module dependency to your angular app definition and configure it by calling the `init` method of the `authProvider

````js
// app.js
angular.module('YOUR-APP-NAME', ['auth0'])
.config(function (authProvider) {
  authProvider.init({
    domain: '<%= account.namespace %>',
    clientID: '<%= account.clientId %>',
    callbackURL: location.href
  });
})
.run(function(auth) {
  // This hooks al auth events to check everything as soon as the app starts
  auth.hookEvents();
});
```


### 3. Let's implement the login

Now we're ready to implement the Login. We can inject the `auth` service in any controller and just call `signin` method to show the Login / SignUp popup. 
In this case, we'll add the call in the `login` method of the `LoginCtrl` controller. When setting `popup` to `true`, the `signin` method accepts a callback as a parameter. That means that we can handle login success and failure the following way:

````js
// LoginCtrl.js
$scope.login = function() {
  auth.signin({
    popup: true
  }, function() {
    // Success callback
  }, function() {
    // Error callback
  });
}
```

````html
<!-- login.tpl.html -->
<!-- ... -->
<input type="submit" ng-click="login()" />
<!-- ... -->
```

@@browser@@

> Note: there are multiple ways of implementing login. What you see above is the Login Widget, but if you want to have your own UI you can change the `<script src="//cdn.auth0.com/w2/auth0-widget-4.0.js">` for `<script src="//cdn.auth0.com/w2/auth0-2.1.js">`. For more details [check the GitHub repo](https://github.com/auth0/auth0-angular#with-your-own-ui).

### 4. Adding a logout button

You can just call the `signout` method of Auth0 to remove all the cookies from the client that keep the user logged in:

````js
$scope.logout = function() {
  auth.signout();
}
```

````html
<input type="submit" ng-click="logout()" value="Log out" />
```


<% if (!configuration.thirdParty) { %>

### 5. Configuring secure calls to our API

As we're going to call an API wez<%= configuration.api ? ' on ' + configuration.api : '' %>, we need to make sure we send the [JWT token](https://docs.auth0.com/jwt) we receive on the login on every request. For that, we need to do the add the `authInterceptor` to the list of `$http` interceptors:

````js
// app.js
myApp.config(function (authProvider, $routeProvider, $httpProvider) {
  // ...
  $httpProvider.interceptors.push('authInterceptor');
  // ...
});
```

Now, you can regularly call your API with `$http`, `$resource` or any rest client as you'd normally do and the [JWT token](https://docs.auth0.com/jwt) will be sent on every request.

<% } else {%>

### 5. Configuring calls to a Third Party API

Now, we want to be able to call <%= configuration.api %> which is a third party api. What we're going to do is to exchange the [JWT token](https://docs.auth0.com/jwt) token we got from Auth0 for a token we can use to query <%= configuration.api %> securely and authenticated.

For that, we're going to change the `login` function of our controller to look like this:

````js
$scope.login = function() {
  auth.signin({
    popup: true,
  }, function(profile) {
    // Put the <%= configuration.api %> name here
    auth.getToken({
      // By default the first active third party add-on will be used
      // However, We can specify which third party API to use here by specifying the name of the add-on
      // api: <%= configuration.api %> 
      
    }).then(function(thirdPartyToken) {
      // Do something with the thirdPartyToken. Add it as a header or save it for later usage
      $location.path('/');
    })
  } , function(err) {
    console.log("There was an error signin in", err);
  });
}
```

We're going to activate the <%= configuration.api %> add-on in the following steps. Once we do that, the code we wrote here will just work. 

<% } %>

### 6. Showing user information

After the user has logged in, we can get the `profile` property from the `auth` service which has all the user information:

````html
<span>His name is {{auth.profile.nickname}}</span>
```

````js
// UserInfoCtrl.js
function UserInfoCtrl($scope, auth) {
  $scope.auth = auth;
}
```

You can [click here](https://docs.auth0.com/user-profile) to find out all of the available properties from the user's profile. Please note that some of this depend on the social provider being used.

### 7. Sit back and relax

Now it's time to sit back, relax and open a beer. You've implemented Login and Signup with Auth0 and AngularJS.

### Optional Steps
#### Let's add routing

In most cases, we'll have routing in our app. 
We usually want users to be authenticated to access some of the routes. For those routes, we must set the `requiresLogin` property to `true`. 
So let's add the `$routeProvider` configuration in the `config` method of our app and let's specify the login to route to which the users will be redirected if trying to access a route to which they don't have access to:

````js
// app.js
.config(function (authProvider, $routeProvider, $locationProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login.tpl.html',
    controller: 'LoginCtrl'
  });
  // Logged in route
  $routeProvider.when('/user-info', {
    templateUrl: 'userInfo.tpl.html',
    controller: 'UserInfoCtrl',
    requiresLogin: true
  });

  authProvider.init({
    domain: '<%= account.namespace %>',
    clientID: '<%= account.clientId %>',
    callbackURL: location.href,
    // Here we add the URL to go if the user tries to access a resource he can't because he's not authenticated
    loginUrl: '/login'
  });
});
```

__Note__: If you are using ui-router, you can follow [this guide](https://github.com/auth0/auth0-angular/blob/master/docs/routing.md#ui-router)

#### Additional info

To get Additional info on how to use this SDK, you [should check this out](https://github.com/auth0/auth0-angular/blob/master/README.md)


