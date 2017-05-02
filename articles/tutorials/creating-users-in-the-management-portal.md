---
description: How to create users in the Auth0 Management Dashboard.
crews: crew-2
---

# Creating Users via the Management Dashboard

You can manually create users via the [Auth0 Management Dashboard](${manage_url}).

Log in and open up the Management Dashboard. Navigate to the Users tab.

![](/media/articles/users/dashboard.png)

Click on the "Create User" button near the top right-hand side of the screen.

![](/media/articles/users/users-tab.png)

4. Provide the following pieces of information for the new user:
    * Email;
    * Password;
    * Repeat Password (for confirmation);
    * Connection.

  When finished, click "Save".

> The connection you use must be associated with a Client, otherwise you will receive an error message that says, "The connection is disabled". You can enable connections for Clients from the [Management Dashboard](${manage_url}), in the Client Settings -> Connections area, or from the Connection Settings -> Clients area.

![](/media/articles/users/create-user.png)

At this point, the user is created, and you will be directed to the newly-created user's profile.

![](/media/articles/users/user-profile.png)

::: panel-info Pending Users
The User Details page will show “pending” when a user is first created until they have logged in for the first time.
:::
