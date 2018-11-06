---
description: How to create user accounts from within the Auth0 Dashboard.
crews: crew-2
topics:
  - dashboard
  - users
contentType: how-to
useCase: manage-users
---
# Create Users Using the Dashboard

Use the [Dashboard > Users](${manage_url}/#/users) to create, view, modify, or delete users.

::: note
User Management is included as part of the **Developer** subscription plan. You may need to [upgrade your plan](${manage_url}/#/tenant/billing/subscription) to access these features.
:::

![User Profile Dashboard](/media/articles/user-profile/user1.png)

1. Log in and open up the Dashboard. Navigate to the _Users_ tab.

![](/media/articles/users/dashboard.png)

2. Click the **+Create User** button at the top right of the *Users* page. 

![](/media/articles/users/users-tab.png)

3. Provide the following information for the new user:
    * **Email**: the user's email address. The maximum length is 64 chars for the user/local part and 256 chars for the domain part.
    * **Password**: the user's password. There is no limit for max password length. For more information refer to [Password Strength in Auth0 Database Connections](/connections/database/password-strength).
    * **Repeat Password**: retype the user's password to ensure that you entered the password correctly.
    * **Connection**: the database connection to use to authenticate the user. The dropdown lists all the configured database connections in your tenant. The connection you use must be associated with an Application.

::: note
The connection must be associated with an application, otherwise you will receive an error message that says, <em>The connection is disabled</em>. Enable connections for Applications from the <a href="${manage_url}">Dashboard</a>, in <em> Application Settings > Connections</em>, or from the <em>Connection Settings > Applications</em>.
:::

4. When finished, click **Save**.

![](/media/articles/users/create-user.png)

You will be directed to the newly-created **User Details** page. 

![](/media/articles/users/user-profile.png)

::: note
The **User Details** page will show `pending` when a user is first created until they have logged in for the first time.
:::

## Keep reading

::: next-steps
* [User Profile Structure](/user-profile/user-profile-structure)
* [Auth0 Normalized User Profile](/user-profile/normalized)
* [Metadata Overview](/metadata/overview-metadata)
* [User Profile Overview](/user-profile/overview-user-profile)
* [Update Users Using Your Database](/user-profile/update-user-profiles-using-your-database)
:::
