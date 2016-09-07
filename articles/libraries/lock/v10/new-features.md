
<%= include('../_includes/_lock-version') %>

# New Features in Lock 10

## Custom Sign Up Fields

You can add input fields to the sign up form with the new option `additionalSignUpFields`.

```js
var lock = new AuthLock(
  '${account.clientId}',
  '${account.namespace}',
  {
    additionalSignUpFields: [{
      name: "address",                              // required
      placeholder: "enter your address",            // required
      icon: "https://example.com/address_icon.png", // optional
      prefill: "street 123",                        // optional
      validator: function(value) {                  // optional
        // only accept addresses with more than 10 chars
        return value.length > 10;
      }
    }] // more fields could be specified
  });
```

If the possible values for the field are predefined, you can add a field with the `"select"` `type`.

```js
var lock = new AuthLock(
  '${account.clientId}',
  '${account.namespace}',
  {
    additionalSignUpFields: [{
      type: "select",                                       // required
      name: "location",                                     // required
      placeholder: "choose your location",                  // required
      options: [                                            // required
        {value: "us", label: "United States"},
        {value: "fr", label: "France"},
        {value: "ar", label: "Argentina"}
      ],
      prefill: "us",                                        // optional
      icon: "https://example.com/assests/location_icon.png" // optional
    }]
  },
  function(error, result) {
    // handle auth
});
```

The `options` and `prefill` properties can also be functions, which is useful when you need to make a request to obtain their values.

```js
var lock = new AuthLock(
  '${account.clientId}',
  '${account.namespace}',
  {
    additionalSignUpFields: [{
      type: "select",                                       // required
      name: "location",                                     // required
      placeholder: "choose your location",                  // required
      options: function(cb) {                               // required
        // obtain options, in case of error you call cb with the error in the
        // first arg instead of null
        cb(null, options);
      },
      prefill: function(cb) {                               // optional
        // obtain prefill, in case of error you call cb with the error in the
        // first arg instead of null
        cb(null, prefill);
      },
      icon: "https://example.com/assests/location_icon.png" // optional
    }]
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
  }
);
```

If you don't want to display an avatar pass `null`.

```js
var lock = new AuthLock(
  '${account.clientId}',
  '${account.namespace}',
  {
    avatar: null
  }
);
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
  }
);
```

## Authentication Options

Authentication options have been grouped in their own namespace.

```js
var lock = new AuthLock(
  '${account.clientId}',
  '${account.namespace}',
  {
    auth: {
      params: {name: "value"},
      redirect: true,
      redirectUrl: window.location.href
      responseType: "token",
      sso: true
    }
  }
);
```

## Initial Screen

You may now choose the screen that will be first displayed when Lock is shown with the `initialScreen` option. The following are valid values:
* `login` (default);
* `forgotPassword`;
* `signUp`;

```js
var lock = new AuthLock(
  '${account.clientId}',
  '${account.namespace}',
  {
    initialScreen: "signUp" // "login" or "forgotPassword"
  }
);
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
  }
);
```

## Sign Up Terms Agreement

You can ask the user to accept the terms and conditions by clicking a checkbox input before signing up with the `mustAcceptTerms` option.

```js
var lock = new AuthLock(
  '${account.clientId}',
  '${account.namespace}',
  {
    languageDictionary: {
      signUpTerms: "I agree to the <a href='/terms' target='_new'>terms of service</a> and <a href='/privacy' target='_new'>privacy policy</a>."
    },
    mustAcceptTerms: true
  }
);
```

<%= include('../_includes/_lock-toc') %>
