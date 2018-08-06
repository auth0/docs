---
section: libraries
description: Customizing error messages with Lock V9
topics:
  - libraries
  - lock
contentType:
  - how-to
useCase:
  - add-login
---
# Lock: Customizing Error Messages

<%= include('../../../_includes/_version_warning_lock') %>

You can customize the error messages that will be displayed on certain situations by providing a [dict option](/libraries/lock/v9/customization#dict-object) at the [customization options](/libraries/lock/v9/customization). A full listing of available `dict` fields to customize can be found in the GitHub repository's [English Dictionary file for Lock 9](https://github.com/auth0/lock/blob/v9/i18n/en.json). Below is an example of some customized error messages:

```js
// Initialize the Auth0Lock instance
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');

// Customize your error messages in a dictionary
var dict = {
        loadingTitle:   'loading...',
        close:          'close',
        signin: {
            wrongEmailPasswordErrorText: 'Custom error message for invalid user/pass.',
            serverErrorText: 'There was an error processing the sign in.',
            strategyEmailInvalid: 'The email is invalid.',
            strategyDomainInvalid: 'The domain {domain} has not been setup.'
        },
        signup: {
            serverErrorText: 'There was an error processing the sign up.',
            enterpriseEmailWarningText: 'This domain {domain} has been configured for Single Sign On and you can\'t create an account. Try signing in instead.'
        },
        reset: {
            serverErrorText: 'There was an error processing the reset password.'
        }
        // wrongEmailPasswordErrorText, serverErrorText, enterpriseEmailWarningText are used only if you have a Database connection
        // strategyEmailInvalid is shown if the email is not valid
        // strategyDomainInvalid is shown if the email does not have a matching enterprise connection
    }
};

// Invoke the lock show method with the customized dictionary
lock.show({ dict: dict });
```

These errors will be shown on the widget header:

![Widget Header Errors](/media/articles/libraries/lock/v9/custom-error.png)
