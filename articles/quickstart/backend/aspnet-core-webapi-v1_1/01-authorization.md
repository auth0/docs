---
title: Authorization
name: Shows how to secure your API using the standard JWT middleware.
description: This tutorial demonstrates how to add authorization to an ASP.NET Core 1.x Web API using the standard JWT middleware.
budicon: 500
github:
    path: Quickstart/01-Authorization
---

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new', { sampleLink: 'https://github.com/auth0-samples/auth0-aspnetcore-webapi-samples/tree/v1/Samples/hs256' }) %>

<%= include('../_includes/_api_auth_preamble') %>

## Configure the Sample Project

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

To use Auth0 Access Tokens with ASP.NET Core you will use the JWT Middleware. Add the `Microsoft.AspNetCore.Authentication.JwtBearer` package to your application.

```text
Install-Package Microsoft.AspNetCore.Authentication.JwtBearer
```

### Configure the middleware

The ASP.NET Core JWT middleware will handle downloading the JSON Web Key Set (JWKS) file containing the public key for you, and will use that to verify the `access_token` signature.

To add the JWT middleware to your application's middleware pipeline, go to the `Configure` method of your `Startup` class and add a call to `UseJwtBearerAuthentication` passing in the configured `JwtBearerOptions`. The `JwtBearerOptions` needs to specify your Auth0 API Identifier as the `Audience`, and the full path to your Auth0 domain as the `Authority`:

```csharp
// Startup.cs

public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
{
    loggerFactory.AddConsole(Configuration.GetSection("Logging"));
    loggerFactory.AddDebug();

    var options = new JwtBearerOptions
    {
        Audience = Configuration["Auth0:ApiIdentifier"],
        Authority = $"https://{Configuration["Auth0:Domain"]}/"
    };
    app.UseJwtBearerAuthentication(options);

    app.UseMvc();
}
```

### Validate scopes

To make sure that an Access Token contains the correct scope, use the [Policy-Based Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/policies) in ASP.NET Core.

Create a new Authorization Requirement called `HasScopeRequirement`. This requirement will check that the `scope` claim issued by your Auth0 tenant is present, and if so it will ensure that the `scope` claim contains the requested scope. If it does then the Authorization Requirement is met.

```csharp
// HasScopeRequirement.cs

public class HasScopeRequirement : AuthorizationHandler<HasScopeRequirement>, IAuthorizationRequirement
{
    private readonly string issuer;
    private readonly string scope;

    public HasScopeRequirement(string scope, string issuer)
    {
        this.scope = scope;
        this.issuer = issuer;
    }

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, HasScopeRequirement requirement)
    {
        // If user does not have the scope claim, get out of here
        if (!context.User.HasClaim(c => c.Type == "scope" && c.Issuer == issuer))
            return Task.CompletedTask;

        // Split the scopes string into an array
        var scopes = context.User.FindFirst(c => c.Type == "scope" && c.Issuer == issuer).Value.Split(' ');

        // Succeed if the scope array contains the required scope
        if (scopes.Any(s => s == scope))
            context.Succeed(requirement);

        return Task.CompletedTask;
    }
}
```

Next, you can define a policy for each of the scopes in your application in the `ConfigureServices` method of your `Startup` class:

```csharp
// Startup.cs

public void ConfigureServices(IServiceCollection services)
{
    // Add framework services.
    services.AddMvc();

    string domain = $"https://{Configuration["Auth0:Domain"]}/";
    services.AddAuthorization(options =>
    {
        options.AddPolicy("read:messages",
            policy => policy.Requirements.Add(new HasScopeRequirement("read:messages", domain)));
    });
}
```

## Protect API Endpoints

The JWT middleware integrates with the standard ASP.NET Core [Authentication](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/) and [Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/) mechanisms. To secure an endpoint you only need to decorate your controller action with the `[Authorize]` attribute:

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
