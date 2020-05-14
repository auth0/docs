---
title: Configure SMS Notifications for MFA
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

If you use SMS as an authentication factor, when an end user attempts to authenticate with your application, they are sent a code via SMS, which they will have to enter to complete the transaction. This implies that they both know their login credentials and are in possession of the device that they have registered for <dfn data-key="multifactor-authentication">Multi-factor Authentication (MFA)</dfn> use.

::: warning
When initially setting up SMS, you may use up to 100 SMS messages for testing. This limit can be removed by setting up a Twilio account. To prevent malicious login attempts, your users will always be limited to up to 10 SMS/Hour (replenishing one message an hour, up to 10).

When testing Twilio, you should use the **Live Credentials**, not the **Test Credentials**. The test credentials aren't meant to send real SMS messages.
:::

## End user experience

![SMS End User 1](/media/articles/multifactor-authentication/mfa-sms1.png)

After signing up and entering a country code and phone number, the user will receive a six-digit code on their device, which they must enter to authenticate.

![SMS End User 2](/media/articles/multifactor-authentication/mfa-sms2.png)

To use this option, your users must have a device capable of receiving SMS messages. If users cannot receive SMS messages, they will not be able to authenticate with this factor. If they already enrolled with SMS and do not have such a device, they will need to use their recovery code to complete the MFA flow (and then enroll another MFA method in place of this one).

## Administrative setup

To allow users to authenticate with SMS, you must enable the SMS factor and select your preferred delivery method:

* **Auth0**: Sends the messages using Auth0's internally-configured SMS delivery provider. It can be used for evaluation purposes, and there is a maximum of 100 messages per tenant during the entire tenant lifetime.

* **Twilio**: Sends the messages using the [Twilio Programmable SMS API](https://www.twilio.com/sms). You will need to provide [your own Twilio credentials](#twilio-configuration).

* **Custom**: Sends the messages by invoking the [Send Phone Message Hook](/hooks/extensibility-points/send-phone-message).

Optionally, you can [customize your SMS notification templates](/multifactor-authentication/sms-templates).

![MFA SMS Settings](/media/articles/multifactor-authentication/sms-settings.png)

## Twilio configuration

If you choose to deliver SMS via Twilio, follow these steps to configure your SMS factor.

1. Open an account with Twilio. You will need a [Twilio Account SID](https://www.twilio.com/help/faq/twilio-basics/what-is-an-application-sid) and a [Twilio Auth Token](https://www.twilio.com/help/faq/twilio-basics/what-is-the-auth-token-and-how-can-i-change-it). These are the Twilio API credentials that Auth0 will use to send an SMS to the user. You may also need to enable permissions for your [geographic region](https://support.twilio.com/hc/en-us/articles/223181108-How-International-SMS-Permissions-work).

2. Configure your SMS settings by clicking on the **SMS** box.

  ![SMS MFA using Twilio](/media/articles/mfa/mfa-sms-twilio.png)

3. Configure the connection. Enter your **Twilio Account SID** and **Twilio Auth Token** in the appropriate fields.

4. Choose your **SMS Source**.

  * If you choose **Use From**, you will need to enter the **From** phone number that users will see as the sender of the SMS. You may also configure this in Twilio.

  * If you choose **Use Copilot**, you will need to enter a [Copilot SID](https://www.twilio.com/docs/api/rest/sending-messages-copilot).

5. Click **Save**.

## Custom SMS providers

SMS providers not currently integrated with Auth0 can be supported by using the [Send Phone Message](/hooks/extensibility-points/send-phone-message) Hook. To learn how to implement this in your MFA flow, see the guides below.

::: next-steps
* [Configure a Custom SMS Provider for MFA using Amazon SNS](/multifactor-authentication/send-phone-message-hook-amazon-sns)
* [Configure a Custom SMS Provider for MFA using Twilio](/multifactor-authentication/send-phone-message-hook-twilio)
* [Configure a Custom SMS Provider for MFA using Infobip](/multifactor-authentication/send-phone-message-hook-infobip)
* [Configure a Custom SMS Provider for MFA using TeleSign](/multifactor-authentication/send-phone-message-hook-telesign)
* [Configure a Custom SMS Provider for MFA using Vonage](/multifactor-authentication/send-phone-message-hook-vonage) :::
