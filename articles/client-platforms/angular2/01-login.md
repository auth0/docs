---
title: Login
description: This tutorial will show you how to integrate Auth0 with angular2 to add authentication and authorization to your web app.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-angularjs2-systemjs-sample',
  pkgBranch: 'master',
  pkgPath: '01-Login',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

## Login

The best way to have authentication utilities available across the application is to use an **Injectable** service.

You will need an `Auth0Lock` instance to receive your Auth0 credentials and an options object. (For a list of available options, see: [Customization](https://github.com/auth0/lock#customization).)

Then, add a callback for the `authenticated` event, which receives one argument with the login information. When the page is redirected after login, the callback defined for the `authenticated` lock event will be invoked.

For now, store the `idToken` attribute into `localStorage`.

In the `login` method, call `lock.show()` to display the login widget.

To check if a user is authenticated, use `tokenNotExpired` from [angular2-jwt](https://github.com/auth0/angular2-jwt), which allows you to see if there is a non-expired JWT in local storage.

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
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
  };
}
```

To use this service, inject the `Auth` service into your component:

```typescript
/* ===== app/app.component.ts ===== */
export class AppComponent {
  constructor(private auth: Auth) {}
}
```

and into your component's template:

```html
/* ===== app/app.template.html ===== */
<div class="navbar-header">
  <a class="navbar-brand" href="#">Auth0 - Angular 2</a>
  <button class="btn btn-primary btn-margin" (click)="auth.login()" *ngIf="!auth.authenticated()">Log In</button>
  <button class="btn btn-primary btn-margin" (click)="auth.logout()" *ngIf="auth.authenticated()">Log Out</button>
</div>
```

The Lock widget will be displayed when the **Login** button is clicked.

${browser}
