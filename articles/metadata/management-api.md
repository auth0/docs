---
description: How to update metadata through the Auth0 Management API.
---

# Using Metadata with Auth0's Management API

Using Auth0's Management APIv2, you can create a user and set both their `app_metadata` and `user_metadata`. You can also update these two fields.

## Set User Metadata Fields on Creation

For example, to create a user with the following profile details:

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

you would make the following `POST` call to the Management API to create the user and set the property values:

```har
{
  "method": "POST",
  "url": "https://YOURACCOUNT.auth0.com/api/v2/users",
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

## Update User Metadata

You can update a user's metadata by making the appropriate `PATCH` call to the Management API.

Assuming you created the user as shown above with the following metadata values:

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

To update `user_metadata` and add the user's home address as a second-level property:

```json
{
    "addresses": {
        "home": "123 Main Street, Anytown, ST 12345"
    }
}
```

you would make the following `PATCH` call to the API:

```har
{
  "method": "PATCH",
  "url": "https://YOURACCOUNT.auth0.com/api/v2/users/user_id",
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
    "text": "{\"user_metadata\": {\"addresses\": {\"home\": \"123 Main Street, Anytown, ST 12345\"}}}"
  },
  "headersSize": -1,
  "bodySize": -1,
  "comment": ""
}
```

The user's profile will now appear as follows:

```json
{
    "email": "jane.doe@example.com",
    "user_metadata": {
        "hobby": "surfing",
        "addresses": {
            "home": "123 Main Street, Anytown, ST 12345"
        }
    },
    "app_metadata": {
        "plan": "full"
    }
}
```

### Merging

Only properties at the root level are merged into the object. All lower-level properties will be replaced.

For example, to add a user's work address as an additional inner property, you would have to include the complete contents of the `addresses` property. Since the `addresses` object is a root-level property, it will be merged into the final JSON object representing the user, but its sub-properties will not.

```json
{
  "user_metadata": {
    "addresses": {
      "home": "123 Main Street, Anytown, ST 12345",
      "work": "100 Industrial Way, Anytown, ST 12345"
    }
  }
}
```

Therefore, the corresponding `PATCH` call to the API would be:

```har
{
  "method": "PATCH",
  "url": "https://YOURACCOUNT.auth0.com/api/v2/users/user_id",
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
    "text": "{\"user_metadata\": {\"addresses\": {\"home\": \"123 Main Street, Anytown, ST 12345\", \"work\": \"100 Industrial Way, Anytown, ST 12345\"}}}"
  },
  "headersSize": -1,
  "bodySize": -1,
  "comment": ""
}
```
