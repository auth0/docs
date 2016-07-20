# Working with Client Metadata in Rules

You may include an optional `client_metadata` property as part of the `Client` object. For existing clients, there is no value for this property.

```json
{
  "client_metadata": {
    "usersuppliedkey1": "valueforkey"
  }
}
```

The keys (`usersuppliedkey1`) and values (`valueforkey`) are strings with a maximum length of 255 characters each.

You may have a maximum of ten keys in `client_metadata`.

## Creating Clients with Metadata Properties

When creating a new `client` object via the `POST /api/v2/clients` endpoint, you may include a `client_metadata` object.

```har
{
	"method": "POST",
	"url": "https://${uiURL}/api/v2/clients",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer ABCD"
	}],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "{\"name\": \"\",\"client_metadata\": {\"usersuppliedkey1\": \"valueforkey\"}}"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

## Reading Client Metadata

`client_metadata` is included in the response to the `GET /api/v2/clients` and `GET /api/v2/client/{id}` endpoints.

To get a list of **all** client applications:

```har
{
    "method": "GET",
    "url": "https://${uiURL}/api/v2/clients",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [
      { "name": "Authorization", "value": "Bearer ABCD" }
    ],
    "queryString" : [],
    "postData" : {},
    "headersSize" : -1,
    "bodySize" : -1,
    "comment" : ""
}
```

To get a specific client via ID:

```har
{
    "method": "GET",
    "url": "https://${uiURL}/api/v2/clients/{id}",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [
      { "name": "Authorization", "value": "Bearer ABCD" }
    ],
    "queryString" : [],
    "postData" : {},
    "headersSize" : -1,
    "bodySize" : -1,
    "comment" : ""
}
```

## Updating

## Deleting

## Considerations
