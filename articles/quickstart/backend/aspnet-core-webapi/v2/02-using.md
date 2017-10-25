---
title: Using your API
description: This tutorial will show you how can test your API using Postman
budicon: 500
---

To make calls to your API, you need an access token. 

::: note
Depending on the application you are building, you obtain the access token differently. To learn more about how to get the access token, read the [API Authorization](/api-auth) section.
:::

In the HTTP request, in the `Authorization` header, add the access token as a Bearer token. 

You can choose between two options:
* Use a RAW request
* Use [RestSharp](http://restsharp.org/)

The example below shows how to use a RAW request.

```text
GET /api/ping/secure HTTP/1.1
Host: localhost:5000
Authorization: Bearer <your access_token>
```

The example below shows how to use RestSharp.

```csharp
var client = new RestClient("http://localhost:5000/api/ping/secure");
var request = new RestRequest(Method.GET);
request.AddHeader("authorization", "Bearer <your access_token>");
IRestResponse response = client.Execute(request);
```

## Test Your API in Postman

During development, you may want to test your API with [Postman](https://www.getpostman.com/docs). 

If you make a request to the `/ping/secure` endpoint, the API returns a 401 HTTP status code (Unauthorized):

![Unauthorized request in Postman](/media/articles/server-apis/aspnet-core-webapi/postman-not-authorized.png)

You need to pass along an access token in the HTTP Authorization header. You can obtain the token for test purposes from the **Test** tab in your [API settings](${manage_url}/#/apis):

![Obtain a JWT](/media/articles/server-apis/aspnet-core-webapi/request-access-token.png)

In the Authorization header, pass the access token along as a Bearer token:

![Authorized request in Postman](/media/articles/server-apis/aspnet-core-webapi/postman-authorized.png)

To test the endpoints that require a scope, pass the access token containing the correct scope as a Bearer token in the Authorization header.

If the required scope is present, the API call is successful:

![](/media/articles/server-apis/aspnet-core-webapi/scope-success.png)

If the required scope is not present, the API returns a 403 HTTP Status (Forbidden):

![](/media/articles/server-apis/aspnet-core-webapi/scope-forbidden.png)