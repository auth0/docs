---
description: How to reset your Auth0 account password
crews: crew-2
topics:
    - support
    - passwords
    - password-reset
contentType:
  - how-to
  - reference
useCase:
  - support
---

# Reset Your Auth0 Account Password

If you need to change your password or you have forgotten the password to your Auth0 account, you can use the password reset flow to set a new password.

Keep in mind the following considerations:

* If you've enabled <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn> and you need your account reset, please [contact Support](${env.DOMAIN_URL_SUPPORT}).
* If you're using a social or enterprise account to log in to Auth0, you will need to reset your password with the appropriate identity provider.
* If you are an administrator trying to reset a *user's* password, see [Change Users' Passwords](/connections/database/password-change).
* If you are an administrator trying to configure the custom Password Reset page, see [Password Reset Page](/hosted-pages/password-reset).

Reset the password for your Auth0 account using the following steps:

1. If you are already logged in to your Auth0 account, click on your username in the top right corner. Select **Logout**.

    ![Management Dashboard Logout](/media/articles/tutorials/reset-password/logout.png)

2. When you see the log in screen, click **Don't remember your password?**

    ![Management Dashboard Logout](/media/articles/tutorials/reset-password/login-screen.png)

3. Provide your email address and click the **right arrow** to submit. You will receive an email that provides further instructions on resetting your password.

    ![Management Dashboard Logout](/media/articles/tutorials/reset-password/provide-email.png)

4. If your request was successfully received, you'll be directed back to the log in screen with a message that says, "We've just sent you an email to reset your password."

    ![Management Dashboard Logout](/media/articles/tutorials/reset-password/message-sent.png)