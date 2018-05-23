---
title: Embedded Login
description: This tutorial demonstrates how to add user login to an Angular 2+ application with Auth0.
budicon: 448
github: 
  branch: embedded-login
  path: 01-Embedded-Login
---

As an alternative to Auth0's universal login page, the Lock widget can be embedded directly in your application.

<%= include('../_includes/_install_lock') %>

The Lock widget can also be retrieved from Auth0's CDN.

```html
<script src="${lock_url}"></script>
```

## Create an Authentication Service

The best way to manage and coordinate the tasks necessary for user authentication is to create a reusable service. With the service in place, you'll be able to call its methods throughout your application. The name for it is at your discretion, but in these examples it will be called `AuthService` and the filename will be `auth.service.ts`. An instance of the `Auth0Lock` can be created in the service.

```ts
// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import Auth0Lock from 'auth0-lock';

@Injectable()
export class AuthService {

  lock = new Auth0Lock(${account.clientId}, ${account.namespace}, {
    autoclose: true,
    auth: {
      redirectUrl: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      audience: `https://${account.namespace}/userinfo`,
      params: {
        scope: 'openid'
      }
    }
  });

  constructor(public router: Router) {}

  public login(): void {
    this.lock.show();
  }

  // Call this method in app.component
  // if using path-based routing
  public handleAuthentication(): void {
    this.lock.on('authenticated', (authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.router.navigate(['/']);
      }
    });
    this.lock.on('authorization_error', (err) => {
      this.router.navigate(['/']);
      console.log(err);
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
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
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}
```

<%= include('../_includes/_auth_service_methods') %>

<%= include('../_includes/_auth_service_method_description_lock') %>

## Provide a Login Control

Provide a template with controls for the user to log in and log out.

```html
<!-- src/app/app.component.html -->

<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">Auth0 - Angular</a>

      <button
        class="btn btn-primary btn-margin"
        routerLink="/">
          Home
      </button>

      <button
        class="btn btn-primary btn-margin"
        *ngIf="!auth.isAuthenticated()"
        (click)="auth.login()">
          Log In
      </button>

      <button
        class="btn btn-primary btn-margin"
        *ngIf="auth.isAuthenticated()"
        (click)="auth.logout()">
          Log Out
      </button>

    </div>
  </div>
</nav>

<main class="container">
  <router-outlet></router-outlet>
</main>
```

::: note
This example uses Bootstrap styles, but that's unimportant. Use whichever style library you like, or don't use one at all.
:::

The `click` events on the **Log In** and **Log Out** buttons make the appropriate calls to the `AuthService` to allow the user to log in and log out. Notice that these buttons are conditionally hidden and shown depending on whether or not the user is currently authenticated.

When the **Log In** button is clicked, the Lock widget will be shown.

![embedded login](/media/articles/web/embedded-login.png)

## Process the Authentication Result

When users authenticate with the Lock widget, they are redirected back to your application with authentication information in the URL where it can be picked up and processed by Lock. The `handleAuthentication` method in the `AuthService` listens for the appropriate Lock events and sets the user's client-side session or logs an error to the console.

Call `handleAuthentication` in your app's root component so that Lock's events can be listened for.

```js
// src/app/app.component.ts

import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }

}
```

## Add a Callback Component

When users log in with the Lock widget, they will be redirected back to your application where Lock will process the result.

<%= include('../_includes/_callback_component') %>

Create a component named `CallbackComponent` and populate it with a loading indicator.

```html
<!-- app/callback/callback.html -->

<div class="loading">
  <img src="assets/loading.svg" alt="loading">
</div>
```

:;: note
This example assumes some kind of loading spinner is available in an `assets` directory. See the downloadable sample for a demonstration.
:::

The options that were passed to the `Auth0Lock` instance above include a `redirectUrl` set to the `/callback` route. This means that the user will be redirected to this newly created route after they authenticate with a redirect-based flow.

## Using HashLocationStrategy

Single page applications generally provide two ways to accomplish routing: with hashes or without hashes. The benefit to not uses hashes is that the URLs produced for the routes are cleaner, but this also requires some configuration on the server to make it work properly.

Angular 2+ uses `PathLocationStrategy` by default, meaning that there will be no hash fragment in the URL when routes are produced. You can elect to use `HashLocationStrategy` if you like, but doing so will require a different way to handle the `authenticated` event fired by the Lock widget.

If you are using `HashLocationStrategy`, use the following method to respond to authentication transactions instead of the `handleAuthentication` method defined above.

```js
// src/app/auth/auth.service.ts

// Call this method in app.component
// if using hash-based routing
public handleAuthenticationWithHash(): void {
  this
    .router
    .events
    .pipe(
      filter(event => event.constructor.name === 'NavigationStart'),
      filter(event => (/access_token|id_token|error/).test(event.url))
    )
    .subscribe(() => {
      this.lock.resumeAuth(window.location.hash, (error, authResult) => {
        if (error) return console.log(error);
        this.setSession(authResult);
        this.router.navigate(['/']);
      });
  });
}
```

This method uses the `resumeAuth` function from Lock to properly handle the hash fragment that is included with authentication results.

Call the `handleAuthenticationWithHash` method in your `AppComponent`.

```js
// src/app/auth/auth.service.ts

// ...
export class AppComponent {

  constructor(public auth: AuthService) {
    auth.handleAuthenticationWithHash();
  }

}
```
