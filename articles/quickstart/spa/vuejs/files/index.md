---
name: index.js
language: javascript
---

```javascript
import { createAuth0 } from '@auth0/auth0-vue';

const app = createApp(App);

app.use(
  createAuth0({
    domain: "${account.namespace}",
    client_id: "${account.clientId}",
    redirect_uri: window.location.origin
  })
);

app.mount('#app');
```