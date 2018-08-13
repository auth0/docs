---
description: How to create user accounts from within the Auth0 Dashboard.
crews: crew-2
topics:
  - dashboard
  - users
contentType: how-to
useCase: manage-users
---

# Create Users

You can manually create users using the [Dashboard](${manage_url}).

1. Log in and open up the Dashboard. Navigate to the _Users_ tab.

![](/media/articles/users/dashboard.png)

2. Click on the __Create User__ button.

![](/media/articles/users/users-tab.png)

3. Provide the following information for the new user:
    * Email
    * Password
    * Repeat Password (for confirmation)
    * Connection

::: note
The connection must be associated with an application, otherwise you will receive an error message that says, <em>The connection is disabled</em>. Enable connections for Applications from the <a href="${manage_url}">Dashboard</a>, in <em> Application Settings > Connections</em>, or from the <em>Connection Settings > Applications</em>.
:::

4. When finished, click __Save__.

![](/media/articles/users/create-user.png)

You will be directed to the newly-created User Details page. The word 'pending' appears next to the users' email address until the user logs in for the first time. 

![](/media/articles/users/user-profile.png)

## Keep reading

::: next-steps
* [Learn more about managing your users](/user-profile/overview-user-profile.md)
:::
