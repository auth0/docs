# New Features in Lock 10

## Authentication Options

Authentication options now have their own namespace.

```js
var lock = new AuthLock(
  '${account.clientId}',
  '${account.namespace}',
  {
    authentication: {
      authParams: {}
      callbackURL: window.location.href
      forceJSONP: false,
      redirect: true,
      responseType: "token",
      sso: true
    }
  },
  function(error, result) {
    // handle auth
});
```

### Initial Screen

You may now show Lock in a predefined way using the 'initialScreen' option. The following are valid values:
* `signUp`;
* `login`;
* `resetPassword`.

```js
var lock = new AuthLock(
  '${account.clientId}',
  '${account.namespace}',
  {
    initialScreen: "signUp" //"login" or "resetPassword"
  },
  function(error, result) {
    // handle auth
});
```
### Theming

Currently, the only theme option available is `primaryColor` (additional options are forthcoming).

```js
var lock = new AuthLock(
  '${account.clientId}',
  '${account.namespace}',
  {
    theme: {
      primaryColor: "#49dd81"
    }
  },
  function(error, result) {
    // handle auth
});
```
