---
title: Creat Users Using the Dashboard
description: How to create users and their profile details.
toc: true
topics:
    - users
    - user-management
    - user-profiles
contentType: how-to
useCase:
  - manage-users
---
# Create Users Using the Dashboard

Use the [Dashboard > Users](${manage_url}/#/users) to create, view, modify, or delete users.

::: note
User Management is included as part of the **Developer** subscription plan. You may need to [upgrade your plan](${manage_url}/#/tenant/billing/subscription) to access these features.
:::

![User Profile Dashboard](/media/articles/user-profile/user1.png)

To create a new user and their corresponding User Profile, click the [Users](${manage_url}/#/users) page in the Dashboard. Click the **+Create User** button at the top right of the *Users* page. You will be prompted to enter the following information:

* **Email**: the user's email address. The maximum length is 64 chars for the user/local part and 256 chars for the domain part.
* **Password**: the user's password. There is no limit for max password length. For more information refer to [Password Strength in Auth0 Database Connections](/connections/database/password-strength).
* **Repeat Password**: retype the user's password to ensure that you entered the password correctly.
* **Connection**: the database connection to use to authenticate the user. The dropdown lists all the configured database connections in your tenant. The connection you use must be associated with an Application.

Fill in the required information and click **Save** to create the new user. For more information refer to: [Creating Users via the Management Dashboard](/tutorials/creating-users-in-the-management-portal).

::: note
The User Details page will show `pending` when a user is first created until they have logged in for the first time.
:::

## Keep reading

::: next-steps
* [User Profile Attributes](/user-profile/user-profile-structure)
* [Auth0 Normalized User Profile](/user-profile/normalized)
* [User Metadata](/metadata)
* [User Profile: In-Depth Details](/user-profile/user-profile-details)
* [Update Users using a Custom Database](/user-profile/customdb)
:::
