# AngularJS Tutorial

> Note: If you're creating a new AngularJS app that you'll use with your API, you can [download a seed project](https://github.com/auth0/auth0-angular-api-sample/archive/gh-pages.zip) that is already configured to use Auth0. You only have to change the `authProvider` configuration to use your Auth0's account as shown in Step 2.

If you already have an existing application, please follow the steps below.

### 1. Setting up the callback URL in Auth0

<div class="setup-callback">
<p>After authenticating the user on Auth0, we will do a GET to a URL on your web site. For security purposes, you have to register this URL on the <a href="@@uiAppSettingsURL@@" target="_new">Application Settings</a> section on Auth0 Admin app.</p>

<pre><code>http://localhost:PORT/</pre></code>
</div>

### 2. Adding the Auth0 scripts and setting the right viewport

```html
<!-- We use client cookies to save the user credentials -->
<script src="//code.angularjs.org/1.2.16/angular-cookies.min.js"></script>

<!-- Auth0Lock script and AngularJS module -->
<script src="@@widget_url_no_scheme@@"></script>
<script src="@@auth0_angular_url_no_scheme@@"> </script>

<!-- Setting the right viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

We're including Auth0's angular module and its dependencies to the `index.html`.

### 3. Add the module dependency and configure the service

Add the `auth0` module dependency to your angular app definition and configure it by calling the `init` method of the `authProvider`

```js
// app.js
angular.module('sample', ['auth'])
  .config(function(authProvider) {
    authProvider.init({
      clientID: '@@account.clientId@@',
      callbackURL: location.href,
      domain: '@@account.namespace@@'
    })
  });
```

> Note: `clientID` and `domain` are pre-populated with the right values if you are signed in to your Auth0 account.

### 4. Triggering the login

Now we're ready to implement the Login. We can inject the `auth` service in any controller and just call `signin` method to show the Login / SignUp popup. In this case, we'll add the call in the login method of the controller. The `signin` method returns a promise. That means that we can handle login success and failure the following way:

```js
// LoginCtrl.js
$scope.login = function() {
  auth.signin({
    popup: true
  })
  .then(function() {
    // Success callback
  }, function() {
    // Error callback
  });
}
```

```html
<!-- login.tpl.html -->
<!-- ... -->
<input type="submit" ng-click="login()" />
<!-- ... -->
```

#### Login Widget Previewer

@@browser@@

> Note: there are multiple ways of implementing login. What you see above is the Login Widget, but if you want to have your own UI you can change the `<script src="//cdn.auth0.com/w2/auth0-widget-4.0.js">` for `<script src="//cdn.auth0.com/w2/auth0-2.1.js">`. For more details [check the GitHub repo](https://github.com/auth0/auth0-angular#with-your-own-ui).

### 5. (Optional) Add routing

In most cases, we'll have routing in our app. So let's add the `$routeProvider` configuration in the `config` method of our app and let's set a `hashPrefix`.

```js
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

  $locationProvider.hashPrefix('!');
});
```

We need to set the `requiresLogin` property to true for all routes that require the user to be logged in.

__Note__: If you are using ui-router, all you have to do is to create states instead of the routes above and set the `requiresLogin` attribute inside the `data` property of the state.

In order to handle the `requireLogin`, you must add the following code to the `run` of your app. In the following version of the SDK this will be handled for you.

```js
angular.module('YOUR-APP-NAME', ['auth0'])
.run(function($rootScope, auth, $location) {
  $rootScope.$on('$routeChangeStart', function(e, nextRoute, currentRoute) {
    if (nextRoute.$$route && nextRoute.$$route.requiresLogin) {
      if (!auth.isAuthenticated) {
        $location.path('/login');
      }
    }
  })
})
```

### 6. Adding a logout button

You can just call the `signout` method of Auth0 to remove all the cookies from the client that keep the user logged in:

```js
$scope.logout = function() {
  auth.signout();
}
```

```html
<input type="submit" ng-click="logout()" value="Log out" />
```

You can [click here](@@base_url@@/user-profile) to find out all of the available properties from the user's profile. Please note that some of this depend on the social provider being used.

### 7. Configuring secure calls to your API

When calling your API you will have to send the [JWT token](@@base_url@@/jwt), which you've got on the login on every request. To do that, we need to do 2 things:

#### 7.1 Add the dependency to the `authInterceptor` module

```js
// app.js
angular.module('YOUR-APP-NAME', ['auth0', 'authInterceptor'])
```

#### 7.2 Add the `$http` interceptor

The `$http` interceptor will send the token in the `Authorization` header if it's available. We need to add it in the `config` section of our application:


```js
// app.js
.config(function (authProvider, $routeProvider, $httpProvider) {
  // ...
  $httpProvider.interceptors.push('authInterceptor');
  // ...
});
```

Now, you can regularly call your API with `$http`, `$resource` or any rest client as you'd normally do and the [JWT token](@@base_url@@/jwt) will be sent on every request.

### 8. Showing user information

After the user has logged in, we can get the `profile` property from the `auth` service which has all the user information:

```html
<span>His name is {{auth.profile.nickname}}</span>
```

```js
// UserInfoCtrl.js
function UserInfoCtrl($scope, auth) {
  $scope.auth = auth;
}
```

## Examples

The following [examples](https://github.com/auth0/auth0-angular/tree/master/examples) offer a good starting point for including Auth0 in your AngularJS application:

 * [Widget](https://github.com/auth0/auth0-angular/tree/master/examples/widget): A simple angular app doing auth with social and username/password using the Login Widget.
 * [Custom Login](https://github.com/auth0/auth0-angular/tree/master/examples/custom-login): Custom login form that uses Auth0 to authenticate.
 * [Custom Signup](https://github.com/auth0/auth0-angular/tree/master/examples/custom-signup): Custom signup plus extra fields added to the user profile on creation.
 * [Delegation Token](https://github.com/auth0/auth0-angular/tree/master/examples/delegation-token): How to get a token for a secondary API and call it.
 * [API Authentication](https://github.com/auth0/auth0-angular/tree/master/examples/api-authentication): Call your protected API using Auth0 generated tokens in the technology you want:
    * [Java](https://github.com/auth0/auth0-angular/tree/master/examples/api-authentication/java)
    * [.NET OWIN](https://github.com/auth0/auth0-angular/tree/master/examples/api-authentication/aspnet-owin)
    * [Node.js](https://github.com/auth0/auth0-angular/tree/master/examples/api-authentication/nodejs)
    * Also, but not included in examples, we support these technologies: [PHP](phpapi-tutorial), [ASP.NET WebAPI](aspnetwebapi-tutorial), [Ruby](rubyapi-tutorial) among others.
 * [UI Router](https://github.com/auth0/auth0-angular/tree/master/examples/ui-router): Managing routes using ui-router.
 * [Require JS](https://github.com/auth0/auth0-angular/tree/master/examples/requirejs): Using RequireJS to include dependencies.

Please take note of your app settings:

* __Domain__: `@@account.namespace@@`
* __ClientID__: `@@account.clientId@@`
* __Callback URL__: `@@account.callback@@`

