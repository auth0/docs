---
title: Token Renewal
description: This tutorial demonstrates how to add automatic access token renewal to an application with Auth0
budicon: 448
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angular-samples',
  path: '05-Token-Renewal',
  requirements: [
    'Angular 2+'
  ]
}) %>

<%= include('../_includes/_token_renewal_preamble') %>

<%= include('../_includes/_token_renewal_server_setup', { serverPort: '3001', clientPort: '4200' }) %>

## Add Token Renewal

Add a method to the `AuthService` which calls the `renewAuth` method from auth0.js. If the renewal is successful, use the existing `setSession` method to set the new tokens in local storage.

```typescript
// src/app/auth/auth.service.ts

public renewToken() {
  this.auth0.renewAuth({
    audience: '${apiIdentifier}',
    redirectUri: 'http://localhost:3001/silent',
    usePostMessage: true
  }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      this.setSession(result);
    }
  });
}
```

This will load the silent callback page added earlier in an invisible `iframe`, make a call to Auth0, and give back the result. Add a method called `scheduleRenew` to set up a time at which authentication should be silently renewed. You'll also want to define a class property `refreshSubscription`, which holds a reference to the subscription that refreshes your token.

```ts
// src/app/auth/auth.service.ts

// ...
public scheduleRenewal() {
  if(!this.isAuthenticated()) return;
  this.unscheduleRenewal();

  const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

  const source = Observable.of(expiresAt).flatMap(
    expiresAt => {

      const now = Date.now();

      // Use the delay in a timer to
      // run the refresh at the proper time
      return Observable.timer(Math.max(1, expiresAt - now));
    });

  // Once the delay time from above is
  // reached, get a new JWT and schedule
  // additional refreshes
  this.refreshSubscription = source.subscribe(() => {
    this.renewToken();
    this.scheduleRenewal();
  });
}

public unscheduleRenewal() {
  if(!this.refreshSubscription) return;
  this.refreshSubscription.unsubscribe();
}
```

This will allow for scheduling and unscheduling token renewal any time it's appropriate. For example, you probably want to schedule a renewal after the user logs in and then again if the page is refreshed.

The `setSession` method can be modified to add the function right after setting the `access_token` and `id_token` into local storage.

```ts
// src/app/auth/auth.service.ts

private setSession(authResult): void {
  // Set the time that the access token will expire at
  const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now());

  localStorage.setItem('access_token', authResult.accessToken);
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('expires_at', expiresAt);

  this.scheduleRenewal();
}
```

Add a call to `scheduleRenewal` in the root app component so that a renewal is scheduled when the page is refreshed.

```ts
// src/app/app.component.ts

export class AppComponent {

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
    auth.scheduleRenewal();
  }

}
```

Since client-side sessions should not persist after the user logs out, call `unscheduleRenewal` in the `logout` method to unschedule the renewal.

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

#### Troubleshooting

If you're having problems with token renewal (`login_required` error), make sure you're not using Auth0 dev keys for social login. You must use your own social authentication keys.
