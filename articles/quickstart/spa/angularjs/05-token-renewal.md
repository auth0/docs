---
title: Token Renewal
description: This tutorial demonstrates how to add automatic access token renewal to an application with Auth0
budicon: 448
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-samples',
  path: '05-Token-Renewal',
  requirements: [
    'Angular 1.6'
  ]
}) %>

<%= include('../_includes/_token_renewal_preamble') %>

<%= include('../_includes/_token_renewal_server_setup', { serverPort: '3000', clientPort: '3000' }) %>

## Add Token Renewal

To the `authService` service, add a method  to call the `renewAuth` method from auth0.js. If the renewal is successful, use the existing `setSession` method to set new tokens in local storage.

The method loads the silent callback page added earlier in an invisible iframe, makes a call to Auth0, and gives back the result.

```js
// app/auth/auth.service.js

function renewToken() {
  angularAuth0.renewAuth(
    {
      audience: '{YOUR_API_IDENTIFIER}',
      redirectUri: 'http://localhost:3000/silent',
      usePostMessage: true
    },
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        setSession(result);
      }
    }
  );
}
```

The access token should be renewed when it expires. In this tutorial, the expiry time of the token is stored in local storage as `expires_at`.

Define a timing mechanism for renewing the access token. 

::: note
You can define any timing mechanism you want. You can choose any library that handles timers. This example shows how to use a `setTimeout` call. 
:::

In the `authService` service, add a property called `tokenRenewalTimeout`. The property refers to the `setTimeout` call used to schedule the renewal.

Add a method called `scheduleRenewal` to set up the time when authentication is silently renewed.
The method subtracts the current time from the access token's expiry time and calculates delay. 
The `setTimeout` call uses the calculated delay and makes a call to `renewToken`.

The `setTimeout` call is assigned to the `tokenRenewalTimeout` property. When the user logs out, the timeout is cleared. 

```js
// app/auth/auth.service.js

var tokenRenewalTimeout
// ...
function scheduleRenewal() {
  var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  var delay = expiresAt - Date.now();
  if (delay > 0) {
    tokenRenewalTimeout = setTimeout(function() {
      renewToken();
    }, delay);
  }
}
```

You can now include a call to the `scheduleRenewal` method in the `setSession` method.

```js
// app/auth/auth.service.js

// ...
function setSession(authResult) {
  // Set the time that the access token will expire at
  let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
  localStorage.setItem('access_token', authResult.accessToken);
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('expires_at', expiresAt);

  // schedule a token renewal
  scheduleRenewal();
}
```

To schedule renewing the tokens when the page is refreshed, in the application's `run` block, add a call to the `scheduleRenewal` method.

```js
// app/app.run.js

angular
  .module('app')
  .run(run);
  
function run(authService) {
  // ...

  // Schedule the token to be renewed
  authService.scheduleRenewal();
}
```

Since client-side sessions should not be renewed after the user logs out, call `unscheduleRenewal` in the `logout` method to cancel the renewal.

```js
// app/auth/auth.service.js

function logout() {
  // Remove tokens and expiry time from localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
  clearTimeout(tokenRenewalTimeout);
  $state.go('home');
}
```

<%= include('../_includes/_token_renewal_troubleshooting') %>