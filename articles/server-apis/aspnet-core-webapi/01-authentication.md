---
title: Authentication
name: Shows how to secure your API using the standard JWT middeware
description: Shows how to secure your API using the standard JWT middeware.
budicon: 500
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-aspnetcore-webapi-sample',
  path: '01-Authentication',
  requirements: [
    '.NET Core 1.0',
    'Visual Studio 2015 Update 3 (Optional)',
    'Visual Studio Code (Optional)'
  ]
}) %>

::: panel-info Signing Algorithm
Auth0 can sign JSON Web Tokens (JWT) using either a symmetric key (HS256) or an asymmetric key (RS256). It is recommended that you use RS256 and that is what is demonstrated in this quickstart. 

If however you want to use HS256, then please go to the [Authentication using HS256](/quickstart/backend/aspnet-core-webapi/03-authentication-hs256) tutorial.
:::

## 1. Configure the JWT Middleware

You will need to add the JWT middleware to your application's middleware pipeline.

Go to the `Configure` method of your `Startup` class and add a call to `UseJwtBearerAuthentication` passing in the configured `JwtBearerOptions`. The `JwtBearerOptions` needs to specify your Auth0 API Identifier as the `Audience`, and the full path to your Auth0 domain as the `Authority`:

```csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
{
    loggerFactory.AddConsole(Configuration.GetSection("Logging"));
    loggerFactory.AddDebug();

    var options = new JwtBearerOptions
    {
        Audience = Configuration["Auth0:ApiIdentifier"],
        Authority = $"https://{Configuration["Auth0:Domain"]}/"
    };
    app.UseJwtBearerAuthentication(options);

    app.UseMvc();
}
```

### Signature Validation

Before we carry on, a quick word about the verification of the JWT, as the configuration above may af first glance seem very simplistic.

The JWT middleware will automatically use the `Authority` to verify the issuer of the JWT, and the `Audience` to verify the audience. These values need match the values in the token exactly, so ensure you specify the trailing backslash (`/`) for the `Authority` as this is a fairly common reason for tokens not verifying correctly.

Next, it will seem as though the JWT middleware configuration above is insecure since the signature is not explicitly verified anywhere. This is however not true, as the JWT middleware will interrogate the `/.well-known/openid-configuration` endpoint at the URL specified in the `Authority` property to discover the JSON Web Key Set (JWKS) document. It will then download the JSON Web Key which is used to subsequently verify the token.

This can be confirmed by looking at the Fiddler trace in the screenshot below. Notice that the first time a call is made to the API, that the JWT middleware downloads the JWKS document:

![Fiddler trace of retrieval of JWK](/media/articles/server-apis/aspnet-core-webapi/fiddler.png)

If someone tries to create a JWT with another key set the signature verification will fail:

![Console output with incorrectly signed JWT](/media/articles/server-apis/aspnet-core-webapi/console-output.png)

## 2. Securing an API endpoint

The JWT middleware integrates with the standard ASP.NET Core [Authentication](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/) and [Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/) mechanisms.

You only need to decorate your controller action with the `[Authorize]` attribute to secure an endpoint:

```csharp
[Route("api")]
public class PingController : Controller
{
    [Authorize]
    [HttpGet]
    [Route("ping/secure")]
    public string PingSecured()
    {
        return "All good. You only get this message if you are authenticated.";
    }
}
```

## 3. Using your API

In order to make calls to your API, you will need to obtain an `access_token`. An `access_token` can be obtained in a number of ways, depending on the type of application your are building. These are referred to as authorization grant flows. Please see the [API Authorization section](/api-auth) for more information of the types of flows and to determine which one is most appropriate for your application.

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

## 4. Testing your API in Postman

During development you may want to test your API with Postman.

If you make a request to the `/ping/secure` endpoint you will notice that the API returns an HTTP status code 401 (Unauthorized):

![Unauthorized request in Postman](/media/articles/server-apis/aspnet-core-webapi/postman-not-authorized.png)

As mentioned in the previous step, you will need to pass along an `access_token` in the HTTP Authorization header. A quick and easy way to obtain an `access_token` for test purposes is from the __Test__ tab of your API settings: 

![Obtain a JWT](/media/articles/server-apis/aspnet-core-webapi/request-access-token.png)

You can then use the `access_token` and pass it along in the Authorization header as a Bearer token:

![Authorized request in Postman](/media/articles/server-apis/aspnet-core-webapi/postman-authorized.png)

## Next Step

To learn how to allow only clients who were granted a certain `scope` access to a particular API endpoint, please continue with the [Authorization](/quickstart/backend/aspnet-core-webapi/02-authorization) tutorial.
