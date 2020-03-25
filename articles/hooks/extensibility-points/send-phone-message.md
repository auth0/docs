---
description: Learn how hooks can be used with the Send Phone Message extensibility point, which is available for MFA.
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

The Send Phone Message hook can be used to override how Auth0 sends SMS messages as part of the multi-factor authentication flows. Auth0 has built-in support for sending SMS messages with Twilio, but in some scenarios, you could want to use a different provider (e.g. you get better pricing in your region, or you already standardized with a different vendor).

The Send Phone Message extensibility point is available for [MFA](/multifactor-authentication) requests.

To learn about other extensibility points, see [Extensibility Points](/hooks/extensibility-points).

## Starter code and parameters

When creating a Hook executed at the Send Phone Message extensibility point, you may find the following starter code helpful. Parameters that can be passed into and used by the Hook function are listed at the top of the code sample.

```js
/**
@param {string} recipient - phone number
@param {string} text - message body
@param {object} context - additional authorization context
@param {string} context.message_type - 'sms' we'll support 'voice' in the future too
@param {string} context.action - 'enrollment' or 'second-factor-authentication'
@param {string} context.language - language used by login flow
@param {string} context.code - one time password
@param {string} context.ip - ip address
@param {string} context.user_agent - user agent making the authentication request
@param {object} context.client - object with details about the Auth0 application
@param {string} context.client.client_id - Auth0 application ID
@param {string} context.client.name - Auth0 application name
@param {object} context.client.client_metadata - metadata from client
@param {object} context.user - object representing the user
@param {string} context.user.user_id - Auth0 user ID
@param {string} context.user.name - user name
@param {string} context.user.email - user email
@param {object} context.user.app_metadata - metadata specific to user and application
@param {object} context.user.user_metadata - metadata specific to user
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

## Example parameters

```js
{
  "recipient": "1-808-555-5555",
  "text": "Here is your one time password!",
  "context": {
    "message_type": "sms",
    "action": "enrollment",
    "language": "en",
    "code": "123456",
    "ip": "127.0.0.1",
    "user_agent": "Mozilla/5.0",
    "client": {
      "client_id": "1235",
      "name": "Test Application",
      "client_metadata": { }
    },
    "user": {
      "user_id": "auth0|test12345",
      "name": "Billie Magnusson",
      "email": "billie@email.com",
      "app_metadata": { },
      "user_metadata": { }
    }
  }
}
```

## Starter code response

Once you've customized the starter code, you can test the Hook using the Runner embedded in the Hook Editor. The Runner simulates a call to the Hook with the appropriate body and response. 

<%= include('../_includes/_test_runner_save_warning') %>

When you run a Hook based on the starter code, the response object is:

```
{
    "MessageID": "998a9ad1-c9b9-4b85-97b1-ac0305aa5532"
}
```

## Configuring the hook using the Management API

To configure this Hook using the Management API, please refer to the [Create New Hooks](/hooks/create) documentation.

::: note
The `triggerId` for the Send Phone Message extensibility point is `send-phone-message`.
:::

# Keep reading
To view sample code on how to configure your Send Phone Message extensibility point using Amazon SNS, please follow the [Configuring a Custom SMS Gateway for MFA using Amazon SNS](/multifactor-authentication/send-phone-message-hook-configuration) guide. 