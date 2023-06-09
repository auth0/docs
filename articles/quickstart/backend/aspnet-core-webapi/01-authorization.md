---
title: Authorization
description: This tutorial demonstrates how to add authorization to an ASP.NET Core Web API application using the standard JWT middleware.
budicon: 500
topics:
    - quickstart
    - backend
    - aspnetcore
    - web-api
github:
    path: Quickstart/01-Authorization
contentType: tutorial
useCase: quickstart
---
<!-- markdownlint-disable MD041 MD002 -->

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new') %>

<%= include('../_includes/_api_auth_preamble') %>

## Configure the Sample Project

The sample code has an `appsettings.json` file which configures it to use the correct Auth0 **Domain** and **API Identifier** for your API. If you download the code from this page while logged in, it will be automatically filled. If you use the example from Github, you will need to fill it yourself.

```json
{
  "Auth0": {
    "Domain": "${account.namespace}",
    "Audience": "${apiIdentifier}"
  }
}
```

## Validate Access Tokens

### Install dependencies

The seed project already contains a reference to the `Microsoft.AspNetCore.Authentication.JwtBearer`, which is needed in order to validate Access Tokens.
However, if you are not using the seed project, add the package to your application by installing it using Nuget:

```text
Install-Package Microsoft.AspNetCore.Authentication.JwtBearer
```

### Configure the middleware

The ASP.NET Core JWT Bearer authentication handler downloads the JSON Web Key Set (JWKS) file with the public key. The handler uses the JWKS file and the public key to verify the Access Token's signature.

In your application, register the authentication services:

1. Make a call to the `AddAuthentication` method. Configure `JwtBearerDefaults.AuthenticationScheme` as the default schemes.  
2. Make a call to the `AddJwtBearer` method to register the JWT Bearer authentication scheme. Configure your Auth0 domain as the authority, and your Auth0 API identifier as the audience. In some cases the access token will not have a `sub` claim which will lead to `User.Identity.Name` being `null`. If you want to map a different claim to `User.Identity.Name` then add it to `options.TokenValidationParameters` within the `AddAuthentication()` call.

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);
var domain = $"https://{builder.Configuration["Auth0:Domain"]}/";
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.Authority = domain;
    options.Audience = builder.Configuration["Auth0:Audience"];
    options.TokenValidationParameters = new TokenValidationParameters
    {
        NameClaimType = ClaimTypes.NameIdentifier
    };
});
```

To add the authentication and authorization middleware to the middleware pipeline, add a call to the `UseAuthentication` and `UseAuthorization` methods in your Program.cs file:

```csharp
// Program.cs
var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});
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

In your Program.cs file, add a call to the `AddAuthorization` method. To add policies for the scopes, call `AddPolicy` for each scope. Also ensure that you register the `HasScopeHandler` as a singleton:

```csharp
// Program.cs

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("read:messages", policy => policy.Requirements.Add(new 
    HasScopeRequirement("read:messages", domain)));
});

builder.Services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();
```

## Protect API Endpoints

The JWT middleware integrates with the standard ASP.NET Core [Authentication](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/) and [Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/) mechanisms. 

To secure an endpoint, you need to add the `[Authorize]` attribute to your controller action:

```csharp
// Controllers/ApiController.cs

[Route("api")]
[ApiController]
public class ApiController : ControllerBase
{
    [HttpGet("private")]
    [Authorize]
    public IActionResult Private()
    {
        return Ok(new
        {
            Message = "Hello from a private endpoint! You need to be authenticated to see this."
        });
    }
}
```

To secure endpoints that require specific scopes, we need to make sure that the correct scope is present in the `access_token`. To do that, add the `Authorize` attribute to the `Scoped` action and pass `read:messages` as the `policy` parameter. 

```csharp
// Controllers/ApiController.cs

[Route("api")]
public class ApiController : Controller
{
    [HttpGet("private-scoped")]
    [Authorize("read:messages")]
    public IActionResult Scoped()
    {
        return Ok(new
        {
            Message = "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
        });
    }
}
```
