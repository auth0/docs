```js
(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController)

  LoginController.$inject = ['$scope', '$state', 'auth', 'store'];

  function LoginController($scope, $state, auth, store) {
    var vm = this;

    function doLogin() {
      auth.signin({
        container: 'lock-container',
        authParams: {
          scope: 'openid offline_access',
          device: 'Mobile device'
        }
      }, function (profile, token, accessToken, state, refreshToken) {
        // Success callback
        store.set('profile', profile);
        store.set('token', token);
        store.set('accessToken', accessToken);
        store.set('refreshToken', refreshToken);
        
         $state.go("home");
      }, function () {
        // Error callback
      });
    }

    doLogin();
  }
  
} ());
```