---
description: How to create and update metadata using the Auth0 APIs and Lock and how to work with custom databases.
toc: true
crews: crew-2
topics:
  - metadata
  - apis
  - management-api
contentType: how-to
useCase:
  - manage-users
v2: true
---

# Manage User Metadata

You can create and update metadata using the [Authentication](/api/authentication) and [Management](/api/management/v2) APIs.

## With the Authentication API

When you use the Authentication API's [Signup endpoint](/api/authentication?shell#signup), you can create a new Database Connection user and set the `user_metadata` field.

<%= include('../../_includes/_metadata_on_signup_warning') %>


## With the Management API

Using [Auth0's Management APIv2](/api/management/v2), you can create a user and set both their `app_metadata` and `user_metadata` fields. You can also update these two fields.

::: note
The Auth0 Management APIv2 token is required to call the Auth0 Management API. Learn more about [Access Tokens for the Management API](/api/management/v2/concepts/tokens).
:::

## With the Lock Library

You can define, add, read, and update the `user_metadata` using Auth0's [Lock](/libraries/lock) library. 

For information on adding `user_metadata` on signup, please see [Additional Signup Fields](/libraries/lock/v10/customization#additionalsignupfields-array-)

When using Lock, you can read the user's `user_metadata` properties the same way you would for any other user profile property. For example, the following code snippet retrieves the value associated with `user_metadata.hobby` and assigns it to an element on the page:

```js
// Use the accessToken acquired upon authentication to call getUserInfo
lock.getUserInfo(accessToken, function(error, profile) {
  if (!error) {
    document.getElementById('hobby').textContent = profile.user_metadata.hobby;
  }
});
```
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

* [Metadata Overview](/users/concepts/overview-user-metadata)
* [Read Metadata](/users/guides/read-metadata)
* [Set Metadata Properties on Creation](/users/guides/set-metadata-properties-on-creation)
* [Update Metadata Properties with the Management API](/users/guides/update-metadata-properties-with-management-api)
* [Metadata Field Name Rules](/users/references/metadata-field-name-rules)
* [User Data Storage Best Practices](/best-practices/user-data-storage-best-practices)
* [User Data Storage Scenario](/users/references/user-data-storage-scenario)
