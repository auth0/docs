---
description: Best practices for metadata in Auth0.
topics:
    - best-practices
    - metadata
contentType: 
    - reference
useCase:
    - best-practices
    - metadata
---

# Metadata Best Practices

Any data you store in Auth0 that's *not* already a part of the user profile should go into one of the two provided [metadata](/users/concepts/overview-user-metadata) types:

* `app_metadata`
* `user_metadata`

These fields contain JSON snippets and can be used during the Auth0 authentication process.

You can store data points that are read-only to the user in `app_metadata`. Three common types of data for the `app_metadata` field:

* **Permissions**: privileges granted to certain users allowing them rights within the Application that others do not have;
* **Plan information**: settings that cannot be changed by the user without confirmation from someone with the appropriate authority;
* **External IDs**: identifying information used to associate users with external accounts.

When determining where you should store specific pieces of data about your user, here are the general rules of thumb:

| Case | Storage Location |
| --- | --- |
| Data that should be **read-only** to the user | `app_metadata` |
| Data that should be **editable** by the user | `user_metadata` |
| Data unrelated to user authentication | External database |

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
