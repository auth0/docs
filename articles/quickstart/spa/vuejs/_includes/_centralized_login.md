<!-- markdownlint-disable MD041 MD002 -->

## Create a Sample Application

::: note
The following tutorial creates a new Vue application using the [Vue CLI](https://cli.vuejs.org/guide/), and presents some common ways to build Vue applications, in terms of its structure and naming conventions. If you are using this guide to integrate the Auth0 SDK into your Vue application, you may need to adjust some of the steps to suit your scenario.
:::

If you don't already have an existing application, you can create one using the [Vue CLI](https://cli.vuejs.org/guide/) tool. Using the terminal, find a location on your drive where you want to create the project and run the following commands:

```bash
# Install the CLI
npm install -g @vue/cli

# Create the application using the Vue CLI.
# When asked to pick a preset, accept the defaults
vue create my-app

# Move into the project directory
cd my-app

# Add the router, as we will be using it later
# Select 'yes' when asked if you want to use history mode
vue add router
```

Adding the router to this project conveniently adds a couple of views and a basic router to the project. We will make use of those later in the tutorial!

### Install the SDK

After creating a new Vue app using the CLI, install the [Auth0 Client SDK](https://github.com/auth0/auth0-spa-js):

```bash
npm install @auth0/auth0-spa-js
```

### Start the application

Now start the application from the command line:

```bash
PORT=3000 npm run serve
```

At this point, you can leave the application running in the background, as it will reload whenever you make changes. Note the port number — if you intend your app to run on a different port, remember to adjust this number throughout the quickstart.

## Create an Authentication Wrapper

The best way to manage and coordinate the tasks necessary for user authentication is to create a reusable wrapper object around the Auth0 SDK. In this sample, this wrapper is implemented as a Vue object. Doing this makes it much easier to work with the asynchronous methods of the Auth0 SDK, thanks to the reactive nature of Vue.

This code also implements a simple Vue plugin that exposes this wrapper object to the rest of the application.

To implement the wrapper, create a new folder called `auth` inside the `src` folder, and then create a new file called `index.js` inside. Populate this file with the following content:

:::note
The intention is for the following code snippet and the associated Vue plugin to be refactored into a separate dependency, to be installed as a dependency of your project. For now, add the code inline into your project.
:::

```js
import Vue from "vue";
import createAuth0Client from "@auth0/auth0-spa-js";

/** Define a default action to perform after authentication */
const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

let instance;

/** Returns the current instance of the SDK */
export const getInstance = () => instance;

/** Creates an instance of the Auth0 SDK. If one has already been created, it returns that instance */
export const useAuth0 = ({
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  redirectUri = window.location.origin,
  ...options
}) => {
  if (instance) return instance;

  // The 'instance' is simply a Vue object
  instance = new Vue({
    data() {
      return {
        loading: true,
        isAuthenticated: false,
        user: {},
        auth0Client: null,
        popupOpen: false,
        error: null
      };
    },
    methods: {
      /** Authenticates the user using a popup window */
      async loginWithPopup(o) {
        this.popupOpen = true;

        try {
          await this.auth0Client.loginWithPopup(o);
        } catch (e) {
          // eslint-disable-next-line
          console.error(e);
        } finally {
          this.popupOpen = false;
        }

        this.user = await this.auth0Client.getUser();
        this.isAuthenticated = true;
      },
      /** Handles the callback when logging in using a redirect */
      async handleRedirectCallback() {
        this.loading = true;
        try {
          await this.auth0Client.handleRedirectCallback();
          this.user = await this.auth0Client.getUser();
          this.isAuthenticated = true;
        } catch (e) {
          this.error = e;
        } finally {
          this.loading = false;
        }
      },
      /** Authenticates the user using the redirect method */
      loginWithRedirect(o) {
        return this.auth0Client.loginWithRedirect(o);
      },
      /** Returns all the claims present in the ID token */
      getIdTokenClaims(o) {
        return this.auth0Client.getIdTokenClaims(o);
      },
      /** Returns the access token. If the token is invalid or missing, a new one is retrieved */
      getTokenSilently(o) {
        return this.auth0Client.getTokenSilently(o);
      },
      /** Gets the access token using a popup window */

      getTokenWithPopup(o) {
        return this.auth0Client.getTokenWithPopup(o);
      },
      /** Logs the user out and removes their session on the authorization server */
      logout(o) {
        return this.auth0Client.logout(o);
      }
    },
    /** Use this lifecycle method to instantiate the SDK client */
    async created() {
      // Create a new instance of the SDK client using members of the given options object
      this.auth0Client = await createAuth0Client({
        domain: options.domain,
        client_id: options.clientId,
        audience: options.audience,
        redirect_uri: redirectUri
      });

      try {
        // If the user is returning to the app after authentication..
        if (
          window.location.search.includes("code=") &&
          window.location.search.includes("state=")
        ) {
          // handle the redirect and retrieve tokens
          const { appState } = await this.auth0Client.handleRedirectCallback();

          // Notify subscribers that the redirect callback has happened, passing the appState
          // (useful for retrieving any pre-authentication state)
          onRedirectCallback(appState);
        }
      } catch (e) {
        this.error = e;
      } finally {
        // Initialize our internal authentication state
        this.isAuthenticated = await this.auth0Client.isAuthenticated();
        this.user = await this.auth0Client.getUser();
        this.loading = false;
      }
    }
  });

  return instance;
};

// Create a simple Vue plugin to expose the wrapper object throughout the application
export const Auth0Plugin = {
  install(Vue, options) {
    Vue.prototype.$auth = useAuth0(options);
  }
};

```

The `options` object passed to the plugin is used to provide the values for `clientId` and `domain`. For this example, create a new file `auth_config.json` in the root directory of the application alongside your `package.json` file, and populate it with the values from your application created above:

```json
{
  "domain": "${account.namespace}",
  "clientId": "${account.clientId}"
}
```

:::warning
This configuration file contains non-sensitive values relating to your Auth0 app. However, we recommend not committing this file into source control.
:::

<!-- ![hosted login](/media/articles/web/hosted-login.png) -->

Finally, open `src/main.js` and use `Vue.use` to install the plugin, as in the following example:

```js
import Vue from "vue";
import App from "./App.vue";
import router from './router'

// Import the Auth0 configuration
import { domain, clientId } from "../auth_config.json";

// Import the plugin here
import { Auth0Plugin } from "./auth";

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
```

Notice that the configuration file created earlier has been imported and used to initialize the plugin. A custom redirect handler has also been supplied, which redirects the user to a protected route after they have authenticated (this is covered a bit later).

## Log in to the App

In this section, you will provide a way for the user to log in or log out, depending on their authentication status.

Open the `src/views/Home.vue` file and modify the template to include two buttons that enable the user to log in and log out:

```html
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />

    <!-- Check that the SDK client is not currently loading before accessing is methods -->
    <div v-if="!$auth.loading">
      <!-- show login when not authenticated -->
      <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
      <!-- show logout when authenticated -->
      <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
    </div>
  </div>
</template>
```

Notice that the buttons are wrapped in a directive that makes sure `$auth.loading` is false. This is because most methods on the SDK client are asynchronous, and you must wait until the client has finished loading before trying to access things like the user's authentication state.

Further down the `Home.vue` file, modify the components script and implement the `login` and `logout` methods as follows:

```js
<script>
// .. imports removed for brevity

export default {
  name: "home",
  components: {
    HelloWorld
  },
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>
```

:::panel Checkpoint
Try running the application at this point. Provided you have configured your Auth0 credentials correctly, you should be redirected to the Auth0 Universal Login page, and back to your app against once you have logged in.

Then, you should be able to click **Log out** and have the application log you out of the system.
:::

<%= include('../../_includes/_hosted_login_customization') %>

## Display the User's Profile

In this section, you will display the user's profile information on a new page, as an example of how to retrieve the user's profile data.

Once the user authenticates, the SDK extracts the user's profile information and stores it in memory. It can be accessed using `this.$auth.user` from inside a Vue component.

To display the profile information, create a new file called `Profile.vue` in the `views` folder. Use the `this.$auth.user` property to access the user's profile data and display it on the page, as in the following example:

```js
<template>
  <div>
    <div>
      <img :src="$auth.user.picture">
      <h2>{{ $auth.user.name }}</h2>
      <p>{{ $auth.user.email }}</p>
    </div>

    <div>
      <pre>{{ JSON.stringify($auth.user, null, 2) }}</pre>
    </div>
  </div>
</template>
```

### Add a route to the Profile component

You will add a route to this Profile component so that the user may access it via the UI and the navigation bar. In the next section, you will protect this route from unauthenticated users.

To access the profile page, open the `router/index.js` file and import the `Profile` component. Then, modify the routes list so that the `Profile` component is mapped to `/profile`, as in the following example:

```js
//.. other imports

// NEW - Import the profile component
import Profile from "../views/Profile.vue";

const router = new VueRouter({
  mode: 'history',
  routes: [
    // .. other routes and pages ..

    // NEW - add the route to the /profile component
    {
      path: "/profile",
      name: "profile",
      component: Profile
    }
  ]
});

export default router;
```

Next, modify the navigation bar in `App.vue` to include a route to the profile page, making sure that it is only available when the user is authenticated:

```html
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|

      <!-- NEW - add a route to the profile page -->
      <router-link v-if="$auth.isAuthenticated" to="/profile">Profile</router-link>
    </div>
    <router-view />
  </div>
</template>
```

:::panel Checkpoint
Now when you run the application, you should be able to log in and see the link to the profile page in the navigation bar. When you navigate to the profile page, the user's information will be visible on the screen.
:::

## Secure the Profile Page

Even though the `/profile` route is only shown if the user is authenticated, the user could still manually type the URL into the browser and access the page if they have not logged in — although there will be nothing to see.

A catch-all rule can be added to the router so that access is only permitted if the user is logged in. If they are not logged in, they will be prompted to log in before being redirected to the location they tried to access in the first place.

Create a new file in the `src/auth` folder called `authGuard.js`, and use the `getInstance` method of the authentication service to implement a function that will prevent a route from being accessed by an unauthenticated user:

```js
import { getInstance } from "./index";

export const authGuard = (to, from, next) => {
  const authService = getInstance();

  const fn = () => {
    // If the user is authenticated, continue with the route
    if (authService.isAuthenticated) {
      return next();
    }

    // Otherwise, log in
    authService.loginWithRedirect({ appState: { targetUrl: to.fullPath } });
  };

  // If loading has already finished, check our auth state using `fn()`
  if (!authService.loading) {
    return fn();
  }

  // Watch for the loading property to change before we check isAuthenticated
  authService.$watch("loading", loading => {
    if (loading === false) {
      return fn();
    }
  });
};
```

Notice that in the call to `loginWithRedirect`, the URL that the user was trying to access (`to.fullPath`) is supplied. This URL will be returned to the app after authentication and is used to redirect the user to the place they were trying to reach before they logged in.

:::note
To see how the `targetUrl` property is used to navigate the user once they have authenticated, revisit the <a href="#create-a-vue-plugin">Create a Vue Plugin</a> section again and inspect how the plugin is installed into your Vue app.
:::

Finally, open up `src/router/index.js` and use the guard to protect the `/profile` route, as in the following example:

```js
// .. other imports ..

import { authGuard } from "../auth/authGuard";

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // .. other routes ..
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      beforeEnter: authGuard
    }
  ]
});
```

:::panel Checkpoint
Start the application and make sure you are logged out. Now, modify the URL in your browser's navigation bar to include the `/profile` path on the end. This should cause the application to ask you to authenticate. Once you have logged in, the profile page should be visible without you having to navigate there manually.
:::
