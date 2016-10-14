```js
// src/app/app.component.ts

...

export class AuthApp {
  rootPage = TabsPage;

  constructor(platform: Platform, private auth: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      // Schedule a token refresh on app start up
      auth.startupTokenRefresh();
    });
  }
}
```