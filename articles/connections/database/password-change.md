---
url: /password_change
---

# Changing a User's Password

:::panel-warning Notice
This information applies to using Lock version 9 and above. To learn more about migrating Lock, see [here.](/migrations#vulnerable-password-flow) 
:::

A password reset email can be sent to a user using the API.  Users themselves can also reset their own password on the login screen.

Note that passwords can only be changed for users signing in using database connections. If a user is signing in with a social or enterprise connection, their password would need to be reset in those systems.

## Using the API

When calling the API, specify the email address of the account you want to reset the password for in the `email` field. A successful result of this request will send an email to the specified user for a password change request.

```
{
    "method": "POST",
    "url": "${account.namespace}/dbconnections/change_password",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [
      { "name" "Content-Type", "value": "application/json" }
    ],
    "queryString" : [],
    "postData" : {
    	"client_id" : "${account.clientId}",
    	"email" : "",
    	"connection": "Username-Password-Authentication"
    },
    "headersSize" :-1,
    "bodySize" : -1
}
```

In the resulting email, there will be a link to reset the password. Clicking it will go to a password reset page like this:

[](/media/articles/connections/database/reset-password.png)

Note that this email link is only valid once and only for the amount of time specified in the `URL Lifetime` field. This field can be changed where you customize the change password email.

[Click here for more details on the dbconnections/change_password API call](auth-api#!#post--dbconnections-change_password)

## Customizing the Change Password Email

You can change the content of the password change request emails in the  [Emails > Templates](${uiURL/#/emails}) section of the dashboard.

Go to the **Change Password Configuration** page to edit the email fields.

[](/media/articles/connections/database/change-password-email.png)

## Manually Setting a User's Password

::: panel-danger Notice
Changing a user's password in this way does not alert them to a password change.
:::

A user's password can be changed manually in the [Users](${uiURL/#/users}) section of the dashboard.

Click on the name of the user you want to change the password for. Then click on the **Actions** button on the right side of the page, and then select **Change Password**.

[](/media/articles/connections/database/manual-password-change.png)

Next, enter the new password and click **Save**.

