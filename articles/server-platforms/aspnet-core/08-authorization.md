---
title: Authorization
description: This tutorial will show you how assign roles to your users, and use those claims to authorize or deny a user to access certain routes in the app.
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-aspnetcore-sample/tree/master/08-Authorization',
}) %>

<%= include('../_includes/_authorization-introduction', { ruleslink: '/quickstart/spa/angular2/06-rules' }) %>

## Restrict an action based on a user's roles

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

