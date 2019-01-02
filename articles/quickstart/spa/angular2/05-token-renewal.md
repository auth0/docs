---
title: Token Renewal
description: This tutorial demonstrates how to add automatic Access Token renewal to an Angular2+ application with Auth0.
budicon: 448
topics:
  - quickstarts
  - spa
  - angular2
  - tokens
github:
  path: 05-Token-Renewal
contentType: tutorial
useCase: quickstart
---
<%= include('../_includes/_token_renewal_preamble') %>

## Add Token Renewal

To the `AuthService` service, add a method which calls the `checkSession` method from auth0.js. If the renewal is successful, use the existing `localLogin` method to set the new tokens in memory.

```ts
// src/app/auth/auth.service.ts

public renewTokens() {
  this.auth0.checkSession({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      this.localLogin(result);
    }
  });
}
```

Add a method called `scheduleRenewal` to set up the time when authentication is silently renewed.

Define the `refreshSubscription` class property, which will hold a reference to the subscription that refreshes your token.

```ts
// src/app/auth/auth.service.ts
export class AuthService {

  // ..
  // define the refreshSubscription property
  refreshSubscription: any;

  // ...
  public scheduleRenewal() {
    if (!this.isAuthenticated()) { return; }
    this.unscheduleRenewal();

    const expiresAt = this._expiresAt;

    const expiresIn$ = Observable.of(expiresAt).pipe(
      mergeMap(
        expiresAt => {
          const now = Date.now();
          // Use timer to track delay until expiration
          // to run the refresh at the proper time
          return Observable.timer(Math.max(1, expiresAt - now));
        }
      )
    );

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSub = expiresIn$.subscribe(
      () => {
        this.renewTokens();
        this.scheduleRenewal();
      }
    );
  }

  public unscheduleRenewal() {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }
}
```

This lets you schedule token renewal any time. For example, you can schedule a renewal after the user logs in and then again, if the page is refreshed.

In the `localLogin` method, add the function right after setting the Access Token and ID Token into memory.

```ts
// src/app/auth/auth.service.ts

private localLogin(authResult): void {
  // Set isLoggedIn flag in localStorage
  localStorage.setItem('isLoggedIn', 'true');
  // Set the time that the access token will expire at
  const expiresAt = (authResult.expiresIn * 1000) + Date.now();
  this._accessToken = authResult.accessToken;
  this._idToken = authResult.idToken;
  this._expiresAt = expiresAt;

  this.scheduleRenewal();
}
```

Add a call to the `scheduleRenewal` method in the root app component to schedule a renewal when the page is refreshed.

```ts
// src/app/app.component.ts

export class AppComponent {

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
    auth.scheduleRenewal();
  }

}
```

Since client-side sessions should not be renewed after the user logs out, call the `unscheduleRenewal` method in the `logout` method to cancel the renewal.

```ts
// src/app/auth/auth.service.ts

public logout(): void {
  // Remove tokens and expiry time
  this._idToken = '';
  this._accessToken = '';
  this._expiresAt = 0;
  // Remove isLoggedIn flag from localStorage
  localStorage.removeItem('isLoggedIn');
  this.unscheduleRenewal();
  // Go back to the home route
  this.router.navigate(['/']);
}
```

<%= include('../_includes/_token_renewal_troubleshooting') %>
