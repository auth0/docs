## Calling the API from your application

You can call the API from your client application by passing an access token in the `Authorization` header of your HTTP request as a Bearer token. 

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

## Obtaining an access token for testing

If you want to test your API outside your application, for example from the command line or a tool like Postman, you can obtain an access token using the [Authentication API Debugger Extension](/extensions/authentication-api-debugger) or from the **Test** tab in your [API settings](${manage_url}/#/apis).

You can also obtain an access token using [cUrl](https://curl.haxx.se/) by using the [Client Credentials](/api/authentication#client-credentials) or [Resource Owner Password](api/authentication#resource-owner-password) authorization flows.

**1. Using Client Credentials**

```text
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/json' \
  --data '{ "client_id":"${account.clientId}", "client_secret": "${account.clientSecret}", "audience": "YOUR_API_AUDIENCE", "grant_type": "client_credentials" }'
```

**2. Using Resource Owner Password**

```text
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/json' \
  --data '{ "client_id":"${account.clientId}", "client_secret": "${account.clientSecret}", "audience": "YOUR_API_AUDIENCE", "grant_type": "password", "username": "USERNAME", "password": "PASSWORD", "scope": "SCOPE" }'
```

## Test Your API with cURL

You can test your API using [cURL](https://curl.haxx.se/) using an access token you obtained before.

**1. Calling the secure endpoint**

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

**2. Testing the scoped endpoint**

To test the endpoint that require a scope, pass the access token containing the correct scope as a Bearer token in the Authorization header:

```text
curl -i http://localhost:3010/api/private-scoped \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

If the required scope is present, the API call is successful:

![Response for scoped API request](/media/articles/server-apis/using/private-scoped.png)

If the required scope is not present, the API returns a 403 HTTP Status (Forbidden):

![Response for forbidden scoped API request](/media/articles/server-apis/using/private-scoped-forbidden.png)
