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

This tutorial shows you how to access protected resources in your API, as well as how to modify the API that was created in part 2 to include an endpoint that requires an access token.

<%= include('../_includes/_calling_api_create_api') %>

<%= include('../_includes/_calling_api_modify_backend.md') %>

## Modify the AuthService class

To start, open `authService.js` and make the necessary changes to the class to support retrieving an Access Token from the authorization server and exposing that token from a method.

First of all, modify the `webAuth` creation to include `token` in the response type and add in the API identifier as the `audience` value:

```js
// src/auth/authService.js

const webAuth = new auth0.WebAuth({
  domain: AUTH_CONFIG.domain,
  redirectUri: AUTH_CONFIG.callbackUrl,
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

Add two methods to the class which validate the Access Token and provide access to the token itself:

```js
// src/auth/authService.js

class AuthService extends EventEmitter {

  // ... other methods

  isAccessTokenValid() {
    return (
      this.accessToken &&
      this.accessTokenExpiry &&
      this.accessTokenExpiry > Date.now()
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

Finally, add the `audience` configuration option to the `auth0-variables.js` file so that it can be pulled into the `AuthService` class:

```js
// src/auth/auth0-variables.js

export const AUTH_CONFIG = {
  domain: '${account.tenant}',
  clientId: '${account.clientId}',
  callbackUrl: `<%= "${window.location.origin}" %>/callback`,
  audience: '${apiIdentifier}'  // add your API identifier as the audience
};
```

## Calling the API Using an Access Token

The frontend Vue.js application should be modified to include a page that calls the API using an Access Token. Similar to the previous tutorial, this includes modifying the Vue router and adding a new view with a button that calls the API.

### Adding a new page

Create a new file `ExternalApi.vue` inside the `views` folder, with the following content:

```js
<!-- src/views/ExternalApi.vue -->
<template>
 <div>
    <div class="mb-5">
      <h1>External API</h1>
      <p>Ping an external API by clicking the button below. This will call the external API using an access token, and the API will validate it using
        the API's audience value.
      </p>

      <button class="btn btn-primary mt-5" @click="callApi">Ping</button>
    </div>

    <div v-if="apiMessage">
      <h2>Result</h2>
      <p>{{ apiMessage }}</p>
    </div>

 </div>
</template>

<script>
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
        const { data } = await this.$http.get("/api/external", {
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
import ExternalApiView from "./views/ExternalApi.vue";

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // ... other routes,
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
  <li class="nav-item" v-if="isAuthenticated">
    <router-link to="/backend-api" class="nav-link">Backend API</router-link>
  </li>
  
  <!-- new link to /external-api - only show if authenticated -->
  <li class="nav-item" v-if="isAuthenticated">
    <router-link to="/external-api" class="nav-link">External API</router-link>
  </li>
  <!-- /external-api -->

  <li class="nav-item" v-if="isAuthenticated">
    <a href="#" class="nav-link" @click.prevent="logout">Log out</a>
  </li>
</ul>
```

Now you will be able to run the application, browse to the "External API" page and press the "Ping" button. The application will make a call to the external API endpoint and produce a message on the screen that says "Your Access Token was successfully validated!".
