## Call your API

To call your API from a regular web application, the application must pass the retrieved Access Token as a Bearer token in the Authorization header of your HTTP request.

```har
{
  "method": "GET",
  "url": "YOUR_API_URL",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "Bearer YOUR_ACCESS_TOKEN" }
  ]
}
```
