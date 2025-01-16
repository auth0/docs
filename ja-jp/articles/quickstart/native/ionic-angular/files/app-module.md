---
name: app.module.ts
language: javascript
---

```javascript
// Import the types from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import config from '../../capacitor.config';

// ..

// Build the URL that Auth0 should redirect back to
const redirect_uri = `<%= "${config.appId}" %>://${account.namespace}/capacitor/<%= "${config.appId}" %>/callback`;

// Register AuthModule with your AppModule
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AuthModule.forRoot({
      domain: "${account.namespace}",
      clientId: "${account.clientId}",
      useRefreshTokens: true,
      useRefreshTokensFallback: false,
      authorizationParams: {
        redirect_uri
      }
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
```