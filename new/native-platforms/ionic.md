---
lodash: true
---

## Ionic

<% if (configuration.api && configuration.thirdParty) { %>

<div class="package">
  <blockquote>
    <a href="https://docs.auth0.com/auth0-ionic/master/create-package?path=examples/refresh-token-sample&type=js&filePath=examples/refresh-token-sample/www/js@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

<% } else  { %>

<div class="package">
  <blockquote>
    <a href="https://docs.auth0.com/auth0-ionic/master/create-package?path=examples/refresh-token-sample&type=js&filePath=examples/refresh-token-sample/www/js@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

<% } %>

**Otherwise, if you already have an existing application, please follow the steps below.**

### 1. Adding the Auth0 dependencies

Add the following dependencies to the `bower.json` and run `bower install`:

````json
"dependencies" : {
  "auth0-angular": "2.2.*"
},
```

### 2. Add the references to the scripts in the `index.html`

````html
<!-- Auth0 Login Widget -->
<script src="lib/auth0-widget.js/build/auth0-widget.js"></script>

<!-- ionic/angularjs js -->
<script src="lib/ionic/js/ionic.bundle.js"></script>

<!-- Cookies are used by auth0-angular -->
<script src="lib/angular-cookies/angular-cookies.js"></script>

<!-- Auth0 Angular module -->
<script src="lib/auth0-angular/build/auth0-angular.js"></script>
```

### 3. Add `InAppBrowser` plugin

You must install the `InAppBrowser` plugin from Cordova to be able to show the Login popup. For that, just run the following command:

````bash
ionic plugin add org.apache.cordova.inappbrowser
```

and then add the following configuration to the `config.xml` file:

````xml
<feature name="InAppBrowser">
  <param name="ios-package" value="CDVInAppBrowser" />
  <param name="android-package" value="org.apache.cordova.InAppBrowser" />
</feature>
```

### 4. Add the Auth0 module dependency and configure the service

Add the `auth0` module dependency to your angular app definition and configure it by calling the `init` method of the `authProvider.

````js
// app.js
angular.module('starter', ['ionic',
  'starter.controllers',
  'starter.services',
  'auth0'])
.config(function($stateProvider, $urlRouterProvider, authProvider, $httpProvider) {


  $stateProvider
  // This is the state where you'll show the login
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl',
  })
  // Your app states
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'templates/dashboard.html',
    data: {
      // This tells Auth0 that this state requires the user to be logged in.
      // If the user isn't logged in and he tries to access this state
      // he'll be redirected to the login page
      requiresLogin: true
    }
  })

  ...

  authProvider.init({
    domain: '<%= account.namespace %>',
    clientID: '<%= account.clientId %>',
    callbackURL: location.href,
    // This is the name of the state to redirect to if the user tries to enter
    // to a restricted page
    loginState: 'login'
  });

  ...

})
.run(function(auth) {
  // This hooks al auth events to check everything as soon as the app starts
  auth.hookEvents();
});
```


### 5. Let's implement the login

Now we're ready to implement the Login. We can inject the `auth` service in the `LoginCtrl` and just call `signin` method to show the Login / SignUp popup. **It's important to set the `popup` property to `true` when calling the signin as otherwise it won't work on Ionic**.

````js
// LoginCtrl.js
$scope.login = function() {
  auth.signin({
    popup: true,
    // Set standalone if you don't want to allow people to close the widget
    // standalone: true
  }, function() {
    // Success callback
  }, function() {
    // Error callback
  });
}
```

````html
<!-- login.html -->
<!-- ... -->
<input type="submit" ng-click="login()" />
<!-- ... -->
```

> Note: there are multiple ways of implementing login. What you see above is the Login Widget, but if you want to have your own UI you can change the `<script src="//cdn.auth0.com/w2/auth0-widget-4.0.js">` for `<script src="//cdn.auth0.com/w2/auth0-2.1.js">`. For more details [check the GitHub repo](https://github.com/auth0/auth0-angular#with-your-own-ui).

### 6. Adding a logout button

You can just call the `signout` method of Auth0 to remove all the cookies from the client that keep the user logged in:

````js
$scope.logout = function() {
  auth.signout();
}
```

````html
<input type="submit" ng-click="logout()" value="Log out" />
```


### 7. Configuring secure calls to our API

As we're going to call an API we made<%= configuration.api ? ' on ' + configuration.api : '' %>, we need to make sure we send the [JWT token](https://docs.auth0.com/jwt) we receive on the login on every request. For that, we need to do the add the `authInterceptor` to the list of `$http` interceptors:

````js
// app.js
myApp.config(function (authProvider, $routeProvider, $httpProvider) {
  // ...
  $httpProvider.interceptors.push('authInterceptor');
  // ...
});
```

Now, you can regularly call your API with `$http`, `$resource` or any rest client as you'd normally do and the [JWT token](https://docs.auth0.com/jwt) will be sent on every request.

### 8. Showing user information

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

### 9. Sit back and relax

Now it's time to sit back, relax and open a beer. You've implemented Login and Signup with Auth0 and Ionic.
