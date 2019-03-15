---
description: Explains the basics of a user profile, how to create a user and view users and their profile details.
topics:
    - users
    - user-management
    - user-profiles
contentType: how-to
useCase: manage-users
---
# Manage User Access to Applications

All users associated with a single Auth0 tenant are shared between the tenant's applications (and therefore have access to the applications). To keep users separate and restrict their access, we recommend creating an additional tenant:

1. Click on tenant name on top right of the dashboard and select **+ Create Tenant** . If you have multiple tenants, you can easily switch between them from the tenants menu.

2. To restrict some users' access to certain applications, you can use [rules](/rules). Inside a rule, the `context.clientName` and `context.clientID` variables are available to check which application the user is using for login. See [this rule for an example](https://github.com/auth0/rules/blob/aeaf93bc058408e260192d0941a688963449d6be/src/rules/simple-user-whitelist-for-app.js).

3. To restrict users from applications by configuring a new connection and only giving access to a specific application. 

   * Go to the the **Settings** section for a connection.
   * Click on the **Applications** tab and enable/disable any application.

4. To disable users' access to your applications, you can [block and unblock users](/users/guides/block-and-unblock-users) in the Dashboard.

## Keep reading

* [User Profile Structure](/users/references/user-profile-structure)
* [Normalized User Profiles](/users/normalized)
* [Metadata Overview](/users/concepts/overview-user-metadata)
* [Update Users Using Your Database](/users/guides/update-user-profiles-using-your-database)
