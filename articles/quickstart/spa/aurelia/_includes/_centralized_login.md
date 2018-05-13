<%= include('../../_includes/_login_preamble', { library: 'Aurelia', embeddedLoginLink:'https://github.com/auth0-community/auth0-aurelia-samples/tree/embedded-login/01-Embedded-Login' }) %>

### Create an Authentication Service

The best way to manage and coordinate the tasks necessary for user authentication is to create a reusable service. With the service in place, you'll be able to call its methods throughout your application. The name for it is at your discretion, but in these examples it will be called `AuthService` and the filename will be `auth-service.js`. An instance of the `WebAuth` object from **auth0.js** can be created in the service.

Create a service and instantiate `auth0.WebAuth`. Provide a method called `login` which calls the `authorize` method from auth0.js.

```js
// src/auth-service.js

import auth0 from 'auth0-js';

export class AuthService {
  auth0 = new auth0.WebAuth({
    domain: '${account.namespace}',
    clientID: '${account.clientId}',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://${account.namespace}/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
```

::: note
**Checkpoint:** Try calling the `login` method from somewhere in your application. This could be from a button click or in some lifecycle event, just something that will trigger the method so you can see the login page.
:::

![hosted login](/media/articles/web/hosted-login.png)

## Handle Authentication Tokens

Add some additional methods to the `Auth` service to fully handle authentication in the app. Use the `inject` decorator to inject `Router`.

```js
// src/auth-service.js

import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import EventEmitter from 'EventEmitter';

@inject(Router)
export class AuthService {
  // ...
  authNotifier = new EventEmitter();

  constructor(Router) {
    this.router = Router;
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.router.navigate('home');
        this.authNotifier.emit('authChange', { authenticated: true });
      } else if (err) {
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.router.navigate('home');
    this.authNotifier.emit('authChange', false);
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
```

The service now includes several other methods for handling authentication.

* `handleAuthentication` - looks for an authentication result in the URL hash and processes it with the `parseHash` method from auth0.js
* `setSession` - sets the user's `access_token`, `id_token`, and a time at which the `access_token` will expire
* `logout` - removes the user's tokens from browser storage
* `isAuthenticated` - checks whether the expiry time for the `access_token` has passed

### About the Authentication Service

<%= include('../../_includes/_auth_service_method_description_auth0js') %>

### Provide a Login Control

Provide a component with controls for the user to log in and log out.

${snippet(meta.snippets.use)}

::: note
This example uses Bootstrap styles, but that's unimportant. Use whichever style library you like, or don't use one at all.
:::

The `click.delegate` events on the **Log In** and **Log Out** buttons make the appropriate calls to the `AuthService` to allow the user to log in and log out. Notice that these buttons are conditionally hidden and shown depending on whether or not the user is currently authenticated.

When the **Log In** button is clicked, the user will be redirected to the login page.

<%= include('../../_includes/_hosted_login_customization' }) %>

### Add a Callback Component

Using universal login means that users are taken away from your application to a login page hosted by Auth0. After they successfully authenticate, they are returned to your application where a client-side session is set for them.

<%= include('../../_includes/_callback_component') %>

When a user authenticates at the login page and is then redirected back to your application, their authentication information will be contained in a URL hash fragment. The `handleAuthentication` method in the `AuthService` is responsbile for processing the hash.

Create a component named `CallbackComponent` and populate it with a loading indicator. The component should also call `handleAuthentication` from the `AuthService`.

```html
<!-- src/callback.html -->

<template>
  <div class="spinner">
    <img src="../static/loading.svg" alt="loading"/>
  </div>
</template>
```

```js
// src/callback.js

import { inject } from 'aurelia-framework';
import { AuthService } from './auth-service';

@inject(AuthService)
export class Callback {
  constructor(AuthService) {
    this.auth = AuthService;
    this.auth.handleAuthentication();
  }
}
```

::: note
This example assumes some kind of loading spinner is available in the `assets` directory. See the downloadable sample for a demonstration.
:::

### Configure Routing

Add routing configuration using `configureRouter` to the application's main module.

```js
// src/app.js

export class App {
  // ...
  configureRouter(config, router) {
    config.options.pushState = true;
    config.map([
      {
        route: ['', 'home'],
        name: 'home',
        moduleId: PLATFORM.moduleName('./home'),
        nav: true,
        title: 'Home'
      },
      {
        route: 'callback',
        name: 'callback',
        moduleId: PLATFORM.moduleName('./callback'),
        nav: false,
        title: 'Callback'
      }
    ]);

    this.router = router;
  }
}
```

After authentication, users will be taken to the `/callback` route for a brief time where they will be shown a loading indicator. During this time, their client-side session will be set, after which they will be redirected to the `/home` route.

::: note
This example assumes you are using path-based routing with `config.options.pushState = true`. If you are using hash-based routing, you won't be able to specify a dedicated callback route because the URL hash will be used to hold the user's authentication information.
:::
