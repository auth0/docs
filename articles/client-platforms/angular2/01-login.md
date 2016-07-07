---
title: Login
description: This tutorial will show you how to integrate Auth0 with angular2 to add authentication and authorization to your web app.
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample/tree/master/01-Login',
}) %>


### Login

The best way to have authentication utilities available across the application is to use an Injectable service. So let's create that and add login functionality there. 

To implement login, first create an `Auth0Lock` instance. 
The instance creator receives your Auth0 credentials and an options object (available options [here](https://github.com/auth0/lock/tree/v10.0.0-rc.1#customization))

Then, just add a callback for the `authenticated` lock event, which receives one argument with login information. For now just store the `idToken` attribute into `localStorage`.

```typescript
/* ===== app/auth.service.ts ===== */
import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {});

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

To know if a user is authenticated, just use `tokenNotExpired` from [angular2-jwt](https://github.com/auth0/angular2-jwt) which allows you to check whether there is a non-expired JWT in local storage.

To use this, just inject the `Auth` service into your component

```typescript
/* ===== app/app.component.ts ===== */
export class AppComponent {
  constructor(private auth: Auth) {}
}
``` 

and then in your component's template

```html
/* ===== app/app.template.html ===== */
<div class="navbar-header">
  <a class="navbar-brand" href="#">Auth0 - Angular 2</a>
  <button class="btn btn-primary btn-margin" (click)="auth.login()" *ngIf="!auth.authenticated()">Log In</button>
  <button class="btn btn-primary btn-margin" (click)="auth.logout()" *ngIf="auth.authenticated()">Log Out</button>
</div>

```
The lock widget will pop up showing a Login form, when you click the Login button.


${browser}


### Done!

You've implemented Login and SignUp with Auth0 in your Angular2 project.