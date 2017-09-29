---
description: Auth0 allows you to store data related to each user that has not come from the identity provider as either of two kinds of metadata: user_metadata and app_metadata.
crews: crew-2
---
# Metadata

Auth0 allows you to store **metadata**, or data related to each user that has not come from the identity provider. There are two kinds of metadata:

* **user_metadata**: stores user attributes (such as user preferences) that do not impact a user's core functionality;
* **app_metadata**: stores information (such as a user's support plan, security roles, or access control groups) that can impact a user's core functionality, such as how an application functions or what the user can access.

::: note
An authenticated user can modify data in their profile's `user_metadata`, but not in their `app_metadata`.
:::

## How to Read, Create or Edit Metadata

You can manage your metadata using [Rules](/rules/metadata-in-rules) or the [Auth0 APIs](/metadata/management-api).

## Metadata Usage

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

### Naming Metadata Fields

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

Do not use dynamic field names. For example, instead of using the following structure...

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

...use the following structure...

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

## Searching Metadata

New tenants, starting September 1st 2017, cannot search any of the `app_metadata` fields. 

Paid tenants (i.e. tenants that have a credit card associated in the [Dashboard](${manage_url}/#/tenant/billing/payment)), that were created up to August 31st 2017, can search using the `app_metadata` fields.

For `user_metadata`, you can only search for profile information, such as `name`, `nickname`, `given_name`, or `family_name`.

## Metadata Restrictions

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

When setting the `user_metadata` field with the [Authentication API Signup endpoint](/api/authentication?javascript#signup) size is limited to no more than 10 fields and must be less than 500 characters.

## Using Lock to Manage Metadata

Users of the [Lock](/libraries/lock) widget are able to add new items to `user_metadata` as well as read `user_metadata` after authentication occurs.

* For information on adding `user_metadata` on signup, see the section in the Lock documentation on [Additional Signup Fields](/libraries/lock/v10/customization#additionalsignupfields-array-)
* When using Lock, you can read the user's `user_metadata` properties the same way you would for any other user profile property. This example retrieves the value associated with `user_metadata.hobby` and assigns it to an element on the page:

```js
// Use the accessToken acquired upon authentication to call getUserInfo
lock.getUserInfo(accessToken, function(error, profile) {
  if (!error) {
    document.getElementById('hobby').textContent = profile.user_metadata.hobby;
  }
});
```

::: note
For details on how to use Lock to authenticate users and access their profile information, check out the [Lock documentation](/libraries/lock).
:::

## Keep Reading

::: next-steps
* [Updating Metadata with Auth0 APIs](/metadata/management-api)
* [User Data Storage Guidance](/user-profile/user-data-storage)
* [Change a User's Picture](/user-profile/user-picture#change-a-user-s-picture)
:::
