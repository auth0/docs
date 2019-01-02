---
title: Token Renewal
description: This tutorial demonstrates how to add automatic Access Token renewal to a React application with Auth0.
budicon: 448
topics:
  - quickstarts
  - spa
  - react
  - tokens
github:
  path: 05-Token-Renewal
contentType: tutorial
useCase: quickstart
---
<%= include('../_includes/_token_renewal_preamble') %>

## Add Token Renewal

In the `Auth` service, we already have a method which calls the `checkSession` method from auth0.js. If the renewal is successful, use the existing `setSession` method to set new tokens in local storage.

```js
// src/Auth/Auth.js

renewSession() {
  this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(`Could not get a new token (<%= "${err.error}" %>: <%= "${err.error_description}" %>).`);
      }
  });
}
```

The Access Token should be renewed when it expires. In this tutorial, we'll make sure it automatically reviews when the token expires. The expiry time of the token is stored in the Auth service `this.expiresAt`.

Define a timing mechanism for renewing the token.

::: note
You can define any timing mechanism you want. You can choose any library that handles timers. This example shows how to use a `setTimeout` call.
:::

In the `Auth` service, add a property called `tokenRenewalTimeout` which refers to the `setTimeout` call. 

Add a method called `scheduleRenewal` to set up the time when the authentication is silently renewed. The method subtracts the current time from the Access Token's expiry time and calculates delay. The `setTimeout` call uses the calculated delay and makes a call to `renewToken`.

The `setTimeout` call call is assigned to the `tokenRenewalTimeout` property. When the user logs out, the timeout is cleared. 

```js
// src/Auth/Auth.js

// ...

export default class Auth {
  // ...

  tokenRenewalTimeout;

  // ...

  scheduleRenewal() {
    let expiresAt = this.expiresAt;
    const timeout = expiresAt - Date.now();
    if (timeout > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewSession();
      }, timeout);
    }
  }

  getExpiryDate() {
    return JSON.stringify(new Date(this.expiresAt));
  }
}
```

You can now include a call to the `scheduleRenewal` method in the `setSession` method.

```js
// src/Auth/Auth.js

// ...

export default class Auth {
  // ...

  setSession(authResult) {
    // ...

    // schedule a token renewal
    this.scheduleRenewal();

    // ...
  }

  // ...
}
```

To schedule renewing the tokens when the page is refreshed, in the constructor of the `Auth` service, add a call to the `scheduleRenewal` method.

```js
// src/Auth/Auth.js

// ...

export default class Auth {
  // ,..

  constructor() {
    // ...

    this.scheduleRenewal();
  }

  // ,..
}
```

Since client-side sessions should not be renewed after the user logs out, call `clearTimeout` in the `logout` method to cancel the renewal.

```js
// src/Auth/Auth.js

// ...

export default class Auth {
  // ...

  logout() {
    // ...

    // Clear token renewal
    clearTimeout(this.tokenRenewalTimeout);

    // ...
  }

  // ...
}
```

<%= include('../_includes/_token_renewal_troubleshooting') %>