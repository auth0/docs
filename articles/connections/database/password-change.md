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

::: note
If you are trying to configure the custom Password Reset page for your tenant, see [Customize Hosted Password Reset Page](/universal-login/password-reset). If you are a user of Auth0 and are trying to reset the password to your Auth0 account, see [Reset Your Auth0 Account Password](/support/reset-account-password).
:::

There are two basic methods of changing a password:

- an [interactive password reset flow](#trigger-an-interactive-password-reset-flow) where the user receives an email with a link that opens the Auth0 password reset page to enter the new password.
- [directly setting the new password](#directly-set-the-new-password) either using the Management API v2 or the Dashboard.

Password resets cause Auth0 sessions to expire. 

::: note
You can only change passwords for users signing in using database connections. Users signing in using social or enterprise connections need to reset their passwords with the relevant identity provider.
:::

You can use the [Post Change Password Hook](/hooks/extensibility-points/post-change-password) to implement custom actions after a successful password change.

## Trigger an interactive password reset flow

An interactive password reset flow can be triggered in three ways, depending on your use case:

- [**Universal Login Page**](#use-universal-login): If your app uses Universal Login, the user uses the Lock widget on the Login screen to trigger a password reset email.
- [**Authentication API**](#use-the-authentication-api): Send a `POST` call to the Authentication API to send a password reset email to the user.

### Use Universal Login

If your application is using Universal Login, the user will be able to trigger a password reset from the login page. With the New Universal Login Experience, the user will click the **Don't remember your password?** link and then enter their email address.

This will fire off a POST request to Auth0 that will trigger the password reset process. Once the password reset has been triggered, the user will now [receive a password reset email](#password-reset-emails).

### Use the Authentication API

If your application uses an interactive password reset flow using the Authentication API, make a `POST` call specifying the email address of the user account whose password you would like to reset in the `email` field. If the call is successful, the user will receive an email prompting them to change their password.

::: note
If you're calling this from the browser, don't forget to add your URL to the `Allowed Web Origins` list in the [Dashboard](${manage_url}/#/applications/${account.clientId}/settings).
:::

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

:::panel-warning Custom Database
If your Connection is a custom database and the user exists in the database, invoke the Authentication API for `changePassword`.
:::

Once the password reset has been triggered, the user will now [receive a password reset email](#password-reset-emails).

## Password reset emails

Regardless of how the password reset process was triggered, the user receives an email containing a link to reset their password.

![](/media/articles/connections/database/password-reset-email.png)

Clicking the link will send the user to the [password reset page](/universal-login/password-reset).

After submitting the new password, confirmation that the user will be able to login with their new credentials appears:

::: note
The reset password link in the email is valid for one use only, and it must be used before the time specified in the `URL Lifetime` field elapses. You can modify the `URL Lifetime` field in the Dashboard where you customize the Change Password email. See the [Change User Password for DB Connections](/api/authentication/reference#change-password) Authentication API endpoint for more information.

If multiple password resets emails are requested, only the password link in the most recent email will be valid.
:::

:::panel Customize Change Password Emails

You can change the content of the Change Password emails in the [Emails > Templates](${manage_url}/#/emails) section of the Dashboard. Select the **Change Password** template to edit the email fields.

Email templates can only be changed for those *not* using Auth0's built-in email provider. For more information, please see: [Customizing Your Emails](/email/templates).
:::

::: panel Generate Password Reset Tickets

The Management API v2 provides an additional endpoint, [Generate a password reset ticket]( /api/management/v2#!/Tickets/post_password_change), which will generate a URL similar to the one that users receive in the password reset email message. You can use the generated URL if the email delivery method is not appropriate. Keep in mind that in the default flow the email delivery is used as a way to verify the identity of the user (an impostor wouldn't have access to the email inbox), so if you use the ticket URL, the application is responsible for verifying the identity of the user in some other way.

:::

In the [Classic Universal Login Experience](/universal-login/classic) you can [configure a url](/email/templates#configuring-the-redirect-to-url) to redirect users after completing the password reset. The URL will receive a success indicator and a message. The [New Experience](/universal-login/new) will redirect the users to the [default login route](/universal-login/default-login-url) when it succeeds, and will handle the error cases as part of the Universal Login flow. The Redirect URL in the email template will be ignored.  

## Directly set the new password

There are also two ways of directly setting a new password for the user rather than sending a password reset email:

- [**Management API**](#using-the-management-api): Send a `PATCH` call to the Management API to update the user's password manually.
- [**Dashboard**](#manually-set-users-passwords-using-the-dashboard): Use the [Users](${manage_url}/#/users) section of the Dashboard to manually change the user's password.

### Use the Management API

If you want to implement your own password reset flow, you can directly change a user's password from a server request to the Management API. To reset a user's password using the Management API, make a `PATCH` call to the [Update a User endpoint](/api/management/v2#!/Users/patch_users_by_id).

::: warning
Users will not receive notification that their password has been manually changed.
:::

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

### Manually set users' passwords using the Dashboard

::: warning
Users will not receive notification that their password has been manually changed.
:::

Anyone with administrative privileges to your Auth0 tenant can manually change a user's password in the [Users](${manage_url}/#/users) section of the Dashboard.

1. Click on the username to select the user for whom you want to change the password. 
1. Scroll down to the bottom of the user page, then click on the red **CHANGE** button in the red **Change Password** box. 
  ![](/media/articles/connections/database/manual-password-reset.png)
1. Enter the new password, and click **Save**.
