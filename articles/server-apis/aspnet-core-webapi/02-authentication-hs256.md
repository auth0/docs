---
title: Authentication (HS256)
name: Shows how to secure your API using the standard JWT middeware
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-aspnetcore-webapi-sample/tree/master/02-Authentication-HS256',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-aspnetcore-webapi-sample',
  pkgBranch: 'master',
  pkgPath: '02-Authentication-HS256',
  pkgFilePath: null,
  pkgType: 'server'
}) %>

Auth0 can sign JSON Web Tokens (JWT) using either a symmetric key (HS256) or an asymmetric key (RS256). This particular document will describe how to configure Auth0 to sign tokens using HS256.

> If you want to use RS256 then please go to the [Authentication using RS256](/quickstart/backend/aspnet-core-webapi/01-authentication-rs256) tutorial.

## 1. Configure JSON Web Token Signature Algorithm

To configure the JWT Signature Algorithm, go to the settings for your application in the Auth0 Dashboard, scroll down and click on **Show Advanced Settings**. Go to the **OAuth** tab and set the **JsonWebToken Signature Algorithm** to **HS256**.

Save your changes.

![Configure JWT Signature Algorithm as HS256](/media/articles/server-apis/aspnet-core-webapi/jwt-signature-hs256.png)   

## 2. Update your settings

When using HS256, you will need your application's **Client Secret** when configuring the JWT middleware, so be sure update the `appsettings.json` file included in the seed project to also add a **ClientSecret** attribute, and be sure to set the correct values for the **Domain**, **ClientId** and **ClientSecret** attributes:   

```json
{
  "Auth0": {
    "Domain": "{DOMAIN}",
    "ClientId": "{CLIENT_ID}",
    "ClientSecret": "{CLIENT_SECRET}"
  }
}
```

## 3. Configure the JWT Middleware

You will need to add the JWT middleware to your application's middleware pipeline. 

Go to the `Configure` method of your `Startup` class and add a call to `UseJwtBearerAuthentication` passing in the configured `JwtBearerOptions`. The `JwtBearerOptions` needs to specify your Auth0 Domain as the issuer, the Client ID as the Audience, and the Base64-decoded Client Secret as the issuer signing key: 

```csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
{
    var keyAsBase64 = Configuration["auth0:clientSecret"].Replace('_', '/').Replace('-', '+');
    var keyAsBytes = Convert.FromBase64String(keyAsBase64);

    var options = new JwtBearerOptions
    {
        TokenValidationParameters =
        {
            ValidIssuer = $"https://{Configuration["auth0:domain"]}/",
            ValidAudience = Configuration["auth0:clientId"],
            IssuerSigningKey = new SymmetricSecurityKey(keyAsBytes)                
        }
    };
    app.UseJwtBearerAuthentication(options);

    app.UseMvc();
}
```

::: panel-warning Do not forget the trailing backslash
Please ensure that the URL specified for `ValidIssuer` contains a trailing backslash as this needs to match exactly with the issuer claim of the JWT. This is a common misconfiguration error which will cause your API calls to not be authenticated correctly.   
:::

## 4. Securing an API endpoint 

The JWT middleware integrates with the standard ASP.NET Core [Authentication](https://docs.asp.net/en/latest/security/authentication/index.html) and [Authorization](https://docs.asp.net/en/latest/security/authorization/index.html) mechanisms.

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

## 5. Using your API

You can make calls to your API by authenticating a user using any of our Lock integrations and then using the `id_token` obtained during authentication and passing that in the `Authorization` header of requests to your API as a Bearer token.

Here is a sample RAW request:

```bash
GET /ping/secure HTTP/1.1
Host: localhost:5000
Authorization: Bearer <your token>
```

Or using [RestSharp](http://restsharp.org/):

```csharp
var client = new RestClient("http://localhost:5000/ping/secure");
var request = new RestRequest(Method.GET);
request.AddHeader("authorization", "Bearer <your token>");
IRestResponse response = client.Execute(request);
```

## 6. Testing your API in Postman

During development you may want to test your API with Postman.

If you make a request to the `/ping/secure` endpoint you will notice that the API returns an HTTP status code 401 (Unauthorized):

![Unauthorized request in Postman](/media/articles/server-apis/aspnet-core-webapi/postman-not-authorized.png)

As mentioned in the previous step, you will need to pass along an `id_token` in the HTTP Authorization header. A quick and easy way to obtain an `id_token` is to call the `/oauth/ro` endpoint using the Auth0 [Authentication API Explorer](https://auth0.com/docs/api/authentication#!#post--oauth-ro):

![Obtain a JWT](/media/articles/server-apis/aspnet-core-webapi/request-jwt.png)

Now you can use the `id_token` and pass it along in the Authorization header as a Bearer token:

![Authorized request in Postman](/media/articles/server-apis/aspnet-core-webapi/postman-authorized.png)

## Next Step

To learn how to allow only users in a certain role to access a particular endpoint, please continue with the [Authorization](/quickstart/backend/aspnet-core-webapi/03-authorization) tutorial.
