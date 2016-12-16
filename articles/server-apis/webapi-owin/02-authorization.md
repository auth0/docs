---
title: API Authorization 
description: This tutorial will show you how authorize or deny a user to access certain API endpoints based on the scope of the access token.
budicon: 500
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-aspnet-owin-webapi-sample',
  path: '02-Authorization/WebApi',
  requirements: [
    'Microsoft Visual Studio 2015 Update 3',
    'Microsoft.Owin.Security.Jwt NuGet Package V3.0.1',
    'System.IdentityModel.Tokens.Jwt NuGet Package v4.0.2',
    'Auth0.OpenIdConnectSigningKeyResolver NuGet Package v1.0.0'
  ]
}) %>

An API can enforce fine-grained control over who can access the various endpoints exposed by the API. These permissions are expressed as scopes.

When a user authorizes a client application, the application can also indicate which permissions it requires. The user is allowed to review and grant these permissions. These permissions are then included in the `access_token` as part of the `scope` claim.

Subsequently, when the client passes along the `access_token` when making requests to the API, the API can query the `scope` claim to ensure that the required permissions were granted in order to call the particular API endpoint. The `scope` claim will contain the list of scopes separated by a space, as can be seen in the example JWT payload below:

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

![Configure Scopes](/media/articles/server-apis/webapi-owin/create-api-scopes.png)

Once you have created the list of scopes, go to the __Non-Interactive Clients__ tab. For each client which is able to access your API, ensure that you have Authorized the client and selected the Scopes which can be granted to the Client. Be sure to click the **Update** button once you have configured the Client:

![Configure Client](/media/articles/server-apis/webapi-scopes/configure-api-client-scopes.png)

## 2. Enforcing scopes in your ASP.NET Web API 

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
[RoutePrefix("api/timesheets")]
public class TimesheetsController : ApiController
{
    [ScopeAuthorize("read:timesheets")]
    [Route("")]
    [HttpGet]
    public IHttpActionResult GetAll()
    {
        // Return the list of timesheets
    }

    [ScopeAuthorize("create:timesheets")]
    [Route("")]
    [HttpPost]
    public IHttpActionResult Create(Timesheet timeheet)
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
