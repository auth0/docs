---
title: "Authorization: ASP.NET Core Implementation"
description: Implement admin permissions in ASP.NET Core
---

## ASP.NET Core: Implement Admin permissions

The easiest way to integrate the groups into an ASP.NET Core application is to user the built-in [Role based Authorization](https://docs.asp.net/en/latest/security/authorization/roles.html) available in ASP.NET Core. In order to achieve this we will need to add a Claim of type

``` 
http://schemas.microsoft.com/ws/2008/06/identity/claims/role
```

for each of the groups a user is assigned to.

Once the claims has been added we can easily ensure that a specific action is available only to `Admin` users by decorating the claim with the `[Authorize(Roles = "Admin")]` attribute. You can also check whether a user is in a specific role from code by making a call to `User.IsInRole("Admin")` from inside your controller.

The ASP.NET OIDC middleware will automatically add all claims returned in the JWT as claims to the `ClaimsIdentity`. We would therefore need to extract the information from the `authorization` claim, deserialize the JSON body of the claim, and for each of the groups add a `http://schemas.microsoft.com/ws/2008/06/identity/claims/role` claim to the `ClaimsIdentity`.

```csharp
app.UseOpenIdConnectAuthentication(new OpenIdConnectOptions("Auth0")
{
    // Some configuration omitted for brevity

    Events = new OpenIdConnectEvents
    {
        OnTicketReceived = context =>
        {
            var options = context.Options as OpenIdConnectOptions;

            // Get the ClaimsIdentity
            var identity = context.Principal.Identity as ClaimsIdentity;
            if (identity != null)
            {
                // Add the groups as roles
                var authzClaim = context.Principal.FindFirst(c => c.Type == "authorization");
                if (authzClaim != null)
                {
                    var authorization = JsonConvert.DeserializeObject<Auth0Authorization>(authzClaim.Value);
                    if (authorization != null)
                    {
                        foreach (var group in authorization.Groups)
                        {
                            identity.AddClaim(new Claim(ClaimTypes.Role, group, ClaimValueTypes.String, options.Authority));
                        }
                    }
                }
            }

            return Task.FromResult(0);
        }
    }
});
```

And subsequently we can add an action which allows Administrators to approve timesheets:

```csharp
[Authorize(Roles = "Admin")]
public IActionResult TimesheetApproval()
{          
    return View();
}
```
