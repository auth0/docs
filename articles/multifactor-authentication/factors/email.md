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

Using email as an MFA factor is useful when you want to provide users a way to perform MFA when they don't have their primary factor available (e.g. they don't have their phone to receive an SMS or push notification). 

You can only enable email as an MFA factor if there is already another factor enabled. Email will only be functional as a factor from <dfn data-key="universal-login">Universal Login</dfn> when you have the [New Universal Login Experience](/universal-login/new) enabled.

Once Email MFA is enabled user will be prompted to complete MFA with the other enabled factor. If they have a verified email they will be given the option to select Email, and get an one time code in their email which they can then enter to complete MFA.

Users do not need to explicitly enroll with email MFA. They will get be able to use it when they have a verified email. This happens when they completed the email verification flow, when the updated the email_verified field using the Management API, or when they logged-in with a connection that provides verified emails (e.g. Google).

Note that Email is not true <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn> as it does not represent a different factor than the password. It does not represent 'something I have' or 'something I am', but rather just another 'something I know' (the email password). It is also weaker than other factors, in that it's only as secure as the email itself (e.g. is it encrypted end-to-end?).

## End-user experience

After the login step, users will be prompted with the most secure enabled factor. If they select 'Try another method', and then pick Email, they will be sent an email with a six-digit code that they will need to enter to complete the authentication flow.

![Email End User 1](/media/articles/multifactor-authentication/mfa-email.png)

## Using the MFA API

You can explicitly enroll an email for MFA [using the MFA API](/multifactor-authentication/api/email). If users have a verified email and one or more explicitly enrolled emails, they'll be able to select which email they want to use to complete MFA when logging-in using Universal Login.

## Administrative setup

In order to set up Email, you need to enable the Email factor in the Dashboard. You will only be able to enable it if there is another factor enabled. 

![MFA Email Settings](/media/articles/multifactor-authentication/email-settings.png)

[Auth0 provides a test email provider](/email) but it only allows a limited amount of emails, so you should [configure your own email provider](/email/providers).
