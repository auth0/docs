## Calling the API from your application

You can call the API from your client application by passing an Access Token in the `Authorization` header of your HTTP request as a Bearer token. 

```har
{
  "method": "GET",
  "url": "http://localhost:3010/api/private",
  "headers": [
    { "name": "Authorization", "value": "Bearer YOUR_ACCESS_TOKEN" }
  ]
}
```

The exact implementation will be dependent on the type of application you are developing and the framework you are using. For more information refer to the relevant client Quickstarts which contain detailed instructions:

* [Single Page Applications](/quickstart/spa)
* [Mobile / Native Application](/quickstart/native)

## Obtaining an Access Token for testing

If you want to test your API outside your application, for example from the command line or a tool like Postman, you can obtain an Access Token using the [Authentication API Debugger Extension](/extensions/authentication-api-debugger) or from the **Test** tab in your [API settings](${manage_url}/#/apis).

You can also obtain an Access Token using [cUrl](https://curl.haxx.se/) by using the [Client Credentials](/api/authentication#client-credentials) or [Resource Owner Password](api/authentication#resource-owner-password) authorization flows.

**1. Using Client Credentials**


```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"client_credentials\",\"client_id\": \"${account.clientId}\",\"client_secret\": \"${account.clientSecret}\",\"audience\": \"YOUR_API_IDENTIFIER\"}"
  }
}
```

When using the Client Credentials flow, you will need to register a [Non Interactive Client](/clients). You should then subsequently use the **Client ID** and **Client Secret** of this Non Interactive Client when making the request shown above and pass those along in the `client_id` and `client_secret` parameters respectively.

**2. Using Resource Owner Password**

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"password\",\"username\": \"user@example.com\",\"password\": \"pwd\",\"audience\": \"YOUR_API_IDENTIFIER\", \"scope\": \"read:messages\", \"client_id\": \"${account.clientId}\", \"client_secret\": \"${account.clientSecret}\"}"
  }
}
```

## Test Your API 

**1. Calling the secure endpoint**

You can make a request to the `/api/private` endpoint without passing any Access Token:

```har
{
  "method": "GET",
  "url": "http://localhost:3010/api/private"
}
```

The API will return a 401 HTTP (Unauthorized) status code:

![Response for unauthorized API request](/media/articles/server-apis/using/private-unauthorized.png)

Once again, make the same request but this time pass along the Access Token as a Bearer token in the **Authorization** header of the request:

```har
{
  "method": "GET",
  "url": "http://localhost:3010/api/private",
  "headers": [
    { "name": "Authorization", "value": "Bearer YOUR_ACCESS_TOKEN" }
  ]
}
```

This time the API will return a successful response:

![Response for authorized API request](/media/articles/server-apis/using/private.png)

**2. Testing the scoped endpoint**

To test the endpoint that require a scope, pass the Access Token containing the correct scope as a Bearer token in the Authorization header:

```har
{
  "method": "GET",
  "url": "http://localhost:3010/api/private-scoped",
  "headers": [
    { "name": "Authorization", "value": "Bearer YOUR_ACCESS_TOKEN" }
  ]
}
```

If the required scope is present, the API call is successful:

![Response for scoped API request](/media/articles/server-apis/using/private-scoped.png)

If the required scope is not present, the API returns a 403 HTTP Status (Forbidden):

![Response for forbidden scoped API request](/media/articles/server-apis/using/private-scoped-forbidden.png)
