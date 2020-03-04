---
title: Send Phone Message 
description: Learn how hooks can be used with the Send Phone Message extensibility point, which is available for MFA.
beta: true
toc: true
topics:
    - hooks
    - extensibility-points
    - send-phone-message
    - custom-sms-gateway
    - sms 
contentType:
  - how-to
useCase: extensibility-hooks
v2: true
---

# Send Phone Message

At the Send Phone Message extensibility point, Hooks allow custom actions to be executed when a user is prompted for MFA. For example, you may use your preferred SMS gateway provider to get better pricing, or you may make a voice call to the user with the MFA code instead of sending an SMS. 

The Send Phone Message extensibility point is available for [MFA](/multifactor-authentication) requests.

::: note
The `triggerId` for the Send Phone Message extensibility point is `send-phone-message`. To learn how to create Hooks for this extensibility point, see [Create New Hooks](/hooks/create).
:::

To learn about other extensibility points, see [Extensibility Points](/hooks/extensibility-points).

## Starter code and parameters

When creating a Hook executed at the Send Phone Message extensibility point, you may find the following starter code helpful. Parameters that can be passed into and used by the Hook function are listed at the top of the code sample.

```js
/**
@param {string} recipient - phone number
@param {string} text - message body
@param {object} context - additional authorization context
@param {string} context.factor_type - 'first' or 'second'
@param {string} context.message_type - 'sms' or 'voice'
@param {string} context.action - 'enrollment' or 'authentication'
@param {string} context.language - language used by login flow
@param {string} context.code - one time password
@param {string} context.ip - ip address
@param {string} context.user_agent - user agent making the authentication request
@param {string} context.client_id - to send different messages depending on the client id
@param {string} context.name - to include it in the SMS message
@param {object} context.client_metadata - metadata from client
@param {object} context.user - To customize messages for the user
@param {function} cb - function (error, response)
*/
module.exports = function(recipient, text, context, cb) {
 // TODO: Add your code here 
 cb();
};
```

Please note:

::: note
The callback function (`cb`) at the end of the sample code signals completion and *must* be included.
:::

### Default response

When you run a Hook executed at the Send Phone Message extensibility point, the default response object is:

::: note
Hooks executed at the Send Phone Message extensibility point do not pass error messages to any Auth0 APIs.
:::

### Starter code response

Once you've customized the starter code, you can test the Hook using the Runner embedded in the Hook Editor. The Runner simulates a call to the Hook with the appropriate body and response. 

<%= include('../_includes/_test_runner_save_warning') %>

When you run a Hook based on the starter code, the response object is:
