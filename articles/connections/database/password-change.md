# Changing a User's Password

This document explains the various ways passwords can be reset for users of your application.

:::panel-warning Notice
This information applies to using *Change Password flow v2*.
If you are using the old Change Password flow, or Lock version 8, make sure to check the notice panels like this one, since they are used to point out the differences in the flows.

Don't know which version you are using? 
Navigate to [Dashboard > Account Settings > Advanced](https://manage.auth0.com/#/account/advanced) and check whether the *Change Password flow v2* toggle is on. If it is, then you should use Lock version 9 to cater to the new flow. Otherwise, you can use older versions of Lock to trigger the old Change Password flow, although this is not recommended. We strongly encourage you to enable *Change Password flow v2* and upgrade to Lock version 9 and above. 

To learn more about migrating Lock, see [here.](/migrations#vulnerable-password-flow)
:::

Auth0 provides the following ways to change a password:
+ via API: Send a password reset email to a user using the API.
+ via Lock: Trigger a password reset email to the user through the Lock login screen.
+ via Dashboard: An admin can change manually a user's password in the [Users](${uiURL}/#/users) section of the dashboard.

Note that passwords can only be changed for users signing in using database connections. If a user is signing in with a social or enterprise connection, their password would need to be reset in those systems.


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
In case you have a custom database setup for your connection you should first check whether the user exists there and if so invoke the API for `changePassword`.
:::

In the resulting email, there will be a link to reset the password.

![](/media/articles/connections/database/reset-password-email.png)

Clicking it will go to a password reset page.

![](/media/articles/connections/database/reset-password.png)

Note that this email link is only valid once and only for the amount of time specified in the `URL Lifetime` field. This field can be changed where you customize the change password email.

[Click here for more details on the dbconnections/change_password API call](/auth-api#!#post--dbconnections-change_password)


## Using Lock

A user can change the password using the Lock login screen.

Click on the *Don't remember your password?* link on the Lock login screen.

![](/media/articles/connections/database/lock_v9/lock_login_page.png)

Enter your email address.

![](/media/articles/connections/database/lock_v9/lock_request_reset.png)

:::panel-warning Notice
If you are using Lock version 8, upon clicking the *Don't remember your password?* link on the Lock login screen, you will be requested to enter your new password as well. Afterwards you will have to confirm this action via email. 

This flow however is not considered safe and we recommend upgrading to Lock 9 or greater as soon as possible. 
To learn more about migrating Lock, see [here.](/migrations#vulnerable-password-flow)
:::

In the resulting email, there will be a link to reset the password.

![](/media/articles/connections/database/lock_v9/lock_reset_pass_email.png)

Clicking it will go to a password reset page where you should enter your new password.

![](/media/articles/connections/database/lock_v9/lock_set_new_pass.png)

After the password has changed you can login with your new credentials.

![](/media/articles/connections/database/lock_v9/lock_pass_changed.png)


## Manually Setting a User's Password

::: panel-danger Notice
Changing a user's password in this way does not alert them to a password change.
:::

A user's password can be changed manually in the [Users](${uiURL}/#/users) section of the dashboard.

Click on the name of the user you want to change the password for. Then click on the **Actions** button on the right side of the page, and then select **Change Password**.

![](/media/articles/connections/database/manual-password-change.png)

Next, enter the new password and click **Save**.


## Customizing the Change Password Email

You can change the content of the password change request emails in the  [Emails > Templates](${uiURL}/#/emails) section of the dashboard.

*Note:* Email templates can only be changed after changing the email provider from Auth0's built-in provider. [See here for more information.](/email/templates)

Go to the **Change Password Configuration** page to edit the email fields.

![](/media/articles/connections/database/change-password-email.png)
