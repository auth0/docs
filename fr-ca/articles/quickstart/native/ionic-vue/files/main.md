---
name: main.ts
language: javascript
---

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