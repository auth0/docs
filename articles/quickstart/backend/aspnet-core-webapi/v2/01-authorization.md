---
title: Authorization
name: Shows how to secure your API using the standard JWT middeware
description: Shows how to secure your API using the standard JWT middeware.
budicon: 500
---

<%= include('../../../../_includes/_package', {
  org: 'auth0-samples',
  branch: 'master',
  repo: 'auth0-aspnetcore-webapi-samples',
  path: 'Quickstart/01-Authorization',
  requirements: [
    '.NET Core 2.0',
    'ASP.NET Core 2.0',
    'Visual Studio 2017 (Optional)',
    'Visual Studio Code (Optional)'
  ]
}) %>

<%= include('../../../../_includes/_api_auth_intro') %>

This tutorial shows you how to use access tokens from Auth0 to secure your ASP.NET Core Web API.

## Before You Start

If you want to follow along with this tutorial, you can download the [seed project](https://github.com/auth0-samples/auth0-aspnetcore-webapi-samples/tree/master/Quickstart/00-Starter-Seed). The seed project is a basic ASP.NET Web API with a simple controller and some NuGet packages. It also contains an `appSettings.json` file where you can configure the Auth0-related settings for your application.

To see what the project looks like after each of the steps, check the [Quickstart folder of the Samples repository](https://github.com/auth0-samples/auth0-aspnetcore-webapi-samples/tree/master/Quickstart).

<%= include('../../_includes/_api_create_new') %>

Update the `appsettings.json` file in your project with the correct domain and API identifier for your API. See the example below:

```json
{
  "Auth0": {
    "Domain": "${account.namespace}",
    "ApiIdentifier": "${apiIdentifier}"
  }
}
```

<%= include('../../_includes/_api_auth_preamble') %>

This example demonstrates:
* How to check for a JSON Web Token (JWT) in the `Authorization` header of an incoming HTTP request
* How to check if the token is valid with the standard ASP.NET Core JWT middleware

## Install Dependencies

The seed project references the new ASP.NET Core metapackage (`Microsoft.AspNetCore.All`), which includes all the NuGet packages that are a part of the ASP.NET Core 2.0 framework.

If you are not using the `Microsoft.AspNetCore.All` metapackage, add the `Microsoft.AspNetCore.Authentication.JwtBearer` package to your application.

```text
Install-Package Microsoft.AspNetCore.Authentication.JwtBearer
```

## Configure the Middleware

<%= include('../../_includes/_api_jwks_description', { sampleLink: 'https://github.com/auth0-samples/auth0-aspnetcore-webapi-samples/tree/master/Samples/hs256' }) %>

The ASP.NET Core JWT Bearer authentication handler downloads the JSON Web Key Set (JWKS) file with the public key. The handler uses the JWKS file and the public key to verify the access token's signature.

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

The JWT middleware integrates with the standard ASP.NET Core [Authentication](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/) and [Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/) mechanisms. 

To secure an endpoint, you need to add the `[Authorize]` attribute to your controller action:

```csharp
// Controllers/PingController.cs

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

## Configure the Scopes

The JWT middleware shown above verifies if the user's access token included in the request is valid. The middleware doesn't check if the token has the sufficient scope to access the requested resources.

<%= include('../../_includes/_api_scopes_access_resources') %>

::: note
This example uses the `read:messages` and `create:messages` scopes.
:::

To make sure that an access token contains the correct scope, use the [Policy-Based Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/policies) in ASP.NET Core.

Create a new authorization requirement called `HasScopeRequirement`. This requirement checks if the `scope` claim issued by your Auth0 tenant is present. If the `scope` claim exists, the requirement checks if the `scope` claim contains the requested scope.

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

In your `ConfigureServices` method, add a call to the `AddAuthorization` method. To add policies for the scopes, call `AddPolicy` for each scope:

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
        options.AddPolicy("create:messages", policy => policy.Requirements.Add(new HasScopeRequirement("create:messages", domain)));
    });
}
```

To make a call to an API endpoint, make sure that a scope is present. To do that, add the `Authorize` attribute to an action. Then, in the `policy` parameter, add the policy name for the scope. 

```csharp
// Controllers/MessagesController.cs

[Route("api/messages")]
public class MessagesController : Controller
{
    [Authorize("read:messages")]
    [HttpGet]
    public IActionResult GetAll()
    {
        // Return the list of messages
    }

    [Authorize("create:messages")]
    [HttpPost]
    public IActionResult Create([FromBody] Message message)
    {
        // Create a new message
    }
}
```
