---
title: Authorization
description: This tutorial will show you how assign roles to your users, and use those claims to authorize or deny a user to access certain routes in the app.
budicon: 546
github:
  path: Quickstart/04-Authorization
---

ASP.NET Core supports [Role based Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/roles) which allows you to limit access of users based on their role in the application. In this tutorial we will look at how you can amend your user's `id_token` by adding role information and then use that information inside your application to limit a user's access.

::: note
This tutorial assumes that you are familiar with [Rules](/rules/current).
:::

### Create a Rule to assign roles

First, we will create a rule that assigns our users either an `admin` role, or a `user` role based on the email domain. To do so, go to the [new rule page](${manage_url}/#/rules/new) and create an empty rule. Then use the following code for your rule:

```js
function (user, context, callback) {
  var addRolesToUser = function(user, cb) {
    if (user.email.indexOf('@example.com') > -1) {
      cb(null, ['admin']);
    } else {
      cb(null, ['user']);
    }
  };

  addRolesToUser(user, function(err, roles) {
    if (err) {
      callback(err);
    } else {
      context.idToken["https://schemas.quickstarts.com/roles"] = roles;     
      callback(null, user, context);
    }
  });
}
```

Update the code to check for your own email domain, or match the condition according to your needs. Notice that you can also set more roles other than `admin` and `user`, or customize the whole rule as you please.

This quickstart uses `https://schemas.quickstarts.com` for the claim namespace, but it is suggested that you use a namespace related to your own Auth0 tenant for your claims, e.g `https://schemas.YOUR_TENANT_NAME.com`.

::: note
For more information on custom claims please see [User profile claims and scope](/api-auth/tutorials/adoption/scope-custom-claims).
:::

## Restrict an Action Based on a User's Roles

Next you will need to configure the OIDC middleware registration inside your ASP.NET application to inform it which claim in the `id_token` contains the role information. Alter your OIDC middleware registration to specify the `RoleClaimType` inside the `TokenValidationParameters`. Ensure that this matches the namespace you used inside your Rule.

```csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IOptions<Auth0Settings> auth0Settings)
{
  [...] // code omitted for brevity

  var options = new OpenIdConnectOptions("Auth0")
  {
    [...] // code omitted for brevity

    // Set the correct name claim type
    TokenValidationParameters = new TokenValidationParameters
    {
      NameClaimType = "name",
      RoleClaimType = "https://schemas.quickstarts.com/roles"
    },

    Events = new OpenIdConnectEvents
    {
      // handle the logout redirection 
      OnRedirectToIdentityProviderForSignOut = (context) =>
      {
          [...] // code omitted for brevity
      }
    }
  };
  options.Scope.Clear();
  options.Scope.Add("openid");
  options.Scope.Add("profile");
  app.UseOpenIdConnectAuthentication(options);
}
```

At this point the you have integrated with the the [Role based authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/roles) mechanism of ASP.NET Core, which means that your can ensure that a user belongs to a particular role by simply decorating your controller actions with the `[Authorize(Roles = ?)]` attribute.

The sample code below will restrict the particular action only to users who have the "admin" role:

```csharp
// Controllers/HomeController.cs

[Authorize(Roles = "admin")]
public IActionResult Admin()
{
  return View();
}
```
