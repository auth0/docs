---
title: Authorization
description: This tutorial demonstrates how to add authorization and access control to an Angular2+ application.
budicon: 546
github:
  path: 04-Authorization
sample_download_required_data:
  - client
  - api
---
<%= include('../_includes/_authz_preamble') %>

<%= include('../_includes/_authz_determining_scopes') %>

## Handle Scopes in the `AuthService` Service

Add a local member to your `AuthService` service and intialize it with all the scopes you want to request when users log in. Use this member when initializing your instance of the `auth0.WebAuth` object.

```ts
// src/app/auth/auth.service.ts

requestedScopes: string = 'openid profile read:messages write:messages';

auth0 = new auth0.WebAuth({
  // ...
  scope: this.requestedScopes
});
``` 

<%= include('../_includes/_authz_set_session') %>

```ts
// src/app/auth/auth.service.ts

private setSession(authResult): void {

  const scopes = authResult.scope || this.requestedScopes || '';

  // ...
  localStorage.setItem('scopes', JSON.stringify(scopes));
}
```

<%= include('../_includes/_authz_user_has_scopes') %>

```ts
// src/app/auth/auth.service.ts

public userHasScopes(scopes: Array<string>): boolean {
  const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
  return scopes.every(scope => grantedScopes.includes(scope));
}
```

## Conditionally Display UI Elements

You can use the `userHasScopes` method with the `isAuthenticated` method to show and hide certain UI elements.

```html
<!-- src/app/app.component.html -->

<button
  class="btn btn-primary btn-margin"
  *ngIf="auth.isAuthenticated() && auth.userHasScopes(['write:messages'])"
  routerLink="/admin">
    Admin Area
</button>
```

## Protect Client-Side Routes

You may want to give access to some routes in your application only to authenticated users. You can check if the user is authenticated with the `canActivate` hook.

Create a new service called `AuthGuardService`.

```ts
// src/app/auth/auth-guard.service.ts

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
```

In your route configuration, apply the `AuthGuardService` service to the `canActivate` hook for any routes you want to protect.

```ts
// src/app/app.routes.ts

import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';

export const ROUTES: Routes = [
  // ...
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'ping', component: PingComponent, canActivate: [AuthGuard] },
];
```

The guard implements the `CanActivate` interface which requires the `canActivate` method in the service. This method returns `true` if the user is authenticated and `false` if they are not. It also navigates the user to the home route if they are not authenticated.

### Limit Route Access Based on Scopes

To prevent access to client-side routes based on a scope, create a service called `ScopeGuard`. This service uses Angular's   `ActivatedRouteSnapshot` to check for a set of `expectedScopes` passed in the `data` key of the route configuration.

If the user does not have the `write:messages` scope, they are redirected to the main route.

```ts
// src/app/auth/scope-guard.service.ts

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class ScopeGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const scopes = (route.data as any).expectedScopes;

    if (!this.auth.isAuthenticated() || !this.auth.userHasScopes(scopes)) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
```

```ts
// src/app/app.routes.ts

import { ScopeGuardService as ScopeGuard } from './auth/scope-guard.service';

export const ROUTES: Routes = [
  // ...
  { path: 'admin', component: AdminComponent, canActivate: [ScopeGuard], data: { expectedScopes: ['write:messages']} },
];
```

<%= include('../_includes/_authz_conditionally_assign_scopes') %>

<%= include('../_includes/_authz_client_routes_disclaimer') %>
