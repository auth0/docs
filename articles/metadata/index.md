---
description: Auth0 allows you to store data related to each user that has not come from the identity provider as metadata
crews: crew-2
toc: true
tags:
  - metadata
---
# Metadata

Auth0 allows you to store **metadata**, or data related to each user that has not come from the identity provider. There are two kinds of metadata:

* **user_metadata**: stores user attributes (such as user preferences) that do not impact a user's core functionality;
* **app_metadata**: stores information (such as a user's support plan, security roles, or access control groups) that can impact a user's core functionality, such as how an application functions or what the user can access.

::: note
An authenticated user can modify data in their profile's `user_metadata`, but not in their `app_metadata`.
:::

## How to Read, Create, or Edit Metadata

There are two ways by which you can manage your user metadata: using Rules, or using the Auth0 APIs.

### Use Rules

[Rules](/rules) are JavaScript functions executed as part of the Auth0 authentication process (prior to authorization). Using rules, you can read, create, or update user metadata and have such changes affect the results of the authorization process. 

For more information and examples refer to [User Metadata in Rules](/rules/current/metadata-in-rules).

### Use the Auth0 APIs

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

#### Search Metadata

Beginning **1 September 2017**, new tenants cannot search any of the  `app_metadata` fields. 

Only tenants associated with paid subscriptions that were created on/before **31 August 2017** can search the `app_metadata` fields.

As for `user_metadata`, you can only search for profile-related information, such as
- `name`
- `nickname`
- `given_name`
- `family_name`

## Metadata Usage

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

To read metadata, simply access the correct property as you would from any JSON object. For example, if you were working with the above example metadata within a [Rule](/rules) or via a call to the [Management API](/metadata/management-api), you could reference specific items from the data set as follows:

```js
console.log(user.email); // "jane.doe@example.com"
console.log(user.user_metadata.hobby); // "surfing"
console.log(user.app_metadata.plan); // "full"
```

::: note
With Management APIv1, all metadata was stored in the `metadata` field. Data stored in this field is now available under `app_metadata`.
:::

### Rules on Naming Metadata Fields

The following sections cover best practices when setting the names of your metadata fields.

#### Avoid Periods and Ellipses

Metadata field **names** must not contain a dot. For example, use of the following field name would return a Bad Request (400) error:

```json
{
    "preference.color": "pink"
}
```

One way of handling this limitation is to nest attributes:

```json
{
    "preference": {
        "color": "pink"
    }
}
```

Alternately, you can use any delimiter that is not  `.` or `$`.

However, the usage of the `.` delimiter is acceptable in the data **values** such as in the below example:

```json
{
    "preference": "light.blue"
}
```

#### Avoid Dynamic Field Names

Do not use dynamic field names. For example, instead of using the following structure:

```json
"participants": {
    "Alice" : {
        "role": "sender"
    },
    "Bob" : {
        "role": "receiver"
    }
}
```

Use this:

```json
"participants": [
    {
        "name": "Alice",
        "role": "sender"
    },
    {
        "name" : "Bob",
        "role": "receiver"
    }
]
```

## Metadata Restrictions

There are some restrictions when using metadata of which you should be aware:

### Field Restrictions

The following fields may not be stored in the `app_metadata` field:

* `blocked`
* `clientID`
* `created_at`
* `email`
* `email_verified`
* `global_client_id`
* `globalClientID`
* `identities`
* `lastIP`
* `lastLogin`
* `metadata`
* `user_id`
* `loginsCount`

### Metadata Size Limits

Currently, Auth0 limits the total size of your user metadata to **16 MB**. However, when using Rules and/or the Management Dashboard, your metadata limits may be lower.

When setting the `user_metadata` field with the [Authentication API Signup endpoint](/api/authentication?javascript#signup), your metadata is limited to a maximum of 10 fields and 500 characters.

## Using Lock to Manage Metadata

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

## Keep Reading

::: next-steps
* [Updating Metadata with Auth0 APIs](/metadata/management-api)
* [User Data Storage Guidance](/user-profile/user-data-storage)
* [Change a User's Picture](/user-profile/user-picture#change-a-user-s-picture)
:::
