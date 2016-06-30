```js
angular.module('app', ['ionic', 'auth0', 'angular-storage', 'angular-jwt'])

  .run(function ($ionicPlatform, $rootScope, auth, store, jwtHelper, $location) {
    $ionicPlatform.ready(function () {
      // Code omitted for brevity
    });

    // This hooks all auth events to check everything as soon as the app starts
    auth.hookEvents();

    //This event gets triggered on URL change
    var refreshingToken = null;
    $rootScope.$on('$locationChangeStart', function () {
      var token = store.get('token');
      var refreshToken = store.get('refreshToken');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          if (!auth.isAuthenticated) {
            auth.authenticate(store.get('profile'), token);
          }
        } else {
          if (refreshToken) {
            if (refreshingToken === null) {
              refreshingToken = auth.refreshIdToken(refreshToken).then(function (idToken) {
                store.set('token', idToken);
                auth.authenticate(store.get('profile'), idToken);
              }).finally(function () {
                refreshingToken = null;
              });
            }
            return refreshingToken;
          } else {
            $location.path('/login');
          }                          
        }
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, authProvider, $httpProvider, jwtInterceptorProvider) {

    // Code omitted for brevity

  });
```