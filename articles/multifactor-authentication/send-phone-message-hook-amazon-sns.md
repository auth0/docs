---
title: Configure a Custom SMS Provider for MFA using Amazon SNS
description: Learn how to configure a Custom SMS Provider for multifactor authentication (MFA) using Amazon SNS.
topics:
  - mfa
  - sms
  - custom-sms-provider
contentType:
  - how-to
useCase:
  - customize-mfa
---
# Configure a Custom SMS Provider for MFA using Amazon SNS

This guide explains how to send <dfn data-key="multifactor-authentication">Multi-factor Authentication (MFA)</dfn> text messages using the Amazon Simple Notification Service (SNS).

<%= include('./_includes/_test-setup') %>

## What is Amazon SNS?

Amazon Simple Notification Service (SNS) is a pub/sub messaging service that enables Auth0 to deliver multi-factor verification via text messages. To learn more, see [Amazon's SNS Overview](https://aws.amazon.com/sns).

## Prerequisites

Before you begin this tutorial, please:

* Sign up for an [Amazon Web Services](https://portal.aws.amazon.com/billing/signup#/start).
* Capture your Amazon Web Service region.
* Create a new Amazon IAM User with the `AmazonSNSFullAccess` role.
* Capture the user's access key and secret key details.

## Steps

To configure a custom SMS provider for MFA using Amazon SNS, you will:

1. [Create a Send Phone Message Hook](#create-a-send-phone-message-hook)
2. [Configure Hook Secrets](#configure-hook-secrets)
3. [Add the AWS SNS call](#add-the-aws-sns-call)
4. [Add the AWS SDK NPM package](#add-the-aws-sdk-npm-package)
5. [Test your Hook implementation](#test-your-hook-implementation)
6. [Activate the custom SMS factor](#activate-the-custom-sms-factor)
7. [Test the MFA flow](#test-the-mfa-flow)

Optional: [Troubleshoot](#troubleshoot)

### Create a Send Phone Message Hook

You will need to create a [Send Phone Message](/hooks/extensibility-points/send-phone-message) Hook, which will hold the code and secrets of your custom implementation.

::: note
You can only have **one** Send Phone Message Hook active at a time.
:::

### Configure Hook secrets

Add three [Hook Secrets](/hooks/secrets/create) with keys `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` and `AWS_REGION`, with the corresponding values from your Amazon account.

### Add the AWS SNS call

To make the call to AWS SNS, add the appropriate code to the Hook.

1. Copy the code block below and [edit](/hooks/update) the Send Phone Message Hook code to include it. This function will run each time a user requires MFA, calling AWS SNS to send a verification code via SMS.

```js
// Load the SDK
var AWS = require("aws-sdk");

/**
@param {string} recipient - phone number
@param {string} text - message body
@param {object} context - additional authorization context
@param {string} context.factor_type - 'first' or 'second'
@param {string} context.message_type - 'sms' or 'voice'
@param {string} context.action - 'enrollment' or 'authentication'
@param {string} context.language - language used by login flow
@param {string} context.code - one-time password
@param {string} context.ip - ip address
@param {string} context.user_agent - user agent making the authentication request
@param {string} context.client_id - to send different messages depending on the client id
@param {string} context.name - to include it in the SMS message
@param {object} context.client_metadata - metadata from client
@param {object} context.user - To customize messages for the user
@param {function} cb - function (error, response)
*/
module.exports = function(recipient, text, context, cb) {
  process.env.AWS_ACCESS_KEY_ID = context.webtask.secrets.AWS_ACCESS_KEY_ID;
  process.env.AWS_SECRET_ACCESS_KEY = context.webtask.secrets.AWS_SECRET_ACCESS_KEY;
  process.env.AWS_REGION = context.webtask.secrets.AWS_REGION;

  var params = { Message: text, PhoneNumber: recipient };

  var publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();

  publishTextPromise
    .then(function() {
      cb(null, {});
    })
    .catch(function(err) {
      cb(err);
    });
};
```

### Add the AWS SDK NPM package

The Hook uses the [AWS SDK for JavaScript in Node.js](https://aws.amazon.com/sdk-for-node-js/), so you'll need to include this package in your Hook.

1. Click the **Settings** icon again, and select **NPM Modules**. 

2. Search for `aws-sdk` and add the module that appears.

### Test your Hook implementation

Click the **Run** icon on the top right to test the Hook. Edit the parameters to specify the phone number to receive the SMS, and click the **Run** button.

### Activate the custom SMS factor

The Hook is now ready to send MFA codes via the Vonage SMS API. The last steps are to configure the SMS Factor to use the custom code and test the MFA flow.

1. Navigate to the [Multifactor Auth](${manage_url}/#/mfa) page in the [Auth0 Dashboard](${manage_url}/), and click the **SMS** factor box.

2. In the modal that appears, select **Custom** for the **SMS Delivery Provider**, then make any adjustments you'd like to the templates. Click **Save** when complete, and close the modal.

3. Enable the SMS factor using the toggle switch.

### Test the MFA flow

Trigger an MFA flow and double check that everything works as intended. If you do not receive the SMS, please take a look at the [Hook Logs](/hooks/view-logs).

## Troubleshoot

If you do not receive the SMS, please look at the logs for clues and ensure that:

- The Hook is active and the SMS configuration is set to use `Custom`.
- You have configured the Hook Secrets as per Step 2.
- The configured Hook Secrets are the same ones you created in the Amazon Web Services portal.
- Your Amazon Web Services user has access to the `AmazonSNSFullAccess` role.
- Your Amazon Web Services account is active (not suspended).
- Your phone number is formatted using the [E.164 format](https://en.wikipedia.org/wiki/E.164).

## Additional providers

::: next-steps
* [Configure a Custom SMS Provider for MFA using Twilio](/multifactor-authentication/send-phone-message-hook-twilio)
* [Configure a Custom SMS Provider for MFA using Infobip](/multifactor-authentication/send-phone-message-hook-infobip)
* [Configure a Custom SMS Provider for MFA using TeleSign](/multifactor-authentication/send-phone-message-hook-telesign)
* [Configure a Custom SMS Provider for MFA using Vonage](/multifactor-authentication/send-phone-message-hook-vonage)
:::
