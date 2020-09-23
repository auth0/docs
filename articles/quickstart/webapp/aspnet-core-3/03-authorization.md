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

## Create and Assign Roles

Before you can add Role Based Access Control, you will need to ensure the required roles are created and assigned to the corresponding user(s).
Follow the guidance explained in [assign-roles-to-users](/users/assign-roles-to-users) to ensure your user gets assigned the `admin` role.

Once the role is created and assigned to the required user(s), you will need to create a [rule](/rules/current) that adds the role(s) to the IdToken so that it is available for your backend. To do so, go to the [new rule page](${manage_url}/#/rules/new) and create an empty rule. Then, use the following code for your rule:

``` js
function (user, context, callback) {
  const assignedRoles = (context.authorization || {}).roles;
  const idTokenClaims = context.idToken || {};

  idTokenClaims['https://schemas.quickstarts.com/roles'] = assignedRoles;

  callback(null, user, context);
}
```

This quickstart uses `https://schemas.quickstarts.com/roles` for the claim [namespace](/tokens/guides/create-namespaced-custom-claims), but it is suggested that you use a namespace related to your own Auth0 tenant for your claims, e.g. `https://schemas.YOUR_TENANT_NAME.com/roles`.

::: note
For more information on custom claims, read [User profile claims and scope](/api-auth/tutorials/adoption/scope-custom-claims).
:::

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
    .AddCookie()
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
