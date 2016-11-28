---
title: Authentication
name: Shows how to secure your API using the standard JWT middeware
budicon: 500
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-aspnet-owin-webapi-sample',
  path: '01-Authentication/WebApi',
  requirements: [
    'Microsoft Visual Studio 2015 Update 3',
    'Microsoft.Owin.Security.Jwt NuGet Package V3.0.1',
    'System.IdentityModel.Tokens.Jwt NuGet Package v4.0.2',
    'Auth0.OpenIdConnectSigningKeyResolver NuGet Package v1.0.0'
  ]
}) %>

## 1. Configure the JWT Middleware

To assist in verifying the signature of RS256 tokens you will need to install the `Auth0.OpenIdConnectSigningKeyResolver` NuGet package:

```text
Install-Package Auth0.OpenIdConnectSigningKeyResolver
```

This package will automatically download the JSON Web Key Set which was used to sign the RS256 tokens by interrogating the OpenID Connect Configuration endpoint (at `/.well-known/openid-configuration`). You can then use it subsequently to resolve the Issuer Signin Key, as will be demonstrated in the JWT registration code below.

Go to the `Configuration` method of your `Startup` class and add a call to `UseJwtBearerAuthentication` passing in the configured `JwtBearerAuthenticationOptions`.

The `JwtBearerAuthenticationOptions` needs to specify your Auth0 API Identifier in the `ValidAudience` property, and the full path to your Auth0 domain as the `ValidIssuer`. You will need to configure the `IssuerSigningKeyResolver` to use the instance of `OpenIdConnectSigningKeyResolver` to resolve the signing key: 

```csharp
public void Configuration(IAppBuilder app)
{
    var domain = $"https://{ConfigurationManager.AppSettings["Auth0Domain"]}/";
    var apiIdentifier = ConfigurationManager.AppSettings["Auth0ApiIdentifier"];

    var keyResolver = new OpenIdConnectSigningKeyResolver(domain);
    app.UseJwtBearerAuthentication(
        new JwtBearerAuthenticationOptions
        {
            AuthenticationMode = AuthenticationMode.Active,
            TokenValidationParameters = new TokenValidationParameters()
            {
                ValidAudience = apiIdentifier,
                ValidIssuer = domain,
                IssuerSigningKeyResolver = (token, securityToken, identifier, parameters) => keyResolver.GetSigningKey(identifier)
            }
        });

    // Configure Web API
    WebApiConfig.Configure(app);
}
```

::: panel-warning Do not forget the trailing backslash
Please ensure that the URL specified for `ValidIssuer` contains a trailing backslash as this needs to match exactly with the issuer claim of the JWT. This is a common misconfiguration error which will cause your API calls to not be authenticated correctly.
:::

## 2. Securing an API endpoint

The JWT middleware integrates with the standard ASP.NET Authentication and Authorization mechanisms, so you only need to decorate your controller action with the `[Authorize]` attribute to secure an endpoint:

```csharp
[RoutePrefix("api")]
public class PingController : ApiController
{
    [Authorize]
    [HttpGet]
    [Route("ping/secure")]
    public IHttpActionResult PingSecured()
    {
        return Ok(new
        {
            Message = "All good. You only get this message if you are authenticated."
        }
        );
    }
}
```

## 3. Using your API

In order to make calls to your API, you will need to obtain an `access_token`. An `access_token` can be obtained in a number of ways, depending on the type of application your are building. These are referred to as authorization grant flows. Please see the [API Authorization section](/api-auth) for more information of the types of flows and to determine which one is most appropriate for your application.

Once you have obtained an `access_token` you can pass that along in the `Authorization` header of requests to your API as a Bearer token.

Here is a sample RAW request:

```text
GET /api/ping/secure HTTP/1.1
Host: localhost:58105
Authorization: Bearer <your access_token>
```

Or using [RestSharp](http://restsharp.org/):

```csharp
var client = new RestClient("http://localhost:58105/api/ping/secure");
var request = new RestRequest(Method.GET);
request.AddHeader("authorization", "Bearer <your access_token>");
IRestResponse response = client.Execute(request);
```

## 4. Testing your API in Postman

During development you may want to test your API with Postman. If you make a request to the `/ping/secure` endpoint you will notice that the API returns an HTTP status code 401 (Unauthorized):

![Unauthorized request in Postman](/media/articles/server-apis/webapi-owin/postman-not-authorized.png)

As mentioned in the previous step, you will need to pass along an `access_token` in the HTTP Authorization header. A quick and easy way to obtain an `access_token` for test purposes is from the __Test__ tab of your API settings: 

![Obtain a JWT](/media/articles/server-apis/webapi-owin/request-access-token.png)

You can then use the `access_token` and pass it along in the Authorization header as a Bearer token:

![Authorized request in Postman](/media/articles/server-apis/webapi-owin/postman-authorized.png)
