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

Keep the expiry time of a user's access token short for security. 
When you create an API in the Auth0 dashboard, the default lifetime is 7200 seconds (2 hours).

This short expiry time is good for security, but it isn't great for user experience. To improve that, you can provide a way for your users to automatically get a new access token so that their client-side session can be kept alive. This can be done with **Silent Authentication**.

::: note
You can control the expiry time of an access token from the [APIs section](${manage_url}/#/apis). 
You can control the expiry time of an id token from the [Clients section](${manage_url}/#/clients). 
These settings are independent.
:::

## Server Setup

To renew the user's access token, you need a static HTML file to be served. You can choose any server setup to do this. 
The example below uses **Node.js** and **express**.

Create a simple server with **express** and add a file called `silent.html`.

```js
// server.js

const express = require('express');
const app = express();
const cors = require('cors');
const staticFile = require('connect-static-file');

app.use(cors());
app.use('/silent', staticFile(`<%= "${__dirname}/silent.html" %>`));

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
    var webAuth = new auth0.WebAuth({
      domain: '${account.namespace}',
      clientID: '${account.clientId}',
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

In this example, the server is running at `localhost:3001`. This value is hardcoded as the `redirectUri` method. The `silent.html` file makes reference to `localhost:4200` which is the address that the Angular CLI uses for development servers.

::: note
Add `http://localhost:3001/silent` to the **Callback URLs** section in your application's client settings.
:::

## Add Token Renewal

Add a method to the `AuthService` service to call the `renewAuth` method from **auth0.js**. If the renewal is successful, use the existing `setSession` method to set new tokens in local storage.

```typescript
// src/app/auth/auth.service.ts

public renewToken() {
  this.auth0.renewAuth({
    audience: '${apiIdentifier}',
    redirectUri: 'http://localhost:3001/silent',
    usePostMessage: true
  }, (err, result) => {
    if (err) {
      alert(`<%= "Could not get a new token using silent authentication (${err.error})." %>`);
    } else {
      alert(`Successfully renewed auth!`);
      this.setSession(result);
    }
  });
}
```

The method loads the silent callback page added earlier in an invisible `iframe`, makes a call to Auth0, and gives back the result.

Add a method called `scheduleRenewal` to set up a time when authentication is silently renewed. Define the `refreshSubscription` class property that holds a reference to the subscription that refreshes your token.

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

Add a call to `scheduleRenewal` in the root app component to schedule renewing the tokens when the page is refreshed.

```ts
// src/app/app.component.ts

export class AppComponent {

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
    auth.scheduleRenewal();
  }

}
```

Client-side sessions should not be renewed after the user logs out. Call `unscheduleRenewal` in the `logout` method to cancel the renewal.

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

If you're having problems with token renewal (for example, you get the `login_required` error), make sure you're not using Auth0 dev keys for social login. You must use your own social authentication keys.