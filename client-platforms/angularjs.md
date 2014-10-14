---
lodash: true
---

## AngularJS Tutorial

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="@@base_url@@/auth0-angular/master/create-package?path=examples/widget-with-api&type=js@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %> 
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a> 
  </blockquote>
</div>

**Otherwise, if you already have an existing application, please follow the steps below.**

@@includes.callback@@

### 1. Adding the Auth0 scripts and setting the right viewport

````html
<!-- We use client cookies to save the user credentials -->
<script src="//code.angularjs.org/1.2.16/angular-cookies.min.js"></script>

<!-- Auth0 widget script and AngularJS module -->
<script src="//cdn.auth0.com/js/lock-6.js"></script>
<script type="text/javascript" src="//rawgit.com/auth0/angular-storage/master/dist/angular-storage.js"></script>
<script type="text/javascript" src="//rawgit.com/auth0/angular-jwt/master/dist/angular-jwt.js"></script>

<script src="//cdn.auth0.com/w2/auth0-angular-3.js"> </script>

<!-- Setting the right viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

We're including Auth0's angular module and its dependencies to the `index.html`.

### 2. Add the module dependency and configure the service

Add the `auth0`, `angular-storage` and `angular-jwt` module dependencies to your angular app definition and configure `auth0` by calling the `init` method of the `authProvider`

````js
// app.js
angular.module('YOUR-APP-NAME', ['auth0', 'angular-storage', 'angular-jwt'])
.config(function (authProvider) {
  authProvider.init({
    domain: '<%= account.namespace %>',
    clientID: '<%= account.clientId %>'
  });
})
.run(function(auth) {
  // This hooks al auth events to check everything as soon as the app starts
  auth.hookEvents();
});
```


### 3. Let's implement the login

Now we're ready to implement the Login. We can inject the `auth` service in any controller and just call `signin` method to show the Login / SignUp popup. 
In this case, we'll add the call in the `login` method of the `LoginCtrl` controller. On login success, we'll save the user profile and token into `localStorage`

````js
// LoginCtrl.js
$scope.login = function(store, $location) {
  auth.signin({}, function(profile, token) {
    // Success callback
    store.set('profile', profile);
    store.set('token', token);
    $location.path('/');
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

> Note: there are multiple ways of implementing login. What you see above is the Login Widget, but if you want to have your own UI you can change the `<script src="//cdn.auth0.com/js/auth0-lock-6.js">` for `<script src="//cdn.auth0.com/w2/auth0-2.1.js">`. For more details [check the GitHub repo](https://github.com/auth0/auth0-angular#with-your-own-ui).

### 4. Adding a logout button

You can just call the `signout` method of Auth0 to log the user out. You should also remove the information saved into `localStorage`:

````js
$scope.logout = function() {
  auth.signout();
  store.remove('profile');
  store.remove('token');
}
```

````html
<input type="submit" ng-click="logout()" value="Log out" />
```


### 5. Configuring secure calls to our API

As we're going to call an API we did<%= configuration.api ? ' on ' + configuration.api : '' %>, we need to make sure we send the [JWT token](@@base_url@@/jwt) we receive on the login on every request. For that, we need to do the add the `jwtInterceptor` to the list of `$http` interceptors:

````js
// app.js
myApp.config(function (authProvider, $routeProvider, $httpProvider, jwtInterceptorProvider) {
  // ...

  jwtInterceptorProvider.tokenGetter = function(auth) {
    // Return the saved token
    return store.get('token');
  }

  $httpProvider.interceptors.push('jwtInterceptor');
  // ...
});
```

Now, you can regularly call your API with `$http`, `$resource` or any rest client as you'd normally do and the [JWT token](@@base_url@@/jwt) will be sent on every request.


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

You can [click here](@@base_url@@/user-profile) to find out all of the available properties from the user's profile. Please note that some of this depend on the social provider being used.

### 7. Keeping the user logged in after page refreshes

We already saved the user profile and tokens into `localStorage`. We just need to fetch them on page refresh and let `auth0-angular` know that the user is already authenticated.

````js
angular.module('myApp', ['auth0', 'angular-storage'])
.run(function($rootScope, auth, store) {
  // This events gets triggered on refresh or URL change
  $rootScope.$on('$locationChangeStart', function() {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        auth.authenticate(store.get('profile'), token);
      }
    }
  });
});
````

### 8. Sit back and relax

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


