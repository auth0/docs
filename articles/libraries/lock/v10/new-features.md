# New Features in Lock 10

## Custom Sign Up Fields

You can add input fields to the sing up form with the new option `additionalSignUpFields`.

```js
var lock = new AuthLock(
  '${account.clientId}',
  '${account.namespace}',
  {
    additionalSignUpFields: [{
      name: "address",                              // required
      icon: "https://example.com/address_icon.png", // optional
      placeholder: "enter your address",            // required
      validator: function(value) {                  // optional
        // only accept addresses with more than 10 chars
        return value.length > 10;
      }
    }] // more fields could be specified
  },
  function(error, result) {
    // handle auth
});
```

## Custom Avatar Provider

By default, [Gravatar](http://gravatar.com/) is used to fetch the user avatar and display name, but you can obtain them from anywhere with the `avatar` option.

```js
var lock = new AuthLock(
  '${account.clientId}',
  '${account.namespace}',
  {
    avatar: {
      url: function(email, cb) {
        // Obtain the avatar url for the email input by the user, Lock
        // will preload the image it before displaying it.
        // Note that in case of an error you call cb with the error in
        // the first arg instead of `null`.
        var url = obtainAvatarUrl(email);
        cb(null, url);
      },
      displayName: function(email, cb) {
        // Obtain the display name for the email input by the user.
        // Note that in case of an error you call cb with the error in
        // the first arg instead of `null`.
        var displayName = obtainDisplayName(email);
        cb(null, displayName);
      }
    }
  },
  function(error, result) {
    // handle auth
});
```

If you don't want to display and avatar pass `null`.

```js
var lock = new AuthLock(
  '${account.clientId}',
  '${account.namespace}',
  {
    avatar: null
  },
  function(error, result) {
    // handle auth
});
```

## Prefilled Fields

It is now possible to fill the user's email and/or username input if you know them beforehand with the `prefill` option.

```js
var lock = new AuthLock(
  '${account.clientId}',
  '${account.namespace}',
  {
    prefill: {
      email: "someone@example.com",
      username: "someone"
    }
  },
  function(error, result) {
    // handle auth
});
```

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
