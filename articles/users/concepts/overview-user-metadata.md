---
description: Understand how metadata works with Auth0.
topics: 
   - metadata
   - rules
   - endpoints
contentType: concept
useCase: manage-users
v2: true
---

# Metadata

In addition to the Normalized User Profile information, metadata can be stored in an Auth0 user profile. Metadata provides a way to store information that did not originate from an identity provider, or a way to store information that overrides what an identity provider supplies.

Auth0 distinguishes between two types of metadata:

* **User metadata**: used to store user attributes (e.g., user preferences) that do *not* impact a user's core functionality;
* **App metadata**: used to store information (e.g., a user's support plan, security <dfn data-key="role">roles</dfn>, or access control groups) that can impact a user's core functionality, such as how an application functions or what the user can access.

You can read, create, and edit user metadata using Rules and Auth0 APIs.

## Rules

[Rules](/rules) are JavaScript functions executed as part of the Auth0 authentication process (prior to authorization). Using rules, you can read, create, or update user metadata and have such changes affect the results of the authorization process. 

For more information and examples refer to [User Metadata in Rules](/rules/current/metadata-in-rules).

## Auth0 APIs

If you have a [custom database connection](/connections/database#using-your-own-user-store), you can use the [Authentication API](/api/authentication) [Signup](/api/authentication?shell#signup) endpoint to set the `user_metadata` for a user. 

For an example of working with metadata during a custom signup process, see [Custom Signup > Using the API](/libraries/custom-signup#using-the-api).

:::note
You can also use the [GET /userinfo endpoint](/api/authentication#get-user-info) to get a user's `user_metadata`. You must first [write a Rule](/rules#copy-user-metadata-to-id-token) to copy `user_metadata` properties to the ID Token.
:::

### API endpoints

You can use the following [Management API](/api/management/v2) endpoints to retrieve, create, and update both the `user_metadata` and `app_metadata` fields.

| **Endpoint** | **Description** |
|--|--|
| [Search user by id](/api/management/v2#!/Users/get_users_by_id) | Use this if you want to search for a user based on Id. For an example request see [User Search](/users/search/best-practices#users-by-id). |
| [Search user by email](/api/management/v2#!/Users_By_Email/get_users_by_email) | Use this if you want to search for a user based on email. For an example request see [User Search](/users/search/best-practices#users-by-email).|
| [Get a list of users](/api/management/v2#!/Users/get_users) | Use this if you want to search for a list if users with other search criteria. For an example request see [User Search](/best-practices/search-best-practices#users). See also [Export Metadata](/best-practices/search-best-practices#export-metadata) for limitations. |
| [Create User](/api/management/v2#!/Users/post_users) | Create a new user and (optionally) set metadata. For a body sample see [POST /api/v2/users](/api/management/v2#!/Users/post_users).|
| [Update User](/api/management/v2#!/Users/patch_users_by_id) | Update a user using a JSON object. For example requests see [PATCH /api/v2/users/{id}](/api/management/v2#!/Users/patch_users_by_id).| 

:::note
For more information, see [Manage User Metadata](/users/guides/manage-user-metadata).
:::

### Example

Suppose the following metadata is stored for a user with the email address `jane.doe@example.com`:

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

::: note
Any valid JSON snippet can be used as metadata.
:::

To read metadata, simply access the correct property as you would from any JSON object. For example, if you were working with the above example metadata within a [Rule](/rules) or via a call to the Management API, you could reference specific items from the data set as follows:

```js
console.log(user.email); // "jane.doe@example.com"
console.log(user.user_metadata.hobby); // "surfing"
console.log(user.app_metadata.plan); // "full"
```

::: note
With Management APIv1, all metadata was stored in the `metadata` field. Data stored in this field is now available under `app_metadata`.
:::

## Metadata and custom databases

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

* [Manage User Metadata](/users/guides/manage-user-metadata)
* [User Metadata in Rules](/rules/current/metadata-in-rules)
* [User Data Storage Best Practices](/best-practices/user-data-storage-best-practices)
* [Metadata Best Practices](/best-practices/metadata)
* [User Data Storage Scenario](/users/references/user-data-storage-scenario)
* [Change User Pictures](/users/guides/change-user-pictures)
