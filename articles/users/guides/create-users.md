---
description: How to create users in the Auth0 Dashboard.
crews: crew-2
topics:
  - dashboard
  - users
contentType: how-to
useCase:
  - manage-users
v2: true
---

# Create Users Using the Dashboard

You can manually create users via the [Dashboard](${manage_url}).

1. Log in and open up the Dashboard. Navigate to the _Users_ tab.

![](/media/articles/users/dashboard.png)

2. Click on the __Create User__ button near the top right-hand side of the screen.

![](/media/articles/users/users-tab.png)

3. Provide the following information for the new user:
    * **Email**: The user's email address. The maximum length is 64 characters for the user/local part and 256 characters for the domain part.
    * **Password**: The user's password. There is no maximum limit for password length. For more information, refer to [Password Strength in Auth0 Database Connections](/connections/database/password-strength). 
    * **Repeat Password**: Confirm password.
    * **Connection**: The database connection to use to authenticate the user. The dropdown lists all the configured database connections in your tenant. The connection you use must be associated with an application. 

4. When finished, click __Save__ to create the new user.

::: note
The connection you use must be associated with an application, otherwise you will receive an error message that says, <em>The connection is disabled</em>. You can enable connections for Applications from the <a href="${manage_url}">Dashboard</a>, in <em> Application Settings > Connections</em>, or from the <em>Connection Settings > Applications</em>.
:::

![](/media/articles/users/create-user.png)

At this point, the user is created, and you will be directed to the newly-created user's profile.

![](/media/articles/users/user-profile.png)

::: panel Pending Users
The User Details page will show `pending` when a user is first created until they have logged in for the first time.
:::

## Keep reading

* [User Profiles](/users/concepts/overview-user-profile)
* [Manage Users Using the Dashboard](/users/guides/manage-users-using-the-dashboard)
* [View Users](/users/guides/view-users)
* [Manage User Access to Applications](/users/guides/manage-user-access-to-applications)
* [Manage Users Using the Management API](/users/guides/manage-users-using-the-management-api)
* [Update User Profiles Using Your Database](/users/guides/update-user-profiles-using-your-database)
* [User Search](/users/search)
