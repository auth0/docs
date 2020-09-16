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

## Create and assign roles

Before we can add Role Based Access Control, we will need to ensure the required roles are created and assigned to the corresponding user(s).
Follow the guidance explained in [assign-roles-to-users](/users/assign-roles-to-users) to ensure your user gets assigned the `admin` role.

Once the role is created and assigned to the required user(s), we will need to create a [rule](/rules/current) that adds the role(s) to the IdToken so that it is available for our backend. To do so, go to the [new rule page](${manage_url}/#/rules/new) and create an empty rule. Then, use the following code for your rule:

``` js
function (user, context, callback) {
  const assignedRoles = (context.authorization || {}).roles;
  const idTokenClaims = context.idToken || {};

  idTokenClaims['https://schemas.quickstarts.com/roles'] = assignedRoles;

  callback(null, user, context);
}
```

This quickstart uses `https://schemas.quickstarts.com/roles` for the claim [namespace](/tokens/guides/create-namespaced-custom-claims), but it is suggested that you use a namespace related to your own Auth0 tenant for your claims, e.g. `https://schemas.YOUR_TENANT_NAME.com/roles`.

## Restrict an action based on a user's roles

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

The sample code below will add an Admin route to the Account controller and restrict the access to only users who have the "admin" role:

```csharp
// Controllers/AccountController.cs

[Authorize(Roles = "admin")]
public ActionResult Admin()
{
    return View();
}
```

We will also need to add a view that represents the Admin route:

``` html
<!-- Views/Account/Admin.cshtml -->
@{
    ViewData["Title"] = "Admin Page";
}

<div class="row">
    <div class="col-md-12">
        <h2>Welcome to the Admin section</h2>
        <p>This page is only visible to administators</p>
    </div>
</div>
```
To make it a bit easier to navigate to the Admin route, let's also add a navigation item to `_Layout.cshtml`:

``` html
<!-- Views/Shared/_Layout.cshtml -->
<ul class="nav navbar-nav">
    <li>@Html.ActionLink("Home", "Index", "Home")</li>
    @if (User.Identity.IsAuthenticated)
    {
        <li>@Html.ActionLink("Admin Section", "Admin", "Account")</li>
    }
</ul>
```
