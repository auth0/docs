---
title: API Authorization 
description: This tutorial will show you how authorize or deny a user to access certain API endpoints based on the scope of the access token.
budicon: 500
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-aspnetcore-webapi-sample',
  path: '02-Authorization',
  requirements: [
    '.NET Core 1.0',
    'Visual Studio 2015 Update 3 (Optional)',
    'Visual Studio Code (Optional)'
  ]
}) %>

An API can enforce fine grained control over who can access the various endpoints exposed by the API. These permissions are expressed as scopes.

When a user authorizes a client application, the application can also indicate which permissions it requires. The user is allowed to review and grant these permissions. These permissions are then included in the `access_token` as part of the `scope` claim.

Subsequently when the client passes along the `access_token` when making requests to the API, the API can query the `scope` claim to ensure that the required permissions were granted in order to call the particular API endpoint

In your ASP.NET Core Web API, you can query the `scope` claim to ensure that the token contains the correct scope required by a particular API endpoint. The `scope` claim will contain the list of scopes separated by a space, as can be seen in the example JWT payload below:

```json
{
  "iss": "https://auth0pnp.auth0.com/",
  "sub": "5fJ...",
  "aud": "https://api.myapp.com/timesheets",
  "exp": 1479957385,
  "iat": 1479870985,
  "scope": "delete:timesheets update:timesheets create:timesheets read:timesheets"
}
```

## 1. Define scopes

You will need to define to list of scopes available in your application. In the [APIs section]("${manage_url}/#/apis) of the Auth0 Dashboard, select your API and then go to the __Scopes__ tab of the API. Configure the list of Scopes available in your API:

![Configure Scopes](/media/articles/server-apis/aspnet-core-webapi/create-api-scopes.png)

Once you have created the list of scopes, go to the __Non Interactive Clients__ tab. For each client which is able to access your API, ensure that you have Authorized the client and selected the Scopes which can be granted to the Client. Be sure the click the **Update** button once you have configure the Client:

![Configure Client](/media/articles/server-apis/aspnet-core-webapi/configure-api-client-scopes.png)

## 2. Enforcing scopes in your ASP.NET Core API 

To ensure that a correct `scope` is present in order to execute a particular API endpoint, you can make use of the new Policy Based Authorization in ASP.NET Core. For a better understanding of the code which follows, it is suggested that you read the ASP.NET Core documentation on [Policy Based Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/policies).

Create a new Authorization Requirement called `HasScopeRequirement`. This requirement will check that the `scope` claim issued by your Auth0 tenant is present, and if so it will ensure that the `scope` claim contains the requested scope. If it does then the Authorization Requirement is met. Otherwise it will fail. 

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
        var scopes = context.User.FindFirst(c => c.Type == "scope").Value.Split(' ');

        // Succeed if the scope array contains the required scope
        if (scopes.Any(s => s == scope))
            context.Succeed(requirement);

        return Task.CompletedTask;
    }
}
``` 

Next you can define a policy for each of the scopes in your application in the `ConfigureServices` method of your `Startup` class: 

```csharp
public void ConfigureServices(IServiceCollection services)
{
    // Add framework services.
    services.AddMvc();

    string domain = $"https://{Configuration["Auth0:Domain"]}/";
    services.AddAuthorization(options =>
    {
        options.AddPolicy("read:timesheets",
            policy => policy.Requirements.Add(new HasScopeRequirement("read:timesheets", domain)));
        options.AddPolicy("create:timesheets",
            policy => policy.Requirements.Add(new HasScopeRequirement("create:timesheets", domain)));
    });
}
```

Finally, to ensure that a scope is present in order to call a particular API endpoint, you simply need to decorate the action with the `Authorize` attribute, and pass the name of the Policy for that `scope` in the `policy` parameter:

```csharp
[Route("api/timesheets")]
public class TimesheetsController : Controller
{
    [Authorize("read:timesheets")]
    [HttpGet]
    public IActionResult GetAll()
    {
        // Return the list of timesheets
    }

    [Authorize("create:timesheets")]
    [HttpPost]
    public IActionResult Create(Timesheet timeheet)
    {
        // Create a new timesheet entry
    }
}
```

## 3. Testing the Authorization Postman

You can test the API endpoints by generating a token with the required scopes, and passing the `access_token` as a Bearer token in the Authorization header. 

If the required `scope` is present, the API call will succeed:

![](/media/articles/server-apis/aspnet-core-webapi/scope-success.png)

If the required `scope` is not present, an HTTP Status 403 (Forbidden) will be returned: 

![](/media/articles/server-apis/aspnet-core-webapi/scope-forbidden.png)