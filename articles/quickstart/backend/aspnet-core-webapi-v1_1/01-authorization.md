---
title: Authorization
name: Shows how to secure your API using the standard JWT middleware.
description: Shows how to secure your API using the standard JWT middleware.
budicon: 500
github:
    path: Quickstart/01-Authorization
---

<%= include('../../../_includes/_api_auth_intro') %>

This Quickstart will guide you through the various tasks related to using Auth0-issued Access Tokens to secure your ASP.NET Core Web API.

## Seed and Samples

If you would like to follow along with this Quickstart you can download the [seed project](https://github.com/auth0-samples/auth0-aspnetcore-webapi-samples/tree/v1/Quickstart/00-Starter-Seed). The seed project is just a basic ASP.NET Web API with a simple controller and some of the NuGet packages which will be needed included. It also contains an `appSettings.json` file where you can configure the various Auth0-related settings for your application.

The final project after each of the steps is also available in the [Quickstart folder of the Samples repository](https://github.com/auth0-samples/auth0-aspnetcore-webapi-samples/tree/v1/Quickstart). You can find the final result for each step in the relevant folder inside the repository.

<%= include('../_includes/_api_create_new_2') %>

Also, update the `appsettings.json` file in your project with the correct **Domain** and **API Identifier** for your API, such as

```json
{
  "Auth0": {
    "Domain": "${account.namespace}",
    "ApiIdentifier": "${apiIdentifier}"
  }
}
```

<%= include('../_includes/_api_auth_preamble') %>

This example demonstrates:
* How to check for a JSON Web Token (JWT) in the `Authorization` header of an incoming HTTP request
* How to check if the token is valid with the standard ASP.NET Core JWT middleware

## Install Dependencies

To use Auth0 Access Tokens with ASP.NET Core you will use the JWT Middleware. Add the `Microsoft.AspNetCore.Authentication.JwtBearer` package to your application.

```text
Install-Package Microsoft.AspNetCore.Authentication.JwtBearer
```

## Configuration

<%= include('../_includes/_api_jwks_description', { sampleLink: 'https://github.com/auth0-samples/auth0-aspnetcore-webapi-samples/tree/v1/Samples/hs256' }) %>

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

## Configuring Scopes

The JWT middleware above verifies that the `access_token` included in the request is valid; however, it doesn't yet include any mechanism for checking that the token has the sufficient **scope** to access the requested resources.

<%= include('../_includes/_api_scopes_access_resources') %>

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

To secure the API endpoint, we need to make sure that the correct scope is present in the `access_token`. To do that, add the `Authorize` attribute to the `Scoped` action, passing `read:messages` as the `policy` parameter. 

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

## Further Reading

* To learn how you can call your API from applications, please refer to the [Using your API section](/quickstart/backend/aspnet-core-webapi/v1/02-using).

* If your experience problems with your API, please refer to the [Troubleshooting section](/quickstart/backend/aspnet-core-webapi/v1/03-troubleshooting).
