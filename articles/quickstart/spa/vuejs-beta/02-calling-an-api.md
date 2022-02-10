---
title: Calling an API
description: This quickstart demonstrates how to make calls to an external API from a Vue.JS application using Auth0.
budicon: 448
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

<%= include('../_includes/_calling_api_create_api') %>

## Configuring the plugin
To call an API, configure the plugin by setting the `audience` to the **API Identifier** of the API you want to call:

```ts
import { createAuth0 } from '@auth0/auth0-vue';

const app = createApp(App);

app.use(
  createAuth0({
    domain: '<AUTH0_DOMAIN>',
    client_id: '<AUTH0_CLIENT_ID>',
    redirect_uri: '<MY_CALLBACK_URL>',
    audience: '<AUTH0_AUDIENCE>'
  })
);

app.mount('#app');
```

## Retrieving an Access Token
With the plugin configured using an `audience`, Auth0 will return an Access Token that can be sent to your API.
You can retrieve an Access Token by using the `getAccessTokenSilently` function thats exposed by our SDK.

```html
<script>
  import { useAuth0 } from '@auth0/auth0-vue';

  export default {
    setup() {
      const { getAccessTokenSilently } = useAuth0();

      return {
        doSomethingWithToken: async () => {
          const token = await getAccessTokenSilently();
        }
      };
    }
  };
</script>
```

### Using the Options API

If you are using the Options API, you can use the same `getAccessTokenSilently` method from the global `$auth0` property through the `this` accessor.

```html
<script>
  export default {
    methods: {
      async doSomethingWithToken() {
        const token = await this.$auth0.getAccessTokenSilently();
      }
    }
  };
</script>
```

## Calling an API
To call an API, include the token in the `Authorization` header of your request.
There are many ways to make HTTP calls with Vue. Here is an example using the `fetch` API with Vue's Composition API:

```html
<script>
  import { useAuth0 } from '@auth0/auth0-vue';

  export default {
    setup() {
      const { getAccessTokenSilently } = useAuth0();

      return {
        doSomethingWithToken: async () => {
          const token = await getAccessTokenSilently();
          const response = await fetch('https://api.example.com/posts', {
            headers: {
              Authorization: 'Bearer ' + token
            }
          });
          const data = await response.json();
        }
      };
    }
  };
</script>
```
