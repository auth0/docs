#### 1. Open an account with Twilio

You will need a [Twilio Account SID](https://www.twilio.com/help/faq/twilio-basics/what-is-an-application-sid) and a [Twilio Auth Token](https://www.twilio.com/help/faq/twilio-basics/what-is-the-auth-token-and-how-can-i-change-it). These are the Twilio API credentials that Auth0 will use to send an SMS to the user.

#### 2. Configure the connection

In the Dashboard, on the **SMS (Twilio)** page under [Connections > Passwordless](${uiURL}/#/connections/passwordless), enter your **Twilio Account SID** and **Auth Token**. Enter the **From** phone number that users will see as the sender of the SMS (also configurable in Twilio) and a **message**.

The `@@password@@` placeholder in the message template will be replaced with the one-time password that is sent in a text message to the user.

![](/media/articles/connections/passwordless/passwordless-sms-config.png)