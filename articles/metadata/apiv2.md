# Using Metadata with Auth0's Management APIv2

Using Auth0's Management API, you may create a user and set both its `app_metadata` and `user_metadata`. You may also update those two fields.

## Setting a User's Metadata Fields on Creation

Suppose you wanted to create a user with the following profile details:

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

The following `POST` call to the Management API will create the user and set the property values as necessary:

```har
{
	"method": "POST",
	"url": "https://${uiURL}/api/v2/users",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer ABCD"
	}],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "{\"emails\": \"jane.doe@example.com\", \"user_metadata\": {\"hobby\": \"surfing\"}, \"app_metadata\": {\"plan\": \"full\"}}"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

## Updating a User's Metadata

You may update a user's metadata by making the appropriate `PATCH` call to the Management API.

We've created a user with the following metadata values:

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
Suppose we wanted to update the `user_metadata` and add the user's home address as a second-level property:

```json
{
    "addresses": {
        "home": "123 Main Street, Anytown, ST 12345"
    }
}
```

The `PATCH` call to the API would therefore be:

```har
{
	"method": "POST",
	"url": "https://${uiURL}/api/v2/users/{id}",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer ABCD"
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

The user's profile now appears as follows:

```json
{
    "emails": "jane.doe@example.com",
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

**Note:** Only properties at the root level are merged in to the object. All others replace the existing value. The following example demonstrates an example of this merging.

If we were to add the user's work address as an additional inner property, we have to send over the entire address block. Because the `addresses` object is a root-level property, it will be merged into the final JSON object representing the user, but its *properties* will not.

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

The `PATCH` call to the API would therefore be:

```har
{
	"method": "POST",
	"url": "https://${uiURL}/api/v2/users/{id}",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer ABCD"
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
