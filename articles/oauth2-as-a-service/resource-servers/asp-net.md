---
sitemap: false
title: OAuth2-as-a-Service: Creating a Resource Server using the ASP.NET Web API
---

# OAuth2-as-a-Service: Creating a Resource Server using the ASP.NET Web API

After the [**Resource Server**](/oauth2-as-a-service/resource-servers) has been configured you can update your application by accepting the `access tokens` that have been issued by Auth0.

These `access tokens` are JSON Web Tokens which have been signed using RS256 (assymetric signing).

Configure the middleware that will validate the `access tokens` in your API. Validating a token means that you are certain you can trust it's contents.

```cs
public class Startup
{
    public void Configuration(IAppBuilder app)
    {
        var issuer = "https://${account.namespace}/";
        var audience = "{RESOURCE_SERVER_IDENTIFIER}";

        app.UseActiveDirectoryFederationServicesBearerAuthentication(
            new ActiveDirectoryFederationServicesBearerAuthenticationOptions
            {
                TokenValidationParameters = new TokenValidationParameters
                {
                    ValidAudience = audience,
                    ValidIssuer = issuer,
                    IssuerSigningKeyResolver = (token, securityToken, identifier, parameters) =>
                        parameters.IssuerSigningTokens.FirstOrDefault().SecurityKeys.FirstOrDefault()
                },
                MetadataEndpoint = string.Format("{0}/wsfed/FederationMetadata/2007-06/FederationMetadata.xml", issuer.TrimEnd('/'))
            });

        var configuration = new HttpConfiguration();
        configuration.MapHttpAttributeRoutes();
        configuration.Routes.MapHttpRoute(
            name: "DefaultApi",
            routeTemplate: "api/{controller}/{id}",
            defaults: new { id = RouteParameter.Optional }
            );
        app.UseWebApi(configuration);
    }
}
```

Having performed the previous setup, you are certain tokens are valid in any subsequent middleware. You can optionally create a new `AuthorizationFilterAttribute` to handle scope authorization:

```cs
public class RequireScopeAttribute : AuthorizationFilterAttribute
{
    public string Scope { get; set; }

    public RequireScopeAttribute(string scope)
    {
        this.Scope = scope;
    }

    public override Task OnAuthorizationAsync(HttpActionContext actionContext, System.Threading.CancellationToken cancellationToken)
    {
        var principal = actionContext.RequestContext.Principal as ClaimsPrincipal;
        if (principal == null || !principal.Identity.IsAuthenticated || !principal.HasClaim("scopes", Scope))
        {
            actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized,
                new { reason = string.Format("User is missing the {0} scope.", Scope) });
            return Task.FromResult<object>(null);
        }

        return Task.FromResult<object>(null);
    }
}
```

And configure it to check the specific scope in each of the actions:

```cs
public class MyController : ApiController
{
    [Authorize, RequireScope("appointments")]
    [HttpGet, Route("secured/appointments")]
    public IHttpActionResult Appointments()
    {
        return this.Ok("These are your appointments.");
    }

    [Authorize, RequireScope("tasks")]
    [HttpGet, Route("secured/tasks")]
    public IHttpActionResult Tasks()
    {
        return this.Ok("These are your tasks.");
    }
}
```
