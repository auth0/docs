## Make a Call to Your API

You can now make calls to your secure API. Provide the access token as an `Authorization` header in your requests.

```har
{
  "method": "GET",
  "url": "http://your-domain.com/api_path",
  "headers": [
    { "name": "Authorization", "value": "Bearer YOUR_ACCESS_TOKEN_HERE" }
  ]
}
```