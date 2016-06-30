```js
angular.module('app', ['ionic', 'auth0', 'angular-storage', 'angular-jwt'])
  .run(function ($ionicPlatform, $rootScope, auth, store, jwtHelper, $location) {
    // Code omitted for brevity
  )
  .config(function ($stateProvider, $urlRouterProvider, authProvider, $httpProvider, jwtInterceptorProvider) {

    $stateProvider

      // setup an abstract state for the tabs directive
      .state('home', {
        url: '/',
        templateUrl: 'app/home/home.html'
      })

      .state('login', { // Notice: this state name matches the loginState property value to set in authProvider.init({...}) below...
        url: '/login',
        templateUrl: 'app/account/login.html'
      })
      ;

    authProvider.init({
      domain: AUTH0_DOMAIN,
      clientID: AUTH0_CLIENT_ID,
      loginState: 'login'
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

  });
```  