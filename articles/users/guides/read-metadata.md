---
description: Retrieve metadata using the Management API or Lock.
topics: 
   - metadata
   - rules
contentType: how-to
useCase: manage-users
v2: true
---

# Read Metadata

You can read metadata using rules with the Management API and with Lock. As for `user_metadata`, you can only search for profile-related information, such as:
- `name`
- `nickname`
- `given_name`
- `family_name`

::: note 
Beginning **1 September 2017**, new tenants cannot search any of the  `app_metadata` fields. Only tenants associated with paid subscriptions that were created on/before **31 August 2017** can search the `app_metadata` fields.
:::

As an example, assume the following metadata is stored for a user with the email address `jane.doe@example.com`:

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

## Wth Management API

To read metadata, access the property as you would from any JSON object. For example, using the example metadata above, within a [Rule](/rules) or via a call to the [Management API](/metadata/management-api), you could reference specific items from the data set as follows:

```js
console.log(user.email); // "jane.doe@example.com"
console.log(user.user_metadata.hobby); // "surfing"
console.log(user.app_metadata.plan); // "full"
```
Any valid JSON snippet can be used as metadata.

::: note
In Management APIv1, all metadata is stored in the `metadata` field. Data stored in this field is **now** available under `app_metadata`.
:::

## With Lock

Using the Lock library, you can read the user's `user_metadata` properties the same way you would for any user profile property. This example retrieves the value associated with `user_metadata.hobby` using the example user metadata listed above:

```js
lock.getUserInfo(accessToken, function(error, profile) {
  if (!error) {
    document.getElementById('hobby').textContent = profile.user_metadata.hobby;
  }
});
```

For details on how to initialize `lock` refer to [Auth0Lock(clientID, domain, options)](https://github.com/auth0/lock#new-auth0lockclientid-domain-options).

## Keep Reading

* [Manage User Metadata](/users/guides/manage-user-metadata)
* [Update Metadata Properties with the Management API](/users/guides/update-metadata-properties-with-management-api)
* [User Data Storage Best Practices](/users/references/user-data-storage-best-practices)
* [Metadata Field Name Rules](/users/references/metadata-field-name-rules)