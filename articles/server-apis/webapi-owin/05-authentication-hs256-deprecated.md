---
title: Authentication - HS256 (Deprecated)
name: Shows how to secure your API using the standard JWT middeware
budicon: 500
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-aspnet-owin-webapi-sample',
  path: '05-Authentication-HS256-Deprecated/WebApi',
  requirements: [
    'Microsoft Visual Studio 2015 Update 3',
    'Microsoft.Owin.Security.Jwt NuGet Package V3.0.1',
    'System.IdentityModel.Tokens.Jwt NuGet Package v4.0.2'
  ]
}) %>

Auth0 can sign JSON Web Tokens (JWT) using either a symmetric key (HS256) or an asymmetric key (RS256). This particular document will describe how to configure Auth0 to sign tokens using HS256.

> If you want to use RS256 then please go to the [Authentication using RS256](/quickstart/backend/webapi-owin/01-authentication-rs256) tutorial.

## 1. Configure JSON Web Token Signature Algorithm

To configure the JWT Signature Algorithm, go to the settings for your application in the Auth0 Dashboard, scroll down and click on **Show Advanced Settings**. Go to the **OAuth** tab and set the **JsonWebToken Signature Algorithm** to **HS256**.

Save your changes.

![Configure JWT Signature Algorithm as HS256](/media/articles/server-apis/webapi-owin/jwt-signature-hs256.png)

## 2. Update your settings

When using HS256, you will need your application's **Client Secret** when configuring the JWT middleware, so be sure update the `web.config` file included in the seed project to also add a **Auth0ClientSecret** key, and be sure to set the correct values for the **Auth0Domain**, **Auth0ClientID** and **Auth0ClientSecret** elements:

```json
<appSettings>
  <add key="Auth0Domain" value="${account.namespace}" />
  <add key="Auth0ClientID" value="${account.clientId}" />
  <add key="Auth0ClientSecret" value="${account.clientSecret}" />
</appSettings>
```

## 3. Configure the JWT Middleware

You will need to add the JWT middleware to your application's middleware pipeline.

Go to the `Configuration` method of your `Startup` class and add a call to `UseJwtBearerAuthentication` passing in the configured `JwtBearerAuthenticationOptions`. The `JwtBearerAuthenticationOptions` needs to specify the Client ID in the `AllowedAudiences` property and the Auth0 Domain as the `issuer` and the Base64-decoded Client Secret as the `key` parameters of the `SymmetricKeyIssuerSecurityTokenProvider`:

```csharp
public void Configuration(IAppBuilder app)
{
    var issuer = $"https://{ConfigurationManager.AppSettings["Auth0Domain"]}/";
    var audience = ConfigurationManager.AppSettings["Auth0ClientID"];
    var secret = Encoding.UTF8.GetBytes(ConfigurationManager.AppSettings["Auth0ClientSecret"]);

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

You can make calls to your API by authenticating a user using any of our Lock integrations and then using the `id_token` obtained during authentication and passing that in the `Authorization` header of requests to your API as a Bearer token.

Here is a sample RAW request:

```bash
GET /api/ping/secure HTTP/1.1
Host: localhost:58105
Authorization: Bearer <your token>
```

Or using [RestSharp](http://restsharp.org/):

```csharp
var client = new RestClient("http://localhost:58105/api/ping/secure");
var request = new RestRequest(Method.GET);
request.AddHeader("authorization", "Bearer <your token>");
IRestResponse response = client.Execute(request);
```

## 6. Testing your API in Postman

During development you may want to test your API with Postman.

If you make a request to the `/api/ping/secure` endpoint you will notice that the API returns an HTTP status code 401 (Unauthorized):

![Unauthorized request in Postman](/media/articles/server-apis/webapi-owin/postman-not-authorized.png)

As mentioned in the previous step, you will need to pass along an `id_token` in the HTTP Authorization header. A quick and easy way to obtain an `id_token` is to call the `/oauth/ro` endpoint using the Auth0 [Authentication API Explorer](/api/authentication#!#post--oauth-ro):

![Obtain a JWT](/media/articles/server-apis/webapi-owin/request-jwt.png)

Now you can use the `id_token` and pass it along in the Authorization header as a Bearer token:

![Authorized request in Postman](/media/articles/server-apis/webapi-owin/postman-authorized.png)

## Next Step

To learn how to allow only users in a certain role to access a particular endpoint, please continue with the [Authorization](/quickstart/backend/webapi-owin/03-authorization) tutorial.
