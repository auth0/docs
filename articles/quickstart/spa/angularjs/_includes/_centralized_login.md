
<%= include('../../_includes/_login_preamble', { library: 'AngularJS', embeddedLoginLink: 'https://github.com/auth0-samples/auth0-angularjs-samples/tree/embedded-login/01-Embedded-Login' }) %>

### Configure angular-auth0

The angular-auth0 wrapper comes with a provider called `angularAuth0Provider`. The provider has an `init` method which takes a configuration object used to create an instance of the `WebAuth` object from auth0.js. 

Inject the `angularAuth0Provider` provider. 
In the options object you pass to `angularAuth0Provider.init`, include the following information:
<%= include('../../_includes/_auth_service_configure_client_details') %>

::: note
In this tutorial, the route is `/callback`, which is implemented in the [Add a Callback Component](#add-a-callback-component) step. 
:::

```js
// app/app.js

(function () {

  'use strict';

  angular
    .module('app', ['auth0.auth0', 'ui.router'])
    .config(config);

  config.$inject = [
    '$stateProvider',
    '$locationProvider',
    '$urlRouterProvider',
    'angularAuth0Provider'
  ];

  function config(
    $stateProvider,
    $locationProvider,
    $urlRouterProvider,
    angularAuth0Provider
  ) {

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeController',
        templateUrl: 'app/home/home.html',
        controllerAs: 'vm'
      })
      .state('callback', {
        url: '/callback',
        controller: 'CallbackController',
        templateUrl: 'app/callback/callback.html',
        controllerAs: 'vm'
      });

    // Initialization for the angular-auth0 library
    angularAuth0Provider.init({
      clientID: '${account.clientId}',
      domain: '${account.namespace}',
      responseType: 'token id_token',
      audience: 'https://${account.namespace}/userinfo',
      redirectUri: 'http://localhost:3000/callback',
      scope: 'openid'
    });

    $urlRouterProvider.otherwise('/');

    $locationProvider.hashPrefix('');

    /// Comment out the line below to run the app
    // without HTML5 mode (will use hashes in routes)
    $locationProvider.html5Mode(true);
  }

})();
```

### Create an Authentication Service

Create a reusable service to manage and coordinate user authentication. You can call the service's methods from your application. 

::: note
You can give the service any name. In the examples below, the service is `authService` and the filename is `auth.service.js`.
:::

Create a service and provide a `login` method that calls the `authorize` method from angular-auth0.

```js
// app/auth/auth.service.js

(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  authService.$inject = ['$state', 'angularAuth0', '$timeout'];

  function authService($state, angularAuth0, $timeout) {

    function login() {
      angularAuth0.authorize();
    }

    return {
      login: login
    }
  }
})();
```

::: note
**Checkpoint:** Try to call the `login` method from somewhere in your application to see the login page.
:::


![hosted login](/media/articles/web/hosted-login.png)

## Handle Authentication Tokens

Add more methods to the `authService` service to handle authentication in the app.

The example below shows the following methods:
* `handleAuthentication`: looks for the result of authentication in the URL hash. Then, the result is processed with the `parseHash` method from auth0.js
* `setSession`: sets the user's Access Token and ID Token, and the Access Token's expiry time 
* `logout`: removes the user's tokens and expiry time from browser storage
* `isAuthenticated`: checks whether the expiry time for the user's Access Token has passed

```js
// app/auth/auth.service.js

(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  authService.$inject = ['$state', 'angularAuth0', '$timeout'];

  function authService($state, angularAuth0, $timeout) {

    // ...    
    function handleAuthentication() {
      angularAuth0.parseHash(function(err, authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
          setSession(authResult);
          $state.go('home');
        } else if (err) {
          $timeout(function() {
            $state.go('home');
          });
          console.log(err);
        }
      });
    }

    function setSession(authResult) {
      // Set the time that the Access Token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
    }
    
    function logout() {
      // Remove tokens and expiry time from localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
    }
    
    function isAuthenticated() {
      // Check whether the current time is past the 
      // Access Token's expiry time
      let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }

    return {
      // ...
      handleAuthentication: handleAuthentication,
      logout: logout,
      isAuthenticated: isAuthenticated
    }
  }
})();
```

### Provide a Login Control

Provide a component with controls for the user to log in and log out.

${snippet(meta.snippets.use)}

::: note
This example uses Bootstrap styles. You can use any style library, or not use one at all.
:::

Depending on whether the user is authenticated or not, they see the **Log Out** or **Log In** button. The `ng-click` events on the buttons make calls to the `authService` service to let the user log in or out. When the user clicks **Log In**, they are redirected to the login page. 

<%= include('../../_includes/_hosted_login_customization' }) %>

### Add a Callback Component

When you use the login page, your users are taken away from your application. After they authenticate, they are automatically returned to your application and a client-side session is set for them. 

::: note
This example assumes you are using path-based routing by setting `$locationProvider.html5Mode(true)`. If you are using hash-based routing, you will not be able to specify a dedicated callback route. The URL hash will be used to hold the user's authentication information.
:::

<%= include('../../_includes/_callback_component') %>

Create a controller and a template to use for a callback route. Add a loading indicator.

::: note
To display a loading indicator, you need a loading spinner or another indicator in the `assests` directory. See the downloadable sample for demonstration. 
:::

```js
// app/callback/callback.controller.js

(function () {

  'use strict';

  angular
    .module('app')
    .controller('CallbackController', callbackController);

  function callbackController() {}

})();
```

```html
<!-- app/callback/callback.html -->

<div class="loading">
  <img src="assets/loading.svg" alt="loading">
</div>
```

After authentication, your users are taken to the `/callback` route. They see the loading indicator while the application sets up a client-side session for them. After the session is set up, the users are redirected to the `/home` route.

### Process the Authentication Result

When a user authenticates at the login page, they are redirected to your application. Their URL contains a hash fragment with their authentication information. The `handleAuthentication` method in the `authService` service processes the hash. 

Call the `handleAuthentication` method in your app's run block. The method processess the authentication hash while your app loads. 

```js
// app/app.run.js

(function () {

  'use strict';

  angular
    .module('app')
    .run(run);

  run.$inject = ['authService'];
    
  function run(authService) {
    // Handle the authentication
    // result in the hash
    authService.handleAuthentication();
  }

})();
```
