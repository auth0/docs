---
description: Configuring a Custom SMS Gateway for MFA using Amazon SNS
topics:
  - mfa
  - sms
  - custom-sms-gateway 
contentType:
  - how-to
useCase:
  - customize-mfa
---
# Configuring a Custom SMS Gateway for MFA using Amazon SNS

## Prerequisites

Before you begin this tutorial, please:

* Sign up for an [Amazon Web Services](https://portal.aws.amazon.com/billing/signup#/start).
* Capture your Amazon Web Service region.
* Create a new Amazon IAM User with the `AmazonSNSFullAccess` role. 
* Capture the access key and secret key details.

## 1. Create a Send Phone Message hook 

You will need to create a [Send Phone Message](/hooks/extensibility-points/send-phone-message) hook, which will hold the code and secrets of your custom implementation.

::: note
Please note that you can only have ONE Send Phone Message Hook active at a time.
:::

## 2. Configure Hook secrets

You will need to add three new [Hook Secrets](/hooks/secrets/create) to the previously created Send Phone Message Hook. 
The screen should resemble the following screenshot:

## 3. Implement starter code

[Edit](/hooks/update) the Send Phone Message hook's code to match

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
  process.env.AWS_ACCESS_KEY_ID = context.webtask.secrets.AWS_ACCESS_KEY_ID;
  process.env.AWS_SECRET_ACCESS_KEY = context.webtask.secrets.AWS_SECRET_ACCESS_KEY;
  process.env.AWS_REGION = context.webtask.secrets.AWS_REGION;

  var params = { Message: text, PhoneNumber: recipient };

  var publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();

  publishTextPromise
    .then(function() {
      cb();
    })
    .catch(function(err) {
      cb(err);
    });
};
```

## 4. Add the AWS SDK NPM package

The hook uses the [AWS SDK for JavaScript in Node.js](https://aws.amazon.com/sdk-for-node-js/). You will need to add the 'aws-sdk' module from the 'NPM modules' section in the Hooks configuration. You can access it by clicking the icon on the top left of the Hook editor.

## 5. Test your hook implementation

Click the 'Run' icon on the top right to test the hook. Edit the parameters to specify the phone number to receive the SMS and click the 'Run' button.

## 6. Test the MFA flow

Trigger an MFA flow and double check that everything works as intended. If you can't receive the SMS, please take a look at the [Hook Logs](/hooks/view-logs).

## Troubleshooting

If you aren't receiving the SMS, please look at the logs for clues and make sure that:

- The Hook is being called
- You have configured the Hook Secrets as per Step #2
- Those secrets are the same ones you created in the Amazon Web Services portal
- Your Amazon Web Services user has access to the `AmazonSNSFullAccess` role
- Your Amazon Web Services account is active (not suspended)
- Your phone number is formatted using the [E.164 format](https://en.wikipedia.org/wiki/E.164)
