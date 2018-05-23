---
title: Token Renewal
description: This tutorial demonstrates how to add automatic Access Token renewal to an Angular2+ application with Auth0
budicon: 448
github:
  path: 05-Token-Renewal
---
<%= include('../_includes/_token_renewal_preamble') %>

## Add Token Renewal

To the `AuthService` service, add a method which calls the `checkSession` method from auth0.js. If the renewal is successful, use the existing `setSession` method to set the new tokens in local storage.

```typescript
// src/app/auth/auth.service.ts

public renewToken() {
  this.auth0.checkSession({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      this.setSession(result);
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

    const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

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
        this.renewToken();
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

In the `setSession` method, add the function right after setting the `access_token` and `id_token` into local storage.

```ts
// src/app/auth/auth.service.ts

private setSession(authResult): void {
  // Set the time that the Access Token will expire at
  const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now());

  localStorage.setItem('access_token', authResult.accessToken);
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('expires_at', expiresAt);

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
  // Remove tokens and expiry time from localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
  this.unscheduleRenewal();
  // Go back to the home route
  this.router.navigate(['/']);
}
```

<%= include('../_includes/_token_renewal_troubleshooting') %>

