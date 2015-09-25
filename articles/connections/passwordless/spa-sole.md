---
title: Using Passwordless Authentication on SPA
connection: SMS, Email
image:
alias:
  - sms
  - email
  - spa
  - single-page-app
---

# Passwordless Authentication

Passwordless connections in Auth0 allow users to login without the need of a password. This can vastly improve the user experience because users only need their email address or phone number when they register for your application. In addition, they don't need to remember any password (no more reset/forgot password or using the same password everywhere).

And this also means that the email address or phone number used for authentication is automatically validated because they just used it to sign up and authenticate.

## Configuration

These connections work by using an authentication channel like SMS messages or emails. These connections are configured in the dashboard under [Connections > Passwordless](${uiURL}/#/connections/passwordless).

![](/media/articles/connections/passwordless/passwordless-connections.png)

## Tutorials

 - [Authenticate users with a one time code via SMS](spa-sms)
 - [Authenticate users with a one time code via e-mail](spa-email)