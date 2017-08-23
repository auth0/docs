---
description: How to retrieve and update metadata through the Auth0 APIs.
crews: crew-2
toc: true
---

# Metadata with Auth0 APIs

### Management API

Using [Auth0's Management APIv2](/api/management/v2), you can create a user and set both their `app_metadata` and `user_metadata`. You can also update these two fields.

::: note
The Auth0 Management APIv2 token is required to call the Auth0 Management API. [Click here to learn more about how to get a Management APIv2 Token.](/api/management/v2/tokens)
:::

### Authentication API

Using the [Authentication API Signup endpoint](/api/authentication?javascript#signup) you can create a new user for database connections and set the `user_metadata` field.

## Management API: Set Metadata Fields on Creation

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

you would make the following `POST` call to the [Create User endpoint of the Management API](/api/management/v2#!/Users/post_users), to create the user and set the property values:

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

## Management API: Retrieve User Metadata

To retrieve a user's metadata make a `GET` request to the [Get User endpoint of the Management API](/api/management/v2#!/Users/get_users_by_id).

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

Make the following `GET` request:

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/api/v2/users/user_id",
  "httpVersion": "HTTP/1.1",
  "cookies": [],
  "headers": [{
    "name": "Authorization",
    "value": "Bearer ABCD"
  }, {
    "name": "Content-Type",
    "value": "application/json"
  }],
  "queryString": [{
    "name": "fields",
    "value": "user_metadata",
    "comment": ""
  },
  {
    "name": "include_fields",
    "value": "true",
    "comment": ""
  }],
  "headersSize": -1,
  "bodySize": -1,
  "comment": ""
}
```

The response will be as follows:

```json
{
  "user_metadata": {
      "hobby": "surfing"
  }
}
```

## Management API: Update User Metadata

You can update a user's metadata by making a `PATCH` call to the [Update User endpoint of the Management API](/api/management/v2#!/Users/patch_users_by_id).

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

you would make the following `PATCH` call:

```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/users/user_id",
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

::: note
When you send a `PATCH` call where you've set the property/value to null (for example, `{user_metadata: {color: null}}`), Auth0 **deletes** the property/value from the database.
:::

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
