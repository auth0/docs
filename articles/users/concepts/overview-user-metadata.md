---
description: Understand how user metadata and app metadata can be used to store information that does not originate from an identity provider.
topics: 
   - metadata
   - rules
   - endpoints
contentType: concept
useCase: manage-users
---

# Metadata

In addition to the Normalized User Profile information, you can use metadata to store information that does not originate from an identity provider, or a way to store information that overrides what an identity provider supplies.

Auth0 distinguishes between two types of metadata, intended to store specific kinds of information:

* **User metadata**: stores user attributes such as preferences that do *not* impact a user's core functionality. Data stored in `user_metadata` can be editable by users if you build a form for them to use. 
* **App metadata**: stores information (such as, support plan subscriptions, security <dfn data-key="role">roles</dfn>, or access control groups) that can impact a user's core functionality, such as how an application functions or what the user can access. Data stored in `app_metadata` cannot be edited by users. 

::: note
Data unrelated to user authentication should always be stored in an external database and not in the user profile metadata. 
:::

## User metadata

You can read, create, and edit user metadata using Rules and Auth0 API enpoints.

### Rules

[Rules](/rules) are JavaScript functions executed as part of the Auth0 authentication process (prior to authorization). Using rules, you can read, create, or update user metadata and have such changes affect the results of the authorization process. 

For more information and examples, see [User Metadata in Rules](/rules/current/metadata-in-rules).

### Auth0 APIs

If you have a [custom database connection](/connections/database#using-your-own-user-store), you can use the [Authentication API](/api/authentication) [Signup](/api/authentication?shell#signup) endpoint to set the `user_metadata` for a user. 

For an example of working with metadata during a custom signup process, see [Custom Signup > Using the API](/libraries/custom-signup#using-the-api).

:::note
You can also use the [GET /userinfo endpoint](/api/authentication#get-user-info) to get a user's `user_metadata`. You must first [write a Rule](/rules#copy-user-metadata-to-id-token) to copy `user_metadata` properties to the ID Token.
:::

You can use the following [Management API](/api/management/v2) endpoints to retrieve, create, and update both the `user_metadata` and `app_metadata` fields.

| **Endpoint** | **Description** |
| -- | -- |
| [Search user by id](/api/management/v2#!/Users/get_users_by_id) | Use this if you want to search for a user based on Id. For an example request see [User Search](/users/search/best-practices#users-by-id). |
| [Search user by email](/api/management/v2#!/Users_By_Email/get_users_by_email) | Use this if you want to search for a user based on email. For an example request see [User Search](/users/search/best-practices#users-by-email). |
| [Get a list of users](/api/management/v2#!/Users/get_users) | Use this if you want to search for a list if users with other search criteria. For an example request see [User Search](/best-practices/search-best-practices#users). See also [Export Metadata](/best-practices/search-best-practices#export-metadata) for limitations. |
| [Create User](/api/management/v2#!/Users/post_users) | Create a new user and (optionally) set metadata. For a body sample see [POST /api/v2/users](/api/management/v2#!/Users/post_users). |
| [Update User](/api/management/v2#!/Users/patch_users_by_id) | Update a user using a JSON object. For example requests see [PATCH /api/v2/users/{id}](/api/management/v2#!/Users/patch_users_by_id). | 

## App metadata

You can store data points that are read-only to the user in `app_metadata`. Three common types of data for the `app_metadata` field:

* **Permissions**: privileges granted to certain users allowing them rights within the Application that others do not have;
* **Plan information**: settings that cannot be changed by the user without confirmation from someone with the appropriate authority;
* **External IDs**: identifying information used to associate users with external accounts.

## Metadata example

In the following example, the user `jane.doe@example.com` has the following metadata stored with their profile. 

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

To read metadata, access the correct property as you would from any JSON object. In the above example metadata, within a [Rule](/rules) or via a call to the Management API, you could reference specific items from the data set as follows:

```js
console.log(user.email); // "jane.doe@example.com"
console.log(user.user_metadata.hobby); // "surfing"
console.log(user.app_metadata.plan); // "full"
```

::: note
All metadata was previously (in Management API v1) stored in the `metadata` field. That data is now stored in the `app_metadata` field. However, if you are using a [custom database](/connections/database#using-your-own-user-store), the `app_metadata` field should be referred to as `metadata` in the scripts you run to manage your metadata.
:::

## Keep reading

* [Manage User Metadata](/users/guides/manage-user-metadata)
* [User Metadata in Rules](/rules/current/metadata-in-rules)
* [Metadata Best Practices](/best-practices/metadata-best-practices)
* [User Data Storage Best Practices](/best-practices/user-data-storage-best-practices)
* [User Data Storage Scenario](/users/references/user-data-storage-scenario)
* [Change User Pictures](/users/guides/change-user-pictures)
