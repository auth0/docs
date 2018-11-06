---
description: Explains the basics of a User profile, how to create a user and view users and their profile details.
topics:
    - users
    - user-management
    - user-profiles
contentType: how-to
useCase: manage-users
---
# Manage User Access to Applications

Inside a single Auth0 tenant the users are shared between applications because all the applications in a single tenant will usually belong to the same app.

For total separation you can create a new tenant. 

1. Click on tenant name on top right of the dashboard and select **+ Create Tenant** . If you have multiple tenants, you can easily switch between them from the tenants menu.

2. If you need to restrict some users to certain applications you can use rules. Inside a rule, the `context.clientName` and `context.clientID` variables are available to check which application the user is using for login. See [this rule for an example](https://github.com/auth0/rules/blob/master/rules/simple-user-whitelist-for-app.md).

3. You can also restrict users from applications by configuring a new connection and only giving access to a specific application. To enable application access for a connection go to the the **Settings** section for a connection and click on the **Applications** tab, here you can enable/disable any application.

## Keep reading

::: next-steps
* [User Profile Attributes](/user-profile/user-profile-structure)
* [Auth0 Normalized User Profile](/user-profile/normalized)
* [User Metadata](/metadata)
* [User Profile: In-Depth Details](/user-profile/user-profile-details)
* [Update Users using a Custom Database](/user-profile/customdb)
:::
