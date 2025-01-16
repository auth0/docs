---
title: Authorization
description: This tutorial demonstrates how to add authorization to an ASP.NET OWIN API using the standard JWT middleware.
budicon: 500
topics:
    - quickstart
    - backend
    - webapi-owin
github:
    path: Quickstart/Sample
contentType: tutorial
useCase: quickstart
---

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new') %>

<%= include('../_includes/_api_auth_preamble') %>

## Configure the Sample Project

The sample code has an `appsettings` section in `Web.config` which configures it to use the correct Auth0 **Domain** and **API Identifier** for your API. If you download the code from this page it will be automatically filled. If you use the example from Github, you will need to fill it yourself.

```xml
// web.config

<appSettings>
  <add key="Auth0Domain" value="${account.namespace}" />
  <add key="Auth0ApiIdentifier" value="${apiIdentifier}" />
</appSettings>
```

## Validate Access Tokens

### Install dependencies

To use Auth0 Access Tokens with ASP.NET you will use the OWIN JWT Middleware which is available in the `Microsoft.Owin.Security.Jwt` NuGet package.

```bash
Install-Package Microsoft.Owin.Security.Jwt
```

### Verifying the token signature
As the OWIN JWT middleware doesn't use Open ID Connect Discovery by default, you will need to provide a custom `IssuerSigningKeyResolver`. To do this, add the following to the `Support/OpenIdConnectSigningKeyResolver.cs` file:

:::note
Such a custom resolver was previously published as part of the `Auth0.OpenIdConnectSigningKeyResolver` package through Nuget. As [this package is not available anymore](https://github.com/auth0/auth0-aspnet-owin/blob/master/SECURITY-NOTICE.md), you will need to provide this yourself.
:::

```javascript
public class OpenIdConnectSigningKeyResolver
{
    private readonly OpenIdConnectConfiguration openIdConfig;

    public OpenIdConnectSigningKeyResolver(string authority)
    {
        var cm = new ConfigurationManager<OpenIdConnectConfiguration>($"{authority.TrimEnd('/')}/.well-known/openid-configuration", new OpenIdConnectConfigurationRetriever());
        openIdConfig = AsyncHelper.RunSync(async () => await cm.GetConfigurationAsync());
    }

    public SecurityKey[] GetSigningKey(string kid)
    {
        return new[] { openIdConfig.JsonWebKeySet.GetSigningKeys().FirstOrDefault(t => t.KeyId == kid) };
    }
}
```

The `OpenIdConnectSigningKeyResolver` will automatically download the JSON Web Key Set used to sign the RS256 tokens from the OpenID Connect Configuration endpoint (at `/.well-known/openid-configuration`). You can then use it subsequently to resolve the Issuer Signing Key, as will be demonstrated in the JWT registration code below.

### Configuration

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
                IssuerSigningKeyResolver = (token, securityToken, kid, parameters) => keyResolver.GetSigningKey(kid)
            }
        });

    // Configure Web API
    WebApiConfig.Configure(app);
}
```

::: panel-warning Do not forget the trailing backslash
Please ensure that the URL specified for `ValidIssuer` contains a trailing backslash as this needs to match exactly with the issuer claim of the JWT. This is a common misconfiguration error which will cause your API calls to not be authenticated correctly.
:::

### Validate scopes

The JWT middleware above verifies that the Access Token included in the request is valid; however, it doesn't yet include any mechanism for checking that the token has the sufficient **scope** to access the requested resources.

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

        // Get the scope claim. Ensure that the issuer is for the correct Auth0 domain
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

## Protect API Endpoints

<%= include('../_includes/_api_endpoints') %>

The JWT middleware integrates with the standard ASP.NET Authentication and Authorization mechanisms, so you only need to decorate your controller action with the `[Authorize]` attribute to secure an endpoint.

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

To ensure that a scope is present in order to call a particular API endpoint, you simply need to decorate the action with the `ScopeAuthorize` attribute and pass the name of the required `scope` in the `scope` parameter.

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
