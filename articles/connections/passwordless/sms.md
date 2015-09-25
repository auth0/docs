---
title: SMS Setup for Passwordless Authentication
connection: SMS
url: /connections/passwordless/sms
image:
alias:
  - sms
---

## Passwordless with SMS and Twilio

The SMS Passwordless connection uses [Twilio](http://www.twilio.com) to send the SMSs. So there is an initial setup you need to perform first before being able to use this connection.

### Setup

#### 1. Open an account with Twilio

You will need a [Twilio Account SID](https://www.twilio.com/help/faq/twilio-basics/what-is-an-application-sid) and a [Twilio Auth Token](https://www.twilio.com/help/faq/twilio-basics/what-is-the-auth-token-and-how-can-i-change-it). These are the Twilio API credentials that Auth0 will use to send an SMS to the user.

#### 2. Configure the connection

Passwordless connections can be configured in the Auth0 dashboard, under [Connections > Passwordless](https://manage.auth0.com/#/connections/passwordless).

On the **SMS (Twilio)** page on Auth0, enter your **Twilio Account SID** and **Auth Token**. Enter the **From** phone number users will see as the sender of the SMS (also configurable in Twilio) and a **message**.

The `@@password@@` placeholder in the message template will be replaced with the one-time password that is sent in a text message to the user.

