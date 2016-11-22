---
title: Authentication (HS256) - API Auth
name: Shows how to secure your API using the standard JWT middeware
description: Shows how to secure your API using the standard JWT middeware
budicon: 500
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-aspnetcore-webapi-sample',
  path: '05-Authentication-HS256-ApiAuth',
  requirements: [
    '.NET Core 1.0',
    'Visual Studio 2015 Update 3 (Optional)',
    'Visual Studio Code (Optional)'
  ]
}) %>

<%= include('../../_includes/_api_auth_intro') %>

<%= include('../../api-auth/_region-support') %>

Auth0 can sign JSON Web Tokens (JWT) using either a symmetric key (HS256) or an asymmetric key (RS256). This particular document will describe how to configure Auth0 to sign tokens using HS256.

> If you want to use RS256 then please go to the [Authentication using RS256](/quickstart/backend/aspnet-core-webapi/04-authentication-rs256-apiauth) tutorial.

## 1. Enable OAuth 2.0 API Authorization

<%= include('../../_includes/_configure_oauth2aas') %>

## 2. Create a Resource Server (API)

In the [APIs section]("${manage_url}/#/apis) of the Auth0 Dashboard, click the **Create API** button. Provide a **Name** and **Identifier** for your API. Be sure to choose the HS256 signing algorithm.

![Create API](/media/articles/server-apis/aspnet-core-webapi/create-api-hs256.png)

After you have created the API, navigate to the **Settings** tab of the API, and take note of the **API Identifier** and **Signing Secret**, as it will be used configuring the JWT middleware.

## 3. Update your settings

When using HS256, you will need your API's **Signing Secret** when configuring the JWT middleware, so be sure update the `appsettings.json` file included in the seed project to also add an **ApiSecret** attribute with the value of the **Signing Secret**, and be sure to set the correct values for the **Domain** and **ApiIdentifier** attributes:

```json
{
  "Auth0": {
    "Domain": "${account.namespace}",
    "ApiIdentifier": "YOUR_API_IDENTIFIER",
    "ApiSecret": "YOUR_API_SECRET"
  }
}
```

## 4. Configure the JWT Middleware

You will need to add the JWT middleware to your application's middleware pipeline.

Go to the `Configure` method of your `Startup` class and add a call to `UseJwtBearerAuthentication` passing in the configured `JwtBearerOptions`. The `JwtBearerOptions` needs to specify your Auth0 Domain as the `ValidIssuer`, the API Identifier as the `ValidAudience`, and the Signing Secret as the `IssuerSigningKey`:

```csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
{
    loggerFactory.AddConsole(Configuration.GetSection("Logging"));
    loggerFactory.AddDebug();

    var options = new JwtBearerOptions
    {
        TokenValidationParameters =
        {
            ValidIssuer = $"https://{Configuration["Auth0:Domain"]}/",
            ValidAudience = Configuration["Auth0:ApiIdentifier"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Auth0:ApiSecret"]))
        }
    };
    app.UseJwtBearerAuthentication(options);

    app.UseMvc();
}
```

::: panel-warning Do not forget the trailing backslash
Please ensure that the URL specified for `ValidIssuer` contains a trailing backslash as this needs to match exactly with the issuer claim of the JWT. This is a common misconfiguration error which will cause your API calls to not be authenticated correctly.
:::

## 5. Securing an API endpoint

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

## 6. Using your API

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

## 7. Testing your API in Postman

During development you may want to test your API with Postman.

If you make a request to the `/ping/secure` endpoint you will notice that the API returns an HTTP status code 401 (Unauthorized):

![Unauthorized request in Postman](/media/articles/server-apis/aspnet-core-webapi/postman-not-authorized.png)

As mentioned in the previous step, you will need to pass along an `access_token` in the HTTP Authorization header. A quick and easy way to obtain an `access_token` for test purposes is from the __Test__ tab of your API settings: 

![Obtain a JWT](/media/articles/server-apis/aspnet-core-webapi/request-access-token.png)

You can then use the `access_token` and pass it along in the Authorization header as a Bearer token:

![Authorized request in Postman](/media/articles/server-apis/aspnet-core-webapi/postman-authorized.png)
