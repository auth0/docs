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

### A word about metadata structure

Whenever you use metadata Auth0 will infer a schema for it. This means that once you use metadata for a user we will expect the same format on every other user. This schema is inferred when a property is presented for the first time. Following usages on different users that do not follow such schema will result on Auth0 not allowing such users to be retrieved by a search querying for the offending attribute.

When this happens, we will generate a log entry letting you know of the user that contains the problem so you can normalize its schema.

As an example, suppose that the first time that you use the metadata attribute it contains the following:

```json
{
    "address": {
        "street": "My Street"
    }
}
```

Auth0 will now expect the `address` key to be an object on any following user that contains such field, and will expect `street` to be a String.

Suppose you now update a second user with the following metadata:

```json
{
    "address": "My Street"
}
```

This second user will be violating the formerly inferred schema since `address` is now a String. The net result is that any User Search containing any metadata field in the query will not return the second user as part of the results.

Keep in mind that while the user won't participate of searches on the `address` attribute, you will be able to search for any other attribute and the result will contain all matching users.

## Keep reading

::: next-steps
* [User Data Storage Guidance](/user-profile/user-data-storage)
* [Change a User's Picture](/user-profile/user-picture#change-a-user-s-picture)
* [Management API: Update a user endpoint](/api/management/v2#!/Users/patch_users_by_id)
* [Using Metadata with Auth0 Lock](/metadata/lock)
:::
