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