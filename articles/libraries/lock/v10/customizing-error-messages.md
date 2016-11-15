---
description: Customizing error messages with Lock 10
---

<%= include('../_includes/_lock-version') %>

# Lock: Customizing Error Messages

You can customize the error messages that will be displayed in certain situations by providing a [languageDictionary option](/libraries/lock/v10/customization#languagedictionary-object-). A full listing of available `languageDictionary` fields to customize can be found in the GitHub repository's [English Dictionary file for Lock 10](https://github.com/auth0/lock/blob/master/src/i18n/en.js). Below is an example of some customized error messages:

```js
// Examples of customized error messages in the languageDictionary option
var options = {
  languageDictionary: {
    error: {
      login: {
        "lock.invalid_email_password": "Custom message about invalid credentials",
        "lock.network": "Custom message indicating a network error and suggesting the user check connection",
        "lock.unauthorized": "Custom message about a failure of permissions",
        "too_many_attempts": "Custom message indicating the user has failed to login too many times."
      },
      signUp: {
        "invalid_password": "Custom message indicating a password was invalid",
        "user_exists": "Custom message indicating that a user already exists"
      }
    }
  }
};  

// Initiating our Auth0Lock
var lock = new Auth0Lock(
  '${account.clientId}',
  '${account.namespace}',
  options
);
```

These errors will be shown on the widget header.

<%= include('../_includes/_lock-toc') %>