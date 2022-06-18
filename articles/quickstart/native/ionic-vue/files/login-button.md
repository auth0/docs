---
name: LoginButton.vue
language: html
---

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
    const { buildAuthorizeUrl } = useAuth0();

    const login = async () => {
      // Ask auth0-vue to build the login URL
      const url = await buildAuthorizeUrl();

      // Redirect using Capacitor's Browser plugin
      await Browser.open({ url, windowName: "_self" });
    };

    return { login };
  },
});
</script>
```