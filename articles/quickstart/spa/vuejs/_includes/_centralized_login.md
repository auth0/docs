<%= include('../../_includes/_login_preamble', { library: 'Vue.js', embeddedLoginLink: 'https://github.com/auth0-samples/auth0-vue-samples/tree/master/01-Login'}) %>

### Create an Authentication Service

The best way to manage and coordinate the tasks necessary for user authentication is to create a reusable service. With the service in place, you'll be able to call its methods throughout your application. The name for it is at your discretion, but in these examples it will be called `AuthService` and the filename will be `authService.js`. An instance of the `WebAuth` object from **auth0.js** can be created in the service.

Create a service and instantiate `auth0.WebAuth`. Provide a method called `login` which calls the `authorize` method from auth0.js.

```js
// src/auth/authService.js

import auth0 from 'auth0-js';
import EventEmitter from 'events';
import { AUTH_CONFIG } from './auth0-variables';

const webAuth = new auth0.WebAuth({
  domain: AUTH_CONFIG.domain,
  redirectUri: AUTH_CONFIG.callbackUrl,
  clientID: AUTH_CONFIG.clientId,
  responseType: 'id_token',
  scope: 'openid profile email'
});

class AuthService extends EventEmitter {
  login() {
    webAuth.authorize();
  }
}

export default new AuthService();
```

To provide the values for `clientID` and `domain`, create a new file `auth0-variables.js` in the same directory as `authService.js` and populate it with your tenant values:

```js
export const AUTH_CONFIG = {
  domain: '${account.tenant}',
  clientId: '${account.clientId}',
  callbackUrl: `<%= "${window.location.origin}" %>/callback`
};
```

::: note
**Checkpoint:** Try calling the `login` method from somewhere in your application. This could be from a button click or in some lifecycle event, just something that will trigger the method so you can see the login page.
:::

![hosted login](/media/articles/web/hosted-login.png)

## Handle Authentication Tokens

Add some additional methods to `AuthService` to fully handle authentication in the app.

```js
// src/auth/authService.js

const localStorageKey = 'loggedIn';
const loginEvent = 'loginEvent';

class AuthService extends EventEmitter {
  idToken = null;
  profile = null;
  tokenExpiry = null;

  // Handles the callback request from Auth0
  handleCallback() {
    return new Promise((resolve, reject) => {
      webAuth.parseHash((err, authResult) => {
        if (err) {
          reject(err);
        } else {
          this.localLogin(authResult);
          resolve(authResult.idToken);
        }
      });
    });
  }

  localLogin(authResult) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    this.tokenExpiry = new Date(this.profile.exp * 1000);

    localStorage.setItem(localStorageKey, 'true');

    this.emit(loginEvent, {
      loggedIn: true,
      profile: authResult.idTokenPayload
    });
  }

  renewTokens() {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem(localStorageKey) === 'true') {
        webAuth.checkSession({}, (err, authResult) => {
          if (err) {
            reject(err);
          } else {
            this.localLogin(authResult);
            resolve(authResult);
          }
        });
      } else {
        reject('Not logged in');
      }
    });
  }

  logOut() {
    localStorage.removeItem(localStorageKey);

    this.idToken = null;
    this.tokenExpiry = null;
    this.profile = null;

    webAuth.logout({
      returnTo: window.location.origin
    });

    this.emit(loginEvent, { loggedIn: false });
  }

  isAuthenticated() {
    return (
      new Date().getTime() < this.tokenExpiry &&
      localStorage.getItem(localStorageKey) === 'true'
    );
  }
}

export default new AuthService();
```

The service now includes several other methods for handling authentication.

- `handleCallback` - looks for an authentication result in the URL hash and processes it with the `parseHash` method from auth0.js
- `localLogin` - sets the user's Access Token, ID Token, and a time at which the Access Token will expire
- `renewTokens` - uses the `checkSession` method from auth0.js to renew the user's authentication status, and calls `localLogin` if the login session is still valid
- `logout` - removes the user's tokens from browser storage. It also calls `webAuth.logout` to log the user out at the authorization server
- `isAuthenticated` - checks whether the local storage flag is present and equals "true", and that the expiry time for the Access Token has passed

### About the Authentication Service

<%= include('../../_includes/_auth_service_method_description_auth0js') %>

### Create a Vue Plugin

So that the authentication service may be passed around easily to each component, create a Vue.js plugin that will inject the service into everywhere that needs it:

```js
// src/plugins/auth.js
import authService from '../auth/authService';

export default {
  install(Vue) {
    Vue.prototype.$auth = authService;

    Vue.mixin({
      created() {
        if (this.handleLoginEvent) {
          authService.addListener('loginEvent', this.handleLoginEvent);
        }
      },

      destroyed() {
        if (this.handleLoginEvent) {
          authService.removeListener('loginEvent', this.handleLoginEvent);
        }
      }
    });
  }
};
```

This plugin provides access to the `AuthService` class from each component, through the `this.$auth` property. It also provides a mechanism for when the login state changes, for components that implement a `handleLoginEvent` method.

Open `main.js` and install the plugin:

```js
// src/main.js

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import AuthPlugin from "./plugins/auth";

// Install the authentication plugin here
Vue.use(AuthPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

```

### Provide a Login Control

Provide a component with controls for the user to log in and log out.

::: note
This example was created from a [Vue CLI](https://cli.vuejs.org/) template and uses Single-File Components.
:::

${snippet(meta.snippets.use)}

::: note
This example uses Bootstrap styles, but that's unimportant. Use whichever style library you like, or don't use one at all. You can install these styles using `npm install bootstrap` on the command line.
:::

The `@click` events on the **Log In** and **Log Out** buttons make the appropriate calls to the `AuthService` to allow the user to log in and log out. Notice that these buttons are conditionally hidden and shown depending on whether or not the user is currently authenticated.

Also notice the use of `this.$auth` to access the `AuthService` instance given to us through the plugin that we created. Login events can be handled by providing a `handleLoginEvent` method on any component.

When the **Log In** button is clicked, the user will be redirected to login page.

<%= include('../../_includes/_hosted_login_customization' }) %>

When the application first starts up, a call to `renewTokens` is made that tries to reinitialize the user's login session, if it is detected that they should already be logged in. This would be the case, for example, if the user logged in and then refreshed the browser window.

### Add a Callback Component

Using Universal Login means that users are taken away from your application to a login page hosted by Auth0. After they successfully authenticate, they are returned to your application where a client-side session is set for them.

<%= include('../../_includes/_callback_component') %>

When a user authenticates at the login page and is then redirected back to your application, their authentication information will be contained in a URL hash fragment. The `handleAuthentication` method in the `AuthService` is responsible for processing the hash.

Install `vue-router` to allow callbacks to be routed properly to the `Callback` component:

```bash
npm install vue-router
```

Add a new file `router.js` inside the `src` folder with the following content:

```js
import VueRouter from 'vue-router';
import Callback from './components/Callback';

const routes = [
  {
    path: '/callback',
    component: Callback
  }
];

export default new VueRouter({
  mode: 'history',
  routes
});

```

::: note
This example relies on using path-based routing with `mode: 'history'`. If you are using hash-based routing, you won't be able to specify a dedicated callback route because the URL hash will be used to hold the user's authentication information.
:::

Updated `main.js` to register the router:

```js
import Vue from 'vue';
import App from './App.vue';
import AuthPlugin from './plugins/auth';

// NEW - import the router types
import router from './router';
import VueRouter from 'vue-router';

Vue.use(AuthPlugin);

// NEW - register the Vue router
Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
  router,   // NEW - register our routes with the application
  render: h => h(App)
}).$mount('#app');

```

Create a component named `Callback` and populate it with a loading indicator. The component should also call `handleAuthentication` from the `AuthService`.

```js
// src/components/Callback.vue

<template>
  <div class="spinner">
    <img src="../assets/loading.svg" alt="Loading">
  </div>
</template>

<script>
export default {
  methods: {
    handleLoginEvent() {
      this.$router.push("/");
    }
  },
  created() {
    this.$auth.handleCallback();
  }
};
</script>

<style scoped>
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


````

::: note
This example assumes some kind of loading spinner is available in the `assets` directory. See the downloadable sample for a demonstration.
:::

After authentication, users will be taken to the `/callback` route for a brief time where they will be shown a loading indicator. During this time, their client-side session will be set, after which they will be redirected to the `/` route.
