---
name: main.ts
language: javascript
---

```javascript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAuth0 } from '@auth0/auth0-angular';
import { AppComponent } from './app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideAuth0({
      domain: '${account.namespace}',
      clientId: '${account.clientId}',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ]
});
```