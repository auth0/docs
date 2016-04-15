```js
// LoginCtrl.js
angular.module('YOUR-APP-NAME').controller( 'LoginCtrl', function ( $scope, auth) {

  $scope.auth = auth;

});
```

```html
<!-- login.html -->
<!-- ... -->
<input type="submit" ng-controller="LoginCtrl" ng-click="auth.signin()" />
<!-- ... -->
```
