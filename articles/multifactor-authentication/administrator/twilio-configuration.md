---
description: Configuring Twilio for Guardian
---

### Configuring Twilio for Guardian SMS 

When initially setting up SMS, you have up to 100 SMS to be used for testing. This limit can be removed by setting up a Twilio account. To prevent malicious login attempts, your users will always be limited to up to 10 SMS/Hour (replenishing one message an hour, up to 10).

Click on the **SMS** box to configure your SMS settings.

![](/media/articles/mfa/sms-config.png)

#### 1. Open an account with Twilio

You will need a [Twilio Account SID](https://www.twilio.com/help/faq/twilio-basics/what-is-an-application-sid) and a [Twilio Auth Token](https://www.twilio.com/help/faq/twilio-basics/what-is-the-auth-token-and-how-can-i-change-it). These are the Twilio API credentials that Auth0 will use to send an SMS to the user. You may also need to enable permissions for your [geographic region](https://support.twilio.com/hc/en-us/articles/223181108-How-International-SMS-Permissions-work).

#### 2. Configure the connection

Enter your **Twilio Account SID** and **Twilio Auth Token** in the appropriate fields.

Choose your **SMS Source**. 

* If you choose **Use From**, you will need to enter the **From** phone number that users will see as the sender of the SMS. You may also configure this in Twilio. 

* If you choose **Use Copilot **, you will need to enter a [Copilot SID](https://www.twilio.com/docs/api/rest/sending-messages-copilot).

Click **SAVE**.
