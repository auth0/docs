## Calling the API from your application

You can call the API from your application by passing an Access Token in the `Authorization` header of your HTTP request as a Bearer token.

```har
{
  "method": "GET",
  "url": "http://localhost:3010/api/private",
  "headers": [
    { "name": "Authorization", "value": "Bearer YOUR_ACCESS_TOKEN" }
  ]
}
```

## Obtaining an Access Token

If you are calling the API from a Single-Page Application or a Mobile/Native application, after the authorization flow is completed, you will get an Access Token. How you get the token and how you make the call to the API will be dependent on the type of application you are developing and the framework you are using. For more information refer to the relevant application Quickstarts which contain detailed instructions:

* [Single-Page Applications](/quickstart/spa)
* [Mobile / Native Application](/quickstart/native)

If you are calling the API from a command-line tool or another service, where there isn't a user entering their credentials, you need to use the [OAuth Client Credentials flow](/api/authentication#client-credentials). To do that, register a [Machine to Machine Application](${manage_url}/#/applications), and then subsequently use the **Client ID** and **Client Secret** of this application when making the request below and pass those along in the `client_id` and `client_secret` parameters respectively. Also include the Audience for the API you want to call.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/x-www-form-urlencoded" }
  ],
  "postData": {
    "mimeType": "application/x-www-form-urlencoded",
    "params": [
      {
        "name": "grant_type",
        "value": "client_credentials"
      },
      {
        "name": "client_id",
        "value": "${account.clientId}"
      },
      {
        "name": "client_secret",
        "value": "YOUR_CLIENT_SECRET"
      },
      {
        "name": "audience",
        "value": "YOUR_API_IDENTIFIER"
      }
    ]
  }
}
```

:::note
Auth0 customers are billed based on the number of Machine to Machine Access Tokens issued by Auth0. Once your application gets an Access Token it should keep using it until it expires, to minimize the number of tokens requested.
:::

For testing purposes, you can also get an Access Token from the **Test** tab in your [API settings](${manage_url}/#/apis).

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

To test the endpoint that requires a scope, pass the Access Token containing the correct scope as a Bearer token in the Authorization header:

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