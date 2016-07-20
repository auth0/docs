```js
// app/app.ts

...

export class MyApp {

  constructor(platform: Platform, private auth: AuthService) {
    platform.ready().then(() => {

      ...
      
      // When the app starts up, there might be a valid
      // token in local storage. If there is, we should
      // schedule an initial token refresh for when the
      // token expires
      this.auth.startupTokenRefresh();
    });
  }
}
```