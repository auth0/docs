```js
angular.module('myApp', ['auth0', 'angular-storage', 'angular-jwt'])
.run(function($rootScope, auth, store, jwtHelper, $location) {
  // This events gets triggered on refresh or URL change
  $rootScope.$on('$locationChangeStart', function() {
    var token = store.get('token');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        // Either show Login page or use the refresh token to get a new idToken
        $location.path('/');
      }
    }
  });
});
```
