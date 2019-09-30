## Call Your Target API

To call your Target API from your Source API, the Source API must pass the retrieved Access Token for the Target API as a Bearer token in the Authorization header of your HTTP request.


 ```har
{
  "method": "GET",
  "url": "https://mytargetapi.com/api",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "Bearer TARGET_API_ACCESS_TOKEN" }
  ]
}
```
