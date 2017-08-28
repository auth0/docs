---
title: Authorization
name: Shows how to secure your API using the standard JWT middeware
description: Shows how to secure your API using the standard JWT middeware.
budicon: 500
---

<%= include('../../../../_includes/_package', {
  org: 'auth0-samples',
  branch: 'v2',
  repo: 'auth0-aspnetcore-webapi-samples',
  path: 'Quickstart/01-Authorization',
  requirements: [
    '.NET Core 2.0 (Preview 2)',
    'ASP.NET Core 2.0 (Preview 2)',
    'Visual Studio 2017 (Optional)',
    'Visual Studio Code (Optional)'
  ]
}) %>

<%= include('../../../../_includes/_api_auth_intro') %>

This Quickstart will guide you through the various tasks related to using Auth0-issued Access Tokens to secure your ASP.NET Core Web API.

## Seed and Samples

If you would like to follow along with this Quickstart you can download the [seed project](https://github.com/auth0-samples/auth0-aspnetcore-webapi-samples/tree/v2/Quickstart/00-Starter-Seed). The seed project is just a basic ASP.NET Web API with a simple controller and some of the NuGet packages which will be needed included. It also contains an `appSettings.json` file where you can configure the various Auth0-related settings for your application.

The final project after each of the steps is also available in the [Quickstart folder of the Samples repository](https://github.com/auth0-samples/auth0-aspnetcore-webapi-samples/tree/v2/Quickstart). You can find the final result for each step in the relevant folder inside the repository.

<%= include('../../_includes/_api_create_new') %>

Also, update the `appsettings.json` file in your project with the correct **Domain** and **API Identifier** for your API, e.g.

```json
{
  "Auth0": {
    "Domain": "${account.namespace}",
    "ApiIdentifier": "${apiIdentifier}"
  }
}
```

<%= include('../../_includes/_api_auth_preamble') %>

This sample demonstrates how to check for a JWT in the `Authorization` header of an incoming HTTP request and verify that it is valid using the standard ASP.NET Core JWT middleware.

## Install Dependencies

The seed project already references the new ASP.NET Core metapackage (`Microsoft.AspNetCore.All`) which includes **all** NuGet packages shipped by Microsoft as part of ASP.NET Core 2.0.

If you are not referencing this new metapackage, then please ensure that your add the `Microsoft.AspNetCore.Authentication.JwtBearer` package to your application.

```text
Install-Package Microsoft.AspNetCore.Authentication.JwtBearer -Pre
```

## Configuration

<%= include('../../_includes/_api_jwks_description', { sampleLink: 'https://github.com/auth0-samples/auth0-aspnetcore-webapi-samples/tree/v2/Samples/hs256' }) %>

The ASP.NET Core JWT Bearer authentication handler will take care of downloading the JSON Web Key Set (JWKS) file containing the public key for you, and will use that to verify the `access_token` signature.

In your application you will need to register the Authentication services by making a call to `AddAuthentication`, and also configure JWT Bearer tokens as the default authentication scheme and defaut challenge scheme.

Next you will need to register the JWT Bearer authentication scheme by making a call to `AddJwtBearerAuthentication`. Configure your Auth0 Domain as the `Authority`, and your Auth0 API Identifier as the `Audience`:

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

Also ensure that you add the authentication middleware to the middleware pipeline by adding a call to `UseAuthentication`:

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

The JWT middleware integrates with the standard ASP.NET Core [Authentication](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/) and [Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/) mechanisms. To secure an endpoint you only need to decorate your controller action with the `[Authorize]` attribute:

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

## Configuring Scopes

The JWT middleware above verifies that the `access_token` included in the request is valid; however, it doesn't yet include any mechanism for checking that the token has the sufficient **scope** to access the requested resources.

Scopes provide a way for you to define which resources should be accessible by the user holding a given `access_token`. For example, you might choose to permit `read` access to a `messages` resource if a user has a **manager** access level, or a `create` access to that resource if they are an **administrator**.

To configure scopes in your Auth0 dashboard, navigate to [your API](${manage_url}/#/apis) and select the **Scopes** tab. In this area you can define any scopes you wish. For this sample you can define ones called `read:messages` and `create:messages`.

To ensure that an `access_token` contains the correct `scope` you can make use of the Policy-Based Authorization in ASP.NET Core.

::: note
For a better understanding of the code which follows, it is suggested that you read the ASP.NET Core documentation on [Policy-Based Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/policies).
:::

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

Next, you will need to add a call to `AddAuthorization` in your `ConfigureServices` method, and add policies for the scopes by calling `AddPolicy` for each of the scopes:

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

Finally, to ensure that a scope is present in order to call a particular API endpoint, you simply need to decorate the action with the `Authorize` attribute, and pass the name of the Policy for that `scope` in the `policy` parameter:

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

## Further Reading

* To learn how you can call your API from clients, please refer to the [Using your API section](/quickstart/backend/aspnet-core-webapi/02-using).

* If your experience problems with your API, please refer to the [Troubleshooting section](/quickstart/backend/aspnet-core-webapi/03-troubleshooting).
