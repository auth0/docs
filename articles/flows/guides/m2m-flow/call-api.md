You can call the API from your application by passing an Access Token in the Authorization header of your HTTP request as a Bearer token.

cURL C# Go Java jQuery Node.JS ...
curl --request GET \
  --url http://localhost:3010/api/private \
  --header 'authorization: Bearer YOUR_ACCESS_TOKEN'
