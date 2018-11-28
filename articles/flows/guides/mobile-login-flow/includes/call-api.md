## Call your API

To call your API from a native/mobile application, the application must pass the retrieved Access Token as a Bearer token in the Authorization header of your HTTP request.

```har
{
  "method": "GET",
  "url": "YOUR_API_URL", // example: https://someapi.com/api
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "Bearer YOUR_ACCESS_TOKEN" }
  ]
}
```
