```js
angular.module('starter.controllers', [])

.controller('LoginCtrl', function(store, $scope, $location, auth) {
  $scope.login = function() {
    auth.signin({
      authParams: {
        scope: 'openid offline_access', //Details: https://auth0.com/docs/scopes
        device: 'Mobile device'
      }
    }, function(profile, token, accessToken, state, refreshToken) {
      // Success callback
      store.set('profile', profile);
      store.set('token', token);
      store.set('refreshToken', refreshToken);
      $location.path('/');
    }, function() {
      // Error callback
    });
  }
}
```

```html
<!-- login.html -->
<!-- ... -->
<input type="submit" ng-click="login()" />
<!-- ... -->
```
