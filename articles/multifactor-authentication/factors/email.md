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

Enabling MFA with Email is useful when you want to give users a fallback MFA factor for when they do not have access to their normal MFA method (e.g. they don't have their mobile device, or their device does not have connectivity). As it is designed to be used as a fallback method, **Email cannot be the only enabled factor**.

When enabled, users with verified emails will get the option to get a one-time password code in their email to complete the MFA flow.

Note that Email is not true 'Multi-factor Authentication' as it does not represent a different factor. It does not represent 'something I have' or 'something I am', but rather just another 'something I know' (the email password). It is also weaker than other factors, in that it's only as secure as the email itself (e.g. is it encrypted end-to-end?).

## End-user experience

After the login step, users will be presented with the most secure enabled factor. If they select 'Other login options', and then pick Email, they will be sent an email with a six-digit code that they will need to enter to complete the authentication flow.

![Email End User 1](/media/articles/multifactor-authentication/mfa-email.png)

## Administrative setup

In order to set up Email, you will need to have another factor enabled, and enable the Email factor in the Dashboard.

![MFA Email Settings](/media/articles/multifactor-authentication/email-settings.png)

[Auth0 provides a test email provider](/email) but it only allows a limited amount of emails, so you should [configure your own mail server](/email/providers).
