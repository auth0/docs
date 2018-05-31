---
title: Authorization
description: This tutorial will show you how assign roles to your users, and use those claims to authorize or deny a user to access certain routes in the app.
budicon: 546
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-aspnetcore-mvc-samples',
  path: 'Quickstart/03-Authorization',
  branch: 'master',
  requirements: [
    '.NET Core SDK 2.0',
    '.NET Core 2.0',
    'ASP.NET Core 2.0'
  ]
}) %>

ASP.NET Core supports [Role based Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/roles) which allows you to limit access to your application based on the user's role. This tutorial shows how to add role information to the user's ID Token and then use it to limit access to your application. 

::: note
To follow the tutorial, make sure you are familiar with [Rules](/rules/current).
:::

## Create a Rule to Assign Roles

Create a rule that assigns the following access roles to your user:
* An admin role
* A regular user role

To assign roles, go to the [New rule page](${manage_url}/#/rules/new). In the **Access Control** section, create an empty rule. 

Use the following code for your rule:

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

Update the code to check for your own email domain, or match your custom condition.

::: note
You can define more roles other than `admin` and `user`, or customize the whole rule, depending on your product requirements.
:::

This quickstart guide uses `https://schemas.quickstarts.com` for the claim namespace. We recommend that you use a namespace related to your own Auth0 tenant for your claims, for example, `https://schemas.YOUR_TENANT_NAME.com`.

::: note
For more information on custom claims, read [User profile claims and scope](/api-auth/tutorials/adoption/scope-custom-claims).
:::

## Restrict Access Based on User Roles

Configure the OIDC authentication handler registration inside your ASP.NET application to inform it which claim in the ID Token contains the role information. Specify the `RoleClaimType` inside `TokenValidationParameters`. The value you specify must match the namespace you used in your rule.

```csharp
public void ConfigureServices(IServiceCollection services)
{
    // Add authentication services
    services.AddAuthentication(options => {
        options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    })
    .AddCookie())
    .AddOpenIdConnect("Auth0", options => {
        // ...

        // Configure the scope
        options.Scope.Clear();
        options.Scope.Add("openid");
        options.Scope.Add("profile");
        options.Scope.Add("email");

        // Set the correct name claim type
        options.TokenValidationParameters = new TokenValidationParameters
        {
            NameClaimType = "name",
            RoleClaimType = "https://schemas.quickstarts.com/roles"
        };

        options.Events = new OpenIdConnectEvents
        {
            // handle the logout redirection 
            OnRedirectToIdentityProviderForSignOut = (context) =>
            {
                // ...
            }
        };   
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
