---
title: Configure SMS and Voice Notifications for MFA
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

::: warning
- Using Voice as an MFA factor is currently a Beta feature. It should not be used in production environments.
- Voice as an MFA factor is not available when using the [Classic Universal Login Experience](/universal-login/classic).
::: 

## End user experience - Voice and SMS

When Voice and SMS are enabled, users are given the option to enroll by getting the code sent by SMS or Voice:

![Voice and SMS - End User](/media/articles/mfa/mfa-sms-voice.png)

When only SMS is enabled, the flow is simpler:

![SMS - End User](/media/articles/mfa/mfa-sms.png)

After users are enrolled, the next time they authenticate they will get the Voice or SMS message in their registered phone. 

## Administrative setup

![MFA Phone Message Settings](/media/articles/mfa/mfa-phone-settings.png)

### Message Delivery Provider and Method

To allow users to authenticate with SMS or Voice, you must enable the Phone factor and select your preferred delivery method:

* **Auth0**: Sends the messages using Auth0's internally-configured SMS delivery provider. It can be used for evaluation and testing purposes, and there is a maximum of 100 messages per tenant during the entire tenant lifetime. New codes are not received after reaching the 100 message limit. You can't use this provider to send Voice messages.

* **Twilio**: Sends the messages using the [Twilio Programmable SMS API](https://www.twilio.com/sms) for SMS or [Twilio Programmable Voice API](https://www.twilio.com/voice) for Voice. You will need to provide [your own Twilio credentials](#twilio-configuration). Make sure you use Twilio  **Live Credentials**, not the **Test Credentials**. The test credentials are not meant to be used to send messages in a production environment.

* **Custom**: Sends the messages by invoking the [Send Phone Message Hook](/hooks/extensibility-points/send-phone-message).

You can also choose if you want to give users the option of getting text messages, voice calls, or both.

### Twilio configuration

If you choose to deliver SMS via Twilio, follow these steps to configure your SMS factor.

![MFA Phone Settings](/media/articles/mfa/mfa-phone-twilio.png)

1. Open an account with Twilio. You will need a [Twilio Account SID](https://www.twilio.com/help/faq/twilio-basics/what-is-an-application-sid) and a [Twilio Auth Token](https://www.twilio.com/help/faq/twilio-basics/what-is-the-auth-token-and-how-can-i-change-it). These are the Twilio API credentials that Auth0 will use to send messages to your users.

  You may also need to enable permissions for your geographic region for [SMS](https://support.twilio.com/hc/en-us/articles/223181108-How-International-SMS-Permissions-work) and [Voice](https://www.twilio.com/console/voice/calls/geo-permissions). If you use Voice, your account needs to have a Twilio phone number enabled to make Voice calls. This can be an external phone number [verified with Twilio](https://support.twilio.com/hc/en-us/articles/223180048-Adding-a-Verified-Phone-Number-or-Caller-ID-with-Twilio) or you can purchase and set up a Twilio Phone Number from within your account.

2. Configure the connection. Enter your **Twilio Account SID** and **Twilio Auth Token** in the appropriate fields.

3. Choose your **SMS Source**.

  * If you choose **Use From**, you will need to enter the **From** phone number that users will see as the sender. You may also configure this in Twilio. 

  * If you choose **Use Messaging Services**, you will need to enter a [Messaging Service SID](https://www.twilio.com/docs/sms/services/services-send-messages).

  If you are using Voice, you always need to configure 'From' even if you are using 'Messaging Services' for SMS. Make sure the phone number is configured to send both SMS and Voice messages.

5. Click **Save**.

### Custom Phone Messaging providers

Phone Messaging providers not currently integrated with Auth0 can be implemented by using the [Send Phone Message](/hooks/extensibility-points/send-phone-message) Hook. To learn how to do this in your MFA flow, check the examples for different providers below:

* [Amazon SNS](/mfa/send-phone-message-hook-amazon-sns)
* [Twilio](/mfa/send-phone-message-hook-twilio)
* [Infobip](/mfa/send-phone-message-hook-infobip)
* [TeleSign](/mfa/send-phone-message-hook-telesign)
* [Vonage](/mfa/send-phone-message-hook-vonage)
* [Esendex](/mfa/send-phone-message-hook-esendex)
* [Mitto](/mfa/send-phone-message-hook-mitto)

## Custom SMS or Voice Notification Templates

Optionally, you can [customize your SMS or Voice notification templates](/mfa/guides/customize-phone-messages).

## Using the Management API to configure Voice or SMS

You can use the Management API to configure which Message Delivery Methods are enabled by using the `/api/v2/guardian/factors/phone/message-types` endpoint. 

The `messages_types` parameter is an array that can have `["sms"]`, `["voice"]`, or `["sms", "voice"]`. You need a [Management API Token](/api/management/v2/tokens) with the `update:guardian_factors` scope as a Bearer Token to call the API:

 ```har
  {
      "method": "PUT",
      "url": "https://${account.namespace}/api/v2/guardian/factors/phone/message-types",
      "headers": [
        { "name": "Content-Type", "value": "application/json" },
   	    { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
      ],
      "postData": {
          "mimeType": "application/json",
          "text": "{ \"message_types\": [\"sms\", \"voice\"] }"
      }
  }
```

## Security Considerations

When using any phone messaging provider, you need to be aware that attackers abusing the signup flow could cause you financial damage.

Auth0 will limit a single user to sending up to 10 SMS or voice messages per hour. To further protect your account, you can consider:

- Enabling [Brute Force Protection](/anomaly-detection/references/brute-force-protection-triggers-actions#100-failed-login-attempts-or-50-sign-up-attempts). Auth0 will block an IP if it attempts to do more than 50 signup requests per minute.

- Enable [Log Streaming](/logs/streams) and create alerts using your favorite monitoring tool, when you see spikes in the number of `gd_send_voice` or `gd_send_voice_failure` [log events](/logs/references/log-event-type-codes).

Phone Messaging providers have additional protections. If you are using Twilio, make sure you read the [Anti-Fraud Developer Guide](https://www.twilio.com/docs/usage/anti-fraud-developer-guide). We recommend that you consider the following options:

- Limit the countries that you will send messages for [SMS](https://support.twilio.com/hc/en-us/articles/223181108-How-International-SMS-Permissions-work) and [Voice](https://support.twilio.com/hc/en-us/articles/223180228-International-Voice-Dialing-Geographic-Permissions-Geo-Permissions-and-How-They-Work). This is particularly useful if there are countries with a higher risk of [toll fraud](https://www.twilio.com/learn/voice-and-video/toll-fraud) or more expensive calling rates in which you do not typically do business.

- Enable Twilio [usage triggers](https://support.twilio.com/hc/en-us/articles/223132387-Protect-your-Twilio-project-from-Fraud-with-Usage-Triggers) to protect your account against fraud and coding mistakes.

## Keep Reading

* [Enroll and Challenge SMS and Voice Authenticators using the MFA API](/mfa/guides/mfa-api/phone)
