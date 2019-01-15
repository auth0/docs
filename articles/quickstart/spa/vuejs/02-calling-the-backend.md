---
title: Calling the Backend
description: This tutorial demonstrates how to make calls to your backend API
budicon: 546
topics:
  - quickstarts
  - spa
  - vuejs
  - apis
github:
  path: 02-calling-the-backend
sample_download_required_data:
  - client
contentType: tutorial
useCase: quickstart
---

Most single-page apps use resources from data APIs. You may want to restrict access to those resources, so that only authenticated users with sufficient privileges can access them. Auth0 lets you manage access to these resources using [API Authorization](/api-auth).

In the case where your SPA is calling your backend API (as opposed to a third-party API that might potentially be accessed by lots of clients), we are able to use the ID Token to verify whether or not the client should be able to access the resource. This is in contrast to using an access token, which would be used if we were accessing a third-party API. In this case, the Auth0 application client ID can be used as the `audience` value when validating the token against the Json Web Key Set.

<%= include("../_includes/_calling_api_create_backend.md") %>

Modify `package.json` to add two new scripts `dev` and `api` that can be used to start the frontend and the backend API together:

```json
{
  "name": "02-calling-the-backend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "dev": "npm-run-all --parallel serve api",
    "api": "node server.js"
  },

  // .. package dependencies and other JSON nodes
}
```

You can now start the project using `npm run dev` in the terminal, and the frontend Vue.js application will start up alongside the backend API.

### Set up a proxy to the backend API

In order to call the API from the frontend application, the development server must be configured to proxy requests through to the backend API. To do this, add a `vue.config.js` file to the root of the project and populate it with the following code:

```js
// vue.config.js

module.exports = {
  devServer: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:3001"
      }
    }
  }
};
```

::: note
This assumes that your project was created using [Vue CLI 3](https://cli.vuejs.org/guide/). If your project was not created in the same way, the above should be included as part of your Webpack configuration.
:::

With this in place, the frontend application can make a request to `/api/private` and it will be correctly proxied through to our backend API at `http://localhost:3001/api/private`.

## Augment the Authentication Service

Open `authService.js` and add two methods to aid in retrieving and validating the ID Token:

```js
// src/auth/authService.js

class AuthService extends EventEmitter {

  // .. other methods

  isIdTokenValid() {
    return this.idToken && this.tokenExpiry && this.tokenExpiry > Date.now();
  }

  getIdToken() {
    return new Promise((resolve, reject) => {
      if (this.isIdTokenValid()) {
        resolve(this.idToken);
      } else if (this.isAuthenticated()) {
        this.renewTokens().then(authResult => {
          resolve(authResult.idToken);
        }, reject);
      } else {
        reject("The user is not authenticated");
      }
    });
  }
}
```

* `isIdTokenValid` performs some validation on the presence of the ID Token and whether its expiry date is still valid
* `getIdToken` will return the ID Token if it is valid. If the ID Token is not valid, it calls `renewTokens` to fetch a new ID Token

## Call the API

Install the [`axios`](https://www.npmjs.com/package/axios) HTTP library, which will allow us to make HTTP calls out to the backend API:

```bash
npm install --save-dev axios
```

Create a new file `BackendApi.vue` inside the `views` folder. This will provide a UI that will allow the user to test calling our backend Express API:

```js
// src/views/BackendApi.vue

<template>
 <div>
    <div class="mb-5">
      <h1>Backend API</h1>
      <p>Ping your back-end API by clicking the button below. This will call the API endpoint using an ID token, and the backend API will
        validate it using your Client ID as the audience.
      </p>

      <button class="btn btn-primary" @click="callApi">Ping</button>
    </div>

    <div v-if="apiMessage">
      <h2>Result</h2>
      <p>{{ apiMessage }}</p>
    </div>

 </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Api",
  data() {
    return {
      apiMessage: null
    };
  },
  methods: {
    async callApi() {
      const idToken = await this.$auth.getIdToken();

      try {
        const { data } = await axios.get("/api/private", {
          headers: {
            Authorization: `Bearer <%= "${idToken}" %>`
          }
        });

        this.apiMessage = `Response from the server: <%= "${data.msg}" %>`;
      } catch (e) {
        this.apiMessage = `Error: the server responded with '<%= "${e.response.status}" %>: <%= " ${e.response.statusText}" %>'`;
      }
    }
  }
};
</script>

```

### Modify the Vue router

Add a new route into the Vue router so that we can access this new page and call the backend API. Open `router.js`, import the view, and then add the route underneath the others:

```js
// src/router.js

// ... other imports and declarations
import BackendApi from "./views/BackendApi.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/callback",
      name: "callback",
      component: Callback
    },

    // Add a new route here for the backend API view
    {
      path: "/backend-api",
      name: "backend-api",
      component: BackendApi
    }
  ]
});
```

### Modify the navigation bar

Add a new entry into the navigation bar that will allow the user to access the new page. Open `App.vue` and add a link to the new page, to be shown only when the user is authenticated:

```html
<!-- src/App.vue -->

//... other navigation code

<ul class="navbar-nav mr-auto">
  <li class="nav-item">
    <router-link to="/" class="nav-link">Home</router-link>
  </li>
  <li class="nav-item" v-if="!isAuthenticated">
    <a href="#" class="nav-link" @click.prevent="login">Login</a>
  </li>
  <li class="nav-item" v-if="isAuthenticated">
    <router-link to="/profile" class="nav-link">Profile</router-link>
  </li>

  <!-- new link to /backend-api - only show if authenticated -->
  <li class="nav-item" v-if="isAuthenticated">
    <router-link to="/backend-api" class="nav-link">Backend API</router-link>
  </li>
  <!-- /backend-api -->

  <li class="nav-item" v-if="isAuthenticated">
    <a href="#" class="nav-link" @click.prevent="logout">Log out</a>
  </li>
</ul>
```

Now you will be able to run the application, browse to the "Backend API" page and press the "Ping" button. The application will make a call to the backend API and produce a message on the screen that says "Your ID token was successfully validated!".