---
title: Metadata
description: Describes how metadata works with Auth0.
topics: 
   - metadata
   - rules
   - endpoints
   - lock
contentType: concept
useCase: manage-users
---
# Metadata Overview

Auth0 allows you to store **metadata**, or data related to each user that has not come from the identity provider. There are two kinds of metadata:

* **user_metadata**: stores user attributes (such as user preferences) that do not impact a user's core functionality;
* **app_metadata**: stores information (such as a user's support plan, security roles, or access control groups) that can impact a user's core functionality, such as how an application functions or what the user can access.

::: note
An authenticated user can modify data in their profile's `user_metadata`, but not in their `app_metadata`.
:::

You can read, create, and edit user metadata using rules, Auth0 APIs, and Lock.

## Rules

[Rules](/rules) are JavaScript functions executed as part of the Auth0 authentication process (prior to authorization). Using rules, you can read, create, or update user metadata and have such changes affect the results of the authorization process. 

For more information and examples refer to [User Metadata in Rules](/rules/current/metadata-in-rules).

## Auth0 APIs

When you use the [Authentication API](/api/authentication), you can use the [Signup](/api/authentication?shell#signup) endpoint, in order to set the `user_metadata` for a user. Note though that this endpoint only works for database connections.

For an example, refer to [Custom Signup > Using the API](/libraries/custom-signup#using-the-api).

:::note
You can also use the [GET /userinfo endpoint](/api/authentication#get-user-info) in order to get a user's `user_metadata`. To do so, you first have to [write a Rule to copy `user_metadata` properties to the ID Token](/rules#copy-user-metadata-to-id-token).
:::

You can use the [Management API](/api/management/v2) in order to retrieve, create, or update both the `user_metadata` and `app_metadata` fields at any point.

| **Endpoint** | **Description** |
|--|--|
| [Search user by id](/api/management/v2#!/Users/get_users_by_id) | Use this if you want to search for a user based on Id. For an example request see [User Search](/users/search/best-practices#users-by-id). |
| [Search user by email](/api/management/v2#!/Users_By_Email/get_users_by_email) | Use this if you want to search for a user based on email. For an example request see [User Search](/users/search/best-practices#users-by-email).|
| [Get a list of users](/api/management/v2#!/Users/get_users) | Use this if you want to search for a list if users with other search criteria. For an example request see [User Search](/users/search/best-practices#users). See also [Search Metadata](#search-metadata) for a list of restrictions. |
| [Create User](/api/management/v2#!/Users/post_users) | Create a new user and (optionally) set metadata. For a body sample see [POST /api/v2/users](/api/management/v2#!/Users/post_users).|
| [Update User](/api/management/v2#!/Users/patch_users_by_id) | Update a user using a JSON object. For example requests see [PATCH /api/v2/users/{id}](/api/management/v2#!/Users/patch_users_by_id).| 

:::note
For examples and more info you can also refer to [How to Create and Update User Metadata With the Auth0 APIs](/metadata/apis).
:::

## Lock

Users of the [Lock](/libraries/lock) widget are able to add new items to `user_metadata`, as well as read `user_metadata` after authentication.

* For information on adding `user_metadata` on signup, please see [Additional Signup Fields](/libraries/lock/v10/customization#additionalsignupfields-array-)
* When using Lock, you can read the user's `user_metadata` properties the same way you would for any other user profile property. For example, the following code snippet retrieves the value associated with `user_metadata.hobby` and assigns it to an element on the page:

```js
// Use the accessToken acquired upon authentication to call getUserInfo
lock.getUserInfo(accessToken, function(error, profile) {
  if (!error) {
    document.getElementById('hobby').textContent = profile.user_metadata.hobby;
  }
});
```

::: note
For details on how to use Lock to authenticate users and access their profile information, check out the [Lock documentation](/libraries/lock).
:::

## Metadata and Custom Databases

If you are using a [custom database](/connections/database#using-your-own-user-store), the **app_metadata** field should be referred to as **metadata** in the scripts you run to manage your metadata.

For example, you would *not* use this:

```json
{
    "emails": "jane.doe@example.com",
    "user_metadata": {
        "hobby": "surfing"
    },
    "app_metadata": {
        "plan": "full"
    }
}
```

Instead, you would use this:

```json
{
    "emails": "jane.doe@example.com",
    "user_metadata": {
        "hobby": "surfing"
    },
    "metadata": {
        "plan": "full"
    }
}
```

## Keep reading

::: next-steps
* [Updating Metadata with Auth0 APIs](/metadata/management-api)
* [User Data Storage Guidance](/user-profile/user-data-storage)
* [Change a User's Picture](/user-profile/user-picture#change-a-user-s-picture)
:::
