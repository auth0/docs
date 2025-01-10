---
name: App.vue
language: html
---

```html
<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonApp, IonRouterOutlet } from "@ionic/vue";

// Import Capacitor's app and browser plugins, giving us access to `addListener` and `appUrlOpen`,
// as well as the bits needed for Auth0 and Vue
import { useAuth0 } from "@auth0/auth0-vue";
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

    CapApp.addListener("appUrlOpen", async ({ url }) => {
      if (
        url.includes("state") &&
        (url.includes("code") || url.includes("error"))
      ) {
        await handleRedirectCallback(url);
      }
      // No-op on Android
      await Browser.close();
    });
  },
});
</script>
```