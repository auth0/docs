---
title: Authorization
description: This tutorial demonstrates how to assign roles to your users, and use those roles to authorize or deny a user to access certain routes in the app.
budicon: 500
topics:
  - quickstarts
  - webapp
  - aspnet-owin
  - authorization
github:
  path: Quickstart/03-Authorization
contentType: tutorial
useCase: quickstart
---

ASP.NET (OWIN) supports Role-based Authorization which allows you to limit access to your application based on the user's role. This tutorial shows how to add role information to the user's ID Token and then use it to limit access to your application.

::: note
This tutorial assumes that you are familiar with [Rules](/rules/current).
:::

<%= include('../_includes/_create_and_assign_roles') %>

## Restrict an Action Based on a User's Role

Update the OpenID Connect middleware registration inside your `Startup` class to inform it which claim in the ID Token contains the role information by setting the `RoleClaimType` property of the `TokenValidationParameters`. The value you specify must match the claim you used in your rule.

``` csharp
// Startup.cs

app.UseOpenIdConnectAuthentication(new OpenIdConnectAuthenticationOptions
{
    //...
    TokenValidationParameters = new TokenValidationParameters
    {
        NameClaimType = "name",
        RoleClaimType = "https://schemas.quickstarts.com/roles"
    },
    //...
});

```

Now you can add a new action to your controller and restrict it by decorating your controller actions with the `[Authorize(Roles = ?)]` attribute.

The sample code below will restrict the particular action to users who have the "admin" role:

```csharp
// Controllers/AccountController.cs

[Authorize(Roles = "admin")]
public ActionResult Admin()
{
    return View();
}
```
