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
<!-- markdownlint-disable MD002 MD041 -->

ASP.NET Core supports [Role based Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/roles) which allows you to limit access to your application based on the user's role. This tutorial shows how to add role information to the user's ID token and then use it to limit access to your application.

::: note
To follow the tutorial, make sure you are familiar with [Rules](/rules/current).
:::

<%= include('../_includes/_create_and_assign_roles', { rolesClaimType: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role' }) %>

## Restrict Access Based on User Roles

One the ID Token contains the roles in the corresponding claim, you can use the [Role based authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/roles) mechanism to make sure that only the users with specific roles can access certain actions. Add the `[Authorize(Roles = ?)]` attribute to your controller action.

The sample code below restricts the action only to users who have the `admin` role:

```csharp
// Controllers/HomeController.cs

[Authorize(Roles = "admin")]
public IActionResult Admin()
{
    return View();
}
```
