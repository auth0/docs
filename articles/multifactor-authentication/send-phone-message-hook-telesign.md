---
title: Configure a Custom SMS Provider for MFA using TeleSign
description: Learn how to configure a Custom SMS Provider for multifactor authentication (MFA) using TeleSign.
topics:
  - mfa
  - sms
  - custom-sms-provider
contentType:
  - how-to
useCase:
  - customize-mfa
---
# Configure a Custom SMS Provider for MFA using TeleSign

This guide explains how to send <dfn data-key="multifactor-authentication">Multi-factor Authentication (MFA)</dfn> text messages using Telesign.

<%= include('./_includes/_test-setup') %>

## What is Telesign?

Telesign provides two different APIs, both of which may be used alongside Auth0 to deliver multi-factor verification via text messages:

* [TeleSign SMS](https://www.telesign.com/products/sms-api): Allows you to build and manage SMS communications and security verification processes.
* [TeleSign SMS Verify](https://www.telesign.com/products/sms-verify): Helps you manage the SMS verification process and is available in the Enterprise plan.

## Prerequisites

Before you begin this tutorial, please:

* Log in to your TeleSign portal (either the [TeleSign Enterprise Portal](https://teleportal.telesign.com) or the [TeleSign Standard Portal](https://portal.telesign.com/)).
* Capture the Customer ID and API Keys from your TeleSign account.

## Steps

To configure a custom SMS provider for MFA using Telesign, you will:

1. [Create a Send Phone Message Hook](#create-a-send-phone-message-hook)
2. [Configure Hook Secrets](#configure-hook-secrets)
3. [Add the Telesign call](#add-the-telesign-call)
4. [Test your Hook implementation](#test-your-hook-implementation)
5. [Activate the custom SMS factor](#activate-the-custom-sms-factor)
6. [Test the MFA flow](#test-the-mfa-flow)

Optional: [Troubleshoot](#troubleshoot)

### Create a Send Phone Message Hook

You will need to create a [Send Phone Message](/hooks/extensibility-points/send-phone-message) Hook, which will hold the code and secrets of your custom implementation.

::: note
You can only have **one** Send Phone Message Hook active at a time.
:::

### Configure Hook Secrets

You're going to store the values needed from the Telesign portal in [Hook Secrets](/hooks/secrets). This way, the values are secure and can be used easily in your function.

1. [Add Hook Secrets](/hooks/secrets/create) with the following settings. You can find the values for the secrets in your Telesign portal.

* `TELESIGN_CUSTOMER_ID`: Telesign Customer ID
* `TELESIGN_API_KEY`: Telesign API Key

### Add the Telesign call

To make the call to Telesign, add the appropriate code to the Hook.

1. Copy the appropriate code block below and [edit](/hooks/update) the Send Phone Message Hook code to include it. This function will run each time a user requires MFA, calling Telesign to send a verification code via SMS.

#### SMS API

If you are calling the SMS API, use the following code:

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
module.exports = function (recipient, text, context, cb) {

  const axios = require('axios').default;
  const querystring = require('querystring');

  const customerId = context.webtask.secrets.TELESIGN_CUSTOMER_ID;
  const restApiKey = context.webtask.secrets.TELESIGN_REST_API_KEY;

  const instance = axios.create({
    // If you are using the standard TeleSign plan the URL should be https://rest-api.telesign.com/
    baseURL: "https://rest-ww.telesign.com",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  });

  instance({
    method: 'post',
    auth: {
      username: customerId,
      password: restApiKey
    },
    url: '/v1/messaging',
    data: querystring.stringify({
      phone_number: recipient,
      message_type: 'ARN',
      message: text
    })
  })
  .then((response) => {
    cb(null, {});

  })
  .catch((error) => {
    cb(error);
  });
}
```

#### SMS Verify API

If you are calling the SMS Verify API, use the following code:

```js
module.exports = function(recipient, text, context, cb) {

  const axios = require('axios').default;
  const querystring = require('querystring');

  const customerId =  context.webtask.secrets.TELESIGN_CUSTOMER_ID;
  const restApiKey = context.webtask.secrets.TELESIGN_API_KEY;

  const instance = axios.create({
    baseURL: "https://rest-ww.telesign.com",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  });

  instance({
    method: 'post',
    auth: {
      username: customerId,
      password: restApiKey
    },
    url: '/v1/verify/sms',
    data: querystring.stringify({
      phone_number: recipient,
      template: text
    })
  })
  .then((response) => {
      cb(null, {});
  })
  .catch((error) => {
      cb(error);
  });
}
```

### Test your Hook implementation

Click the **Run** icon on the top right to test the Hook. Edit the parameters to specify the phone number to receive the SMS, and click the **Run** button.

### Activate the custom SMS factor

The Hook is now ready to send MFA codes via the Telesign. The last steps are to configure the SMS Factor to use the custom code and test the MFA flow.

1. Navigate to the [Multifactor Auth](${manage_url}/#/mfa) page in the [Auth0 Dashboard](${manage_url}/), and click the **SMS** factor box.

2. In the modal that appears, select **Custom** for the **SMS Delivery Provider**, then make any adjustments you'd like to the templates. Click **Save** when complete, and close the modal.

3. Enable the SMS factor using the toggle switch.

### Test the MFA flow

Trigger an MFA flow and double check that everything works as intended. If you do not receive the SMS, please take a look at the [Hook Logs](/hooks/view-logs).

## Troubleshoot

If you do not receive the SMS, please look at the logs for clues and make sure that:

- The Hook is active and the SMS configuration is set to use 'Custom'.
- You have configured the Hook Secrets as per Step 2.
- The configured Hook Secrets are the same ones provided in the TeleSign portal.
- Your phone number is formatted using the [E.164 format](https://en.wikipedia.org/wiki/E.164).

## Additional providers

::: next-steps
* [Configure a Custom SMS Provider for MFA using Amazon SNS](/multifactor-authentication/send-phone-message-hook-amazon-sns)
* [Configure a Custom SMS Provider for MFA using Twilio](/multifactor-authentication/send-phone-message-hook-twilio)
* [Configure a Custom SMS Provider for MFA using Infobip](/multifactor-authentication/send-phone-message-hook-infobip)
* [Configure a Custom SMS Provider for MFA using Vonage](/multifactor-authentication/send-phone-message-hook-vonage)
:::
