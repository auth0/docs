```js
// LoginCtrl.js
function LoginCtrl($scope, auth, store, $location) {
  $scope.login = function() {
    auth.signin({}, function(profile, token) {
      // Success callback
      store.set('profile', profile);
      store.set('token', token);
      $location.path('/');
    }, function() {
      // Error callback
    });
  }
}
```
