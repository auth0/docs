---
title: Configure  SMS and Voice Notifications for MFA
description: Learn how to configure SMS and Voice notifications for MFA.
topics:
  - mfa
  - twilio
contentType:
  - how-to
useCase:
  - customize-mfa
---
# Configure SMS and Voice Notifications for MFA

If you use SMS or Voice as an authentication factor, when an end user attempts to authenticate with your application, they are sent a code via SMS or Voice, which they will have to enter to complete the transaction. This implies that they both know their login credentials and are in possession of the phone number that they have registered for <dfn data-key="multifactor-authentication">Multi-factor Authentication (MFA)</dfn> use.

You can configure this factor to send messages through SMS, Voice, or to let the end users choose how they want the code to be delivered.

## End user experience

![SMS End User 1](/media/articles/mfa/mfa-sms1.png)

After signing up and entering a country code and phone number, the user will receive a six-digit code on their device, which they must enter to authenticate.

![SMS End User 2](/media/articles/mfa/mfa-sms2.png)

To use this option, your users must have a device capable of receiving text messages or phone calls. If users cannot receive them messages, they will not be able to authenticate with this factor. If they already enrolled this way and do not have such a device, they will need to use their recovery code to complete the MFA flow (and then enroll another MFA method in place of this one).

## Administrative setup

To allow users to authenticate with SMS or Voice, you must enable the Phone factor and select your preferred delivery method:

* **Auth0**: Sends the messages using Auth0's internally-configured SMS delivery provider. It can be used for evaluation purposes, and there is a maximum of 100 messages per tenant during the entire tenant lifetime. You can't use this provider to send Voice messages.

* **Twilio**: Sends the messages using the [Twilio Programmable SMS API](https://www.twilio.com/sms) for SMS or [Twilio Programmable Voice API](https://www.twilio.com/voice) for Voice. You will need to provide [your own Twilio credentials](#twilio-configuration). Make sure you use Twilio  **Live Credentials**, not the **Test Credentials**. The test credentials aren't meant to send messages for real.
:::

* **Custom**: Sends the messages by invoking the [Send Phone Message Hook](/hooks/extensibility-points/send-phone-message).

Optionally, you can [customize your SMS or Voice notification templates](/mfa/guides/customize-phone-messages).

![MFA SMS Settings](/media/articles/mfa/sms-settings.png)

## Message Delivery Method

You can choose if you want to give users the option of getting text messages, voice calls, or both.

## Twilio configuration

If you choose to deliver SMS via Twilio, follow these steps to configure your SMS factor.

1. Open an account with Twilio. You will need a [Twilio Account SID](https://www.twilio.com/help/faq/twilio-basics/what-is-an-application-sid) and a [Twilio Auth Token](https://www.twilio.com/help/faq/twilio-basics/what-is-the-auth-token-and-how-can-i-change-it). 

These are the Twilio API credentials that Auth0 will use to send an messages to the user. 

You may also need to enable permissions for your geographic region for [SMS](https://support.twilio.com/hc/en-us/articles/223181108-How-International-SMS-Permissions-work) and [Voice](https://www.twilio.com/console/voice/calls/geo-permissions).

If you use Voice, your Twilio phone number needs to be enabled to make Voice calls.

2. Configure the connection. Enter your **Twilio Account SID** and **Twilio Auth Token** in the appropriate fields.

3. Choose your **SMS Source**.

  * If you choose **Use From**, you will need to enter the **From** phone number that users will see as the sender. You may also configure this in Twilio. 

  * If you choose **Use Copilot**, you will need to enter a [Copilot SID](https://www.twilio.com/docs/api/rest/sending-messages-copilot).

  If you are using Voice, you always need to configure 'From' even if you are using 'Copilot' for SMS.

5. Click **Save**.

## Custom Phone Messaging providers

Phone Messaging providers not currently integrated with Auth0 can be supported by using the [Send Phone Message](/hooks/extensibility-points/send-phone-message) Hook. To learn how to implement this in your MFA flow, check the examples for different providers below:

* [Amazon SNS](/mfa/send-phone-message-hook-amazon-sns)
* [Twilio](/mfa/send-phone-message-hook-twilio)
* [Infobip](/mfa/send-phone-message-hook-infobip)
* [TeleSign](/mfa/send-phone-message-hook-telesign)
* [Vonage](/mfa/send-phone-message-hook-vonage)
* [Esendex](/mfa/send-phone-message-hook-esendex)
* [Mitto](/mfa/send-phone-message-hook-mitto)
:::

## Using the Management API to enable Phone as a factor



## Keep Reading

* [Enroll and Challenge SMS Authenticators using the MFA API](/mfa/guides/mfa-api/phone)
