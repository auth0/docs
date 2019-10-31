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
This article will help you learn how to reset a user's password. If you are trying to configure the custom Password Reset page, see [Password Reset Page](/hosted-pages/password-reset). If you are a user trying to reset your own password, see [Reset Your Auth0 Account Password](/support/reset-account-password).
:::


:::panel-warning Notice
This information applies to those using **Change Password flow v2**. If you are using the old **Change Password flow** or <dfn data-key="lock">Lock</dfn> 8, check the notice panels like this one for information on differences between the two flows.

To determine the flow you are using, navigate to [Dashboard > Tenant Settings > Advanced](${manage_url}/#/tenant/advanced) to check if the **Change Password flow v2** toggle is enabled. If it is, use Lock 9+. If not, use an older version of Lock to trigger the old Change Password flow.

We strongly encourage you to enable **Change Password flow v2**. To learn more about the vulnerability and migration, please see [Vulnerable Password Flow](/migrations/past-migrations#vulnerable-password-flow). To learn more about migrating to Lock 11, please take a look at the [Lock 11 Migration Guide](/libraries/lock/v11/migration-guide).
:::

There are two basic methods of changing a password:
- an [interactive password reset flow](#trigger-an-interactive-password-reset-flow) where the user receives an email with a link that opens an Auth0 hosted page to enter the new password.
- [directly setting the new password](#directly-set-the-new-password) either using the Management API v2 or the Dashboard.

::: note
You can only change passwords for users signing in using database connections. Users signing in using social or enterprise connections need to reset their passwords with the appropriate system.
:::

## Trigger an interactive password reset flow

An interactive password reset flow can be triggered in two ways:

+ [**Authentication API**](#use-the-authentication-api): Send a `POST` call to the Authentication API to send a password reset email to the user.
+ [**Lock**](#use-lock): The user uses the Lock login screen to trigger a password reset email.

### Use the Authentication API

To start an interactive password reset flow using the Authentication API, make a `POST` call specifying the email address of the user account whose password you would like to reset in the `email` field. If the call is successful, the user will receive an email prompting them to change their password.

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

If the `POST` call is successful, the user receives an email containing a link to reset their password.

![](/media/articles/connections/database/reset-password-email.png)

Clicking the link will send the user to the customizable [hosted password reset page](/hosted-pages/password-reset).

![](/media/articles/connections/database/reset-password.png)

After submitting the new password, confirmation that the user will be able to login with their new credentials appears:

![](/media/articles/connections/database/lock_v9/lock_pass_changed.png)


::: note
The reset password link in the email is valid for one use only, and it must be used before the time specified in the `URL Lifetime` field elapses. You can modify the `URL Lifetime` field in the Dashboard where you customize the Change Password email. See the [Change User Password for DB Connections](/api/authentication/reference#change-password) Authentication API endpoint for more information.

If multiple password resets emails are requested, only the password link in the most recent email will be valid.
:::

:::panel Customize Change Password Emails

You can change the content of the Change Password emails in the [Emails > Templates](${manage_url}/#/emails) section of the Dashboard. Select the **Change Password** template to edit the email fields:

![](/media/articles/connections/database/change-password-email.png)

Email templates can only be changed for those *not* using Auth0's built-in email provider. For more information, please see: [Customizing Your Emails](/email/templates).
:::

::: panel Generate Password Reset Tickets

The Management API v2 provides an additional endpoint, [Generate a password reset ticket]( /api/management/v2#!/Tickets/post_password_change), which will generate a URL similar to the one that users receive in the password reset email message. You can use the generated URL if the email delivery method is not appropriate. Keep in mind that in the default flow the email delivery is used as a way to verify the identity of the user (an impostor wouldn't have access to the email inbox), so if you use the ticket URL, the application is responsible for verifying the identity of the user in some other way.

:::

### Use Lock

Users can start the password reset flow on their own by using the Lock widget.

1. The user clicks on the **Don't remember your password?** link on the Lock screen:

![](/media/articles/connections/database/lock_v9/lock_login_page.png)

2. The user enters their email address:

![](/media/articles/connections/database/lock_v9/lock_request_reset.png)

:::panel-warning Notice
If you are using Lock version 8, the user will be asked, immediately after clicking the **Don't remember your password?** link on the Lock screen, to provide their email address and their new password. The user would then confirm this action via email.

However, this flow is not considered safe. We recommend that you upgrade to Lock 9 or later to utilize a more secure flow. To learn more about migrating to Lock, see [Vulnerable Password Flow](/migrations/past-migrations#vulnerable-password-flow).
:::

The user will receive an email containing a link to reset the password, and the flow continues exactly as if the [Authentication API method](#use-the-authentication-api) was used.

## Directly set the new password

There are two ways of directly setting a new password for the user:

+ [**Management API**](#using-the-management-api): Send a `PATCH` call to the Management API to update the user's password manually.
+ [**Dashboard**](#manually-set-users-passwords-using-the-dashboard): Use the [Users](${manage_url}/#/users) section of the Dashboard to manually change the user's password.

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

### Manually Set Users' Passwords using the Dashboard

::: warning
Users will not receive notification that their password has been manually changed.
:::

Anyone with administrative privileges to your Auth0 tenant can manually change a user's password in the [Users](${manage_url}/#/users) section of the Dashboard.

1. Click on the username to select the user for whom you want to change the password. 

2. Click on the **Actions** button on the right side of the page, and select **Change Password**.

![](/media/articles/connections/database/manual-password-change.png)

3. Enter the new password, and click **Save**.

## Change Password Expiration Settings using Rules

You can use a [rule](/rules) to check for a password expiration period.

1. Go to [Dashboard > Rules](${manage_url}/#/rules).
2. Click **+ Create Rule**.
3. Click the template **Check Last Password Reset**.
4. Modify the script according to your requirements, and click **Save**.
