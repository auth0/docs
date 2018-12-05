<%= include('../../_includes/_login_preamble', { library: 'Vue.js', embeddedLoginLink: 'https://github.com/auth0-samples/auth0-vue-samples/tree/embedded-login/01-Embedded-Login'}) %>

### Create an Authentication Service

The best way to manage and coordinate the tasks necessary for user authentication is to create a reusable service. With the service in place, you'll be able to call its methods throughout your application. The name for it is at your discretion, but in these examples it will be called `AuthService` and the filename will be `AuthService.js`. An instance of the `WebAuth` object from **auth0.js** can be created in the service.

Create a service and instantiate `auth0.WebAuth`. Provide a method called `login` which calls the `authorize` method from auth0.js.

```js
// src/Auth/AuthService.js

import auth0 from 'auth0-js'
import EventEmitter from 'eventemitter3'
import router from './../router'

export default class AuthService {

  auth0 = new auth0.WebAuth({
    domain: '${account.namespace}',
    clientID: '${account.clientId}',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid'
  })

  login () {
    this.auth0.authorize()
  }
}
```

::: note
**Checkpoint:** Try calling the `login` method from somewhere in your application. This could be from a button click or in some lifecycle event, just something that will trigger the method so you can see the login page.
:::

![hosted login](/media/articles/web/hosted-login.png)

## Handle Authentication Tokens

Add some additional methods to the `Auth` service to fully handle authentication in the app.

Install the [`eventemitter3` package](https://github.com/primus/eventemitter3) required by the service.

`npm install --save eventemitter3`

```js
// src/Auth/AuthService.js

import auth0 from 'auth0-js'
import EventEmitter from 'eventemitter3'
import router from './../router'

class AuthService {
  accessToken
  idToken
  expiresAt
  authenticated = this.isAuthenticated()
  authNotifier = new EventEmitter()

  // ...
  handleAuthentication () {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        router.replace('home')
      } else if (err) {
        router.replace('home')
        console.log(err)
        alert(`Error: <%= "${err.error}" %>. Check the console for further details.`)
      }
    })
  }

  setSession (authResult) {
    this.accessToken = authResult.accessToken
    this.idToken = authResult.idToken
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime()

    this.authNotifier.emit('authChange', { authenticated: true })

    localStorage.setItem('loggedIn', true)
  }

  renewSession () {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
      } else if (err) {
        this.logout()
        console.log(err)
        alert(`Could not get a new token (<%= "${err.error}" %>: <%= "${err.error_description}" %>).`)
      }
    })
  }

  logout () {
    // Clear access token and ID token from local storage
    this.accessToken = null
    this.idToken = null
    this.expiresAt = null

    this.userProfile = null
    this.authNotifier.emit('authChange', false)

    localStorage.removeItem('loggedIn')

    // navigate to the home route
    router.replace('home')
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    return new Date().getTime() < this.expiresAt && localStorage.getItem('loggedIn') === 'true'
  }
}

export default new AuthService()

```

The service now includes several other methods for handling authentication.

* `handleAuthentication` - looks for an authentication result in the URL hash and processes it with the `parseHash` method from auth0.js
* `setSession` - sets the user's Access Token, ID Token, and a time at which the Access Token will expire
* `renewSession` - uses the `checkSession` method from auth0.js to renew the user's authentication status, and calls `setSession` if the login session is still valid
* `logout` - removes the user's tokens from browser storage
* `isAuthenticated` - checks whether the expiry time for the Access Token has passed

### About the Authentication Service

<%= include('../../_includes/_auth_service_method_description_auth0js') %>

### Provide a Login Control

Provide a component with controls for the user to log in and log out.

${snippet(meta.snippets.use)}

::: note
This example uses Bootstrap styles, but that's unimportant. Use whichever style library you like, or don't use one at all.
:::

The `@click` events on the **Log In** and **Log Out** buttons make the appropriate calls to the `AuthService` to allow the user to log in and log out. Notice that these buttons are conditionally hidden and shown depending on whether or not the user is currently authenticated.

When the **Log In** button is clicked, the user will be redirected to login page.

<%= include('../../_includes/_hosted_login_customization' }) %>

When the application first starts up, a call to `renewSession` is made that tries to reinitialize the user's login session, if it is detected that they should already be logged in. This would be the case, for example, if the user logged in and then refreshed the browser window.

### Add a Callback Component

Using Universal Login means that users are taken away from your application to a login page hosted by Auth0. After they successfully authenticate, they are returned to your application where a client-side session is set for them.

<%= include('../../_includes/_callback_component') %>

When a user authenticates at the login page and is then redirected back to your application, their authentication information will be contained in a URL hash fragment. The `handleAuthentication` method in the `AuthService` is responsible for processing the hash.

Create a component named `CallbackComponent` and populate it with a loading indicator. The component should also call `handleAuthentication` from the `AuthService`.

```js
// src/components/Callback.vue

<template>
  <div class="spinner">
    <img src="../assets/loading.svg" alt="loading"/>
  </div>
</template>

<script>
  export default {
    name: 'callback',
    props: ['auth'],
    created () {
      this.auth.handleAuthentication()
    }
  }
</script>

<style>
  .spinner {
    position: absolute;
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: white;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>

```

::: note
This example assumes some kind of loading spinner is available in the `assets` directory. See the downloadable sample for a demonstration.
:::

After authentication, users will be taken to the `/callback` route for a brief time where they will be shown a loading indicator. During this time, their client-side session will be set, after which they will be redirected to the `/home` route.

::: note
This example assumes you are using path-based routing with `mode: 'history'`. If you are using hash-based routing, you won't be able to specify a dedicated callback route because the URL hash will be used to hold the user's authentication information.
:::
