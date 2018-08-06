---
title: Authorization
description: This tutorial demonstrates how assign roles to your users, and use those roles to authorize or deny a user to access certain routes in the app.
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

## Create a Rule to assign roles

First, we will create a rule that assigns our users either an `admin` role or a single `user` role. To do so, go to the [new rule page](${manage_url}/#/rules/new) and create an empty rule. Then, use the following code for your rule:

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

This quickstart uses `https://schemas.quickstarts.com` for the claim namespace, but it is suggested that you use a namespace related to your own Auth0 tenant for your claims, e.g. `https://schemas.YOUR_TENANT_NAME.com`

## Restrict an action based on a user's roles

Update the OpenID Connect middleware registration inside your `Startup` class to inform it which claim in the ID Token contains the role information by setting the `RoleClaimType` property of the `TokenValidationParameters`. The value you specify must match the claim you used in your rule.

```csharp
// Startup.cs

app.UseOpenIdConnectAuthentication(new OpenIdConnectAuthenticationOptions
{
    AuthenticationType = "Auth0",
    
    Authority = $"https://{auth0Domain}",

    ClientId = auth0ClientId,
    ClientSecret = auth0ClientSecret,

    RedirectUri = auth0RedirectUri,
    PostLogoutRedirectUri = auth0PostLogoutRedirectUri,

    ResponseType = OpenIdConnectResponseType.CodeIdToken,
    Scope = "openid profile email",

    TokenValidationParameters = new TokenValidationParameters
    {
        NameClaimType = "name",
        RoleClaimType = "https://schemas.quickstarts.com/roles"
    },

    Notifications = new OpenIdConnectAuthenticationNotifications
    {
        //...
    }
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
