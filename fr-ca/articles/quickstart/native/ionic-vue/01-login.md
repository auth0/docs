---
title: Login
default: true
description: This tutorial demonstrates how to add user login with Auth0 to an Ionic Vue & Capacitor application.
budicon: 448
topics:
  - quickstarts
  - native
  - ionic
  - vue
  - capacitor
github:
  path: vue
contentType: tutorial
useCase: quickstart
---

<!-- markdownlint-disable MD002 MD041 -->

<%= include('../_includes/ionic/_article_intro') %>

<%= include('../_includes/_getting_started', { library: 'Ionic' }) %>

<%= include('../_includes/ionic/_configure_urls') %>

<%= include('../../_includes/_auth0-vue-install.md') %>

<%= include('../_includes/ionic/_install_plugins') %>

### Configure the `createAuth0` plugin

The SDK exports `createAuth0`, a composable that contains all the services required for the SDK to function. To register this with your application:

Open `src/main.ts` and install the plugin using `app.use`

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";

import { createAuth0 } from "@auth0/auth0-vue";
import config from "./auth.config";

// ..

// Build the URL that Auth0 should redirect back to
const redirect_uri = `<%= "${config.appId}" %>://${account.namespace}/capacitor/<%= "${config.appId}" %>/callback`;

const app = createApp(App).use(IonicVue).use(router);

app.use(
  createAuth0({
    domain: "${account.namespace}",
    clientId: "${account.clientId}",
    useRefreshTokens: true,
    useRefreshTokensFallback: false,
    authorizationParams: {
      redirect_uri
    }
  })
);

router.isReady().then(() => {
  app.mount("#app");
});
```

The `createAuth0` plugin takes the following props:

- `domain`: The "domain" value present under the "Settings" of the application you created in your Auth0 dashboard, or your custom domain if using Auth0's [Custom Domains feature](http://localhost:3000/docs/custom-domains)
- `clientId`: The "client ID" value present under the "Settings" of the application you created in your Auth0 dashboard
- `useRefreshTokens`: To use auth0-vue with Ionic on Android and iOS, it's required to enable refresh tokens.
- `useRefreshTokensFallback`: To use auth0-vue with Ionic on Android and iOS, it's required to disable the iframe fallback.
- `authorizationParams.redirect_uri`: The URL to where you'd like to redirect your users after they authenticate with Auth0.

<%= include('../_includes/ionic/_note_storage') %>

:::panel Checkpoint
Now that you have configured `createAuth0` plugin, run your application to verify that the SDK is initializing correctly, and your application is not throwing any errors related to Auth0.
:::

## Add Login to Your Application

<%= include('../_includes/ionic/_add_login_intro') %>

Add a new file `LoginButton.vue` with the following code:

```html
<template>
  <ion-button @click="login">Log in</ion-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonApp, IonRouterOutlet } from "@ionic/vue";

import { useAuth0 } from "@auth0/auth0-vue";
import { App as CapApp } from "@capacitor/app";
import { Browser } from "@capacitor/browser";

export default defineComponent({
  components: {
    IonButton,
  },
  setup() {
    const { loginWithRedirect } = useAuth0();

    const login = async () => {
      await loginWithRedirect({
        openUrl: (url: string) =>
          Browser.open({
            url,
            windowName: "_self",
          }),
      });
    };

    return { login };
  },
});
</script>
```

This component:

- defines a template with a simple button that logs the user in when clicked
- uses `loginWithRedirect` to login using Auth0's Universal Login page
- uses the `openUrl` callback to use Capacitor's Browser plugin to open the URL and show the login page to the user

### Handling the callback

<%= include('../_includes/ionic/_handle_callback_intro') %>

Add the following capacitor application listener to your main `App` component:

```html
<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import { App as CapApp } from "@capacitor/app";
import { Browser } from "@capacitor/browser";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  setup() {
    const { handleRedirectCallback } = useAuth0();

    // Handle the 'appUrlOpen' event and call `handleRedirectCallback`
    CapApp.addListener('appUrlOpen', async ({ url }) => {
      if (url.includes('state') && (url.includes('code') || url.includes('error'))) {
        await handleRedirectCallback(url);
      }
      // No-op on Android
      await Browser.close();
    });
  },
});
</script>
```

<%= include('../_includes/ionic/_note_custom_schemes') %>

:::panel Checkpoint
Add the `LoginButton` component to your application, as well as the handler for the "appUrlOpen" event to your `App` component. When you click the login button, verify that your application redirects you to the Auth0 Universal Login Page and that you can now log in or sign up using a username and password or a social provider.

Once that's complete, verify that Auth0 redirects you back to your application.
:::

## Add Logout to Your Application

<%= include('../_includes/ionic/_add_logout_intro.md') %>

Create a new file `LogoutButton.vue` and add the following code to the file. Then, add the `LogoutButton` component to your app.

```html
<template>
  <ion-button @click="onLogout">Log out</ion-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { Browser } from "@capacitor/browser";
import { IonButton } from "@ionic/vue";
import { callbackUri } from "../auth.config";

export default defineComponent({
  components: {
    IonButton,
  },
  setup() {
    const { logout } = useAuth0();

    const onLogout = async () => {
      await logout({
        logoutParams: {
          returnTo: callbackUri,
        },
        openUrl: (url: string) =>
          Browser.open({
            url,
            windowName: "_self",
          }),
      });
    };

    return {
      onLogout,
    };
  },
});
</script>
```

:::panel Checkpoint
Add the `LogoutButton` component to your application. When you click it, verify that your Ionic application redirects you the address you specified as one of the "Allowed Logout URLs" in the "Settings" and that you are no longer logged in to your application.
:::

## Show User Profile Information

The Auth0 Vue SDK helps you retrieve the [profile information](https://auth0.com/docs/users/concepts/overview-user-profile) associated with logged-in users quickly in whatever component you need, such as their name or profile picture, to personalize the user interface. The profile information is available through the `user` property exposed by the `useAuth0()` composable. Take this `UserProfile` component as an example of how to use it:

```html
<template>
  <div v-if="isLoading">Loading ...</div>
  <div v-else-if="!user"></div>
  <div v-else class="profile-container">
    <ion-avatar>
      <img :src="user.picture" :alt="user.name" />
    </ion-avatar>
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { IonAvatar } from "@ionic/vue";

export default defineComponent({
  components: {
    IonAvatar,
  },
  setup() {
    const { user, isLoading } = useAuth0();

    return { user, isLoading };
  },
});
</script>
```

The `user` property contains sensitive information and artifacts related to the user's identity. As such, its availability depends on the user's authentication status. To prevent any render errors, use the `isAuthenticated` property from `useAuth0()` to check if Auth0 has authenticated the user before Vue renders any component that consumes the `user` property. Ensure that the SDK has completed loading before accessing the `isAuthenticated` property, by checking that `isLoading` is `false`.

:::panel Checkpoint
Add the `UserProfile` component to your application, and verify that you can display the `user.name` or [any other `user` property](https://auth0.com/docs/users/references/user-profile-structure#user-profile-attributes) within a component correctly after you have logged in.
:::
