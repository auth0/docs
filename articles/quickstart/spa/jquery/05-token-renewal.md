---
title: Token Renewal
description: This tutorial demonstrates how to add automatic Access Token renewal to a jQuery application with Auth0
budicon: 448
github:
  path: 05-Token-Renewal
---
<%= include('../_includes/_token_renewal_preamble') %>

## Add Token Renewal

To the `app.js` file, add a function that calls the `checkSession` method from auth0.js. If the renewal is successful, use the existing `setSession` method to set the new tokens in local storage.

```js
// app.js

function renewToken() {
  webAuth.checkSession({},
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

The access should be renewed when it expires. In this tutorial, the expiry time of the token is stored in local storage as `expires_at`. 

::: note
You can define any timing mechanism you want. You can choose any library that handles timers. This example shows how to use a simple `setTimeout` call. 
:::

To the `app.js` file, add a variable called `tokenRenewalTimeout`. The variable refers to the `setTimeout` call used to schedule the renewal. Next, add a function called `scheduleRenewal` to set up the time when authentication is silently renewed.

The function subtracts the current time from the Access Token's expiry time and calculates delay. 

The `setTimeout` call uses the calculated delay and makes a call to `renewToken`. 

The `setTimeout` call is assigned to the `tokenRenewalTimeout` property. When the user logs out, the timeout is cleared. 

```js
// app.js

var tokenRenewalTimeout;
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

You can now include a call to the `scheduleRenewal` function in the `setSession` function.

```js
// app.js

// ...
function setSession(authResult) {
  // Set the time that the Access Token will expire at
  var expiresAt = JSON.stringify(
    authResult.expiresIn * 1000 + new Date().getTime()
  );
  localStorage.setItem('access_token', authResult.accessToken);
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('expires_at', expiresAt);
  scheduleRenewal();
}
```

To schedule renewing the tokens when the page is refreshed, add a call to the `scheduleRenewal` function immediately when the page loads.

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