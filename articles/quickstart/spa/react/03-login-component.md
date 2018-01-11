---
title: Login
description: This tutorial demonstrates how to add user login to your application with Auth0
budicon: 448
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-react-samples',
  path: '01-Login',
  requirements: [
    'React 15.5'
  ]
}) %>

<%= include('../_includes/_getting_started', { library: 'React', callback: 'http://localhost:3000/callback' }) %>

<%= include('../_includes/_login_preamble', { library: 'React', embeddedLoginLink: 'https://github.com/auth0-samples/auth0-react-samples/tree/embedded-login/01-Embedded-Login' }) %>

## Is Authenticated?

The application needs to know if the user is already authenticated. This can be done by checking
the expiration date that was set in the session token, within `localStorage`.

Add an `isAuthenticated` method to the `Auth` class to handle this:

```js
// src/Auth/Auth.js
// ...

export default class Auth {
  // ...

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}
```

Your login control will use this method to determine whether or not to show the 'login' link
or a 'logout' link.

When the 'logout' link is shown, the `Auth` service will need a method to clear the session
token.

```js
// src/Auth/Auth.js
// ...

export default class Auth {
  // ...

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/home');
  }

}
```

With these methods in place, you can build out the login control.

## Provide a Login Control

Provide a component with controls for the user to log in and log out.

${snippet(meta.snippets.use)}

::: note
This example uses Bootstrap styles. You can use any style library you want, or not use one at all.
:::

Depending on whether the user is authenticated or not, they see the **Log In** or **Log Out** button. The `click` events on the buttons make calls to the `Auth` service to let the user log out or log in. When the user clicks the **Log In** button, they are redirected to the Auth0 hosted login page. 

<%= include('../_includes/_hosted_login_customization' }) %>
