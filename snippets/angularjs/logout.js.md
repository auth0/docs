```js
$scope.logout = function() {
  auth.signout();
  store.remove('profile');
  store.remove('token');
}
```
