---
title: Authorization
description: This tutorial will show you how to assign roles to your users, and use those claims to authorize or deny a user to access certain routes in the app.
budicon: 546
topics:
  - quickstarts
  - webapp
  - aspnet-core
  - authorization
github:
  path: Quickstart/03-Authorization
contentType: tutorial
useCase: quickstart
---
ASP.NET Core supports [Role based Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/roles) which allows you to limit access to your application based on the user's role. This tutorial shows how to add role information to the user's ID token and then use it to limit access to your application.

::: note
To follow the tutorial, make sure you are familiar with [Rules](/rules/current).
:::

<%= include('../_includes/_create_and_assign_roles') %>

## Restrict Access Based on User Roles

Configure the OIDC authentication handler registration inside your ASP.NET application to inform it which claim in the ID Token contains the role information. Specify the `RoleClaimType` inside `TokenValidationParameters`. The value you specify must match the namespace you used in your rule.

```csharp
public void ConfigureServices(IServiceCollection services)
{
    // Some code omitted for brevity...

    // Add authentication services
    services.AddAuthentication(options => {
        //...
    })
    .AddCookie())
    .AddOpenIdConnect("Auth0", options => {
        // ...

        // Set the correct name claim type
        options.TokenValidationParameters = new TokenValidationParameters
        {
            NameClaimType = "name",
            RoleClaimType = "https://schemas.quickstarts.com/roles"
        };

        //...
    });
}
```

You can use the [Role based authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/roles) mechanism to make sure that only the users with specific roles can access certain actions. Add the `[Authorize(Roles = ?)]` attribute to your controller action.

The sample code below restricts the action only to users who have the `admin` role:

```csharp
// Controllers/HomeController.cs

[Authorize(Roles = "admin")]
public IActionResult Admin()
{
  return View();
}
```
