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

To the `AuthService` service, add a method which calls the `renewAuth` method from auth0.js. If the renewal is successful, use the existing `setSession` method to set new tokens in local storage.

The method loads the silent callback page added earlier in an invisible iframe, makes a call to Auth0, and gives back the result.

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

Add a method called `scheduleRenewal` to set up a time when authentication is silently renewed. Define the `refreshSubscription` class property. The property holds a reference to the subscription that refreshes your token.

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

You can now schedule token renewal. For example, you may want to schedule a renewal after the user logs in, and then again if the page is refreshed.

You can modify the `setSession` method to add the function right after setting the `access_token` and `id_token` into local storage.

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

Add a call to the `scheduleRenewal` method in the root app component to schedule renewing the tokens when the page is refreshed.

```ts
// src/app/app.component.ts

export class AppComponent {

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
    auth.scheduleRenewal();
  }

}
```

Since client-side sessions should not be renewed after the user logs out, call `unscheduleRenewal` in the `logout` method to cancel the renewal.

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