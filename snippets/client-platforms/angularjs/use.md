```html
<!-- app/navbar/navbar.html -->

<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">Auth0 - AngularJS</a>

      <button
        class="btn btn-primary btn-margin"
        ui-sref="home">
          Home
      </button>

      <button
        class="btn btn-primary btn-margin"
        ng-if="!vm.auth.isAuthenticated()"
        ng-click="vm.auth.login()">
          Log In
      </button>

      <button
        class="btn btn-primary btn-margin"
        ng-if="vm.auth.isAuthenticated()"
        ng-click="vm.auth.logout()">
          Log Out
      </button>

    </div>
  </div>
</nav>
```

```js
// app/navbar/navbar.directive.js

(function() {
  
  'use strict';
  
  angular
    .module('app')
    .directive('navbar', navbar);
    
  function navbar() {
    return {
      templateUrl: 'app/navbar/navbar.html',
      controller: navbarController,
      controllerAs: 'vm'
    }
  }

  navbarController.$inject = ['authService'];
    
  function navbarController(authService) {
    var vm = this;
    vm.auth = authService;
  }
  
})();
```
