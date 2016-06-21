---
title: Login
description: This tutorial will show you how to use the Auth0 Angular 2 SDK to add authentication and authorization to your web app.
---

#### Login

The best way to have authentication utilities available across the application is to use an Injectable service. So let's create that and add login functionality there. 

To implement login, first create an `Auth0Lock` instance. 
The instance creator receives your Auth0 credentials and an options object (available options [here](https://github.com/auth0/lock/tree/v10.0.0-beta.4#new-auth0lockclientid-domain-options-callback))

Then, just add a callback for the `authenticated` lock event, which receives one argument with login information. For now just store the `idToken` attribute into `localStorage`.

```typescript
/* ===== ./auth.service.ts ===== */
import {Injectable} from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock('YOUR_CLIENT_ID', 'YOUR_DOMAIN', {});

  constructor() {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
  };
}
```

In `login` method, just call `lock.show()` to display the login widget.
When the page is redirected after login, the callback defined for `authenticated` lock event will be inoked.

To know if a user is authenticated, just use `tokenNotExpired` from `angular2-jwt` which allows you to check whether there is a non-expired JWT in local storage.

To use this, just inject the `Auth` service into your component

```typescript
export class AppComponent {
  constructor(private auth: Auth) {}
}
``` 

and then in your component's template

```html
<div class="navbar-header">
  <a class="navbar-brand" href="#">Auth0 - Angular 2</a>
  <button class="btn btn-primary btn-margin" (click)="auth.login()" *ngIf="!auth.authenticated()">Log In</button>
  <button class="btn btn-primary btn-margin" (click)="auth.logout()" *ngIf="auth.authenticated()">Log Out</button>
</div>

```
The lock widget will pop up showing a Login form, when you click the Login button.

This is how it will look on a browser...

${browser}

Done. You've implemented Login and SignUp with Auth0 in your Angular2 project.