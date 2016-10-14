---
title: Authorization
description: This tutorial will show you how assign roles to your users, and use those claims to authorize or deny a user to access certain API endpoints.
budicon: 500
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-aspnet-owin-webapi-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-aspnet-owin-webapi-sample',
  pkgBranch: 'master',
  pkgPath: '03-Authorization/WebApi',
  pkgFilePath: '03-Authorization/WebApi/WebApi/Web.config',
  pkgType: 'replace'
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

The JWT middleware will automatically map claims contained in the JWT to claims on the `ClaimsIdentity`. Specifically, it will look for a "roles" claim on the `id_token`, and then for each role inside the array on the "roles" claim, it will add a "http://schemas.microsoft.com/ws/2008/06/identity/claims/role" claim to the `ClaimsIdentity`.

This means that it integrates seamlessly with the Role based authorization inside ASP.NET.

Once the correct claims are being returned from Auth0, all you therefore have to do is decorate your controller actions with the `[Authorize(Roles = ?)]` attribute.

The sample code below will restrict the particular action only to user who have the "admin" role:

```csharp
[RoutePrefix("api")]
public class PingController : ApiController
{
    [Authorize(Roles = "admin")]
    [HttpGet]
    [Route("ping/admin")]
    public IHttpActionResult PingAdmin()
    {
        return Ok(new
        {
            Message = "All good. Only administrators will be able to call this endpoint."
        }
        );
    }
}
```

### Debugging Claims

The sample source code for this quickstart contains a very handy API endpoint which allows you to view the claims associated with a particular JWT. You simply make a call to the `/api/claims` endpoint and it will return all the claims associated with the JWT.

The source code for this action is very simple, so you can easily add it to your own projects as well to assist when debugging JSON Web Tokens:

```csharp
[RoutePrefix("api")]
public class PingController : ApiController
{
    [Authorize]
    [Route("claims")]
    [HttpGet]
    public object Claims()
    {
        var claimsIdentity = User.Identity as ClaimsIdentity;

        return claimsIdentity.Claims.Select(c =>
            new
            {
                Type = c.Type,
                Value = c.Value
            });
    }
}
```
