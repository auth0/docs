---
description: Rules for naming metadata fields.
topics: metadata
contentType: reference
useCase: manage-users
docsv2: true
oldDoc: /metadata/index.md
---
# Metadata Field Name Rules

The following sections cover best practices for naming metadata fields.

## Avoid Periods and Ellipses

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

## Avoid Dynamic Field Names

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

## Field Restrictions

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

## Metadata Size Limits

Currently, Auth0 limits the total size of your user metadata to **16 MB**. However, when using Rules and/or the Management Dashboard, your metadata limits may be lower.

When setting the `user_metadata` field with the [Authentication API Signup endpoint](/api/authentication?javascript#signup), your metadata is limited to a maximum of 10 fields and 500 characters.

## Keep Reading

::: next-steps
* [Updating Metadata with Auth0 APIs](/metadata/apis)
* [User Data Storage Best Practices](/user-profile/user-data-storage-best-practices)
* [Change User Pictures](/user-profile/change-user-pictures)
:::
