---
title: Send Phone Message
description: Learn how to provide your own code to send SMS messages for MFA
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

If you decide to use SMS as a factor for <dfn data-key="multifactor-authentication">Multi-factor Authentication (MFA)</dfn>, you can configure how you want Auth0 to send the messages in the [SMS configuration dialog](/multifactor-authentication/factors/sms#administrative-setup).

If you select the 'Custom' SMS delivery method, you must create a **Send Phone Message Hook** that will let you write your own code to send the message. This allows you to use whatever SMS provider you want.

::: note
The `triggerId` for the Send Phone Message extensibility point is `send-phone-message`. To learn how to create Hooks for this extensibility point, see [Create New Hooks](/hooks/create).
:::

## Starter code and parameters

When creating a Hook executed at the Send Phone Message extensibility point, you may find the following starter code helpful. Parameters that can be passed into and used by the Hook function are listed at the top of the code sample.

```js
/**
@param {string} recipient - phone number
@param {string} text - message body
@param {object} context - additional authorization context
@param {string} context.message_type - 'sms'; we'll support 'voice' in the future too
@param {string} context.action - 'enrollment' or 'second-factor-authentication'
@param {string} context.language - language used by login flow
@param {string} context.code - one-time password
@param {string} context.ip - ip address
@param {string} context.user_agent - user agent making the authentication request
@param {object} context.client - object with details about the Auth0 application
@param {string} context.client.client_id - Auth0 application ID
@param {string} context.client.name - Auth0 application name
@param {object} context.client.client_metadata - metadata from client
@param {object} context.user - object representing the user
@param {string} context.user.user_id - Auth0 user's ID
@param {string} context.user.name - user's name
@param {string} context.user.email - user 'semail
@param {object} context.user.app_metadata - metadata specific to user and application
@param {object} context.user.user_metadata - metadata specific to user
@param {function} cb - function (error, response)
*/
module.exports = function(recipient, text, context, cb) {
 // TODO: Add your code here
  cb(null, {});
};
```

::: note
The callback function (`cb`) at the end of the sample code signals completion and **must** be included.
:::

## Example parameters

This is an example of the parameters:

```js
{
  "recipient": "1-808-555-5555",
  "text": "Here is your one time password: 999111",
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

Once you have customized the Hook code, you can test it using the Runner embedded in the Editor. The Runner simulates a call to the Hook with the appropriate body and response.

<%= include('../_includes/_test_runner_save_warning') %>

When you run a Hook based on the starter code, the response object is:

```
{
    "MessageID": "998a9ad1-c9b9-4b85-97b1-ac0305aa5532"
}
```

## Localization

The `context.language` parameter will always have one of the [languages configured in the Tenant Settings](/universal-login/i18n). Depending on how you trigger the MFA flow, we will calculate which language to use in the following different ways:

- If you use the [MFA API](/mfa/concepts/mfa-api), we will use the Accept-Language header from the request and map it to a tenant language. If the language is not available, we will set the parameter to the tenant default language.

- If you use the New Universal Login Experience, we will use a combination of the Accept-Language header and the `ui_locales` parameter, as described in [Universal Login Internationalization](/universal-login/i18n#language-selection).

- If you use the Classic Universal Login Experience, we will set the language to 'N/A'. This is a limitation that will be fixed in upcoming releases.

## Keep reading

::: next-steps
- [Configure a Custom SMS Provider for MFA using Amazon SNS](/multifactor-authentication/send-phone-message-hook-amazon-sns)
- [Configure a Custom SMS Provider for MFA using Twilio](/multifactor-authentication/send-phone-message-hook-twilio)
- [Configure a Custom SMS Provider for MFA using Infobip](/multifactor-authentication/send-phone-message-hook-infobip)
- [Configure a Custom SMS Provider for MFA using TeleSign](/multifactor-authentication/send-phone-message-hook-telesign)
- [Configure a Custom SMS Provider for MFA using Vonage](/multifactor-authentication/send-phone-message-hook-vonage)
- [Configure SMS Notifications for MFA](/mfa/guides/configure-sms)
- [Extensibility Points](/hooks/extensibility-points)
:::
