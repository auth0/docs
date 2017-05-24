<%= include('../../_includes/_login_preamble', { library: 'AngularJS' }) %>

## Configure angular-auth0

The angular-auth0 wrapper comes with a provider called `angularAuth0Provider`. This provider has an `init` method which takes a configuration object used to instantiate `WebAuth` from auth0.js . Inject `angularAuth0Provider` and pass the details for your client.

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

The options object passed to `angularAuth0Provider.init` includes configuration for your client and domain, a response type to indicate you would like to receive an `access_token` and `id_token` after authentication, and an `audience` and `scope` which specify that authentication should be [OIDC conformant](https://auth0.com/docs/api-auth/tutorials/adoption). Also specified is the location that users should be returned to after authentication is complete. In this case, that's a route of `/callback`, which will be implemented later.

## Create an Authentication Service

The best way to manage and coordinate the tasks necessary for user authentication is to create a reusable service. With the service in place, you'll be able to call its methods throughout your application. The name for it is at your discretion, but in these examples it will be called `authService` and the filename will be `auth.service.js`.

${snippet(meta.snippets.setup)}

The service includes several methods for handling authentication.

* `login` - calls `authorize` from auth0.js which redirects users to the login page
* `handleAuthentication` - looks for an authentication result in the URL hash and processes it with the `parseHash` method from auth0.js
* `setSession` - sets the user's `access_token`, `id_token`, and a time at which the `access_token` will expire
* `logout` - removes the user's tokens from browser storage
* `isAuthenticated` - checks whether the expiry time for the `access_token` has passed

When a user successfully authenticates at Auth0's hosted login page and is redirected back to your application, there will be a hash fragment in the URL containing their authentication information. Contained within will be an `access_token`, an `id_token` and an `expires_in` value. These values are extracted from the URL using the `parseHash` method from auth0.js and are then saved into local storage with the `setSession` method. This method also calculates the time at which the `access_token` will expire using the `expires_in` value from the hash.

Authentication using JSON Web Tokens is stateless by nature, meaning that there is no information about the user's session stored on your server. In this way, setting up a session for the user on the client side is simply a matter of saving the `access_token`, `id_token`, and a time that the `access_token` expires at in browser storage. Conversely, logging the user out only requires that these items be removed from storage. These examples use local storage to save the tokens and the expiry time, but you may also use session storage or cookies if you wish.

The application needs some way to make decisions about showing or hiding UI elements and restricting routing based on whether or not the user can be considered "authenticated". Once again, since JWT authentication is stateless, there is no real way to say whether the user is authenticated in any traditional sense, but there are clues that can be used. The best clue to go with is whether or not the `access_token` is expired. If it is expired, anything meaningful that the user could do with it--such as a call to your API for protected resources--will not work. It's at this point that the user would need to reauthenticate and get a new token. The `isAuthenticated` method checks whether the expiry time for the `access_token` has passed or not so that the above-mentioned decisions can be made.

## Provide a Login Control

Provide a component with controls for the user to log in and log out.

${snippet(meta.snippets.use)}

::: note
This example uses Bootstrap styles, but that's unimportant. Use whichever style library you like, or don't use one at all.
:::

The `ng-click` events on the **Log In** and **Log Out** buttons make the appropriate calls to the `authService` to allow the user to log in and log out. Notice that these buttons are conditionally hidden and shown depending on whether or not the user is currently authenticated.

When the **Log In** button is clicked, the user will be redirected to Auth0's hosted login page.

![hosted login](/media/articles/web/hosted-login.png)

<%= include('../../_includes/_hosted_login_customization' }) %>

## Process the Authentication Result

When a user authenticates at Auth0's hosted login page and is then redirected back to your application, their authentication information will be contained in a URL hash fragment. The `handleAuthentication` method in the `authService` is responsbile for processing the hash.

Call `handleAuthentication` in your app's run block so that the authentication hash fragment can be processed when the app first loads after the user is redirected back to it.

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

## Add a Callback Component

Using Auth0's hosted login page means that users are taken away from your application to a page hosted by Auth0. After they successfully authenticate, they are returned to your application where a client-side session is set for them.

<%= include('../../_includes/_callback_component') %>

Create a controller and template to use for a callback route and populate it with a loading indicator.

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

::: note
This example assumes some kind of loading spinner is available in the assets directory. See the downloadable sample for a demonstration.
:::

After authentication, users will be taken to the `/callback` route for a brief time where they will be shown a loading indicator. During this time, their client-side session will be set, after which they will be redirected to the `/home` route.

::: note
This example assumes you are using path-based routing by setting `$locationProvider.html5Mode(true)`. If you are using hash-based routing, you won't be able to specify a dedicated callback route because the URL hash will be used to hold the user's authentication information.
:::

## Embedded Login

Auth0's hosted login page provides the fastest, most secure, and most feature-rich way to implement authentication in your app. If required, the Lock widget can also be embedded directly into your application, but certain features such as single sign-on won't be accessible. It is highly recommended that you use the hosted login page (as covered in this tutorial), but if you wish to embed the Lock widget directly in your application, follow the [Embedded Login sample](https://github.com/auth0-samples/auth0-angularjs-samples/tree/embedded-login/01-Embedded-Login).
