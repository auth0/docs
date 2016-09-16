```js
$rootScope.$on('$locationChangeStart', function () {
  var token = localStorage.getItem('id_token');
  if (token) {
    if (!jwtHelper.isTokenExpired(token)) {
      if (!$rootScope.isAuthenticated) {
        authManager.authenticate();
      }
    }
  }
});
```