---
title: Read Metadata
description: Read metadata using rules and Auth0 APIs.
topics: metadata
contentType: how-to
useCase: manage-users
---
## Read Metadata

Beginning **1 September 2017**, new tenants cannot search any of the  `app_metadata` fields. 

Only tenants associated with paid subscriptions that were created on/before **31 August 2017** can search the `app_metadata` fields.

As for `user_metadata`, you can only search for profile-related information, such as
- `name`
- `nickname`
- `given_name`
- `family_name`

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

## Keep Reading

::: next-steps
* [Updating Metadata with Auth0 APIs](/metadata/management-api)
* [User Data Storage Guidance](/user-profile/user-data-storage)
* [Change a User's Picture](/user-profile/user-picture#change-a-user-s-picture)
:::
