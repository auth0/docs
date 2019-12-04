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

## User updates to `user_metadata`

An authenticated user can perform actions that modify data in their profile's **user_metadata** if you build form  for them to use with the [Management API](/api/management/v2), however, they cannot modify their **app_metadata**. 

## Metadata field names and types

For field names, observe the following guidelines:

* [Avoid periods and ellipses](/users/references/metadata-field-name-rules#avoid-periods-and-ellipses)
* [Avoid dynamic field names](/users/references/metadata-field-name-rules#avoid-dynamic-field-names)

For a list of fields that can *not* be stored within `app_metadata`, see [Field Restrictions](/users/references/metadata-field-name-rules#field-restrictions). 

Use a consistent datatype each time you create or update a given metadata field. Using `user.user_metadata.age = "23"` for one user and `user.user_metadata.age = 23` for another user will cause issues when retrieving the data.

User credentials such as Access Tokens, Refresh Tokens, and additional passwords should not be stored in `app_metadata`, as these will be visible to any Auth0 Dashboard administrator.

## Metadata storage and size limits

Both `app_metadata` and `user_metadata` are limited to a size of 16 MB each. Metadata storage is not designed to be a general purpose data store, and you should still use your own external storage facility when possible. 

Auth0 limits the total size of your user metadata to 16 MB. However, when using Rules and/or the Management Dashboard, your metadata limits may be lower.

When setting the `user_metadata` field with the Authentication API Signup endpoint, your metadata is limited to a maximum of 10 fields and 500 characters per field. The 500 character limit includes the name of the field.

When setting the `user_metadata` field using the [Authentication API's Signup endpoint](/api/authentication?javascript#signup), you are limited to a maximum of 10 `String` fields and 500 characters. For an example of working with metadata during a custom signup process, see [Custom Signup > Using the API](/libraries/custom-signup#using-the-api).

## Customize emails with metadata

Store any information that you want use to customize Auth0 emails in metadata and preferably `user_metadata` if the user is allowed to change it, such as information used to determine the language for an email.

## Use `metadata` instead of `app_metadata` with custom databases

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

## Keep reading

* [Metadata](/users/concepts/overview-user-metadata)
* [Metadata Field Name Rules](/users/references/metadata-field-name-rules) 
* [Update Metadata Properties with the Management API](/users/guides/update-metadata-properties-with-management-api)
* [Manage User Metadata](/users/guides/manage-user-metadata)
* [User Metadata in Rules](/rules/current/metadata-in-rules)
* [User Data Storage Best Practices](/best-practices/user-data-storage-best-practices)
