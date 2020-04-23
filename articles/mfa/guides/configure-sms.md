---
description: Learn how to configure SMS notifications for MFA.
topics:
  - mfa
  - twilio
contentType:
  - how-to
useCase:
  - customize-mfa
---
# Configure SMS Notifications for MFA

Using SMS as an authentication factor means that the end user is sent a code via SMS when attempting to authenticate with your application. They will have to enter this code to complete the transaction. This implies that in addition to knowing their login credentials, they also have possession of the device that they have registered for MFA use.

::: warning
When initially setting up SMS, you have up to 100 SMS to be used for testing. This limit can be removed by setting up a Twilio account. To prevent malicious login attempts, your users will always be limited to up to 10 SMS/Hour (replenishing one message an hour, up to 10).

For testing Twilio, you should use the **Live Credentials** not the **Test Credentials** as the test credentials aren't meant to send real SMS messages.
:::

## End user experience

![SMS End User 1](/media/articles/multifactor-authentication/mfa-sms1.png)

After signing up, and entering a country code and phone number, the user will receive a six digit code on their device. They need to enter this code in order to authenticate.

![SMS End User 2](/media/articles/multifactor-authentication/mfa-sms2.png)

Your users must have a device capable of receiving SMS messages to use this option. If users cannot receive SMS messages, they will not be able to authenticate with this factor. If they already enrolled with SMS and do not have such a device, they will need to use their recovery code to complete the MFA flow (and then enroll another MFA method rather than this one).

## Administrative setup

To be able to let users authenticate with SMS, you will need to enable the SMS factor and select your preferred delivery method:

- **Auth0:** Auth0 will send the messages using an internally-configured SMS delivery provider. It can be used for evaluation purposes, and there is a maximum of 100 messages per tenant, during the entire tenant lifetime.

- **Twilio**: Auth0 will send the messages using the [Twilio Programmable SMS API](https://www.twilio.com/sms). You will need to provide [your own Twilio credentials](#twilio-configuration).

- **Custom**: Auth0 will invoke the [Send Phone Message Hook](/hooks/extensibility-points/send-phone-message) to send a message.

You can (optionally) [customize your SMS notification templates](/multifactor-authentication/sms-templates).

![MFA SMS Settings](/media/articles/multifactor-authentication/sms-settings.png)

## Twilio Configuration

If you choose to deliver SMS via Twilio, follow these steps to configure your SMS factor.

1. Open an account with Twilio. You will need a [Twilio Account SID](https://www.twilio.com/help/faq/twilio-basics/what-is-an-application-sid) and a [Twilio Auth Token](https://www.twilio.com/help/faq/twilio-basics/what-is-the-auth-token-and-how-can-i-change-it). These are the Twilio API credentials that Auth0 will use to send an SMS to the user. You may also need to enable permissions for your [geographic region](https://support.twilio.com/hc/en-us/articles/223181108-How-International-SMS-Permissions-work).

2. Click on the **SMS** box to configure your SMS settings.

  ![](/media/articles/mfa/mfa-sms-twilio.png)

3. Configure the connection. Enter your **Twilio Account SID** and **Twilio Auth Token** in the appropriate fields.

4. Choose your **SMS Source**.

  * If you choose **Use From**, you will need to enter the **From** phone number that users will see as the sender of the SMS. You may also configure this in Twilio.

  * If you choose **Use Copilot**, you will need to enter a [Copilot SID](https://www.twilio.com/docs/api/rest/sending-messages-copilot).

5. Click **SAVE**.
