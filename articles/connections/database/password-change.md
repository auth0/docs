---
description: This document explains the ways that passwords can be reset for users of your Auth0 application.
---

# Changing a User's Password

:::panel-warning Notice
This information applies to using *Change Password flow v2*.
If you are using the old Change Password flow, or Lock version 8, make sure to check the notice panels like this one, since they are used to point out the differences in the flows.

If you don't know which version you are using, navigate to [Dashboard > Account Settings > Advanced](${uiURL}/#/account/advanced) and check if the *Change Password flow v2* toggle is on. If so, you should use Lock version 9 to cater to the new flow. If not, you can use older versions of Lock to trigger the old Change Password flow, although this is not recommended. We strongly encourage you to enable *Change Password flow v2* and upgrade to Lock version 9 and above. 

To learn more about migrating Lock, see: [Vulnerable Password Flow.](/migrations#vulnerable-password-flow)
:::

Auth0 provides the following ways to change the password for users of your application:
+ via API: Send a password reset email to a user using the API.
+ via Lock: Trigger a password reset email to the user through the Lock login screen.
+ via Dashboard: An admin can manually change a user's password in the [Users](${uiURL}/#/users) section of the dashboard.

**NOTE:** Passwords can only be changed for users signing in using database connections. If a user is signing in with a social or enterprise connection, their password would need to be reset in those systems.


## Using the API

When calling the API, specify the email address of the account you want to reset the password for in the `email` field. A successful result of this request will send an email to the specified user for a password change request.

```har
{
  "method": "POST",
  "url": "https://YOURACCOUNT.auth0.com/dbconnections/change_password",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "client_id": "${account.clientId}",
    "email": "",
    "connection": "Username-Password-Authentication"
  }
}
```

:::panel-warning Custom database
If you have a custom database setup for your connection, you should first check if the user exists there. If so, invoke the API for `changePassword`.
:::

The resulting email will contain a link to reset the password.

![](/media/articles/connections/database/reset-password-email.png)

Clicking the link will send the user to a password reset page.

![](/media/articles/connections/database/reset-password.png)

**NOTE**: This email link is valid only once, and only for the amount of time specified in the `URL Lifetime` field. This field can be changed in the dashboard where you customize the change password email.

See the [/dbconnections/change_password](/auth-api#!#post--dbconnections-change_password) API endpoint for more information. 


## Using Lock

A user can change the password using the Lock login screen.

A user would click on the *Don't remember your password?* link on the Lock login screen:

![](/media/articles/connections/database/lock_v9/lock_login_page.png)

Then enter their email address:

![](/media/articles/connections/database/lock_v9/lock_request_reset.png)

:::panel-warning Notice
If you are using Lock version 8, after clicking the *Don't remember your password?* link on the Lock login screen, the user will be asked to enter their new password in addition to their email. They will then have to confirm this action via email. 

However, this flow is not considered safe. We recommend that you upgrade to Lock 9 or later as soon as possible. 
To learn more about migrating Lock, see [Vulnerable Password Flow](/migrations#vulnerable-password-flow).
:::

The resulting email will contain a link to reset the password:

![](/media/articles/connections/database/lock_v9/lock_reset_pass_email.png)

Clicking the link will send the user to a password reset page where they can enter their new password:

![](/media/articles/connections/database/lock_v9/lock_set_new_pass.png)

After submitting the new password, the user will be able to login with their new credentials:

![](/media/articles/connections/database/lock_v9/lock_pass_changed.png)


## Manually setting a user's password

::: panel-danger Notice
Changing a user's password in this manner does not alert them to the password change.
:::

A user's password can be changed manually in the [Users](${uiURL}/#/users) section of the dashboard.

Click on the name of the user you want to change the password for. Then click on the **Actions** button on the right side of the page, and select **Change Password**:

![](/media/articles/connections/database/manual-password-change.png)

Enter the new password and click **Save**.


## Customizing the change password email

You can change the content of the password change request emails in the  [Emails > Templates](${uiURL}/#/emails) section of the dashboard. Select the **Change Password Confirmation** tab to edit the email fields:

![](/media/articles/connections/database/change-password-email.png)

**NOTE**: Email templates can only be changed after changing the email provider from Auth0's built-in provider. For more information, see: [Customizing Your Emails](/email/templates).