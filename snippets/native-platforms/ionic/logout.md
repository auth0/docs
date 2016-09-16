```js
(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$state', 'authManager'];

  function HomeController($state, authManager) {
    var vm = this;

    vm.login = login;
    vm.logout = logout;

    function login() {
      $state.go("login");
    }

    function logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
      userProfile = {};
    }

  }

}());
```