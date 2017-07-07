---
title: Authorization
description: This tutorial will show you how assign roles to your users, and use those claims to authorize or deny a user to access certain routes in the app.
budicon: 546
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-aspnetcore-mvc-samples',
  path: 'Quickstart/05-Authorization',
  requirements: [
    '.NET Core 1.1.0',
    'ASP.NET Core 1.1.1',
    'Microsoft.AspNetCore.Authentication.OpenIdConnect 1.1.1'
  ]
}) %>

Many identity providers will supply access claims, like roles or groups, with the user. You can request these in your token by setting `scope: openid roles` or `scope: openid groups`. However, not every identity provider provides this type of information. Fortunately, Auth0 has an alternative to it, which is creating a rule for assigning different roles to different users.

::: note
This tutorial assumes that you are familiar with [Rules](https://auth0.com/docs/rules/current).
:::

### Create a Rule to assign roles

First, we will create a rule that assigns our users either an `admin` role, or a single `user` role. To do so, go to the [new rule page](${manage_url}/#/rules/new) and select the "*Set Roles To A User*" template, under *Access Control*. Then, replace this line from the default script:

```js
if (user.email.indexOf('@example.com') > -1)
```

to match the condition that fits your needs. Notice that you can also set more roles other than `admin` and `user`, or customize the whole rule as you please.

By default, it says that if the user email contains `@example.com` they will be given an `admin` role, otherwise a regular `user` role.

## Restrict an Action Based on a User's Roles

As mentioned before, the claims returned in the ID Token will automatically be mapped to claims on the `ClaimsIdentity`. ASP.NET Core will also map roles correctly.

Specifically, it will look for a "roles" claim on the ID Token, and then for each role inside the array on the "roles" claim, it will add a "http://schemas.microsoft.com/ws/2008/06/identity/claims/role" claim to the `ClaimsIdentity`.

This means that it integrates seamlessly with the [Role based authorization](https://docs.asp.net/en/latest/security/authorization/roles.html) inside ASP.NET Core.

Once the correct claims are being returned from Auth0, all you have to do therefore, is decorate your controller actions with the `[Authorize(Roles = ?)]` attribute.

The sample code below will restrict the particular action only to the user who have the "admin" role:

```csharp
// Controllers/HomeController.cs

[Authorize(Roles = "admin")]
public IActionResult Admin()
{
  return View();
}
```

## Ensure the Roles scope is requested

You will also need to ensure that you request the `roles` scope. This will ensure that the `roles` claim is returned in the `id_token`. Go back to the `Configure` method of the `Startup` class and update the registration of the OIDC middleware to request the `roles` scope:

```csharp
// Startup.cs

var options = new OpenIdConnectOptions("Auth0")
{
    // Code omitted for brevity...
};
options.Scope.Clear();
options.Scope.Add("openid");
options.Scope.Add("name");
options.Scope.Add("email");
options.Scope.Add("picture");
options.Scope.Add("country");
options.Scope.Add("roles");
app.UseOpenIdConnectAuthentication(options);
```
