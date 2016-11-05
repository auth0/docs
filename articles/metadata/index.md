---
description: "Auth0 allows you to store data related to each user that has not come from the identity provider as either of two kinds of metadata: user_metadata and app_metadata."
---

# User Metadata

Auth0 allows you to store **metadata**, or data related to each user that has not come from the identity provider. There are two kinds of metadata:

* **user\_metadata**: stores user attributes (such as user preferences) that do not impact a user's core functionality;
* **app\_metadata**: stores information (such as a user's support plan, security roles, or access control groups) that can impact a user's core functionality, such as how an application functions or what the user can access.

**NOTE**: An authenticated user can modify data in their profile's `user_metadata`, but not in their `app_metadata`.

## Metadata Usage

Suppose the following data is stored for a user with the email address `jane.doe@example.com`:

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

**NOTE**: Any valid JSON snippet can be used as metadata.

To read metadata, simply access the correct property. For example, if you want to work with the values of the following properties in your Rules or via a call to the Management API:

```js
console.log(user.email); // "jane.doe@example.com"
console.log(user.user_metadata.hobby); // "surfing"
console.log(user.app_metadata.plan); // "full"
```

**NOTE**: With Management APIv1, all metadata was stored in the `metadata` field. Data stored in this field is now available under `app_metadata`.

### Naming Metadata Fields

Metadata field names must not contain a dot. For example, use of the following returns a Bad Request (400) error:

```json
{
    "preference.color": "pink"
}
```

One way of handling this is to nest attributes:

```json
    {
        "preference": {
            "color": "pink"
        }
    }
```

Alternately, you can use any delimiter that is not  `.` or `$`.

However, the usage of the `.` delimiter is acceptable in the data values:

```json
{
    "preference": "light.blue"
}
```

## Further Reading

* [User Data Storage Guidance](/user-profile/user-data-storage)
* [Using Metadata in Rules](/metadata/rules)
* [Using Metadata with Management APIv2](/metadata/apiv2)
* [Using Metadata with Auth0 Lock](/metadata/lock)
