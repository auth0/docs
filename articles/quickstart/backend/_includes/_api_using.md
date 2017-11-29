## Calling the API from your application

You can call the API from your client application by passing the access token in the `Authorization` header of your HTTP request as a Bearer token. 

```har
{
  "method": "GET",
  "url": "http://localhost:3010/api/private",
  "headers": [
    { "name": "Authorization", "value": "Bearer YOUR_ACCESS_TOKEN" }
  ]
}
```

For more information on obtaining an access token in your application, please refer to the relant client Quickstarts:

* [Single Page Applications](/quickstart/spa)
* [Mobile / Native Application](/quickstart/native)

## Test Your API with cURL

During development you can test your API using [cUrl](https://curl.haxx.se/). You can easily obtain an access token for testing using either the [Authentication API Debugger Extension](/extensions/authentication-api-debugger) or from the **Test** tab in your [API settings](${manage_url}/#/apis).

You can make a request to the `/api/secure` endpoint without passing any access token:

```text
curl -i http://localhost:3010/api/private
```

The API will return a 401 HTTP (Unauthorized) status code:

![Response for unauthorized API request](/media/articles/server-apis/using/private-unauthorized.png)

Once again, make the same request but this time pass along the access token as a Bearer token in the **Authorization** header of the request:

```text
curl -i http://localhost:3010/api/private \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

This time the API will return a successful response:

![Response for authorized API request](/media/articles/server-apis/using/private.png)

To test the endpoint that require a scope, pass the access token containing the correct scope as a Bearer token in the Authorization header:

```text
curl -i http://localhost:3010/api/private-scoped \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

If the required scope is present, the API call is successful:

![Response for scoped API request](/media/articles/server-apis/using/private-scoped.png)

If the required scope is not present, the API returns a 403 HTTP Status (Forbidden):

![Response for forbidden scoped API request](/media/articles/server-apis/using/private-scoped-forbidden.png)
