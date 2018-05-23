---
title: Authorization
description: This tutorial demonstrates how to add authorization to your ASP.NET OWIN API using Auth0.
name: Shows how to secure your API using the standard OWIN JWT middeware
budicon: 500
github:
    path: Quickstart/01-Authorization
---

::: panel-warning OWIN 4 Incompatibility
Please note that the **Auth0.OpenIdConnectSigningKeyResolver** NuGet package is only compatible with **System.IdentityModel.Tokens.Jwt 4.x** and the **OWIN 3.x** packages. Attempting to use **Auth0.OpenIdConnectSigningKeyResolver** with newer versions of those packages will result in compiler errors.
:::

<%= include('../../../_includes/_api_auth_intro') %>

This Quickstart will guide you through the various tasks related to using Auth0-issued Access Tokens to secure your ASP.NET (OWIN) Web API.

## Seed and Samples

If you would like to follow along with this Quickstart you can download the [seed project](https://github.com/auth0-samples/auth0-aspnet-owin-webapi-samples/tree/master/Quickstart/00-Starter-Seed). The seed project is just a basic ASP.NET Web API with a simple controller and some of the NuGet packages which will be needed included. It has also defined some of the required Auth0-related settings in the `appSettings` key of the `Web.config`.

The final project after each of the steps is also available in the [Sample repository](https://github.com/auth0-samples/auth0-aspnet-owin-webapi-samples). You can find the final result for each step in the relevant folder inside the repository.

<%= include('../_includes/_api_create_new_2') %>

Also update the `web.config` file in your project with the correct **Domain** and **API Identifier** for your API, such as

```xml
// web.config

<appSettings>
  <add key="Auth0Domain" value="${account.namespace}" />
  <add key="Auth0ApiIdentifier" value="${apiIdentifier}" />
</appSettings>
```

<%= include('../_includes/_api_auth_preamble') %>

This sample demonstrates how to check for a JWT in the `Authorization` header of an incoming HTTP request and verify that it is valid using the standard ASP.NET (OWIN) JWT middleware. 

## Install Dependencies

To use Auth0 Access Tokens with ASP.NET Core you will use the OWIN JWT Middleware which is available in the `Microsoft.Owin.Security.Jwt` NuGet package. Also install the `Auth0.OpenIdConnectSigningKeyResolver` NuGet package which will assist you in verifying the token signature.

```bash
Install-Package Microsoft.Owin.Security.Jwt
Install-Package Auth0.OpenIdConnectSigningKeyResolver
```

## Configuration

<%= include('../_includes/_api_jwks_description', { sampleLink: 'https://github.com/auth0-samples/auth0-aspnet-owin-webapi-samples/tree/master/Samples/hs256' }) %>

The `Auth0.OpenIdConnectSigningKeyResolver` package which you installed will automatically download the JSON Web Key Set which was used to sign the RS256 tokens by interrogating the OpenID Connect Configuration endpoint (at `/.well-known/openid-configuration`). You can then use it subsequently to resolve the Issuer Signing Key, as will be demonstrated in the JWT registration code below.

Go to the `Configuration` method of your `Startup` class and add a call to `UseJwtBearerAuthentication` passing in the configured `JwtBearerAuthenticationOptions`.

The `JwtBearerAuthenticationOptions` needs to specify your Auth0 API Identifier in the `ValidAudience` property, and the full path to your Auth0 domain as the `ValidIssuer`. You will need to configure the `IssuerSigningKeyResolver` to use the instance of `OpenIdConnectSigningKeyResolver` to resolve the signing key:

```csharp
// Startup.cs

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

The JWT middleware integrates with the standard ASP.NET Authentication and Authorization mechanisms, so you only need to decorate your controller action with the `[Authorize]` attribute to secure an endpoint:

```csharp
// Controllers/ApiController.cs

[RoutePrefix("api")]
public class ApiController : ApiController
{
    [HttpGet]
    [Route("private")]
    [Authorize]
    public IHttpActionResult Private()
    {
        return Json(new
        {
            Message = "Hello from a private endpoint! You need to be authenticated to see this."
        });
    }
}
```

## Configuring Scopes

The JWT middleware above verifies that the `access_token` included in the request is valid; however, it doesn't yet include any mechanism for checking that the token has the sufficient **scope** to access the requested resources.

<%= include('../_includes/_api_scopes_access_resources') %>

Create a class called `ScopeAuthorizeAttribute` which inherits from `System.Web.Http.AuthorizeAttribute`. This Authorization Attribute will check that the `scope` claim issued by your Auth0 tenant is present, and if so it will ensure that the `scope` claim contains the requested scope.

```csharp
// Controllers/ScopeAuthorizeAttribute.cs

public class ScopeAuthorizeAttribute : AuthorizeAttribute
{
    private readonly string scope;

    public ScopeAuthorizeAttribute(string scope)
    {
        this.scope = scope;
    }
    
    public override void OnAuthorization(HttpActionContext actionContext)
    {
        base.OnAuthorization(actionContext);

        // Get the Auth0 domain, in order to validate the issuer
        var domain = $"https://{ConfigurationManager.AppSettings["Auth0Domain"]}/";

        // Get the claim principal
        ClaimsPrincipal principal = actionContext.ControllerContext.RequestContext.Principal as ClaimsPrincipal;
            
        // Get the scope clain. Ensure that the issuer is for the correcr Auth0 domain
        var scopeClaim = principal?.Claims.FirstOrDefault(c => c.Type == "scope" && c.Issuer == domain);
        if (scopeClaim != null)
        {
            // Split scopes
            var scopes = scopeClaim.Value.Split(' ');

            // Succeed if the scope array contains the required scope
            if (scopes.Any(s => s == scope))
                return;
        }

        HandleUnauthorizedRequest(actionContext);
    }
}
```

To ensure that a scope is present in order to call a particular API endpoint, you simply need to decorate the action with the `ScopeAuthorize` attribute, and pass the name of the required `scope` in the `scope` parameter:

```csharp
// Controllers/ApiController.cs

[RoutePrefix("api")]
public class ApiController : ApiController
{
    [HttpGet]
    [Route("private-scoped")]
    [ScopeAuthorize("read:messages")]
    public IHttpActionResult Scoped()
    {
        return Json(new
        {
            Message = "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
        });
    }
}
```

## Further Reading

* To learn how you can call your API from applications, please refer to the [Using your API section](/quickstart/backend/webapi-owin/02-using).

* If your experience problems with your API, please refer to the [Troubleshooting section](/quickstart/backend/webapi-owin/03-troubleshooting).
