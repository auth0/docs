```js
// src/auth0-variables.ts
export class Auth0Vars {
  static AUTH0_DOMAIN = '${account.namespace}';
  static AUTH0_APPLICATION_PACKAGE_NAME = 'YOUR_PACKAGE_ID';
  static AUTH0_CLIENT_ID = '${account.clientId}';
  static AUTH0_CALLBACK_URL = location.href;
}
```
