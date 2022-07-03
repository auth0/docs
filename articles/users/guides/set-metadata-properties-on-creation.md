---
description: Describes how to set metadata properties on creation using the Management API.
topics: metadata
contentType: how-to
useCase: manage-users
v2: true
---

# Set Metadata Properties on Creation

To create a user with the following profile details:

```json
{
    "email": "jane.doe@example.com",
    "user_metadata": {
        "hobby": "surfing"
    },
    "app_metadata": {
        "plan": "full"
    }
}
```

Make the following `POST` call to the [Create User endpoint of the Management API](/api/management/v2#!/Users/post_users), to create the user and set the property values:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/api/v2/users",
  "httpVersion": "HTTP/1.1",
  "cookies": [],
  "headers": [{
    "name": "Authorization",
    "value": "Bearer ABCD"
  }, {
    "name": "Content-Type",
    "value": "application/json"
  }],
  "queryString": [],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"email\": \"jane.doe@example.com\", \"user_metadata\": {\"hobby\": \"surfing\"}, \"app_metadata\": {\"plan\": \"full\"}}"
  },
  "headersSize": -1,
  "bodySize": -1,
  "comment": ""
}
```
::: panel Define User Metadata on Signup
For information on adding `user_metadata` on signup, see the section on Lock [Additional Signup Fields](/libraries/lock/v10/customization#additionalsignupfields-array-)
:::

## Keep Reading

* [Manage User Metadata](/users/guides/manage-user-metadata)
* [Read Metadata](/users/guides/read-metadata)
* [Update Metadata with the Management API](users/guides/update-metadata-properties-with-management-api)
* [User Data Storage Best Practices](/best-practices/user-data-storage-best-practices)
* [User Data Storage Scenario](/users/references/user-data-storage-scenario)