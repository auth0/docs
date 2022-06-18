---
name: LogoutButton.vue
language: html
---

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
    const { buildLogoutUrl, logout } = useAuth0();

    const onLogout = async () => {
      // Open the browser to perform a logout
      await Browser.open({
        url: buildLogoutUrl({ returnTo: callbackUri }),
        windowName: "_self",
      });

      // Ask the SDK to log out locally, but not do the redirect
      logout({ localOnly: true });
    };

    return {
      onLogout,
    };
  },
});
</script>
```