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

These connections work by using an authentication channel like SMS messages, emails our Touch ID. These connections are configured in the dashboard under [Connections > Passwordless](https://manage.auth0.com/#/connections/passwordless).

![](/media/articles/connections/passwordless/passwordless-connections.png)

## Tutorials

 - [Authenticate users with a one time code via SMS](ios-sms)
 - [Authenticate users with a one time code via e-mail](ios-email)
 - [Authenticate users with Touch ID](ios-touchid)