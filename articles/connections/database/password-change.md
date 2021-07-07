---
description: Describes the different ways to reset the users' passwords for your Auth0 applications.
toc: true
topics:
    - connections
    - database
    - db-connections
    - passwords
contentType: how-to
useCase: customize-connections
---
# Change Users' Passwords

This topic describes different ways to reset the password for a user in your database. You can change passwords for users in your [database connections](/connections/database) only. Users signing in with [social](/connections/social) or [enterprise](/connections/enterprise) connections must reset their passwords with the identity provider (such as Google or Facebook).

There are two basic methods for changing a user's password:

- [Trigger an interactive password reset flow](#trigger-an-interactive-password-reset-flow) that sends the user a link through email. The link opens the Auth0 password reset page where the user can enter a new password.
- [Directly set the new password](#directly-set-the-new-password) using the Auth0 Management API or the Auth0 Dashboard.

::: note
Resetting a user's password makes their session expire. 
:::

:::panel Not what you're looking for?
- To configure the custom Password Reset page, read [Customize Hosted Password Reset Page](/universal-login/password-reset). 
- To implement custom behavior after a successful password change, read  [Post Change Password Hook](/hooks/extensibility-points/post-change-password).
- To reset the password to your personal Auth0 user account, read [Reset Your Auth0 Account Password](/support/reset-account-password).
:::


## Trigger an interactive password reset flow

There are two ways to trigger an interactive password reset flow, depending on your use case: through the Universal Login page or the Authentication API.

### Universal Login Page
If your application uses Universal Login, the user can use the Lock widget on the Login screen to trigger a password reset email. With the New Universal Login Experience, the user can click the **Don't remember your password?** link and then enter their email address. This fires off a POST request to Auth0 that triggers the password reset process. The user [receives a password reset email](#password-reset-emails).

### Authentication API
If your application uses an interactive password reset flow through the Authentication API, make a `POST` call. In the `email` field, provide the email address of the user who needs to change their password. If the call is successful, the user [receives a password reset email](#password-reset-emails).

If you call the API from the browser, be sure the origin URL is allowed: Go to [Auth0 Dashboard > Applications > Applications](${manage_url}/#/applications/${account.clientId}/settings) and add the URL to the `Allowed Origins (CORS)` list.

If your connection a custom database, check to see if the user exists in the database before you invoke the Authentication API for `changePassword`.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/dbconnections/change_password",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"client_id\": \"${account.clientId}\",\"email\": \"\",\"connection\": \"Username-Password-Authentication\"}"
  }
}
```

### Password reset email

Regardless of how the password reset process was triggered, the user receives email containing a link to reset their password.

![](/media/articles/connections/database/password-reset-email.png)

Clicking the link sends the user to the [password reset page](/universal-login/password-reset).

After submitting the new password, the user sees confirmation that they can now log in with their new credentials.

Notes on password resets:
- The reset password link in the email is valid for one use only. 
- If the user receives multiple password reset emails, only the password link in the most recent email is valid. 
- The `URL Lifetime` field determines how long the link is valid. From the Auth0 dashboard, you can [customize the Change Password email](/email/templates) and modify the link's [lifetime](/api/authentication/reference#change-password). 

In the [Classic Universal Login Experience](/universal-login/classic) you can [configure a url](/email/templates#configuring-the-redirect-to-url) to redirect users after completing the password reset. The URL receives a success indicator and a message. 

The [New Experience](/universal-login/new) redirects the user to the [default login route](/universal-login/default-login-url) when it succeeds, and handles the error cases as part of the Universal Login flow. This experience ignores the Redirect URL in the email template.  

::: panel Generate Password Reset Tickets

The Management API v2 provides an additional endpoint, [Generate a password reset ticket]( /api/management/v2#!/Tickets/post_password_change), that generates a URL like the one in the password reset email. You can use the generated URL when the email delivery method is not appropriate. Keep in mind that in the default flow, the email delivery verifies the identity of the user. (An impostor wouldn't have access to the email inbox.) If you use the ticket URL, your application is responsible for verifying the identity of the user in some other way.
:::

## Directly set the new password

To set a new password directly for the user without sending a password reset email, use either the [**Management API**](#using-the-management-api) or the [**Auth0 Dashboard**](#manually-set-users-passwords-using-the-dashboard).

::: note
Users do not receive notification when you change their password.
:::

### Use the Management API

If you want to implement your own password reset flow, you can directly change a user's password from a server request to the Management API: make a `PATCH` call to the [Update a User endpoint](/api/management/v2#!/Users/patch_users_by_id).

```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/users/USER_ID",
  "headers": [{
    "name": "Content-Type",
    "value": "application/json"
  }],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"password\": \"NEW_PASSWORD\",\"connection\": \"Username-Password-Authentication\"}"
  }
}
```

### Manually set users' passwords using the Auth0 Dashboard

Anyone with administrative privileges to your Auth0 tenant can manually change a user's password at [Auth0 Dashboard > User Management > Users](${manage_url}/#/users).

1. Select the name of the user whose password you want to change.
2. Locate the **Danger Zone** at the bottom of the page.
3. In the red **Change Password** box, click **CHANGE**. 
  ![](/media/articles/connections/database/dashboard-users-edit_view-details_danger-zone.png)
3. Enter the new password and click **Save**.
