## Make a Call to Your API

To make calls to your API, you need an access token. You can get an access token for testing purposes from the test lab in your [API settings](${manage_url}/#/apis)

![Obtain a JWT](/media/articles/server-apis/aspnet-core-webapi/request-access-token.png)

Provide the access token as an `Authorization` header in your requests.

```har
{
  "method": "GET",
  "url": "http://your-domain.com/api_path",
  "headers": [
    { "name": "Authorization", "value": "Bearer YOUR_ACCESS_TOKEN_HERE" }
  ]
}
```
