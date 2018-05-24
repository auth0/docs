---
title: Authorization
name: This tutorial demonstrates how to add authorization to your ASP.NET Core Web API using the standard JWT middleware.
description: This tutorial demonstrates how to add authorization to an ASP.NET Core Web API using the standard JWT middleware.
budicon: 500
github:
    path: Quickstart/01-Authorization
---

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new', { sampleLink: 'https://github.com/auth0-samples/auth0-aspnetcore-webapi-samples/tree/master/Samples/hs256' }) %>

<%= include('../_includes/_api_auth_preamble') %>

## Configure the Sample project

The sample code has an `appsettings.json` file which configures it to use the correct Auth0 **Domain** and **API Identifier** for your API. If you download the code from this page while logged in, it will be automatically filled. If you use the example from Github, you will need to fill it yourself.

```json
{
  "Auth0": {
    "Domain": "${account.namespace}",
    "ApiIdentifier": "${apiIdentifier}"
  }
}
```
## Validate Access Tokens

### Install dependencies

The seed project references the new ASP.NET Core metapackage (`Microsoft.AspNetCore.All`), which includes all the NuGet packages that are a part of the ASP.NET Core 2.0 framework.

If you are not using the `Microsoft.AspNetCore.All` metapackage, add the `Microsoft.AspNetCore.Authentication.JwtBearer` package to your application.

```text
Install-Package Microsoft.AspNetCore.Authentication.JwtBearer
```

### Configure the middleware

The ASP.NET Core JWT Bearer authentication handler downloads the JSON Web Key Set (JWKS) file with the public key. The handler uses the JWKS file and the public key to verify the Access Token's signature.

In your application, register the authentication services:

1. Make a call to the `AddAuthentication` method. Configure the JWT Bearer tokens as the default authentication and challenge schemes.  
2. Make a call to the `AddJwtBearer` method to register the JWT Bearer authentication scheme. Configure your Auth0 domain as the authority, and your Auth0 API identifier as the audience.

```csharp
// Startup.cs

public void ConfigureServices(IServiceCollection services)
{
    // Some code omitted for brevity...

    string domain = $"https://{Configuration["Auth0:Domain"]}/";
    services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

    }).AddJwtBearer(options =>
    {
        options.Authority = domain;
        options.Audience = Configuration["Auth0:ApiIdentifier"];
    });
}
```

To add the authentication middleware to the middleware pipeline, add a call to the `UseAuthentication` method:

```csharp
// Startup.cs

public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    // Some code omitted for brevity...

    app.UseAuthentication();

    app.UseMvc(routes =>
    {
        routes.MapRoute(
            name: "default",
            template: "{controller=Home}/{action=Index}/{id?}");
    });
}
```

### Validate scopes

To make sure that an Access Token contains the correct scope, use the [Policy-Based Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/policies) in ASP.NET Core.

Create a new authorization requirement called `HasScopeRequirement`. This requirement checks if the `scope` claim issued by your Auth0 tenant is present. If the `scope` claim exists, the requirement checks if the `scope` claim contains the requested scope.

```csharp
// HasScopeRequirement.cs

public class HasScopeRequirement : IAuthorizationRequirement
{
    public string Issuer { get; }
    public string Scope { get; }

    public HasScopeRequirement(string scope, string issuer)
    {
        Scope = scope ?? throw new ArgumentNullException(nameof(scope));
        Issuer = issuer ?? throw new ArgumentNullException(nameof(issuer));
    }
}
```

```csharp
// HasScopeHandler.cs

public class HasScopeHandler : AuthorizationHandler<HasScopeRequirement>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, HasScopeRequirement requirement)
    {
        // If user does not have the scope claim, get out of here
        if (!context.User.HasClaim(c => c.Type == "scope" && c.Issuer == requirement.Issuer))
            return Task.CompletedTask;

        // Split the scopes string into an array
        var scopes = context.User.FindFirst(c => c.Type == "scope" && c.Issuer == requirement.Issuer).Value.Split(' ');

        // Succeed if the scope array contains the required scope
        if (scopes.Any(s => s == requirement.Scope))
            context.Succeed(requirement);

        return Task.CompletedTask;
    }
}
```

In your `ConfigureServices` method, add a call to the `AddAuthorization` method. To add policies for the scopes, call `AddPolicy` for each scope. Also ensure that you register the `HasScopeHandler` as a singleton:

```csharp
// Startup.cs

public void ConfigureServices(IServiceCollection services)
{
    // Add framework services.
    services.AddMvc();

    string domain = $"https://{Configuration["Auth0:Domain"]}/";
    services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

    }).AddJwtBearer(options =>
    {
        options.Authority = domain;
        options.Audience = Configuration["Auth0:ApiIdentifier"];
    });
    
    services.AddAuthorization(options =>
    {
        options.AddPolicy("read:messages", policy => policy.Requirements.Add(new HasScopeRequirement("read:messages", domain)));
    });

    // register the scope authorization handler
    services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();
}
```

## Protect API Endpoints

The JWT middleware integrates with the standard ASP.NET Core [Authentication](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/) and [Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/) mechanisms. 

To secure an endpoint, you need to add the `[Authorize]` attribute to your controller action:

```csharp
// Controllers/ApiController.cs

[Route("api")]
public class ApiController : Controller
{
    [HttpGet]
    [Route("private")]
    [Authorize]
    public IActionResult Private()
    {
        return Json(new
        {
            Message = "Hello from a private endpoint! You need to be authenticated to see this."
        });
    }
}
```

To secure endpoints that require specific scopes, we need to make sure that the correct scope is present in the `access_token`. To do that, add the `Authorize` attribute to the `Scoped` action, passing `read:messages` as the `policy` parameter. 

```csharp
// Controllers/ApiController.cs

[Route("api")]
public class ApiController : Controller
{
    [HttpGet]
    [Route("private-scoped")]
    [Authorize("read:messages")]
    public IActionResult Scoped()
    {
        return Json(new
        {
            Message = "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
        });
    }
}
```
