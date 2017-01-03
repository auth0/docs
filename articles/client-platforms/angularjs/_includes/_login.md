## Provide Controls for Login and Logout

The `authService` has a method for showing the Lock widget, but it hasn't been called anywhere yet. The place from which this method is called depends on how your application is set up, but it is common to do so from a header toolbar component or from a dedicated **login** or **user** view.

### Log In

Start by creating a **login** controller and view.

```js
// components/login/login.controller.js

(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  function LoginController(authService) {

    var vm = this;

    vm.authService = authService;

  }
})();
```

With the `authService` injected in this controller, the `login` method can now be called from the view.

```html
<!-- components/login/login.html -->

<button class="btn btn-primary" ng-click="vm.authService.login()">Log In</button>
```

When the user clicks the **Log In** button, the Lock widget will be displayed.

Lastly, add the **login** state to your `$stateProvider` configuation in `app.js`.

```js
// app.js

(function () {

  function config($stateProvider, lockProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        controller: 'HomeController',
        templateUrl: 'components/home/home.html',
        controllerAs: 'vm'
      })
      .state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'components/login/login.html',
        controllerAs: 'vm'
      });	
  }

})();
```

### Log Out

Since JWT authentication is stateless, logging the user out is simply a matter of removing the user's `id_token` from local storage. Calling `authManager.unauthenticate` will set the user's application-wide authentication status to `false`.

```js
// components/auth/auth.service.js

(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  function authService(lock, authManager) {

    function logout() {
      localStorage.removeItem('id_token');
      authManager.unauthenticate();
    }

  }
})();
```

Remember to also add a **Log Out** button which calls this function. In our example we call this function from `HomeController`, so this button can be added in `home.html`.

```html
<!-- components/home/home.html -->

<div ng-if="isAuthenticated">
  <p>Thank you for logging in!</p>
  <button ng-click="vm.authService.logout()">Log Out</button>
</div>
```

<%= include('../../_includes/_persisting_state') %>