---
description: Configuring a Custom SMS Provider for MFA using Infobip
topics:
  - mfa
  - sms
  - custom-sms-provider
contentType:
  - how-to
useCase:
  - customize-mfa
---
# Configuring a Custom SMS Provider for MFA using Infobip

## Prerequisites

Before you begin this tutorial, please:

* Login to the [Infobip Portal](https://portal.infobip.com/) or [signup for a free trial](https://www.infobip.com/signup).
* Create and capture a new API Key in the [Infobip API Keys page](https://portal.infobip.com/.settings/accounts/api-keys)

## 1. Create a Send Phone Message hook

You will need to create a [Send Phone Message](/hooks/extensibility-points/send-phone-message) hook, which will hold the code and secrets of your custom implementation.

::: note
You can only have **one** Send Phone Message Hook active at a time.
:::

## 2. Configure Hook secrets

Add a [Hook Secret](/hooks/secrets/create) with key = `API_KEY` and the API key provided by Infobip.

## 3. Implement the Hook

[Edit](/hooks/update) the Send Phone Message hook's code to match the example below.

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

## 4. Test your hook implementation

Click the **Run** icon on the top right to test the hook. Edit the parameters to specify the phone number to receive the SMS and click the **Run** button.

## 5. Test the MFA flow

Trigger an MFA flow and double check that everything works as intended. If you do not receive the SMS, please take a look at the [Hook Logs](/hooks/view-logs).

## Troubleshooting

If you do not receive the SMS, please look at the logs for clues and make sure that:

- The Hook is active and the SMS configuration is set to use 'Custom'.
- You have configured the Hook Secrets as per Step 2.
- Those secrets are the same ones you created in the Infobip Portal.
- Your phone number is formatted using the [E.164 format](https://en.wikipedia.org/wiki/E.164).

## Additional Providers

::: next-steps
* [Configuring a Custom SMS Provider for MFA using Amazon SNS](/multifactor-authentication/send-phone-message-hook-amazon-sns)
* [Configuring a Custom SMS Provider for MFA using Twilio](/multifactor-authentication/send-phone-message-hook-twilio)
* [Configuring a Custom SMS Provider for MFA using TeleSign](/multifactor-authentication/send-phone-message-hook-telesign)
* [Configuring a Custom SMS Provider for MFA using Vonage](/multifactor-authentication/send-phone-message-hook-vonage)
:::
