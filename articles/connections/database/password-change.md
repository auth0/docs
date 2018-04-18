---
title: Changing a User's Password
description: This document explains the ways you can reset the passwords for users of your Auth0 applications.
crews: crew-2
---
# Changing a User's Password

:::panel-warning Notice
This information applies to those using **Change Password flow v2**. If you are using the old **Change Password flow** or Lock 8, check the notice panels like this one for information on differences between the two flows.

To determine the flow you are using, navigate to [Dashboard > Tenant Settings > Advanced](${manage_url}/#/tenant/advanced) to check if the **Change Password flow v2** toggle is enabled. If it is, use Lock 9+. If not, use an older version of Lock to trigger the old Change Password flow.

We strongly encourage you to enable **Change Password flow v2** and use the latest version of Lock. To learn more about the vulnerability and migration, please see [Vulnerable Password Flow](/migrations/past-migrations#vulnerable-password-flow). To learn more about migrating to Lock 11, please take a look at the [Lock 11 Migration Guide](/libraries/lock/v11/migration-guide).
:::

You can change your users' passwords using one of the following methods.

+ [**Authentication API**](#using-the-authentication-api): Send a `POST` call to the Authentication API to send a password reset email to the user.
+ [**Management API**](#using-the-management-api): Send a `PATCH` call to the Management API to update the user's password manually.
+ [**Lock**](#using-lock): Use the Lock login screen to trigger a password reset email to the user.
+ [**Dashboard**](#manually-setting-a-user-s-password): Use the [Users](${manage_url}/#/users) section of the Dashboard to manually change the user's password.

::: note
You can only change passwords for users signing in using Database connections. Users signing in using Social or Enterprise connections need to reset their passwords with the appropriate system.
:::

## Using the Authentication API

To reset a user's password using the Authentication API, make a `POST` call specifying the email address of the user account whose password you would like to reset in the `email` field. If the call is successful, the user will receive an email prompting them to change their password.

::: note
If you're calling this from the browser, don't forget to add your URL to the the `Allowed Web Origins` list in the [Dashboard](${manage_url}/#/applications/${account.clientId}/settings).
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
If you have a custom database set up for your Connection and the user exists in the database, invoke the Authentication API for `changePassword`.
:::

If the `POST` call is successful, the user will receive an email containing a link to reset their password.

![](/media/articles/connections/database/reset-password-email.png)

Clicking the link will send the user to a password reset page.

![](/media/articles/connections/database/reset-password.png)

::: note
The reset password link in the email is valid for one use only, and it must be used before the time specified in the `URL Lifetime` field elapses. The `URL Lifetime` field can be modified in the Dashboard where you customize the Change Password email.
:::

Please see the [Change User Password for DB Connections](/api/authentication/reference#change-password) Authentication API endpoint for more information.

## Using the Management API

To reset a user's password using the Management API, make a `PATCH` call to the [Update a User endpoint](/api/management/v2#!/Users/patch_users_by_id).

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

## Using Lock

Users can change their passwords using the Lock screen.

To begin the password change process, the user would click on the **Don't remember your password?** link on the Lock screen:

![](/media/articles/connections/database/lock_v9/lock_login_page.png)

They would then enter their email address:

![](/media/articles/connections/database/lock_v9/lock_request_reset.png)

:::panel-warning Notice
If you are using Lock version 8, the user will be asked, immediately after clicking the **Don't remember your password?** link on the Lock screen, to provide their email address and their new password. The user would then confirm this action via email.

However, this flow is not considered safe. We recommend that you upgrade to Lock 9 or later to utilize a more secure flow. To learn more about migrating Lock, see [Vulnerable Password Flow](/migrations/past-migrations#vulnerable-password-flow).
:::

The user will then receive an email containing a link to reset the password:

![](/media/articles/connections/database/lock_v9/lock_reset_pass_email.png)

Clicking the link will send the user to a password reset page where they can enter their new password:

![](/media/articles/connections/database/lock_v9/lock_set_new_pass.png)

After submitting the new password, the user will be able to login with their new credentials:

![](/media/articles/connections/database/lock_v9/lock_pass_changed.png)

## Manually Setting a User's Password

::: warning
Users will not receive notification that their password has been manually changed.
:::

You, or anyone with administrative privileges to your Auth0 tenant, can manually change a user's password in the [Users](${manage_url}/#/users) section of the Dashboard.

Click on the name of the user for whom you want to change the password. Then, click on the **Actions** button on the right side of the page, and select **Change Password**.

![](/media/articles/connections/database/manual-password-change.png)

Enter the new password and click **Save**.


## Customizing the Change Password Email

You can change the content of the Change Password emails in the  [Emails > Templates](${manage_url}/#/emails) section of the Dashboard. Select the **Change Password** template to edit the email fields:

![](/media/articles/connections/database/change-password-email.png)

::: note
Email templates can only be changed for those *not* using Auth0's built-in email provider. For more information, please see: [Customizing Your Emails](/email/templates).
:::
