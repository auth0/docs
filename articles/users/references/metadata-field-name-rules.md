---
description: Rules for naming metadata fields.
topics: metadata
contentType: reference
useCase: manage-users
v2: true
---
# Metadata Field Name Rules

The following sections cover rules and guidelines for setting the names of your metadata fields.

## Avoid periods and ellipses

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

## Avoid dynamic field names

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

## Field restrictions

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

## Metadata size limits

Currently, Auth0 limits the total size of your user metadata to **16 MB**. However, when using Rules and/or the Management Dashboard, your metadata limits may be lower.

When setting the `user_metadata` field with the [Authentication API Signup endpoint](/api/authentication?javascript#signup), your metadata is limited to a maximum of 10 fields and 500 characters.
Currently, Auth0 limits the total size of your user metadata to **16 MB**. However, when using Rules and/or the Management Dashboard, your metadata limits may be lower.

<%= include('../../_includes/_metadata_on_signup_warning') %>


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

* [Managing User Metadata](/users/guides/manage-user-metadata)
* [User Data Storage Best Practices](/best-practices/user-data-storage-best-practices)
* [User Data Storage Scenario](/users/references/user-data-storage-scenario)
