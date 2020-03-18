---
description: Learn how to reset your Auth0 account password.
crews: crew-2
topics:
    - support
    - passwords
    - password-reset
contentType: how-to
useCase:
  - support
  - reset-passwrod
---

# Reset Auth0 Account Password

If you need to change your password or you have forgotten the password to your Auth0 account, in most cases, you can set a new password from the Auth0 Dashboard. Password resets cause Auth0 sessions to expire. 

1. On the Auth0 account login screen, click **Don't remember your password?**

2. Provide your email address, and click the **right arrow** to submit. You will receive an email that provides further instructions on resetting your password.

3. If your request was successfully received, you'll be directed back to the login screen with a message that says, "We've just sent you an email to reset your password."

## Special password reset circumstances

- If you've enabled <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn> and you need your password reset, you need to contact [Auth0 Support](${env.DOMAIN_URL_SUPPORT}).
- If you're using a social or enterprise account to log in to Auth0, you will need to reset your password with the appropriate identity provider.
- If you are an administrator trying to reset a *user's* password, see [Change Users' Passwords](/connections/database/password-change).

## Keep reading

* [Customize Hosted Password Reset Page](/universal-login/password-reset)
