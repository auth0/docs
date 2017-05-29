<%= include('../../_includes/_login_preamble', { library: 'AngularJS' }) %>

## Install the Dependencies

The dependencies required to power a basic login solution include Auth0's [Lock widget](/lock) and the [angular-lock](https://github.com/auth0/angular-lock) wrapper. The Lock widget can be retrieved from Auth0's CDN and angular-lock can be installed from npm.

> **Note:** You can also install the Lock widget from npm, but you will need to build the source code to a distributable file yourself.

```html
<script src="https://cdn.auth0.com/js/lock/10.16/lock.min.js"></script>
```

```bash
npm install --save angular-lock
```

## Configure the Lock Widget

An instance of the Lock widget with your application-specific configuration is done with the angular-lock provider. Inject the `lockProvider` provider in your application's configuration file and use the `init` method to pass the `clientID` and `domain` for your app, along with an options object.

```js
// app/app.js

angular
  .module('app', ['auth0.lock'])
  .config(config);

  config.$inject = ['lockProvider'];

  function config(lockProvider) {
  
    // Initialization for the angular-lock library
    lockProvider.init({ clientID: ${account.clientId}, domain: ${account.namspace}, options: {
        oidcConformant: true,
        autoclose: true,
        auth: {
          responseType: 'token id_token',
          audience: 'https://${account.namespace}/userinfo',
          redirectUrl: 'http://localhost:3000/callback'
        }
      }
    });
  }
```

One of the options set in this example is that the user should be redirected to a route of `/callback` when authentication is complete (for redirect-based authentication flows). This isn't necessary, but is helpful for improving user experience while the application loads up again after authentication. This route and its component will be implemented later.

<%= include('../../_includes/_auth_service_description') %>

Create an authentication service for your application. The naming is at your discretion, but in these examples it will be called `AuthService` and the filename will be `auth.service.ts`. An instance of the Lock widget can be created in the service and its configuration can be controlled there.

<%= include('../../_includes/_auth_service_methods') %>

```js
// app/auth/auth.service.js

(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  authService.$inject = ['$state', 'lock'];

  function authService($state, lock) {

    function login() {
      lock.show();
    }
    
    function handleAuthentication() {
      lock.interceptHash();
      lock.on('authenticated', function(authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
          setSession(authResult);
          $state.go('home');
        } else if (authResult && authResult.error) {
          alert(authResult.error);
        }
      });
    }

    function setSession(authResult) {
      // Set the time that the access token will expire at
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
      // access token's expiry time
      let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }

    return {
      login: login,
      handleAuthentication: handleAuthentication,
      logout: logout,
      isAuthenticated: isAuthenticated
    }
  }
})();
```

<%= include('../../_includes/_auth_service_method_description') %>

## Use the Authentication Service in Components

With the authentication service in place, it can now be used throughout the application. The first place it should be used is in the app's `run` block. It's in this component that the `handleAuthentication` method needs to be called.

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

The authentication service has a method named `login` which will call the Lock widget, but a UI to make this `login` call needs to be created.

Create a directive or component to house the HTML for the navbar.

```html
<!-- app/navbar/navbar.html -->

<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">Auth0 - Angular</a>

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

> This example uses Bootstrap styles, but that's unimportant. Use whichever style library you like, or don't use one at all.

The `ng-click` bound to the **Log In** and **Log Out** buttons make the appropriate calls to the `AuthService` to allow the user to log in and log out. Notice that these buttons are conditionally hidden and shown depending on whether or not the user is currently authenticated.

When the `Log In` button is clicked, the Lock widget will be shown, and the user can enter their credentials.

## Add a Callback Component

<%= include('../../_includes/_callback_component') %>

Create a directive or component named `callback` and populate it with a loading indicator.

```html
<!-- app/callback/callback.html -->

<div class="loading">
  <img src="assets/loading.svg" alt="loading">
</div>
```

> This example assumes some kind of loading spinner is available in an `assets` directory. See the downloadable sample for a demonstration.

The options that were passed to the `Auth0Lock` instance above include a `redirectUrl` set to the `/callback` route. This means that the user will be redirected to this newly created route after they authenticate with a redirect-based flow.