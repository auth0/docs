---
title: Authentication (RS256)
name: Shows how to secure your API using the standard JWT middeware
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-aspnetcore-webapi-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-aspnetcore-webapi-sample',
  pkgBranch: 'master',
  pkgPath: '01-Authentication-RS256',
  pkgFilePath: '01-Authentication-RS256/appsettings.json',
  pkgType: 'replace'
}) %>

Auth0 can sign JSON Web Tokens (JWT) using either a symmetric key (HS256) or an asymmetric key (RS256). This particular document will describe how to configure Auth0 to sign tokens using RS256.

> If you want to use HS256 then please go to the [Authentication using HS256](/quickstart/backend/aspnet-core-webapi/01-authentication-hs256) tutorial.

## 1. Configure JSON Web Token Signature Algorithm

To configure the JWT Signature Algorithm, go to the settings for your application in the Auth0 Dashboard, scroll down and click on **Show Advanced Settings**. Go to the **OAuth** tab and set the **JsonWebToken Signature Algorithm** to **RS256**.

Save your changes.

![Configure JWT Signature Algorithm as RS256](/media/articles/server-apis/aspnet-core-webapi/jwt-signature-rs256.png)   

## 2. Configure the JWT Middleware

You will need to add the JWT middleware to your application's middleware pipeline. 

Go to the `Configure` method of your `Startup` class and add a call to `UseJwtBearerAuthentication` passing in the configured `JwtBearerOptions`. The `JwtBearerOptions` needs to specify your Auth0 Client ID as the `Audience`, and the full path to your Auth0 domain as the `Authority`:

```csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
{
    var options = new JwtBearerOptions
    {
        Audience = Configuration["auth0:clientId"],
        Authority = $"https://{Configuration["auth0:domain"]}/"
    };
    app.UseJwtBearerAuthentication(options);

    app.UseMvc();
}
```

### Signature Validation

Before we carry on, a quick word about the verification of the JWT, as the configuration above may af first glance seem very simplistic.

The JWT middleware will automatically use the `Authority` to verify the issuer of the JWT, and the `Audience` to verify the audience. These values need match the values in the token exactly, so ensure you specify the trailing backslash (`/`) for the `Authority` as this is a fairly common reason for tokens not verifying correctly.

Next it will seem as though the JWT middleware configuration above is insecure since the signature is not explicitly verified anywhere. This is however not true, as the JWT middleware will go to the `/.well-known/openid-configuration` endpoint at the URL specified in the `Authority` property to discover the JSON Web Key Set (JWK) document. It will then download the JSON Web Key which is used to subsequently verify the token.  

This can be confirmed by looking and the Fiddler trace in the screenshot below:

![Fiddler trace of retrieval of JWK](/media/articles/server-apis/aspnet-core-webapi/fiddler.png)

If someone tries to create a JWT with another key set the signature verification will fail:

![Console output with incorrectly signed JWT](/media/articles/server-apis/aspnet-core-webapi/console-output.png)

## 3. Securing an API endpoint 

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

## 4. Using your API

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

## 5. Testing your API in Postman

During development you may want to test your API with Postman.

If you make a request to the `/ping/secure` endpoint you will notice that the API returns an HTTP status code 401 (Unauthorized):

![Unauthorized request in Postman](/media/articles/server-apis/aspnet-core-webapi/postman-not-authorized.png)

As mentioned in the previous step, you will need to pass along an `id_token` in the HTTP Authorization header. A quick and easy way to obtain an `id_token` is to call the `/oauth/ro` endpoint using the Auth0 [Authentication API Explorer](https://auth0.com/docs/api/authentication#!#post--oauth-ro):

![Obtain a JWT](/media/articles/server-apis/aspnet-core-webapi/request-jwt.png)

Now you can use the `id_token` and pass it along in the Authorization header as a Bearer token:

![Authorized request in Postman](/media/articles/server-apis/aspnet-core-webapi/postman-authorized.png)

## Next Step

To learn how to allow only users in a certain role to access a particular endpoint, please continue with the [Authorization](/quickstart/backend/aspnet-core-webapi/03-authorization) tutorial.
