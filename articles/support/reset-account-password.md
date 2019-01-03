---
title: How to Reset Auth0 Account Passwords
description: How to reset Auth0 account passwords for users of the Auth0 service. Specifically, helps Auth0 users reset their password to regain access to the Auth0 Dashboard.
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

# How to Reset Auth0 Account Passwords

::: note
If you are an Auth0 user, this article will help you learn how to reset your own Auth0 password. If you are an end user trying to log in through a login screen, contact support for the provider through which you are attempting to log in. If you are an admin trying to reset a user's password, see [Change Users' Passwords](/connections/database/password-change). If you are an admin trying to configure the custom Password Reset page, see [Password Reset Page](/hosted-pages/password-reset).
:::

You can reset the password associated with your Auth0 account at any time by invoking the password reset flow.

1. If you are already logged in to your Auth0 account, click on your username in the top right corner. Select **Logout**.

    ![Management Dashboard Logout](/media/articles/tutorials/reset-password/logout.png)

2. When you see the log in screen, click **Don't remember your password?**

    ![Login Screen](/media/articles/tutorials/reset-password/login-screen.png)

3. Provide your email address and click the **right arrow** to submit. You will receive an email that provides further instructions on resetting your password.

    ![Provide Email](/media/articles/tutorials/reset-password/provide-email.png)

4. If your request was successfully received, you'll be directed back to the log in screen with a message that says, "We've just sent you an email to reset your password."

    ![Message Sent](/media/articles/tutorials/reset-password/message-sent.png)

::: note
If you have enabled multi-factor authentication and you need your account reset, please [contact Support](${env.DOMAIN_URL_SUPPORT}).
:::

::: note
You can only reset your password when using a database connection. If you are using a social or enterprise connection, you will need to reset your password with the appropriate social identity provider.
:::
