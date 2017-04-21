---
title: Authorization
name: Shows how to secure your API using the standard JWT middeware
description: Shows how to secure your API using the standard JWT middeware.
budicon: 500
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-aspnetcore-webapi-sample',
  path: '01-Authentication',
  requirements: [
    '.NET Core 1.0',
    'Visual Studio 2015 Update 3 (Optional)',
    'Visual Studio Code (Optional)'
  ]
}) %>

<%= include('../_includes/_api_auth_preamble') %>

This sample demonstrates how to check for a JWT in the `Authorization` header of an incoming HTTP request and verify that it is valid using the standard ASP.NET Core JWT middleware. 

## Install Dependencies

To use Auth0 Access Tokens with ASP.NET Core you will use the JWT Middleware. Add the `Microsoft.AspNetCore.Authentication.JwtBearer` package to your application.

```text
Install-Package Microsoft.AspNetCore.Authentication.JwtBearer
```

This was already done for you in the seed project, so no need to add it if you are using the seed project as a starting point.

That's all you need to start working with Auth0 in your Web API!

Please continue with the [Authentication](/quickstart/backend/aspnet-core-webapi/01-authentication) tutorial to secure your Web API.

## Configuration

<%= include('../_includes/_api_jwks_description', { sampleLink: 'https://github.com/auth0-samples/auth0-aspnetcore-webapi-sample/tree/master/03-Authentication-HS256' }) %>

The ASP.NET Core JWT middleware will handle the downloading of the JSON Web Key Set (JWKS) file for you, and will automatically verify the `access_token` signature using the public key from the JWKS.

Do add the JWT middleware to your application's middleware pipeline, go to the `Configure` method of your `Startup` class and add a call to `UseJwtBearerAuthentication` passing in the configured `JwtBearerOptions`. The `JwtBearerOptions` needs to specify your Auth0 API Identifier as the `Audience`, and the full path to your Auth0 domain as the `Authority`:

```csharp
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

The JWT middleware integrates with the standard ASP.NET Core [Authentication](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/) and [Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/) mechanisms.

To secure an endpoint you only need to decorate your controller action with the `[Authorize]` attribute:

```csharp
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

To configure scopes in your Auth0 dashboard, navigate to [your API](${manage_url}/#/apis) and choose the **Scopes** tab. In this area you can apply any scopes you wish, including ones called `read:messages` and `create:messages`, which will be used in this example.

To ensure that n `access_token` contains the correct `scope` you can make use of the new Policy-Based Authorization in ASP.NET Core.

::: panel-info ASP.NET Core Policy-Based Authorization
For a better understanding of the code which follows, it is suggested that you read the ASP.NET Core documentation on [Policy-Based Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/policies).
:::

Create a new Authorization Requirement called `HasScopeRequirement`. This requirement will check that the `scope` claim issued by your Auth0 tenant is present, and if so it will ensure that the `scope` claim contains the requested scope. If it does then the Authorization Requirement is met.

```csharp
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
public void ConfigureServices(IServiceCollection services)
{
    // Add framework services.
    services.AddMvc();

    string domain = $"https://{Configuration["Auth0:Domain"]}/";
    services.AddAuthorization(options =>
    {
        options.AddPolicy("read:messages",
            policy => policy.Requirements.Add(new HasScopeRequirement("read:messages", domain)));
        options.AddPolicy("create:messages",
            policy => policy.Requirements.Add(new HasScopeRequirement("create:messages", domain)));
    });
}
```

Finally, to ensure that a scope is present in order to call a particular API endpoint, you simply need to decorate the action with the `Authorize` attribute, and pass the name of the Policy for that `scope` in the `policy` parameter:

```csharp
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
    public IActionResult Create(Message message)
    {
        // Create a new message
    }
}
```

## Further Reading

* To learn how you can call your API from clients, please refer to the [Using your API section](/quickstart/backend/aspnet-core-webapi/02-using).

* If your experience problems with your API, please refer to the [Troubleshooting section](/quickstart/backend/aspnet-core-webapi/03-troubleshooting).
