---
section: libraries
description: Customizing error messages with Lock v11
topics:
  - libraries
  - lock
  - error-messages
contentType:
  - how-to
  - reference
useCase:
  - add-login
---
# Customizing Lock Error Messages

You can customize the error messages that will be displayed in certain situations by providing a [languageDictionary option](/libraries/lock/v11/configuration#languagedictionary-object-). A full listing of available `languageDictionary` fields to customize can be found in the GitHub repository's [English Dictionary file for Lock v11](https://github.com/auth0/lock/blob/master/src/i18n/en.js). Below is an example of some customized error messages:

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

## Custom errors in Rules

If you are returning custom error codes from a [rule](/rules) or a [custom database script](/connections/database/custom-db#error-handling), you can handle custom errors:

* In your application's redirect URL by reading the `error` and `error_mesage` query string parameters.
* By redirecting the user back to your hosted pages with a custom error message and displaying the message with a [flash message](/libraries/lock/v11/api#flashmessage).
