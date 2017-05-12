---
title: Authorization
description: This tutorial demonstrates how to add authorization and access control to an Angular 2+ app with Auth0
budicon: 546
---

<%= include('../_includes/_authz_preamble') %>

<%= include('../_includes/_authz_assigning_role') %>

<%= include('../_includes/_authz_check_admin_role') %>

Install the **jwt-decode** library so that the user's `id_token` can easily be decoded.

```bash
# installation with npm
npm install --save jwt-decode

# installation with yarn
yarn add jwt-decode
```

Create methods for checking the user's `role` and whether it is equal to `admin`.

```js
// src/app/auth/auth.service.ts

getRole(): string {
  const namespace = 'https://<your-domain>.com';
  const idToken = localStorage.getItem('id_token');
  return jwt_decode(idToken)[`<%= "${namespace}" %>/role`] || null;
}

isAdmin(): boolean {
  return this.getRole() === 'admin';
}
``` 

The `isAdmin` method can now be used alongside `isAuthenticated` to conditionally show and hide certain UI elements based on those two conditions.

```html
<!-- src/app/app.component.html -->

<button
  class="btn btn-primary btn-margin"
  *ngIf="auth.isAuthenticated() && auth.isAdmin()"
  routerLink="/admin">
    Admin Area
</button>
```

<%= include('../_includes/_authz_protect_client_routes') %>

To prevent access to client-side routes based on a `role` completely, use an `AuthGuard`.

```js
// src/app/auth/auth-guard.service.ts

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      if (this.auth.isAdmin()) {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
    }
  }

}
```

The guard implements the `CanActivate` interface which requires a method called `canActivate` on the service. This method returns `true` if the user is authenticated and has a role of `admin`, and false if not. It also navigates the user to the home route if they don't have the appropriate access level for the route.

Use the `AuthGuard` in the routing definition.

```ts
// src/app/app.routes.ts

import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';

export const ROUTES: Routes = [
  // ...
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }
];
```

The user will now be redirected to the main route unless they have a `role` of `admin`.

<%= include('../_includes/_authz_client_routes_disclaimer') %>