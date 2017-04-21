---
title: Authorization
name: Shows how to secure your API using the standard OWIN JWT middeware
budicon: 500
---

<%= include('../../../_includes/_package', {
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

<%= include('../_includes/_api_auth_preamble') %>

This sample demonstrates how to check for a JWT in the `Authorization` header of an incoming HTTP request and verify that it is valid using the standard ASP.NET (OWIN) JWT middleware. 

## Install Dependencies

To use Auth0 Access Tokens with ASP.NET Core you will use the OWIN JWT Middleware which is available in the `Microsoft.Owin.Security.Jwt` NuGet package. Also install the `Auth0.OpenIdConnectSigningKeyResolver` NuGet package which will assist you in verifying the token signature.

```bash
Install-Package Microsoft.Owin.Security.Jwt
Install-Package Auth0.OpenIdConnectSigningKeyResolver
```

## Configuration

<%= include('../_includes/_api_jwks_description', { sampleLink: 'https://github.com/auth0-samples/auth0-aspnet-owin-webapi-sample/tree/master/03-Authentication-HS256/WebApi' }) %>

The `Auth0.OpenIdConnectSigningKeyResolver` package which you installed will automatically download the JSON Web Key Set which was used to sign the RS256 tokens by interrogating the OpenID Connect Configuration endpoint (at `/.well-known/openid-configuration`). You can then use it subsequently to resolve the Issuer Signing Key, as will be demonstrated in the JWT registration code below.

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

## Configuring Scopes

The JWT middleware above verifies that the `access_token` included in the request is valid; however, it doesn't yet include any mechanism for checking that the token has the sufficient **scope** to access the requested resources.

Scopes provide a way for you to define which resources should be accessible by the user holding a given `access_token`. For example, you might choose to permit `read` access to a `messages` resource if a user has a **manager** access level, or a `create` access to that resource if they are an **administrator**.

To configure scopes in your Auth0 dashboard, navigate to [your API](${manage_url}/#/apis) and select the **Scopes** tab. In this area you can define any scopes you wish. For this sample you can define ones called `read:messages` and `create:messages`.

To ensure that a correct `scope` is present in order to execute a particular API endpoint, you can create a custom Authorization Attribute.

Create a class called `ScopeAuthorizeAttribute` which inherits from `System.Web.Http.AuthorizeAttribute`. This Authorization Attribute will check that the `scope` claim issued by your Auth0 tenant is present, and if so it will ensure that the `scope` claim contains the requested scope.

```csharp
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

        ClaimsPrincipal principal = actionContext.ControllerContext.RequestContext.Principal as ClaimsPrincipal;
        if (principal != null)
        {
            // If user does not have the scope claim, get out of here
            if (principal.HasClaim(c => c.Type == "scope"))
            {

                // Split the scopes string into an array
                var scopes = principal.Claims.FirstOrDefault(c => c.Type == "scope").Value.Split(' ');

                // Succeed if the scope array contains the required scope
                if (scopes.Any(s => s == scope))
                    return;
            }
        }

        HandleUnauthorizedRequest(actionContext);
    }
}
```

To ensure that a scope is present in order to call a particular API endpoint, you simply need to decorate the action with the `ScopeAuthorize` attribute, and pass the name of the required `scope` in the `scope` parameter:

```csharp
[RoutePrefix("api/messages")]
public class MessagesController : ApiController
{
    [ScopeAuthorize("read:messages")]
    [Route("")]
    [HttpGet]
    public IHttpActionResult GetAll()
    {
        // Return the list of messages
    }

    [ScopeAuthorize("create:messages")]
    [Route("")]
    [HttpPost]
    public IHttpActionResult Create(Message message)
    {
        // Create a new message
    }
}
```

## Further Reading

* To learn how you can call your API from clients, please refer to the [Using your API section](/quickstart/backend/webapi-owin/02-using).

* If your experience problems with your API, please refer to the [Troubleshooting section](/quickstart/backend/webapi-owin/03-troubleshooting).
