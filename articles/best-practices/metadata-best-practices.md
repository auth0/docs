---
description: Best practices for metadata in Auth0.
topics:
    - best-practices
    - metadata
contentType: reference
useCase:
    - manage users
    - best-practices
    - metadata
---

# Metadata Best Practices

## App metadata and custom databases

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

## `user_metadata` modifications

An authenticated user could perform actions that modify data in their profile's **user_metadata** if you build an interface using the Auth0 Management API for them to use, but they can't modify their **app_metadata**. See [Authentication API: Signup](/api/authentication?javascript#signup) for more information. 

## Metadata field types

Use a consistent datatype each time you create or update a given metadata field. Using `user.user_metadata.age = "23"` for one user and `user.user_metadata.age = 23` for another user will cause issues when retrieving the data.

## Metadata storage

Both `app_metadata` and `user_metadata` are limited to a size of 16 MB each. Metadata storage is not designed to be a general purpose data store, and you should still use your own external storage facility when possible. 

Metadata size and complexity should be kept to a minimum. ,The Auth0 Management API has strict rules when it comes to updating and/or deleting metadata associated with a user.

## Customize emails with metadata

Store any information that you want use to customize Auth0 emails in metadata and preferably `user_metadata` if the user is allowed to change it, such as information used to determine the language for an email.

## Fields that cannot be stored in metadata

For a list of fields that *cannot* be stored within `app_metadata`, see [Metadata Field Name Rules](/users/references/metadata-field-name-rules). In addition, user credentials such as access tokens, refresh tokens, and additional passwords should not be stored in app_metadata, as these will be visible to any Auth0 dashboard administrator.
