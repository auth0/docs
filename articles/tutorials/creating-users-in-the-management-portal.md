---
description: How to create users in the Auth0 Management Dashboard.
crews: crew-2
---

# Creating Users via the Management Dashboard

You can manually create users via the [Dashboard](${manage_url}).

Log in and open up the Dashboard. Navigate to the _Users_ tab.

![](/media/articles/users/dashboard.png)

Click on the __Create User__ button near the top right-hand side of the screen.

![](/media/articles/users/users-tab.png)

4. Provide the following pieces of information for the new user:
    * Email
    * Password
    * Repeat Password (for confirmation)
    * Connection

  When finished, click __Save__.

::: note
The connection you use must be associated with a Client, otherwise you will receive an error message that says, <em>The connection is disabled</em>. You can enable connections for Clients from the <a href="${manage_url}">Dashboard</a>, in <em> Client Settings > Connections</em>, or from the <em>Connection Settings > Clients</em>.
:::

![](/media/articles/users/create-user.png)

At this point, the user is created, and you will be directed to the newly-created user's profile.

![](/media/articles/users/user-profile.png)

::: panel Pending Users
The User Details page will show `pending` when a user is first created until they have logged in for the first time.
:::

## Keep reading

::: next-steps
* [Learn more about managing your Users](/user-profile)
:::
