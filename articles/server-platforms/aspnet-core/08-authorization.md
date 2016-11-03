---
title: Authorization
description: This tutorial will show you how assign roles to your users, and use those claims to authorize or deny a user to access certain routes in the app.
budicon: 546
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-aspnetcore-sample',
  path: '08-Authorization'
}) %>

<%= include('../_includes/_authorization-introduction', { ruleslink: '/docs/quickstart/webapp/aspnet-core/07-rules' }) %>

## Restrict an Action Based on a User's Roles

As mentioned before, the claims returned in the ID Token will automatically be mapped to claims on the `ClaimsIdentity`. ASP.NET Core will also maps roles correctly.

Specifically, it will look for a "roles" claim on the ID Token, and then for each role inside the array on the "roles" claim, it will add a "http://schemas.microsoft.com/ws/2008/06/identity/claims/role" claim to the `ClaimsIdentity`.

This means that it integrates seamlessly with the [Role based authorization](https://docs.asp.net/en/latest/security/authorization/roles.html) inside ASP.NET Core.

Once the correct claims are being returned from Auth0, all you therefore have to do is decorate your controller actions with the `[Authorize(Roles = ?)]` attribute.

The sample code below will restrict the particular action only to user who have the "admin" role:

```csharp
[Authorize(Roles = "admin")]
public IActionResult Admin()
{
  return View();
}
```

## Ensure the Roles scope is requested

You will also need to ensure that you request the `roles` scope. This will ensure that the `roles` claim is returned in the `id_token`. Go back to the `Configure` method of the `Startup` class and update the registration of the OIDC middleware to request the `roles` scope:

```csharp
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
