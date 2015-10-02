```js
// app.js
angular.module('starter', ['ionic',
  'starter.controllers',
  'starter.services',
  'auth0',
  'angular-storage',
  'angular-jwt'])
.config(function($stateProvider, $urlRouterProvider, authProvider, $httpProvider,
  jwtInterceptorProvider) {


  $stateProvider
  // This is the state where you'll show the login
  .state('login', { // Notice: this state name matches the loginState property value to set in authProvider.init({...}) below...
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl',
  })
  // Your app states
  .state('userInfo', {
    url: '/userInfo',
    templateUrl: 'templates/user-info.tpl.html',
    controller: 'UserInfoCtrl',
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
    loginState: 'login' // This is the name of the state where you'll show the login, which is defined above...
  });

  ...

})
.run(function(auth) {
  // This hooks all auth events to check everything as soon as the app starts
  auth.hookEvents();
});
```
