---
title: Token Renewal
description: This tutorial demonstrates how to add automatic access_token renewal to an Angular 2+ application with Auth0
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

As a security measure, it is recommended that the lifetime of a user's `access_token` be kept short. When you create an API in the Auth0 dashboard, the default lifetime is 7200 seconds (2 hours).

This short lifetime is good for security, but it isn't great for user experience. You will likely want to provide a way for your users to automatically get a new `access_token` so that their client-side session can be kept alive. This can be done with **Silent Authentication**.

::: note

***Note***: The `access_token` lifetime is controlled from the [APIs section](https://manage.auth0.com/#/apis), while the `id_token` lifetime is controlled from the [Clients section](https://manage.auth0.com/#/clients). These two settings are independent of one another.

:::

## Server Setup

Renewing the user's `access_token` requires that a static HTML file to be served. Create a simple server with `express` and add a file called `silent.html`.

```js
// server.js

const express = require('express');
const app = express();
const cors = require('cors');
const staticFile = require('connect-static-file');

app.use(cors());
app.use('/silent', staticFile(`${__dirname}/silent.html`));

app.listen(3001);
console.log('Listening on http://localhost:3001');
```

```html
<!-- silent.html -->

<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="${auth0js_urlv8}"></script>
  <script>
    var AUTH0_CLIENT_ID = '${account.clientId}';
    var AUTH0_DOMAIN = '${account.namespace}';

    if (!AUTH0_CLIENT_ID || !AUTH0_DOMAIN) {
      alert('Make sure to set the AUTH0_CLIENT_ID and AUTH0_DOMAIN variables in silent.html.');
    }

    var webAuth = new auth0.WebAuth({
      domain: AUTH0_DOMAIN,
      clientID: AUTH0_CLIENT_ID,
      scope: 'openid profile',
      responseType: 'token id_token',
      redirectUri: 'http://localhost:4200'
    });
  </script>
  <script>
    webAuth.parseHash(window.location.hash, function (err, response) {
      parent.postMessage(err || response, 'http://localhost:4200');
    });
  </script>
</head>
<body></body>
</html>
```

This server will need to be running on port 3001 (it is hardcoded into the frontend). `silent.html` refers to `localhost:4200`, which is the port that `ng serve` will be serving the web app on. You will need to add `http://localhost:3001/silent` to the **Callback URLs** section in the client.

## Add Token Renewal

Add a method to the `AuthService` which calls the `renewAuth` method from `auth0.js`. If the renewal is successful, use the existing `setSession` method to set the new tokens in local storage.

```typescript
// src/app/auth/auth.service.ts

public renewToken() {
  this.auth0.renewAuth({
    audience: AUTH_CONFIG.apiUrl,
    redirectUri: 'http://localhost:3001/silent',
    usePostMessage: true
  }, (err, result) => {
    if (err) {
      alert(`Could not get a new token using silent authentication (${err.error}).`);
    } else {
      alert(`Successfully renewed auth!`);
      this.setSession(result);
    }
  });
}
```

This will load the silent callback page added earlier in an invisible iframe, make a call to Auth0, and give back the result. However, this has to be called manually. You probably want it to be automated, so add these functions:

```typescript
// src/app/auth/auth.service.ts

  public scheduleRenewal() {
    if(!this.isAuthenticated()) return;

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
    source.subscribe(() => {
      this.renewToken();
      this.scheduleRenewal();
    });
  }

  public unscheduleRenewal() {
    if(!this.refreshSubscription) return;
    this.refreshSubscription.unsubscribe();
  }
```

This will allow for scheduling and unscheduling token renewal any time it's appropriate. For example, you probably want to `scheduleRenewal` after you `login` (after getting a valid token) and when the application starts.

`setSession` can be modified as follows to add the function right after setting all of the tokens obtained from `login`:

```typescript
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

It should also added to the constructor for `AppComponent`, just in case a user still has a session after refreshing the app:

```typescript
// src/app/app.component.ts

export class AppComponent {

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
    auth.scheduleRenewal();
  }

}
```

Lastly, since these sessions should not persist after a logout, they should be cleared at that time:

```typescript
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

If you're having problems with token renewal (`login_required` error), then make sure you're not using Auth0 dev keys for social login. You must set up an app for this to work!
