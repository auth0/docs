---
url: /metadata
---

# User Metadata

Auth0 allows you to store **metadata**, or data related to each user that has not come from the identity provider. There are two kinds of metadata:

* **user_metadata**: stores user attributes, such as user preferences, that don't impact a user's core functionality;
* **app_metadata**: stores information such as a user's support plan, security roles, or access control groups, which can impact a user's core functionality, such as how an application functions and/or what the user can access.

Please note that:

* Both metadata fields are limited to a size of 16 megabytes;
* An authenticated user may modify data in their profile's `user_metadata`, but nothing in their `app_metadata`.

## Metadata Usage

Suppose the following data is stored for a user with the email address "jane.doe@example.com":

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

**Note**: Any valid JSON snippet may be used as metadata.

To read metadata, simply access the correct property. For example, suppose you wanted to work with the values of the following properties in your Rules or via a call to the Management API:

```js
console.log(user.email); // "jane.doe@example.com"
console.log(user.user_metadata.hobby); // "surfing"
console.log(user.app_metadata.hobby); // "full"
```

> **Note**: With APIv1, all metadata was stored in the `metadata` field. Data stored in this field will now be available under `app_metadata`.

### Naming Metadata Fields

Metadata field names must not contain a dot. For example, use of the following returns an Internal Server (500) error:

```json
{
    "preference.color": "pink"
}
```

One way of handling this is to nest the attributes:

```json
    {
        "preference": {
            "color": "pink"
        }
    }
```

Alternately, you may use a delimiter that is neither the `.` nor `$`.

Note that the usage of the `.` delimiter is acceptable in the actual data values:

```json
{
    "preference": "light.blue"
}
```

## Further Reading

* [Using Metadata in Rules](/metadata/rules)
* [Using Metadata with APIv2](/metadata/apiv2)
* [Using Metadata with Auth0 Lock](/metadata/lock)
