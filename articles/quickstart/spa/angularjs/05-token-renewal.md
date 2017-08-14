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

Add a method to the `authService` which calls the `renewAuth` method from auth0.js. If the renewal is successful, use the existing `setSession` method to set the new tokens in local storage.

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

This method will load the silent callback page added earlier in an invisible `iframe`, make a call to Auth0, and give back the result which is used to set a new client-side session.

The time at which token renewal should happen is when the `access_token` expires. If you've followed the previous steps of this tutorial, this time will be stored in local storage as `expires_at`.

The specific timing mechanism used to defer renewal until it is required is at your discretion. A simple `setTimeout` will be used in this example but you are free to choose a library which handles timers in a more feature-rich way if you like.

In the `authService`, add a property called `tokenRenewalTimeout` which will hold a reference to the `setTimeout` call used to schedule the renewal. Next, add a method called `scheduleRenewal` to set up a time at which authentication should be silently renewed.

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

A `delay` is calculated by taking the time at which the `access_token` expires and subtracting the current time from it. This `delay` is then used in a `setTimeout`, inside of which a call to `renewToken` is made.

Assigning the `setTimeout` to `tokenRenewalTimeout` is done so that the timeout can be cleared when the user logs out.

The `setSession` method can now be modified to include a call to `scheduleRenewal`.

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

Add a call to `scheduleRenewal` in the application's `run` block so that token renewal scheduling can be handled on page refresh.

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

Since client-side sessions should not persist after the user logs out, use a `clearTimeout` in the `logout` method to unschedule the renewal.

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

#### Troubleshooting

If you're having problems with token renewal (`login_required` error), make sure you're not using Auth0 dev keys for social login. You must use your own social authentication keys.
