---
title: Calling an API
description: This tutorial demonstrates how to make calls to an external API
budicon: 546
topics:
  - quickstarts
  - spa
  - vuejs
  - apis
github:
  path: 03-calling-an-api
sample_download_required_data:
  - client
contentType: tutorial
useCase: quickstart
---

Most single-page apps use resources from data APIs. You may want to restrict access to those resources, so that only authenticated users with sufficient privileges can access them. Auth0 lets you manage access to these resources using [API Authorization](/api-auth).

This tutorial shows you how to create a simple API using [Express](https://expressjs.com) that validates incoming JSON Web Tokens. You will then see how to call this API using an Access Token granted by the Auth0 authorization server.

<%= include('../_includes/_calling_api_create_api') %>

<%= include('../_includes/_calling_api_create_backend.md') %>

Finally, modify `package.json` to add two new scripts `dev` and `api` that can be used to start the frontend and the backend API together:

```json
{
  "name": "03-calling-an-api",
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

With this in place, the frontend application can make a request to `/api/external` and it will be correctly proxied through to the backend API at `http://localhost:3001/api/external`.

## Modify the AuthService Class

To start, open `authService.js` and make the necessary changes to the class to support retrieving an Access Token from the authorization server and exposing that token from a method.

First of all, open `auth_config.json` in the root of the project and make sure that a value for `audience` is exported along with the other settings:

```json
{
  "domain": "${account.tenant}",
  "clientId": "${account.clientId}",
  "audience": "${apiIdentifier}"
}
```

Then, modify the `webAuth` creation to include `token` in the response type and add in the API identifier as the `audience` value:

```js
// src/auth/authService.js

const webAuth = new auth0.WebAuth({
  domain: AUTH_CONFIG.domain,
  redirectUri: `<%= "${window.location.origin}" %>/callback`,
  clientID: AUTH_CONFIG.clientId,
  audience: AUTH_CONFIG.audience,   // add the audience
  responseType: "token id_token",   // request 'token' as well as 'id_token'
  scope: "openid profile email"
});
```

::: note
Setting the `responseType` field to "token id_token" will cause the authorization server to return both the Access Token and the ID Token in a URL fragment.
:::

Next, modify the `AuthService` class to include fields to store the Access Token and the time that the Access Token will expire:

```js
// src/auth/authService.js

class AuthService extends EventEmitter {
  idToken = null;
  profile = null;
  tokenExpiry = null;

  // Add fields here to store the Access Token and the expiry time
  accessToken = null;
  accessTokenExpiry = null;

  // .. other fields and methods
}
```

Modify the `localLogin` function to record the Access Token and Access Token expiry:

```js
localLogin(authResult) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    this.tokenExpiry = new Date(this.profile.exp * 1000);

    // NEW - Save the Access Token and expiry time in memory
    this.accessToken = authResult.accessToken;

    // Convert expiresIn to milliseconds and add the current time
    // (expiresIn is a relative timestamp, but an absolute time is desired)
    this.accessTokenExpiry = new Date(Date.now() + authResult.expiresIn * 1000);

    localStorage.setItem(localStorageKey, 'true');

    this.emit(loginEvent, {
      loggedIn: true,
      profile: authResult.idTokenPayload,
      state: authResult.appState
    });
  }
```

Finally, add two methods to the class that validate the Access Token and provide access to the token itself:

```js
// src/auth/authService.js

class AuthService extends EventEmitter {

  // ... other methods

  isAccessTokenValid() {
    return (
      this.accessToken &&
      this.accessTokenExpiry &&
      Date.now() < this.accessTokenExpiry
    );
  }

  getAccessToken() {
    return new Promise((resolve, reject) => {
      if (this.isAccessTokenValid()) {
        resolve(this.accessToken);
      } else {
        this.renewTokens().then(authResult => {
          resolve(authResult.accessToken);
        }, reject);
      }
    });
  }
}
```

::: note
If `getAccessToken` is called and the Access Token is no longer valid, a new token will be retrieved automatically by calling `renewTokens`.
:::

## Call the API Using an Access Token

The frontend Vue.js application should be modified to include a page that calls the API using an Access Token. Similar to the previous tutorial, this includes modifying the Vue router and adding a new view with a button that calls the API.

### Add a new page

First, install the [`axios`](https://www.npmjs.com/package/axios) HTTP library, which will allow us to make HTTP calls out to the backend API:

```bash
npm install --save-dev axios
```

Next, create a new file `ExternalApi.vue` inside the `views` folder, with the following content:

```js
<!-- src/views/ExternalApi.vue -->
<template>
 <div>
    <div>
      <h1>External API</h1>
      <p>Ping an external API by clicking the button below. This will call the external API using an access token, and the API will validate it using
        the API's audience value.
      </p>

      <button @click="callApi">Ping</button>
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
      const accessToken = await this.$auth.getAccessToken();

      try {
        const { data } = await axios.get("/api/external", {
          headers: {
            Authorization: `Bearer <%= "${accessToken}" %>`
          }
        });

        this.apiMessage = data.msg;
      } catch (e) {
        this.apiMessage = `Error: the server responded with '<%= "${ e.response.status }" %>: <%= "${e.response.statusText}" %>'`; }
    }
  }
};
</script>
```

Modify the Vue router to include a route to this new page whenever the `/external-api` URL is accessed:

```js
// src/router.js

// .. other imports

// NEW - import the view for calling the API
import ExternalApiView from "./views/ExternalApi.vue";

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // ... other routes,

    // NEW - add a new route for the new page
    {
      path: "/external-api",
      name: "external-api",
      component: ExternalApiView
    }
  ]
});
```

Finally, modify the navigation bar to include a link to the new page:

```html
<!-- src/App.vue -->

<ul>
  <li>
    <router-link to="/">Home</router-link>
  </li>
  <li v-if="!isAuthenticated">
    <a href="#" @click.prevent="login">Login</a>
  </li>
  <li v-if="isAuthenticated">
    <router-link to="/profile">Profile</router-link>
  </li>

  <!-- new link to /external-api - only show if authenticated -->
  <li v-if="isAuthenticated">
    <router-link to="/external-api">External API</router-link>
  </li>
  <!-- /external-api -->

  <li v-if="isAuthenticated">
    <a href="#" @click.prevent="logout">Log out</a>
  </li>
</ul>
```

Now you will be able to run the application, browse to the "External API" page and press the "Ping" button. The application will make a call to the external API endpoint and produce a message on the screen that says "Your Access Token was successfully validated!".
