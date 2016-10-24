---
title: Authorization
description: This tutorial demonstrates how to assign roles to your users and use those claims to authorize or deny a user to access certain routes in the app
budicon: 500
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs2-systemjs-sample',
  path: '07-Authorization',
  requirements: [
    'Angular 2.0.1'
  ]
}) %>

<%= include('../_includes/_authorization-introduction', { ruleslink: '/docs/quickstart/spa/angular2/06-rules' }) %>

### Create a Rule to Assign Roles

<%= include('../_includes/_authorization-create-rule') %>

## Restrict a Route Based on User's Roles

To restrict access to certain routes, Angular's [CanActivate guard](https://angular.io/docs/ts/latest/guide/router.html#!#can-activate-guard) can be used.

First, add a new `AuthGuard` to the `/admin` route:

```typescript
// app/app.routes.ts

import { ModuleWithProviders }         from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';

import { HomeComponent }               from './home.component';
import { AdminComponent }              from './admin.component';
import { UnauthorizedComponent }       from './unauthorized.component';
import { AuthGuard }                   from './auth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [
  AuthGuard
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
```

To only allow users who have admin roles to access this route, check their status in the guard:

```typescript
// app/auth.guard.ts

import { Injectable }             from '@angular/core';
import { Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';
import { CanActivate }            from '@angular/router';
import { Auth }                   from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.auth.authenticated()){
      if(this.auth.isAdmin()){
        return true;
      } else {
        this.router.navigate(['unauthorized']);
        return false;
      }
    } else {
      // Save URL to redirect to after login and fetching profile to get roles
      localStorage.setItem('redirect_url', state.url);
      this.auth.login();
      this.router.navigate(['']);
      return false;
    }
  }
}
```

The `canActivate` method checks if the user is authenticated and then checks if they are an admin using a new `isAdmin` function added to the `Auth` service. This method checks if the `roles` attribute of `app_metadata` added by the rule contains `admin`:

```typescript
// app/auth.service.ts

...

public isAdmin() {
  return this.userProfile && this.userProfile.app_metadata
    && this.userProfile.app_metadata.roles
    && this.userProfile.app_metadata.roles.indexOf('admin') > -1;
}

...
```

Since the user's `app_metadata` is read-only for users, checking for their role in this fashion is secure.

After logging in successfully, the user will be redirected to the saved URL:

```typescript
// app/auth.service.ts

...

// Fetch profile information
this.lock.getProfile(authResult.idToken, (error, profile) => {
  ...

  // Redirect to the saved URL, if present.
  var redirectUrl: string = localStorage.getItem('redirect_url');
  if(redirectUrl != undefined){
    this.router.navigate([redirectUrl]);
    localStorage.removeItem('redirect_url');
  }
});
...
```

Now, if a user logs in with an email that contains `@example`, they will be allowed access to the `/admin` route.
