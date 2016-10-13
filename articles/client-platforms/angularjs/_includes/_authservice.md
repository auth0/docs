## Step 3: Create an Auth Service

The best way to manage and coordinate the tasks necessary for user authentication is to create a reusable service. With the service in place, you'll be able to call its methods throughout your application.

At the most basic level, authentication with Auth0's Lock widget requires that the user send their credentials to Auth0 to be verified. If authentication is successful, a [JSON Web Token (JWT)](https://jwt.io/introduction) will be signed and sent back to the user. To do this, you can use Lock's `show` method to open the widget and then listen for successful authentication with the `authenticated` event. When the `authenticated` event is fired, the user's `id_token` will be returned which can then be used to get the user's profile with Lock's `getProfile` method.

The code for this should be kept in the `authService`, but it will be necessary to use the code in Angular's `run` block. To keep things clean, we can put it all in a single method called `registerAuthenticationListener`.

```js
// components/auth/auth.service.js

(function() {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  authService.$inject = ['$rootScope', 'lock', 'authManager'];

  function authService($rootScope, lock, authManager) {

    var userProfile = JSON.parse(localStorage.getItem('profile')) || {};

    function login() {
      lock.show();
    }

    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
      userProfile = {};
    }

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function(authResult) {
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();

        lock.getProfile(authResult.idToken, function(error, profile) {
          if (error) {
            console.log(error);
          }

          localStorage.setItem('profile', JSON.stringify(profile));
          $rootScope.$broadcast('userProfileSet', profile);
        });
      });
    }

    return {
      userProfile: userProfile,
      login: login,
      logout: logout,
      registerAuthenticationListener: registerAuthenticationListener
    }
  }
})();
```

When the user successfully authenticates, their JWT will be saved in local storage as `id_token` and their profile will be stringified and saved as `profile`. Depending on your setup, you may need to broadcast an event to notify controllers that the user's profile has been returned. This is done in the above example with `$rootScope.$broadcast`.

Now the `registerAuthenticationListener` method can be called in the `run` block so that `authenticated` events can be listened for when the app runs.

```js
// app.run.js

(function () {

  'use strict';

  angular
    .module('app')
    .run(run);

  run.$inject = ['authService', 'lock'];

  function run(authService, lock) {

    // Register the authentication listener that is
    // set up in auth.service.js
    authService.registerAuthenticationListener();

    // Register the synchronous hash parser
    lock.interceptHash();
  }

})();
```