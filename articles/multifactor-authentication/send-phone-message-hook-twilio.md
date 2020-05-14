---
title: Configure a Custom SMS Provider for MFA using Twilio
description: Learn how to configure a Custom SMS Provider for multifactor authentication (MFA) using Twilio.
topics:
  - mfa
  - sms
  - custom-sms-provider
contentType:
  - how-to
useCase:
  - customize-mfa
---
# Configure a Custom SMS Provider for MFA using Twilio

This guide explains how to send <dfn data-key="multifactor-authentication">Multi-factor Authentication (MFA)</dfn> text messages using Twilio and the Send Phone Message Hook.

Auth0 has built-in support for sending messages through Twilio. However, you may want to add specific logic before sending a message or want to send a different message depending on the user or the application. In this case, you would configure SMS MFA to use a Send Phone Message Hook.

<%= include('./_includes/_test-setup') %>

## What is Twilio?

Twilio provides an SMS messaging service which can be used by Auth0 to deliver multi-factor verification via text messages. It provides two different APIs:

  - [Programmable SMS](https://www.twilio.com/sms) is a flexible API designed to fully automate SMS communications.
  - [Verify](https://www.twilio.com/verify) is an API designed to send one-time codes while hides the complexity of SMS delivery.

## Prerequisites

Before you begin this tutorial, please:

* Sign up for a [Twilio](https://www.twilio.com/try-twilio) account.
* Create a new Messaging Service in the [Programmable SMS console](https://www.twilio.com/console/sms/services) or in the [Verify console](https://www.twilio.com/console/verify/services) depending on the API you want to use.
* If you use Programmable SMS, you need to add a phone number that is enabled for SMS to your service and capture the number.
*  If use the Verify API, you need to make sure that the Twilio Verify Service is configured to accept a custom code. At the time of writing, you need to contact Twilio support to get it enabled. 
* Capture the Account SID and Authorization Token by clicking *Show API Credentials* in the [Twilio SMS Dashboard](https://www.twilio.com/console/sms/dashboard)

## Steps

To configure a custom SMS provider for MFA using Twilio, you will:

1. [Create a Send Phone Message Hook](#create-a-send-phone-message-hook)
2. [Configure Hook Secrets](#configure-hook-secrets)
3. [Add the Twilio call](#add-the-twilio-call)
4. [Add the Twilio Node JS Helper NPM package](#add-the-twilio-node-js-helper-npm-package)
5. [Test your Hook implementation](#test-your-hook-implementation)
6. [Activate the custom SMS factor](#activate-the-custom-sms-factor)
7. [Test the MFA flow](#test-the-mfa-flow)

### Create a Send Phone Message Hook

You will need to create a [Send Phone Message](/hooks/extensibility-points/send-phone-message) Hook, which will hold the code and secrets of your custom implementation.

::: note
You can only have **one** Send Phone Message Hook active at a time.
:::

### Configure Hook Secrets

You're going to store the values needed from the Twilio SMS Dashboard in [Hook Secrets](/hooks/secrets). This way, the values are secure and can be used easily in your function.

1. [Add Hook Secrets](/hooks/secrets/create) with the following settings. You can find the values for the secrets in your [Twilio SMS Dashboard](https://www.twilio.com/console/sms/dashboard).

* `TWILIO_ACCOUNT_SID`: Twilio Account SID
* `TWILIO_AUTH_TOKEN`: Twilio Authorization token
* `TWILIO_PHONE_NUMBER`: Twilio "from" sending number

### Add the Twilio call

To make the call to Twilio, add the appropriate code to the Hook.

1. [Edit](/hooks/update) the Send Phone Message Hook code and copy of the code snippets below, depending on the API you want to use. This function will run each time a user requires MFA, calling Twilio to send a verification code via SMS.

To use the Programmable SMS API, use the code below.

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

  const accountSid = context.webtask.secrets.TWILIO_ACCOUNT_SID;
  const authToken = context.webtask.secrets.TWILIO_AUTH_TOKEN;
  const fromPhoneNumber = context.webtask.secrets.TWILIO_PHONE_NUMBER;

  const client = require('twilio')(accountSid, authToken); 
 
  client.messages 
      .create({ 
         body: text, 
         from: fromPhoneNumber,       
         to: recipient
      })
      .then(function() {
        cb(null, {});
      })
      .catch(function(err) {
        cb(err);
      });
};
```

To use the Verify API, use the code below.

```js
module.exports = function(recipient, text, context, cb) {

  const accountSid = context.webtask.secrets.TWILIO_ACCOUNT_SID; 
  const authToken = context.webtask.secrets.TWILIO_AUTH_TOKEN; 
  const fromPhoneNumber = context.webtask.secrets.TWILIO_PHONE_NUMBER;

  const client = require('twilio')(accountSid, authToken); 
 
  client.verify.services(accountSid)
      .verifications
      .create({
        to: recipient,
        channel: 'sms',
        customCode: context.code
      })
      .then(function() {
        cb(null, {});
      }) 
      .catch(function(err) {
        cb(err);
      });
};
```

### Add the Twilio Node JS Helper NPM package

The Hook uses the [Twilio Node.JS Helper Library](https://github.com/twilio/twilio-node), so you'll need to include this package in your Hook.

1. Click the **Settings** icon again, and select **NPM Modules**. 

2. Search for `twilio-node` and add the module that appears.

### Test your Hook implementation

Click the **Run** icon on the top right to test the Hook. Edit the parameters to specify the phone number to receive the SMS, and click the **Run** button.

### Activate the custom SMS factor

The Hook is now ready to send MFA codes via Twilio. The last steps are to configure the SMS Factor to use the custom code and test the MFA flow.

1. Navigate to the [Multifactor Auth](${manage_url}/#/mfa) page in the [Auth0 Dashboard](${manage_url}/), and click the **SMS** factor box.

2. In the modal that appears, select **Custom** for the **SMS Delivery Provider**, then make any adjustments you'd like to the templates. Click **Save** when complete, and close the modal.

3. Enable the SMS factor using the toggle switch.

### Test the MFA flow

Trigger an MFA flow and double check that everything works as intended. If you do not receive the SMS, please take a look at the [Hook Logs](/hooks/view-logs).

## Troubleshoot

If you do not receive the SMS, please look at the logs for clues and make sure that:

- The Hook is active and the SMS configuration is set to use 'Custom'.
- You have configured the Hook Secrets as per Step 2.
- The configured Hook Secrets are the same ones you created in the Twilio SMS Dashboard.
- Your are sending the messages from a phone number that is linked to your Twilio account.
- Your phone number is formatted using the [E.164 format](https://en.wikipedia.org/wiki/E.164).

## Additional providers

::: next-steps
* [Configure a Custom SMS Provider for MFA using Amazon SNS](/multifactor-authentication/send-phone-message-hook-amazon-sns)
* [Configure a Custom SMS Provider for MFA using Infobip](/multifactor-authentication/send-phone-message-hook-infobip)
* [Configure a Custom SMS Provider for MFA using TeleSign](/multifactor-authentication/send-phone-message-hook-telesign)
* [Configure a Custom SMS Provider for MFA using Vonage](/multifactor-authentication/send-phone-message-hook-vonage)
:::
