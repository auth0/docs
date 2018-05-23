---
title: Custom Login Form
description: This tutorial demonstrates how to add a custom login form to an Angular 2+ application with Auth0.
budicon: 448
github:
  branch: embedded-login
  path: 02-Custom-Login-Form
---

<%= include('../_includes/_custom_login_preamble') %>

<%= include('../_includes/_install_auth0js') %>

## Create a Login Component

Create a component to house the login form that should be used for your custom UI. In this example, the logic for all authentication transactions will be handled from the `AuthService`, which means the `LoginComponent` class only needs to inject that service.

```js
// src/app/login/login.component.ts

import { Component } from '@angular/core';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public auth: AuthService) { }

}
```

## Implement the Login Screen

Create a template with a `form` which allows users to pass in their email and password. This example will not make full use of Angular's form features, but rather will simply use template variables on the username and password inputs. The values from those inputs will be passed into the methods called on the Log In and Sign Up button's `click` events. You may also supply a button to trigger social authentication.

```html
<!-- src/app/login/login.component.html -->

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
    type="submit"
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

The auth0.js methods for making authentication requests come from the `WebAuth` object. Create an instance of `auth0.WebAuth` and provide the domain, client ID, and callback URL for your application. A `responseType` of `token id_token` should also be specified.

The `login` and `signup` methods should take the username and password input supplied by the user and pass it to the appropriate auth0.js methods. In the case of `login`, these values are passed to the `client.login` method. Since `client.login` is an XHR-based transaction, the authentication result is handled in a callback and the `setSession` method is called to set the user's `access_token`, `id_token`, and `access_token` expiry time in local storage if the transaction is successful.

The `signup` method is a redirect-based flow and the authentication result is handled by the `handleAuthentication` method. This method looks for an `access_token` and `id_token` in the URL hash when the user is redirected back to the application. If the tokens are found, they are saved into local storage and the user is redirected to the home route.

```js
// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Avoid name not found warnings
declare var auth0: any;

@Injectable()
export class AuthService {

  // Configure Auth0
  auth0 = new auth0.WebAuth({
    domain: ${account.namespace},
    clientID: ${account.clientId},
    redirectUri: 'http://localhost:4200/callback',
    audience: `https://${account.namespace}/userinfo`,
    responseType: 'token id_token'
  });

  constructor(private router: Router) { }

  public login(username: string, password: string): void {
    this.auth0.client.login({
      realm: 'Username-Password-Authentication',
      username,
      password
    }, (err, authResult) => {
      if (err) {
        alert(`Error: <%= "${err.description}" %>`);
        return;
      }
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      }
      this.router.navigate(['/home']);
    });
  }

  public signup(email, password): void {
    this.auth0.redirect.signupAndLogin({
      connection: 'Username-Password-Authentication',
      email,
      password,
    }, function (err) {
      if (err) {
        alert(`Error: <%= "${err.description}" %>`);
      }
    });
  }

  public loginWithGoogle(): void {
    this.auth0.authorize({
      connection: 'google-oauth2',
    });
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        alert(`Error: <%= "${err.error}" %>`); 
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(
      (authResult.expiresIn * 1000) + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/home']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the 
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}
```

The service has several other utility methods that are necessary to complete authentication transactions.

<%= include('../_includes/_custom_login_method_description') %>

The `handleAuthentication` method needs to be called in the application's root component.

```js
// src/app/app.component.ts

// ...
export class AppComponent {

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }

}
```