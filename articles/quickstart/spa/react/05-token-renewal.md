---
title: Token Renewal
description: This tutorial demonstrates how to add automatic Access Token renewal to a React application with Auth0.
budicon: 448
github:
  path: 05-Token-Renewal
---
<%= include('../_includes/_token_renewal_preamble') %>

## Add Token Renewal

To the `Auth` service, add a method which calls the `checkSession` method from auth0.js. If the renewal is successful, use the existing `setSession` method to set new tokens in local storage.

```js
// src/Auth/Auth.js

renewToken() {
  this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        this.setSession(result);
      }
    }
  );
}
```

The Access Token should be renewed when it expires. In this tutorial, the expiry time of the token is stored in local storage as `expires_at`.

Define a timing mechanism for renewing the token. 

::: note
You can define any timing mechanism you want. You can choose any library that handles timers. This example shows how to use a `setTimeout` call.
:::

In the `Auth` service, add a property called `tokenRenewalTimeout` which refers to the `setTimeout` call. 

Add a method called `scheduleRenewal` to set up the time when the authentication is silently renewed. The method subtracts the current time from the Access Token's expiry time and calculates delay. The `setTimeout` call uses the calculated delay and makes a call to `renewToken`.

The `setTimeout` call call is assigned to the `tokenRenewalTimeout` property. When the user logs out, the timeout is cleared. 

```js
// src/Auth/Auth.js

tokenRenewalTimeout
// ...
scheduleRenewal() {
  const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  const delay = expiresAt - Date.now();
  if (delay > 0) {
    this.tokenRenewalTimeout = setTimeout(() => {
      this.renewToken();
    }, delay);
  }
}
```

You can now include a call to the `scheduleRenewal` method in the `setSession` method.

```js
// src/Auth/Auth.js

// ...
setSession(authResult) {
  // Set the time that the Access Token will expire at
  let expiresAt = JSON.stringify(
    authResult.expiresIn * 1000 + new Date().getTime()
  );

  localStorage.setItem('access_token', authResult.accessToken);
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('expires_at', expiresAt);

  // schedule a token renewal
  this.scheduleRenewal();

  // navigate to the home route
  history.replace('/home');
}
```

To schedule renewing the tokens when the page is refreshed, in the constructor of the `Auth` service, add a call to the `scheduleRenewal` method.

```js
// src/Auth/Auth.js

// ...
constructor() {
  // ...
  this.scheduleRenewal();
}
```

Since client-side sessions should not be renewed after the user logs out, call `clearTimeout` in the `logout` method to cancel the renewal.

```js
// src/Auth/Auth.js

logout() {
  // ...
  clearTimeout(this.tokenRenewalTimeout);
}
```

<%= include('../_includes/_token_renewal_troubleshooting') %>