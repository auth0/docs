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
  path: 02-Calling-an-API
sample_download_required_data:
  - client
  - api
contentType: tutorial
useCase: quickstart
---

<!-- markdownlint-disable MD002 MD041 -->

Most single-page apps use resources from data APIs. You may want to restrict these resources so only authenticated users with sufficient privileges can access them. Auth0 lets you manage access to these resources using [API Authorization](/api-auth).

In this tutorial, you'll create a simple API using [Express](https://expressjs.com) to validate incoming JWT-formatter access tokens. You will then see how to call this API using an access token granted by the Auth0 authorization server.

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

To call the API from the frontend application, the development server must be configured to proxy requests through to the backend API. To do this, add a `vue.config.js` file to the root of the project and populate it with the following code:

```js
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

### Restart the application

If you are already running the application using `npm run serve`, then stop that process for now. Restart the app using the following command, which will run both the frontend app and the backend API together:

```bash
PORT=3000 npm run dev
```

## Add the Audience

The API backend you created above expects API calls to have a JSON Web Token for authorization. To do this, you must instruct Auth0 to issue an access token in JWT format. This is done by supplying the API identifier in an `audience` parameter when users authenticate, telling Auth0 which API you want an access token for.

Open `auth_config.json` in the root of the project and make sure that a value for `audience` is exported along with the other settings. The value for `audience` should be the "API identifier" for the API you created above:

```json
{
  "domain": "${account.namespace}",
  "clientId": "${account.clientId}",
  "audience": "${apiIdentifier}"
}
```

Finally, open `main.js` and configure the Auth0 plugin with this audience value:

```js

// .. other imports

// NEW - import the audience
import { domain, clientId, audience } from "../auth_config.json";

// ..

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,   // NEW - configure the plugin with the audience value
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

// .. more Vue configuration ..

```

## Call the API Using an Access Token

Modify the frontend Vue.js application to include a page that calls the API using an access token. Like the previous tutorial, you'll need to change the Vue router and add a new view with a button that calls the API.

### Install the Axios package

Install the [`axios`](https://www.npmjs.com/package/axios) HTTP library, which will allow us to make HTTP calls out to the backend API:

```bash
npm install axios
```

:::note
Axios is just used as an example; you can use any JavaScript HTTP client that allows you to specify the `Authorization` header to perform this task
:::

### Add a new page

Next, create a new file `ExternalApi.vue` inside the `views` folder. Add a button to call the API and an HTML element that can display the result of the API call.

Use the `getTokenSilently` method of the Auth0 wrapper to get an access token, and then use Axios to make the API call. Attach the access token to the call by setting it as the value for the `Authorization` header, as in the following example:

```html
<template>
  <div>
    <button @click="callApi">Call</button>
    <p>{{ apiMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "external-api",
  data() {
    return {
      apiMessage: ""
    };
  },
  methods: {
    async callApi() {
      // Get the access token from the auth wrapper
      const token = await this.$auth.getTokenSilently();

      // Use Axios to make a call to the API
      const { data } = await axios.get("/api/external", {
        headers: {
          Authorization: `Bearer <%= "${token}" %>`    // send the access token through the 'Authorization' header
        }
      });

      this.apiMessage = data;
    }
  }
};
</script>
```

Modify the Vue router to include a route to this new page whenever the `/external-api` URL is accessed:

```js
// src/router/index.js

// .. other imports

// NEW - import the view for calling the API
import ExternalApiView from "../views/ExternalApi.vue";

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // ... other routes,

    // NEW - add a new route for the new page
    {
      path: "/external-api",
      name: "external-api",
      component: ExternalApiView,
      beforeEnter: authGuard
    }
  ]
});
```

Note that this new route also uses `authGuard` from the previous tutorial, which prevents access to the page unless the user is authenticated.

Finally, modify the navigation bar to include a link to the new page:

```html
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|

      <!-- NEW - add a link to the new page -->
      <router-link to="/external-api">External Api</router-link>

      <!-- .. other HTML elements -->

    </div>
    <router-view />
  </div>
</template>
```

:::panel Checkpoint
Now you will be able to run the application, browse to the "External API" page and press the "Call" button. The application will make a call to the external API endpoint and produce a message on the screen that says "Your Access Token was successfully validated!".
:::
