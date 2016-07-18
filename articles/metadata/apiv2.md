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
	"url": "https://${uiUrl}/api/v2/users",
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
