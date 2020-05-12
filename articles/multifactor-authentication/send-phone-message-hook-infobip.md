---
title: Configure a Custom SMS Provider for MFA using Infobip
description: Learn how to configure a Custom SMS Provider for multifactor authentication (MFA) using Infobip.
topics:
  - mfa
  - sms
  - custom-sms-provider
contentType:
  - how-to
useCase:
  - customize-mfa
---
# Configure a Custom SMS Provider for MFA using Infobip

This guide explains how to send <dfn data-key="multifactor-authentication">Multi-factor Authentication (MFA)</dfn> text messages using Infohip.

<%= include('./_includes/_test-setup') %>

## What is Infobip?

Infobip SMS is a messaging platform that enables Auth0 to deliver multi-factor verification via text messages. To learn more, see [Infobip's SMS Overview](https://www.infobip.com/products/sms).

## Prerequisites

Before you begin this tutorial, please:

* Log in to the [Infobip Portal](https://portal.infobip.com/) or [sign up for a free trial](https://www.infobip.com/signup).
* Create and capture a new API Key on the [Infobip API Keys](https://portal.infobip.com/.settings/accounts/api-keys) page.

## Steps

To configure a custom SMS provider for MFA using Infobip, you will:

1. [Create a Send Phone Message Hook](#create-a-send-phone-message-hook)
2. [Configure Hook Secrets](#configure-hook-secrets)
3. [Add the Infobip call](#add-the-infobip-call)
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

You're going to store the value needed from the Infobip portal in a [Hook Secret](/hooks/secrets). This way, the values are secure and can be used easily in your function.

1. [Add a Hook Secret](/hooks/secrets/create) with the following settings. You can find the value for the secret on the [Infobip API Keys](https://portal.infobip.com/.settings/accounts/api-keys) page.

* `INFOBIP_API_KEY` - Infobip API key

### Add the Infobip call

To make the call to Infobip, add the appropriate code to the Hook.

1. Copy the code block below and [edit](/hooks/update) the Send Phone Message Hook code to include it. This function will run each time a user requires MFA, calling Infobip to send a verification code via SMS.

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
    const API_KEY = context.webtask.secrets.API_KEY;;
    const BASE_URL = 'https://2622w.api.infobip.com';
    const instance = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': 'App ' + API_KEY,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    instance({
        method: 'post',
        url: '/sms/2/text/advanced',
        data: {
            "messages": [
                {
                    "destinations": [
                        { "to": recipient }
                    ],
                    "text": text
                }
            ]
        }
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

The Hook is now ready to send MFA codes via Infobip. The last steps are to configure the SMS Factor to use the custom code and test the MFA flow.

1. Navigate to the [Multifactor Auth](${manage_url}/#/mfa) page in the [Auth0 Dashboard](${manage_url}/), and click the **SMS** factor box.

2. In the modal that appears, select **Custom** for the **SMS Delivery Provider**, then make any adjustments you'd like to the templates. Click **Save** when complete, and close the modal.

3. Enable the SMS factor using the toggle switch.

### Test the MFA flow

Trigger an MFA flow and double check that everything works as intended. If you do not receive the SMS, please take a look at the [Hook Logs](/hooks/view-logs).

## Troubleshoot

If you do not receive the SMS, please look at the logs for clues and make sure that:

- The Hook is active and the SMS configuration is set to use 'Custom'.
- You have configured the Hook Secrets as per Step 2.
- The configured Hook Secrets are the same ones you created in the Infobip portal.
- Your phone number is formatted using the [E.164 format](https://en.wikipedia.org/wiki/E.164).

## Additional providers

::: next-steps
* [Configure a Custom SMS Provider for MFA using Amazon SNS](/multifactor-authentication/send-phone-message-hook-amazon-sns)
* [Configure a Custom SMS Provider for MFA using Twilio](/multifactor-authentication/send-phone-message-hook-twilio)
* [Configure a Custom SMS Provider for MFA using TeleSign](/multifactor-authentication/send-phone-message-hook-telesign)
* [Configure a Custom SMS Provider for MFA using Vonage](/multifactor-authentication/send-phone-message-hook-vonage)
:::
