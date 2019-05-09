---
title: MFA - Email
description: Using Email as an MFA Factor
toc: true
topics:
    - mfa
contentType:
  - index
---
# MFA with Email

Using email as an MFA factor is useful when you want to provide users a way to perform MFA when they don't have a mobile device.

Once Email is enabled as an MFA factor:

- Users with verified emails will get the option of getting a code in their email to complete the MFA challenge.
- Users from Database Connections without verified emails will get prompted to verify their emails.
- Users from social / enterprise connections that don't provide verified emails, will not be able to use MFA with email. If Email MFA is the ONLY enabled factor, they will get an error when logging-in, and they will not be able to complete the login flow. You should not enable Email MFA as the only factor if you have social/enterprise connections that don't provide verified emails.
- Users will never get the option to enroll with email through Universal Login. If there are other factors enabled, they'll get prompted to enroll one of the other factors. If email is the only enabled factor, they'll receive an code in their email, and they'll need to enter it to continue.

Note that Email is not true 'Multi-factor Authentication' as it does not represent a different factor than the password. It does not represent 'something I have' or 'something I am', but rather just another 'something I know' (the email password). It is also weaker than other factors, in that it's only as secure as the email itself (e.g. is it encrypted end-to-end?).

## End-user experience

After the login step, users will be presented with the most secure enabled factor. If they select 'Other login options', and then pick Email, they will be sent an email with a six-digit code that they will need to enter to complete the authentication flow.

![Email End User 1](/media/articles/multifactor-authentication/mfa-email.png)

After Email MFA is enabled, all new or existing users from Database Connections that do not have verified emails will get prompted to verify their emails after they log in. They will get a code in their email they'll need to enter in the login page to continue.

## Using the MFA API

You can explicitly enroll an email for MFA [using the MFA API](/multifactor-authentication/api/email). If users have a verified email and one or more explicitly enrolled emails, they'll be able to select which email they want to use to complete MFA when logging-in using Universal Login.

## Administrative setup

In order to set up Email, you need to enable the Email factor in the Dashboard.

![MFA Email Settings](/media/articles/multifactor-authentication/email-settings.png)

[Auth0 provides a test email provider](/email) but it only allows a limited amount of emails, so you should [configure your own email provider](/email/providers).
