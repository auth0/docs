---
title: Using your API
description: This tutorial will show you how can test your API using Postman
budicon: 500
---

In order to make calls to your API, you will need to obtain an `access_token`. An `access_token` can be obtained in a number of ways, depending on the type of application you are building. These are referred to as authorization grant flows, and you can refer to the [API Authorization section](/api-auth) for more information of the types of flows and to determine which one is most appropriate for your client application.

Once you have obtained an `access_token` you can pass that along in the `Authorization` header of requests to your API as a Bearer token.

Here is a sample RAW request:

```text
GET /api/ping/secure HTTP/1.1
Host: localhost:5000
Authorization: Bearer <your access_token>
```

Or using [RestSharp](http://restsharp.org/):

```csharp
var client = new RestClient("http://localhost:5000/api/ping/secure");
var request = new RestRequest(Method.GET);
request.AddHeader("authorization", "Bearer <your access_token>");
IRestResponse response = client.Execute(request);
```

## Testing your API in Postman

During development, you may want to test your API with Postman. If you make a request to the `/ping/secure` endpoint you will notice that the API returns an HTTP status code 401 (Unauthorized):

![Unauthorized request in Postman](/media/articles/server-apis/aspnet-core-webapi/postman-not-authorized.png)

As mentioned, you will need to pass along an `access_token` in the HTTP Authorization header. A quick and easy way to obtain an `access_token` for test purposes is from the __Test__ tab of your API settings:

![Obtain a JWT](/media/articles/server-apis/aspnet-core-webapi/request-access-token.png)

You can then use the `access_token` and pass it along in the Authorization header as a Bearer token:

![Authorized request in Postman](/media/articles/server-apis/aspnet-core-webapi/postman-authorized.png)

To test the endpoints which require a `scope`, pass an `access_token` containing the correct `scope` as a Bearer token in the Authorization header.

If the required `scope` is present, the API call will succeed:

![](/media/articles/server-apis/aspnet-core-webapi/scope-success.png)

If the required `scope` is not present, an HTTP Status 403 (Forbidden) will be returned:

![](/media/articles/server-apis/aspnet-core-webapi/scope-forbidden.png)

## Further Reading

* If your experience problems with your API, please refer to the [Troubleshooting section](/quickstart/backend/aspnet-core-webapi/03-troubleshooting).
