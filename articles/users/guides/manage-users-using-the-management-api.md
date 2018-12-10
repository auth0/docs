---
description: Explains the basics of a user profile, how to create a user and view users and their profile details.
topics:
    - users
    - user-management
    - user-profiles
contentType: how-to
useCase: manage-users
v2: true
---
# Manage Users Using the Management API

In addition to using the Dashboard, you can retrieve, create, update or delete users using our [Management API](/api/management/v2#!/Users/get_users).

## How to manage users

If you want to call the Management API directly, you will first need to generate the appropriate Access Token. For information on how to do that refer to [Access Tokens for the Management API](/api/management/v2/concepts/tokens).

Alternatively, you can use an SDK to implement the functionality you need to call the Management API from your application. For a list of available SDKs, refer to [the SDKs section of our Support Matrix](/support/matrix#sdks).

::: note
You can setup Access Control List (ACL)/Roles functionality by adding custom attributes to the user profile. We actually have a [sample](https://github.com/auth0-samples/auth0-roles-permissions-dashboard-sample), that you can use a guide.
:::

## Limitations

As with the dashboard, the API does not alter data sourced from connections such as Facebook or Active Directory.

Not all user profile attributes can be altered via the API. For example, the identities array, which contains information from third party authentication providers, cannot be altered.

### Modify identities array

You may not be able to alter the identities array information, but there are some workarounds you could use (i.e., to modify the picture that is coming from the user's Facebook profile). You cannot change the attribute in the `Identity Provider Attributes` section, so instead you can set the `picture` attribute in the `user_metadata` property and then in your application you could use `${'<%= user.user_metadata.picture || user.picture %>'}`. This code snippet tries to use the `picture` property from `user_metadata` and if it doesn't exist it uses the default (`user.picture`). You could set this as the `src` of the image to display.

### Set passwords

Another example is that the password can be set via the `create` or `update` calls, but for security purposes, it cannot be viewed via the `get` or `list user` commands. The right side of the API explorer provides hints on the user profile attributes which can be viewed or modified for any given call.

## Endpoints

* You can use the [`/users`](/api/v2#!/Users/get_users) endpoint to retrieve information about all users. You can also include search criteria to find specific users.

* Use the [`/user_id`](/api/v2#!/Users/get_users_by_id) to retrieve information about one user based on the `user_id`. The `user_id` is an internal identifier that consists of a connection name and a unique identifier for the user. The `user_id` is different from the ID Token.

* The [`/userinfo`](/api/authentication/reference#get-user-info) endpoint takes as input the Auth0 Access Token and returns user profile information. This endpoint will include the results of any rules that may have altered the user profile during the authentication transaction, but the resulting user profile will not be filtered by any [Scoping](#scopes).

* The [`/tokeninfo`](/api/authentication/reference#get-token-info) endpoint takes as input the Auth0 ID Token and returns User Profile information. This endpoint will return a result that does not include the results of any rules that alter the User Profile.

## Keep reading

* [User Profile Structure](/users/references/user-profile-structure)
* [Normalized User Profiles](/users/normalized)
* [Metadata Overview](/users/concepts/overview-user-metadata)
* [View Users](/users/guides/view-users)
