## Configure auth0.js

Create an instance of the `WebAuth` module from **auth0.js** and configure it with the client ID and domain for your application.

```js
var auth = new auth0.WebAuth({
  domain: '${account.namespace}',
  clientID: '${account.clientId}'
});
```