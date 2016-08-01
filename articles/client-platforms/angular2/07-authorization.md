---
title: Authorization
description: This tutorial will show you how assign roles to your users, and use those claims to authorize or deny a user to access certain routes in the app.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-angularjs2-systemjs-sample',
  pkgBranch: 'master',
  pkgPath: '07-Authorization',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

<%= include('../_includes/_authorization-introduction', { ruleslink: '/docs/quickstart/spa/angular2/06-rules' }) %>

### Create a Rule to assign roles

<%= include('../_includes/_authorization-create-rule') %>_

## Restrict a route based on user's roles

In order to restrict access to certain routes, this example uses Angular2 [CanActivate guard](https://angular.io/docs/ts/latest/guide/router.html#!#can-activate-guard).

First, add a new `AuthGuard` to the `/admin` route:

```typescript
/* ===== app/app.routes.ts ===== */
import { AuthGuard }                   from './auth.guard';

export const routes: RouterConfig = [
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AuthGuard
];
```

To only allow users who have admin roles to access this route, check their status in the guard:

```typescript
/* ===== app/auth.guard.ts ===== */
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

The `canActivate` method checks if the user is authenticated then checks if they are an admin using a new `isAdmin` function added to the `Auth` service. This method checks if the `roles` attribute of `app_metadata` added by the rule contains `admin`:

```typescript
/* ===== app/auth.service.ts ===== */
...
public isAdmin() {
  return this.userProfile && this.userProfile.app_metadata
    && this.userProfile.app_metadata.roles
    && this.userProfile.app_metadata.roles.indexOf('admin') > -1;
}
...
```

After logging in successfully, the user will be redirected to the saved URL:

```typescript
/* ===== app/auth.service.ts ===== */
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


