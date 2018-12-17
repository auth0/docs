---
title: Token Renewal
description: This tutorial demonstrates how to add automatic Access Token renewal to a JavaScript application with Auth0.
budicon: 448
topics:
  - quickstarts
  - spa
  - vanillajs
  - tokens
github:
    path: 05-Token-Renewal
contentType: tutorial
useCase: quickstart
---
<%= include('../_includes/_token_renewal_preamble') %>

## Add Token Renewal

In the `app.js` file, add a function which calls the `checkSession` method from auth0.js. If the renewal is successful, use the existing `localLogin` method to set the new tokens in memory.

```js
// app.js

function renewTokens() {
  webAuth.checkSession({},
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        localLogin(result);
      }
    }
  );
}
```

The Access Token should be renewed when it expires. In this tutorial, the expiry time of the token is stored in memory as `expiresAt`.

::: note
You can define any timing mechanism you want. You can choose any library that handles timers. This example shows how to use a `setTimeout` call. 
:::

In the `app.js` file, add a variable called `tokenRenewalTimeout`. The variable refers to the `setTimeout` call used to schedule the renewal. Next, add a function called `scheduleRenewal` to set up the time when authentication is silently renewed.

The method subtracts the current time from the Access Token's expiry time and calculates delay. 
The `setTimeout` call uses the calculated delay and makes a call to `renewTokens`.

The `setTimeout` call is assigned to the `tokenRenewalTimeout` property. When the user logs out, the timeout is cleared. 

```js
// app.js

var tokenRenewalTimeout;
// ...
function scheduleRenewal() {
  var delay = expiresAt - Date.now();
  if (delay > 0) {
    tokenRenewalTimeout = setTimeout(function() {
      renewTokens();
    }, delay);
  }
}
```

You can now include a call to the `scheduleRenewal` method in the `localLogin` function.


```js
// app.js

// ...
function localLogin(authResult) {
  // Set isLoggedIn flag in localStorage
  localStorage.setItem('isLoggedIn', 'true');
  // Set the time that the access token will expire at
  expiresAt = JSON.stringify(
    authResult.expiresIn * 1000 + new Date().getTime()
  );
  accessToken = authResult.accessToken;
  idToken = authResult.idToken;
  scheduleRenewal();
}
```

To schedule renewing the tokens when the page is refreshed, add a call to the `scheduleRenewal` method immediately when the page loads.

```js
// app.js

window.addEventListener('load', function() {
  // ...
  scheduleRenewal();
});
```

Since client-side sessions should not be renewed after the user logs out, use `clearTimeout` in the `logout` method to cancel the renewal.

```js
// app.js

function logout() {
  // ...
  clearTimeout(tokenRenewalTimeout);
}
```

<%= include('../_includes/_token_renewal_troubleshooting') %>