---
description: Configuring a Custom SMS Gateway for MFA using Twilio
topics:
  - mfa
  - sms
  - custom-sms-gateway 
contentType:
  - how-to
useCase:
  - customize-mfa
---
# Configuring a Custom SMS Gateway for MFA using Twilio

Auth0 has built-in support for sending messages through Twilio. However, you could want do add specific logic before sending the message, or sending a different message depending on the user or the application. If that's the case, you can achieve whatever you want by configuring SMS MFA to use a send messages using the Phone Message Hook.

## Prerequisites

Before you begin this tutorial, please:

* Sign up for an [Twilio](https://www.twilio.com/try-twilio).
* Capture your Amazon Web Service region.
* Capture the Account SID and Authorization Token.

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
  const fromPhoneNumber = '+XXXXXXX';

  const client = require('twilio')(accountSid, authToken); 
 
  client.messages 
      .create({ 
         body: text + context.client_id, 
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

## 4. Add the AWS SDK NPM package

The hook uses the [Twilio Node.JS Helper Library](https://github.com/twilio/twilio-node). You will need to add the 'twilio-node' module from the 'NPM modules' section in the Hooks configuration. You can access it by clicking the icon on the top left of the Hook editor.

## 5. Test your hook implementation

Click the 'Run' icon on the top right to test the hook. Edit the parameters to specify the phone number to receive the SMS and click the 'Run' button.

## 6. Test the MFA flow

Trigger an MFA flow and double check that everything works as intended. If you can't receive the SMS, please take a look at the [Hook Logs](/hooks/view-logs).

## Troubleshooting

If you aren't receiving the SMS, please look at the logs for clues and make sure that:

- The Hook is active and the SMS configuration is set to use 'Custom'.
- You have configured the Hook Secrets as per Step #2
- Those are the same ones you created in the Twilio Console
- Your are sending the messages from a phone number that's linked to your Twilio account
- Your phone number is formatted using the [E.164 format](https://en.wikipedia.org/wiki/E.164)
