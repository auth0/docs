---
title: Authorization
description: This tutorial will show you how assign roles to your users, and use those claims to authorize or deny a user to access certain API endpoints.
budicon: 500
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-aspnetcore-webapi-sample',
  path: '06-Authorization-Deprecated',
  requirements: [
    '.NET Core 1.0'
  ]
}) %>

Many identity providers will supply access claims, like roles or groups, with the user. You can request these in your token by setting `scope: openid roles` or `scope: openid groups`. However, not every identity provider provides this type of information. Fortunately, Auth0 has an alternative to it, which is creating a rule for assigning different roles to different users.

## 1.Create a Rule to assign roles

First, you must create a rule that assigns users either an `admin` role, or a single `user` role. To do so, go to the [new rule page](${manage_url}/#/rules/new) and select the "*Set Roles To A User*" template, under *Access Control*. Then, replace this line from the default script:

```
if (user.email.indexOf('@example.com') > -1)
```

to match the condition that fits your needs. Notice that you can also set more roles other than `admin` and `user`, or customize the whole rule as you please.

By default, it says that if the user email contains `@example.com` he will be given an `admin` role, otherwise a regular `user` role.

## 2. Restrict an action based on a user's roles

ASP.NET Core will automatically map claims contained in the JWT to claims on the `ClaimsIdentity`. Specifically, it will look for a `roles` claim on the `id_token`, and then for each role inside the array on the "roles" claim, it will add a `http://schemas.microsoft.com/ws/2008/06/identity/claims/role` claim to the `ClaimsIdentity`.

This means that it integrates seamlessly with the [Role based authorization](https://docs.asp.net/en/latest/security/authorization/roles.html) inside ASP.NET Core.

Once the correct claims are returned from Auth0, all you have to do is decorate your controller actions with the `[Authorize(Roles = ?)]` attribute.

The sample code below will restrict the particular action only to user who have the "admin" role:

```csharp
[Authorize(Roles = "admin")]
[HttpGet]
[Route("ping/admin")]
public string PingAdmin()
{
    return "All good. Only admins will be able to see this message.";
}
```

### Debug Claims

The sample source code for this quickstart contains a very handy API endpoint which allows you to view the claims associated with a particular JWT. You simply make a call to the `/api/claims` endpoint and it will return all the claims associated with the JWT.

The source code for this action is very simple, so you can easily add it to your own projects as well to assist when debugging JSON Web Tokens:

```csharp
[Authorize]
[HttpGet("claims")]
public object Claims()
{
    return User.Claims.Select(c =>
    new
    {
        Type = c.Type,
        Value = c.Value
    });
}
```
