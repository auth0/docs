```js
(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$state', 'authService'];

  function LoginController($state, authService) {
    var vm = this;

    function doLogin() {
      lock.show();
    }

    doLogin();
  }

} ());
```