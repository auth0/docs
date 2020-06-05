---
title: Configure a Custom SMS Provider for MFA using Mitto
description: Learn how to configure a Custom SMS Provider for multifactor authentication (MFA) using Mitto.
topics:
  - mfa
  - sms
  - custom-sms-provider
contentType:
  - how-to
useCase:
  - customize-mfa
---
# Configure a Custom SMS Provider for MFA using Mitto

This guide explains how to send <dfn data-key="multifactor-authentication">Multi-factor Authentication (MFA)</dfn> text messages using Mitto and the Send Phone Message Hook.

<%= include('./_includes/_test-setup') %>

## What is Mitto?

Mitto provides an SMS messaging service that can be used by Auth0 to deliver multi-factor verification via text messages. 

## Prequisites

Before you begin this tutorial, please [create an account with Mitto](https://info.mitto.ch/mitto-auth0). You will get an API Key and a Sender ID that you can then use to invoke Mitto's APIs.

## Steps

To configure a custom SMS provider for MFA using Mitto, you will:

1. [Create a Send Phone Message Hook](#create-a-send-phone-message-hook)
2. [Configure Hook Secrets](#configure-hook-secrets)
3. [Add the Mitto call](#add-the-mitto-call)
4. [Test your Hook implementation](#test-your-hook-implementation)
5. [Activate the custom SMS factor](#activate-the-custom-sms-factor)
6. [Test the MFA flow](#test-the-mfa-flow)

### Create a Send Phone Message Hook

You will need to create a [Send Phone Message](/hooks/extensibility-points/send-phone-message) Hook, which will hold the code and secrets of your custom implementation.

::: note
You can only have **one** Send Phone Message Hook active at a time.
:::

### Configure Hook Secrets

You're going to store the values needed from Mitto in [Hook Secrets](/hooks/secrets). This way, the values are secure and can be used easily in your function.

[Add Hook Secrets](/hooks/secrets/create) with the following settings:

* `MITTO_API_KEY` - The API Key provided by Mitto

### Add the Mitto call

To make the call to Mitto, add the appropriate code to the Hook.

Copy the code block below and [edit](/hooks/update) the Send Phone Message Hook code to include it. This function will run each time a user requires MFA, calling Mitto to send a verification code via SMS. You can learn more about the Mitto API in [Mitto's API documentation](https://info.mitto.ch/hubfs/Developer%20Guides/Mitto%20SMS%20API%202.0%20Developer%20Guide%20v2.5.pdf).

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
   const axios = require('axios').default;

   const instance = axios.create({
      baseURL: "https://rest.mittoapi.com/",    
      headers: {
      "Content-Type": "application/json",
      "X-Mitto-API-Key": context.webtask.secrets.MITTO_API_KEY
    },
  });
  instance({
    method: 'post',
    url: '/sms.json',
    data: JSON.stringify({
        to: recipient,
        from: "Mitto SMS", // The Mitto Sender ID
        text: text
    })
  })
  .then((response) => {
    cb(null, {});
  })
  .catch((error) => {
    cb(error);
  });
};
```

### Test your Hook implementation

Click the **Run** icon on the top right to test the Hook. Edit the parameters to specify the phone number to receive the SMS, and click the **Run** button.

### Activate the custom SMS factor

The Hook is now ready to send MFA codes. The last steps are to configure the SMS Factor to use the custom code and test the MFA flow.

1. Navigate to the [Multifactor Auth](${manage_url}/#/mfa) page in the [Auth0 Dashboard](${manage_url}/), and click the **SMS** factor box.

2. In the modal that appears, select **Custom** for the **SMS Delivery Provider**, then make any adjustments you'd like to the templates. Click **Save** when complete, and close the modal.

3. Enable the SMS factor using the toggle switch.

### Test the MFA flow

Trigger an MFA flow and double check that everything works as intended. If you do not receive the SMS, please take a look at the [Hook Logs](/hooks/view-logs).

## Troubleshoot

If you do not receive the SMS, please look at the logs for clues and make sure that:

- The Hook is active and the SMS configuration is set to use 'Custom'.
- You have configured the Hook Secrets as per Step 2.
- The configured Hook Secrets are the same ones you got from Mitto.
- Your phone number is formatted using the [E.164 format](https://en.wikipedia.org/wiki/E.164).

## Additional providers

::: next-steps
* [Configure a Custom SMS Provider for MFA using Amazon SNS](/mfa/send-phone-message-hook-amazon-sns)
* [Configure a Custom SMS Provider for MFA using TeleSign](/mfa/send-phone-message-hook-twilio)
* [Configure a Custom SMS Provider for MFA using Infobip](/mfa/send-phone-message-hook-infobip)
* [Configure a Custom SMS Provider for MFA using TeleSign](/mfa/send-phone-message-hook-telesign)
* [Configure a Custom SMS Provider for MFA using Vonage](/mfa/send-phone-message-hook-vonage)
* [Configure a Custom SMS Provider for MFA using Esendex](/mfa/send-phone-message-hook-esendex)
:::
