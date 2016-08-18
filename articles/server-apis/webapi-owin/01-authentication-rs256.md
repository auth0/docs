---
title: Authentication (RS256)
name: Shows how to secure your API using the standard JWT middeware
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-aspnet-owin-webapi-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-aspnet-owin-webapi-sample',
  pkgBranch: 'master',
  pkgPath: '01-Authentication-RS256/WebApi',
  pkgFilePath: '01-Authentication-RS256/WebApi/WebApi/Web.config',
  pkgType: 'replace'
}) %>

Auth0 can sign JSON Web Tokens (JWT) using either a symmetric key (HS256) or an asymmetric key (RS256). This particular document will describe how to configure Auth0 to sign tokens using RS256.

> If you want to use HS256 then please go to the [Authentication using HS256](/quickstart/backend/webapi-owin/02-authentication-hs256) tutorial.

## 1. Configure JSON Web Token Signature Algorithm

To configure the JWT Signature Algorithm, go to the settings for your application in the Auth0 Dashboard, scroll down and click on **Show Advanced Settings**. Go to the **OAuth** tab and set the **JsonWebToken Signature Algorithm** to **RS256**.

Save your changes.

![Configure JWT Signature Algorithm as RS256](/media/articles/server-apis/webapi-owin/jwt-signature-rs256.png)   

## 2. Configure the JWT Middleware

You will need to add the Active Directory Services Bearer Token middleware to your application's middleware pipeline. 

Go to the `Configuration` method of your `Startup` class and add a call to `UseActiveDirectoryFederationServicesBearerAuthentication` passing in the configured `ActiveDirectoryFederationServicesBearerAuthenticationOptions`. 

The `ActiveDirectoryFederationServicesBearerAuthenticationOptions` needs to specify your Auth0 Client ID in the `ValidAudience` property, and the full path to your Auth0 domain as the `ValidIssuer`. You will also need to specify the `MetadataEndpoint` property which will allow the middleware to automatically download the public key from Auth0 in order to verify the signate of the JSON Web Tokens.

```csharp
public void Configuration(IAppBuilder app)
{
    var issuer = $"https://{ConfigurationManager.AppSettings["Auth0Domain"]}/";
    var audience = ConfigurationManager.AppSettings["Auth0ClientID"];

    // Api controllers with an [Authorize] attribute will be validated with JWT
    app.UseActiveDirectoryFederationServicesBearerAuthentication(
        new ActiveDirectoryFederationServicesBearerAuthenticationOptions
        {
            TokenValidationParameters = new TokenValidationParameters
            {
                ValidAudience = audience,
                ValidIssuer = issuer,
                IssuerSigningKeyResolver = (token, securityToken, identifier, parameters) => parameters.IssuerSigningTokens.FirstOrDefault()?.SecurityKeys?.FirstOrDefault()
            },
            // Setting the MetadataEndpoint so the middleware can download the RS256 certificate
            MetadataEndpoint = $"{issuer.TrimEnd('/')}/wsfed/{audience}/FederationMetadata/2007-06/FederationMetadata.xml"
        });
            

    // Configure Web API
    WebApiConfig.Configure(app);
}
```

::: panel-warning Do not forget the trailing backslash
Please ensure that the URL specified for `ValidIssuer` contains a trailing backslash as this needs to match exactly with the issuer claim of the JWT. This is a common misconfiguration error which will cause your API calls to not be authenticated correctly.   
:::

## 3. Securing an API endpoint 

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

## 4. Using your API

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

## 5. Testing your API in Postman

During development you may want to test your API with Postman.

If you make a request to the `/api/ping/secure` endpoint you will notice that the API returns an HTTP status code 401 (Unauthorized):

![Unauthorized request in Postman](/media/articles/server-apis/webapi-owin/postman-not-authorized.png)

As mentioned in the previous step, you will need to pass along an `id_token` in the HTTP Authorization header. A quick and easy way to obtain an `id_token` is to call the `/oauth/ro` endpoint using the Auth0 [Authentication API Explorer](/api/authentication#!#post--oauth-ro):

![Obtain a JWT](/media/articles/server-apis/webapi-owin/request-jwt.png)

Now you can use the `id_token` and pass it along in the Authorization header as a Bearer token:

![Authorized request in Postman](/media/articles/server-apis/webapi-owin/postman-authorized.png)

## Next Step

To learn how to allow only users in a certain role to access a particular endpoint, please continue with the [Authorization](/quickstart/backend/webapi-owin/03-authorization) tutorial.
