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

::: note
This article will help you learn how to reset your own password. If you are an admin trying to reset a user's password, see [Change Users' Passwords](/connections/database/password-change). If you are an admin trying to configure the custom Password Reset page, see [Password Reset Page](/hosted-pages/password-reset).
:::

You can reset the password associated with your Auth0 account at any time by invoking the password reset flow.

1. If you are already logged in to your Auth0 account, click on your username in the top right corner. Select **Logout**.

    ![Management Dashboard Logout](/media/articles/tutorials/reset-password/logout.png)

2. When you see the log in screen, click **Don't remember your password?**

    ![Management Dashboard Logout](/media/articles/tutorials/reset-password/login-screen.png)

3. Provide your email address and click the **right arrow** to submit. You will receive an email that provides further instructions on resetting your password.

    ![Management Dashboard Logout](/media/articles/tutorials/reset-password/provide-email.png)

4. If your request was successfully received, you'll be directed back to the log in screen with a message that says, "We've just sent you an email to reset your password."

    ![Management Dashboard Logout](/media/articles/tutorials/reset-password/message-sent.png)

::: note
If you have enabled multi-factor authentication and you need your account reset, please [contact Support](${env.DOMAIN_URL_SUPPORT}).
:::

::: note
You can only reset your password when using a database connection. If you are using a social or enterprise connection, you will need to reset your password with the appropriate social identity provider.
:::
