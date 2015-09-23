---
title: Using Passwordless Authentication on iOS
connection: SMS, Email & iOS Touch ID
image:
alias:
  - sms
  - email
  - ios-touchid
  - ios
---

# Passwordless Authentication

Passwordless connections in Auth0 allow users to login without the need of a password. This can vastly improve the user experience (especially on mobile applications) because users only need their email address, phone number or fingerprint when they register for your application. In addition to that they don't need to remember any password (no more reset/forgot password or using the same password everywhere).

And this also means that the email address or phone number used for authentication is automatically validated because they just used it to sign up and authenticate.

## Configuration

These connections work by using an authentication channel like SMS messages, emails our Touch ID. These connections are configured in the dashboard under [Connections > Passwordless](https://manage.auth0.com/#/connections/passwordless):

![](/media/articles/connections/passwordless/passwordless-connections.png)

## Authenticate users with a one time code via SMS

With the SMS connection users are requested to enter their phone number. After entering their phone number, Auth0 will use [Twilio](http://www.twilio.com) to send a verification code to the user (One Time Password). 

After entering the OTP in your application, the user will be created in the `sms` connection and authenticated. 

![](/media/articles/connections/passwordless/passwordless-create-user-flow.png)

If the user already exists, we will just authenticate the user:

![](/media/articles/connections/passwordless/passwordless-authenticated-flow.png)

On mobile platform authentication means your application will receive an `id_token`, the user profile and optionally also a `refresh_token`.

### Setup

#### 1. Open an account with Twilio

You will need a [Twilio Account SID](https://www.twilio.com/help/faq/twilio-basics/what-is-an-application-sid) and a [Twilio Auth Token](https://www.twilio.com/help/faq/twilio-basics/what-is-the-auth-token-and-how-can-i-change-it). These are the Twilio API credentials that Auth0 will use to send an SMS to the user.

#### 2. Configure the connection

On the **SMS (Twilio)** page on Auth0, enter your **Twilio Account SID** and **Auth Token**. Enter the **From** phone number users will see as the sender of the SMS (also configurable in Twilio) and a **message**.

The `@@password@@` placeholder in the message template will be replaced with the one-time password that is sent in a text message to the user.

![](/media/articles/connections/passwordless/passwordless-sms-config.png)

### Implementation

#### Using the Auth0 Lock

#### Using your own UI
