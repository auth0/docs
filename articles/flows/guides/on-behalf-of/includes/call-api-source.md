## Call your Source API

To call your Source API from an application, the application must pass the retrieved Access Token as a Bearer token in the Authorization header of your HTTP request.


 ```har
{
  "method": "GET",
  "url": "https://mysourceapi.com/api",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "Bearer ACCESS_TOKEN" }
  ]
}
```
