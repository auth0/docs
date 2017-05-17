---
title: Custom Login
description: This tutorial will show you how to use the Auth0 library to add custom authentication and authorization to your web app.
budicon: 448
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs2-systemjs-sample',
  path: '02-Custom-Login',
  requirements: [
    'Angular 2.4.10'
  ]
}) %>

In the [previous step](/quickstart/spa/angular2/01-login), we enabled login with the Auth0 Lock widget. You can also build your own UI with a custom design for authentication if you like. To do this, use the [auth0.js library](https://github.com/auth0/auth0.js).

::: panel-info Version Requirements
This quickstart and the accompanying sample demonstrate custom login with auth0.js version 8. If you are using auth0.js version 7, please see the [reference guide](https://auth0.com/docs/libraries/auth0js/v7) for the library, as well as the [legacy Angular custom login sample](https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample/tree/auth0js-v7/02-Custom-Login).
:::

## Getting Started

The auth0.js library can either be retrieved from Auth0's CDN or from npm. You should also install angular2-jwt so that its JWT utility methods can be used.

**CDN Link**

```html
<!-- index.html  -->

<script src="${auth0js_urlv8}"></script>
```

**npm**

```bash
npm install --save auth0-js angular2-jwt
```

## Create a Login Component

Create a component to house the template that should be used for your custom UI. In this example, the logic for all authentication transactions will be handled from the `Auth` service, which means the `LoginComponent` class only needs to inject that service.

```js
import { Component } from '@angular/core';
import { Auth } from './auth.service';

@Component({
  selector: 'login',
  templateUrl: 'app/login.template.html'
})
export class LoginComponent {
  constructor(private auth: Auth) {}
}
```

## Implement the Login Screen

Create a template with a `form` which allows users to pass in their email and password. This example will not make full use of Angular's form features, but rather will simply use template variables on the username and password inputs. The values from those inputs will be passed into the methods called on the Log In and Sign Up button's `click` events. You may also supply a button to trigger social authentication.

```html
<!-- app/login.template.html -->

<form>
  <div class="form-group">
    <label for="name">Username</label>
    <input
      type="text"
      class="form-control"
      #username
      placeholder="Enter your email">
  </div>
  <div class="form-group">
    <label for="name">Password</label>
    <input
      type="password"
      class="form-control"
      #password
      placeholder="Enter your password">
  </div>
  <button
    type="submit"
    class="btn btn-default"
    (click)="auth.login(username.value, password.value)">
      Log In
  </button>
  <button
    type="button"
    class="btn btn-default"
    (click)="auth.signup(username.value, password.value)">
      Sign Up
  </button>
  <button
    type="button"
    class="btn btn-default btn-primary"
    (click)="auth.loginWithGoogle()">
      Log In with Google
  </button>
</form>
```

## Create an Authentication Service

All authentication transactions should be handled from an injectable service. The service requires methods named `login`, `signup`, and `loginWithGoogle` which all make calls to the appropriate auth0.js methods to handle those actions. These methods are called from the `login` template above.

The auth0.js methods for making authentication requests come from the `WebAuth` object. Create an instance of `auth0.WebAuth` and provide the domain, client ID, and callback URL for your client. A `responseType` of `token id_token` should also be specified.

The `login` and `signup` methods should take the username and password input supplied by the user and pass it to the appropriate auth0.js methods. In the case of `login`, these values are passed to the `redirect.loginWithCredentials` method, and for `signup`, they are passed to `redirect.signupAndLogin`.

These methods are redirect-based and the authentication result is handled by the `parseHash` method. This method looks for an access token and ID token in the URL hash when the user is redirected back to the application. If those tokens are found, they are saved into local storage and the user is redirected to the home route.

```js
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

// Avoid name not found warnings
declare var auth0: any;

@Injectable()
export class Auth {

  // Configure Auth0
  auth0 = new auth0.WebAuth({
    domain: '${account.namespace}',
    clientID: '${account.clientId}',
    // specify your desired callback URL
    redirectUri: 'http://localhost:3000',
    responseType: 'token id_token'
  });

  constructor(private router: Router) {
  }

  public handleAuthentication(): void {
    this.auth0.parseHash({ _idTokenVerification: false }, (err, authResult) => {
      if (err) {
        alert(`Error: <%= "${err.errorDescription}" %>`)
      }
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        this.router.navigate(['/home']);
      }
    });
  }

  public login(username: string, password: string): void {
    this.auth0.redirect.loginWithCredentials({
      connection: 'Username-Password-Authentication',
      username,
      password
    }, err => {
      if (err) return alert(err.description);
    });
  }

  public signup(email, password): void {
    this.auth0.redirect.signupAndLogin({
      connection: 'Username-Password-Authentication',
      email,
      password,
    }, err => {
      if (err) return alert(err.description);
    });
  }

  public loginWithGoogle(): void {
    this.auth0.authorize({
      connection: 'google-oauth2',
    });
  }

  public isAuthenticated(): boolean {
    // Check whether the id_token is expired or not
    return tokenNotExpired('id_token');
  }

  public logout(): void {
    // Remove token from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
  }

  private setUser(authResult): void {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
  }
}
```

The service has several other utility methods that are necessary to complete authentication transactions.

* The `handleAuthentication` method is necessary to get the authentication result from the URL in redirect-based authentication transactions. This method needs to be called when the app starts so that the authentication result (which comes back in the hash of a redirection) is properly handled.
* The `logout` method removes the user's tokens from local storage which effectively logs them out of the application.
* The `setUser` method takes an authentication result object and sets the access token and ID token values into local storage
* The `isAuthenticated` method uses `tokenNotExpired` from angular2-jwt to check for the user's authentication state based on the `id_token`'s expiry time.

The `handleAuthentication` method needs to be called in the application's root component.

```js
// ...
export class AppComponent {
  constructor(private auth: Auth) {
    this.auth.handleAuthentication();
  }
}
```
