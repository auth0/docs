---
description: Best practices for metadata in Auth0.
topics:
    - best-practices
    - metadata
toc: true
contentType: reference
useCase:
    - manage users
    - best-practices
    - metadata
---

# Metadata Best Practices

There are three types of data typically stored in the `app_metadata` field:

* **Permissions**: privileges granted to certain users allowing them rights within the application that others do not have.
* **Plan information**: settings that cannot be changed by the user without confirmation from someone with the appropriate authority.
* **External IDs**: identifying information used to associate users with external accounts. 

## Metadata field names

For field names, avoid periods and ellipses and dynamic field names.

### Avoid periods and ellipses

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

### Avoid dynamic field names

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

## Metadata data types

Use a consistent data type each time you create or update a given metadata field. For example, if you use `user.user_metadata.age = "23"` for one user and `user.user_metadata.age = 23` for another user, it will cause issues when retrieving the data.

## Metadata storage and size limits

Both `app_metadata` and `user_metadata` are limited to a size of 16 MB each. Metadata storage is not designed to be a general purpose data store, and you should still use your own external storage facility when possible. 

Auth0 limits the total size of your user metadata to 16 MB. However, when using Rules and/or the Management Dashboard, your metadata limits may be lower.

When setting the `user_metadata` field with the Authentication API Signup endpoint, your metadata is limited to a maximum of 10 fields and 500 characters per field. The 500 character limit includes the name of the field.

When setting the `user_metadata` field using the [Authentication API's Signup endpoint](/api/authentication?javascript#signup), you are limited to a maximum of 10 `String` fields and 500 characters. For an example of working with metadata during a custom signup process, see [Custom Signup > Using the API](/libraries/custom-signup#using-the-api).

## Customize emails with metadata

Store any information that you want use to customize Auth0 emails in metadata and preferably `user_metadata` if the user is allowed to change it, such as information used to determine the language for an email.

## Use `metadata` with custom database scripts

If you are using a [custom database](/connections/database#using-your-own-user-store), the `app_metadata` field should be referred to as `metadata` in the scripts you run to manage your metadata.

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

## App metadata restrictions

::: warning
User credentials such as Access Tokens, Refresh Tokens, and additional passwords should not be stored in `app_metadata`, as these will be visible to any Auth0 Dashboard administrator.
:::

The `app_metadata` field should **not** contain any of these properties:

* `__tenant`
* `_id`
* `blocked`
* `clientID`
* `created_at`
* `email_verified`
* `email`
* `globalClientID`
* `global_client_id`
* `identities`
* `lastIP`
* `lastLogin`
* `loginsCount`
* `metadata`
* `multifactor_last_modified`
* `multifactor`
* `updated_at`
* `user_id`

## Keep reading

* [Metadata](/users/concepts/overview-user-metadata)
* [Manage User Metadata](/users/guides/manage-user-metadata)
* [Update Metadata with the Management API](/users/guides/update-metadata-properties-with-management-api)
* [User Metadata in Rules](/rules/current/metadata-in-rules)
* [User Data Storage Best Practices](/best-practices/user-data-storage-best-practices)
