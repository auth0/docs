<!-- markdownlint-disable MD041 MD002 -->

## Install the SDK

Install the [Auth0 Vue SDK](https://github.com/auth0/auth0-vue) using npm:

```bash
npm install @auth0/auth0-vue
```

### Register the plugin

To use the SDK in your Vue application, register the plugin with your Vue application by passing the return value of `createAuth0` to `app.use()`.

```js
import { createAuth0 } from '@auth0/auth0-vue';

const app = createApp(App);

app.use(
  createAuth0({
    domain: "${account.namespace}",
    clientId: "${account.clientId}",
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  })
);

app.mount('#app');
```

The plugin will register the SDK using both `provide` and `app.config.globalProperties`, allowing the SDK to be used with both the [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html) and [Options API](https://vuejs.org/guide/introduction.html#options-api).

## Add Login to Your Application

To add login to your application, use the `loginWithRedirect` function that is exposed on the return value of `useAuth0`, which you can access in your component's `setup` function.

```html
<template>
  <div>
    <button @click="login">Log in</button>
  </div>
</template>
<script>
  import { useAuth0 } from '@auth0/auth0-vue';

  export default {
    setup() {
      const { loginWithRedirect } = useAuth0();

      return {
        login: () => {
          loginWithRedirect();
        }
      };
    }
  };
</script>
```

The `loginWithRedirect` function will redirect the user to Auth0, and redirect them back to the `redirect_uri` (provided when calling `createAuth0()`) after entering their credentials.

#### Using the Options API
If you are using the Options API, you can use the same `loginWithRedirect` method from the global `$auth0` property through the `this` accessor.

```html
<template>
  <div>
    <button @click="login">Log in</button>
  </div>
</template>

<script>
  export default {
    methods: {
      login() {
        this.$auth0.loginWithRedirect();
      }
    }
  };
</script>
```

## Add Logout to Your Application
Use the `logout` function that is exposed on the return value of `useAuth0`, which you can access in your component's `setup` function, to log the user out of your application.

```html
<template>
  <div>
    <button @click="logout">Log out</button>
  </div>
</template>
<script>
  import { useAuth0 } from '@auth0/auth0-vue';

  export default {
    setup() {
      const { logout } = useAuth0();

      return {
        logout: () => {
          logout({ logoutParams: { returnTo: window.location.origin } });
        }
      };
    }
  };
</script>
```

The `logout()` function will redirect the user to Auth0 to ensure their session is ended with Auth0 as well. Once the user is logged out successfully, they will be redirected back to the specified `returnTo` parameter.

:::note
To log the user out of your application but not from Auth0, use `logout({ localOnly: true })`.
:::

#### Using the Options API
If you're using the Options API, you can use the same `logout` method from the global `$auth0` property through the `this` accessor.

```html
<template>
  <div>
    <button @click="logout">Log out</button>
  </div>
</template>

<script>
  export default {
    methods: {
      logout() {
        this.$auth0.logout({ logoutParams: { returnTo: window.location.origin } });
      }
    }
  };
</script>
```

## Show User Profile Information

Once the user authenticates, the SDK extracts the user's profile information and stores it in memory. It can be accessed by using the reactive `user` property exposed by the return value of `useAuth0`, which you can access in your component's `setup` function.

```html
<template>
  <div>
    <h2>User Profile</h2>
    <button @click="login">Log in</button>
    <pre v-if="isAuthenticated">
        <code>{{ user }}</code>
      </pre>
  </div>
</template>
<script>
  import { useAuth0 } from '@auth0/auth0-vue';

  export default {
    setup() {
      const { loginWithRedirect, user, isAuthenticated } = useAuth0();

      return {
        login: () => {
          loginWithRedirect();
        },
        user,
        isAuthenticated
      };
    }
  };
</script>
```

:::note
Ensure the user is authenticated by implementing login in your application before accessing the user's profile.
:::

#### Using the Options API
If you're using the Options API, you can use the same reactive `user` property from the global `$auth0` property through the `this` accessor.

```html
<template>
  <div>
    <h2>User Profile</h2>
    <button @click="login">Log in</button>
    <pre>
      <code>{{ user }}</code>
    </pre>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        user: this.$auth0.user
      };
    },
    methods: {
      login() {
        this.$auth0.loginWithRedirect();
      }
    }
  };
</script>
```
