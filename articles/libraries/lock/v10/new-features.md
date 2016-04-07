# New Features in Lock 10

## Authentication Options

Authentication options have been grouped in their own namespace.

```js
var lock = new AuthLock(
  '${account.clientId}',
  '${account.namespace}',
  {
    auth: {
      jsonp: false,
      params: {name: "value"},
      redirect: true,
      redirectUrl: window.location.href
      responseType: "token",
      sso: true
    }
  },
  function(error, result) {
    // handle auth
});
```

## Initial Screen

You may now choose the screen that will be first displayed when Lock is shown with the `initialScreen` option. The following are valid values:
* `login` (default);
* `resetPassword`;
* `signUp`;

```js
var lock = new AuthLock(
  '${account.clientId}',
  '${account.namespace}',
  {
    initialScreen: "signUp" // "login" or "resetPassword"
  },
  function(error, result) {
    // handle auth
});
```

## Theme Options

Theme options have been grouped in their own namespace.

```js
var lock = new AuthLock(
  '${account.clientId}',
  '${account.namespace}',
  {
    theme: {
      logo: "https://example.com/icon.png",
      primaryColor: "#ec4889"
    }
  },
  function(error, result) {
    // handle auth
});
```
