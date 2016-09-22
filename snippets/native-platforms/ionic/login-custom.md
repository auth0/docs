```js
(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController)

  LoginController.$inject = ['$state', '$ionicPopup', 'auth', 'store'];

  function LoginController($state, $ionicPopup, auth, store) {
    var vm = this;

    vm.login = login;
    vm.loginWithGoogle = loginWithGoogle;

    // Log in with username and password
    function login() {
      auth.signin({
        connection: 'Username-Password-Authentication',  // The name of your database connection
        username: vm.username,
        password: vm.password,
        authParams: {
          scope: 'openid name email' //Details: https:///scopes
        }
      }, onLoginSuccess, onLoginFailed);
    }

    // Log in with Google
    function loginWithGoogle() {
      auth.signin({
        popup: true,
        connection: 'google-oauth2',
        scope: 'openid name email' //Details: https:///scopes
      }, onLoginSuccess, onLoginFailed);
    }

    // Login success callback which saves the user's tokens and redirects back to home 
    function onLoginSuccess(profile, token, accessToken, state, refreshToken) {
      store.set('profile', profile);
      store.set('token', token);
      store.set('accessToken', accessToken);
      store.set('refreshToken', refreshToken);

      $state.go("home");
    }

    // Login fall callback which displays error message
    function onLoginFailed() {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    }
  }

} ());
```
