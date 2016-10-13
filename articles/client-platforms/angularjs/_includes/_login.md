## Step 4: Provide Controls for Login and Logout

The `authService` has a method for showing the Lock widget, but it hasn't been called anywhere yet. The place from which this method is called depends on how your application is set up, but it is common to do so from a header toolbar component or from a dedicated **login** or **user** view.

#### Log In

Start by creating a **login** controller and view.

```js
// components/login/login.controller.js

(function() {

  'use strict';

  angular
    .module('app')
    .controller('loginController', loginController);

    loginController.$inject = ['$scope', 'authService'];

    function loginController($scope, authService) {

      // Put the authService on $scope to access
      // the login method in the view
      $scope.authService = authService;
    }

})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['authService'];

  function LoginController(authService) {

    var vm = this;
	
	// Put the authService on viewmodel to access
    // the login method in the view
    vm.authService = authService;

  }

}());

```

With the `authService` injected in this controller, the `login` method can now be called from the view.

```html
  <!-- components/login/login.html -->

  ...

    <button class="btn btn-primary" ng-click="vm.authService.login()">Log In</button>

  ...
```

When the user clicks the **Log In** button, the Lock widget will be displayed.

#### Log Out

A button responsible for logging the user out can be placed in the header toolbar, but to do this, the toolbar needs to have access to the `authService`. This can be accomplished either by creating a controller and view for the header toolbar and injecting the auth service there, or by keeping the toolbar in the root view (commonly the `index.html` file) and relying on `$rootScope` to get access to the auth service. For this example, we'll attach the `authService` to `$rootScope`.

```js
// app.run.js

(function () {

  'use strict';

  angular
    .module('app')
    .run(run);

  run.$inject = ['$rootScope', 'authService', 'lock'];

  function run($rootScope, authService, lock) {
    // Put the authService on $rootScope so its methods
    // can be accessed from the nav bar
    $rootScope.authService = authService;

    // Register the authentication listener that is
    // set up in auth.service.js
    authService.registerAuthenticationListener();

    // Register the synchronous hash parser
    lock.interceptHash();
  }

})();
```

Then, in the toolbar you can provide a link or button for logging the user out which calls the `logout` method.

```html
  <!-- index.html -->

  ...

    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#/">Auth0</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li ng-if="!isAuthenticated"><a href="#/login">Log In</a></li>
            <li ng-if="isAuthenticated"><a href="#/" ng-click="authService.logout()">Log Out</a></li>
            <li><a href="#/">Home</a></li>
          </ul>
        </div>
      </div>
    </nav>

  ...
```

In this example, the **Log In** link takes the user to the `/login` view and the **Log Out** link immediately calls the `logout` method to log the user out. These links are conditionally shown and hidden based on whether or not the user is currently authenticated, which is provided by the `isAuthenticated` property which comes from `authManager`.
