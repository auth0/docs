---
description: "Auth0 allows you to store data related to each user that has not come from the identity provider as either of two kinds of metadata: user_metadata and app_metadata."
crews: crew-2
---
# User Metadata

Auth0 allows you to store **metadata**, or data related to each user that has not come from the identity provider. There are two kinds of metadata:

* **user_metadata**: stores user attributes (such as user preferences) that do not impact a user's core functionality;
* **app_metadata**: stores information (such as a user's support plan, security roles, or access control groups) that can impact a user's core functionality, such as how an application functions or what the user can access.

::: note
An authenticated user can modify data in their profile's `user_metadata`, but not in their `app_metadata`.
:::

### How to Read, Create or Edit Metadata

You can manage your metadata using [Rules](/rules/metadata-in-rules) or the [Auth0 APIs](/metadata/management-api).

::: warning
Note that `app_metadata` fields are not [searchable](/api/management/v2/user-search). For `user_metadata`, you can only search for profile information: `name`, `nickname`, `given_name`, `family_name`.
:::

## Metadata Usage

Suppose the following data is stored for a user with the email address `jane.doe@example.com`:

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

To read metadata, simply access the correct property. For example, if you want to work with the values of the following properties in your [Rules](/rules) or via a call to the [Management API](/api/management/v2):

```js
console.log(user.email); // "jane.doe@example.com"
console.log(user.user_metadata.hobby); // "surfing"
console.log(user.app_metadata.plan); // "full"
```

::: note
With Management APIv1, all metadata was stored in the `metadata` field. Data stored in this field is now available under `app_metadata`.
:::

### Naming Metadata Fields

Metadata field names must not contain a dot. For example, use of the following returns a Bad Request (400) error:

```json
{
    "preference.color": "pink"
}
```

One way of handling this is to nest attributes:

```json
    {
        "preference": {
            "color": "pink"
        }
    }
```

Alternately, you can use any delimiter that is not  `.` or `$`.

However, the usage of the `.` delimiter is acceptable in the data values:

```json
{
    "preference": "light.blue"
}
```

## Restrictions

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

Currently, Auth0 limits the total size of your user metadata to 16 MB. However, when using Rules and/or the Management Dashboard, your metadata limits may be lower.

When setting this field with the [Authentication API Signup endpoint](/api/authentication?javascript#signup) size is limited to no more than 10 fields and must be less than 500 characters.

## Keep reading

::: next-steps
* [User Data Storage Guidance](/user-profile/user-data-storage)
* [Change a User's Picture](/user-profile/user-picture#change-a-user-s-picture)
* [Management API: Update a user endpoint](/api/management/v2#!/Users/patch_users_by_id)
* [Using Metadata with Auth0 Lock](/metadata/lock)
:::
