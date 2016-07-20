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

## Working with Client Metadata Using the Auth0 Management Dashboard

You may make changes to the `client_metadata` property via the Clients tab of the Management Dashboard.

![](/media/articles/rules/metadata/clients.png)

1. Select the client whose metadata you'd like to update, and click on its associated "Settings" button.
2. Once the Settings page opens, scroll to the bottom of the page.
3. Click on "Show Advanced Settings."
4. Ensure that you are on the Application Metadata tab.

![](/media/articles/rules/metadata/client-metadata.png)

At this point, you may enter in the desired key/value pairs. Click "CREATE" to create and save.

To remove an existing key/value pair, click the "REMOVE" button associated with the pair you'd like to remove.

To update an existing key/value pair, provide the key and the *new* value to associate with that key. Click "UPDATE". You will be asked to confirm whether you want to continue overwriting the original value. To confirm, click "OVERWRITE" to save your changes.

![](/media/articles/rules/metadata/client-metadata.png)


## Working with Client Metadata Using Calls to the Auth0 Management API

You may create clients with the `client_metadata` property, as well as read, update, and delete the property using the appropriate calls to the Auth0 Management API.

### Creating Clients with Metadata Properties

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

### Reading Client Metadata

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

### Updating Client Metadata

Client metadata may be updated using the `PATCH /api/v2/clients/{id}` endpoint. You'll supply a client object with the client_metadata property, whose value is an object containing the metadata you'd like to change.

Suppose this is what the JSON representing your client looks like prior to the update:

```json
{
  "name": "myclient",
  "client_metadata": {
    "mycolor": "red",
    "myflavor": "grape"
  }
}
```

Suppose that you make a `PATCH /api/v2/client/myclientid123` with body:

```json
{
    "client_metadata": {
        "mycolor": "blue"
    }
}
```

A sample request:

```har
{
	"method": "PATCH",
	"url": "https://${uiURL}/api/v2/client/{id}",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer ABCD"
	}],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "{\"client_metadata\": {\"mycolor\": \"blue\"}}"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

After the update, the client will show the following data:

```json
{
  "name": "myclient",
  "client_metadata": {
    "mycolor": "blue",
    "myflavor": "grape"
  }
}
```
