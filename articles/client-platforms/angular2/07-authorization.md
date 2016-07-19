---
title: Authorization
description: This tutorial will show you how assign roles to your users, and use those claims to authorize or deny a user to access certain routes in the app.
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample/tree/master/07-Authorization',
}) %>

<%= include('../_includes/_authorization-introduction', { ruleslink: '/quickstart/spa/angular2/06-rules' }) %>


### Restrict a route based on user's roles

In order to restric access to certain routes, we are going to use angular2 [CanActivate guard](https://angular.io/docs/ts/latest/guide/router.html#!#can-activate-guard)

Let's add a new `AuthGuard` to the `/admin` route:

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

We want only users who has admin roles to access this route, so we are going to check that in our guard:

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
      // Save url to redirect on login (after fetching profile to have roles)
      localStorage.setItem('redirect_url', state.url);
      this.auth.login();
      this.router.navigate(['']);
      return false;
    }
  }
}
```

Inside `canActivate` method we check if user is authenticated and if he is an admin using the new `isAdmin` function added to the `Auth` service. This method simply checks if the roles attribute (inside `app_metadata`) added by the rule  contains the `admin` role:

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

We are also storing the target url to make a redirect when successfully login, so let's add that:

```typescript
/* ===== app/auth.service.ts ===== */
...
// Fetch profile information
this.lock.getProfile(authResult.idToken, (error, profile) => {
  ...

  // Redirect if there is a saved url to do so.
  var redirectUrl: string = localStorage.getItem('redirect_url');
  if(redirectUrl != undefined){
    this.router.navigate([redirectUrl]);
    localStorage.removeItem('redirect_url');
  }
});
...
```

That's it. Only if you login with a mail that contains `@example` you will be able to access `/admin` route.

### Done!

You have implement one of the availables way to add authorization to your app.