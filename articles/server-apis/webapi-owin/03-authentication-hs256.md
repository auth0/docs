---
title: Authentication with HS256
name: Shows how to secure your API using the standard JWT middeware
budicon: 500
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-aspnet-owin-webapi-sample',
  path: '03-Authentication-HS256/WebApi',
  requirements: [
    'Microsoft Visual Studio 2015 Update 3',
    'Microsoft.Owin.Security.Jwt NuGet Package V3.0.1',
    'System.IdentityModel.Tokens.Jwt NuGet Package v4.0.2'
  ]
}) %>

::: panel-warning Signing Algorithm
Auth0 can sign JSON Web Tokens (JWT) using either a symmetric key (HS256) or an asymmetric key (RS256). This document demonstrates how to use tokens signed with the HS256 Algorithm.

It is however recommended that you [rather use RS256](/quickstart/backend/webapi-owin/01-authentication) tutorial.
:::

## 1. Create a Resource Server (API)

In the [APIs section]("${manage_url}/#/apis) of the Auth0 Dashboard, click the **Create API** button. Provide a **Name** and **Identifier** for your API. Be sure to choose the HS256 signing algorithm.

![Create API](/media/articles/server-apis/webapi-owin/create-api-hs256.png)

After you have created the API, navigate to the **Settings** tab of the API, and take note of the **API Identifier** and **Signing Secret**, as it will be used configuring the JWT middleware.

## 2. Update your settings

When using HS256, you will need your API's **Signing Secret** when configuring the JWT middleware, so be sure update the `web.config` file included in the seed project to also add a **Auth0ApiSecret** key with the value of the Signing Secret. Be sure to set the correct values for the **Auth0Domain** and **Auth0ApiIdentifier** elements as well:

```xml
<appSettings>
    <add key="Auth0Domain" value="${account.namespace}" />
    <add key="Auth0ApiIdentifier" value="YOUR_API_IDENTIFIER" />
    <add key="Auth0ApiSecret" value="YOUR_API_SECRET" />
</appSettings>
```

## 3. Configure the JWT Middleware

You will need to add the JWT middleware to your application's middleware pipeline.

Go to the `Configuration` method of your `Startup` class and add a call to `UseJwtBearerAuthentication` passing in the configured `JwtBearerAuthenticationOptions`. The `JwtBearerAuthenticationOptions` needs to specify the API Identifier in the `AllowedAudiences` property and the Auth0 Domain as the `issuer` and the API's Signing Secret as the `key` parameters of the `SymmetricKeyIssuerSecurityTokenProvider`:

```csharp
public void Configuration(IAppBuilder app)
{
    var issuer = $"https://{ConfigurationManager.AppSettings["Auth0Domain"]}/";
    var audience = ConfigurationManager.AppSettings["Auth0ApiIdentifier"];
    var secret = Encoding.UTF8.GetBytes(ConfigurationManager.AppSettings["Auth0ApiSecret"]);

    // Api controllers with an [Authorize] attribute will be validated with JWT
    app.UseJwtBearerAuthentication(
        new JwtBearerAuthenticationOptions
        {
            AuthenticationMode = AuthenticationMode.Active,
            AllowedAudiences = new[] { audience },
            IssuerSecurityTokenProviders = new IIssuerSecurityTokenProvider[]
            {
                new SymmetricKeyIssuerSecurityTokenProvider(issuer, secret)
            },
        });

    // Configure Web API
    WebApiConfig.Configure(app);
}
```

::: panel-warning Do not forget the trailing backslash
Please ensure that the URL specified for the `issuer` parameter contains a trailing backslash as this needs to match exactly with the issuer claim of the JWT. This is a common misconfiguration error which will cause your API calls to not be authenticated correctly.
:::

## 4. Securing an API endpoint

The JWT middleware integrates with the standard ASP.NET Authentication and Authorization mechanisms. You only need to decorate your controller action with the `[Authorize]` attribute to secure an endpoint:

```csharp
[RoutePrefix("api")]
public class PingController : Controller
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

## 5. Using your API

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

## 6. Testing your API in Postman

During development you may want to test your API with Postman. If you make a request to the `/ping/secure` endpoint you will notice that the API returns an HTTP status code 401 (Unauthorized):

![Unauthorized request in Postman](/media/articles/server-apis/webapi-owin/postman-not-authorized.png)

As mentioned in the previous step, you will need to pass along an `access_token` in the HTTP Authorization header. A quick and easy way to obtain an `access_token` for test purposes is from the __Test__ tab of your API settings:

![Obtain a JWT](/media/articles/server-apis/webapi-owin/request-access-token.png)

You can then use the `access_token` and pass it along in the Authorization header as a Bearer token:

![Authorized request in Postman](/media/articles/server-apis/webapi-owin/postman-authorized.png)
