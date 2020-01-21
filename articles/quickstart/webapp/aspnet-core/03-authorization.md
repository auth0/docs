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
ASP.NET Core supports [Role based Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/roles) which allows you to limit access to your application based on the user's role. This tutorial shows how to add role information to the user's ID token and then use it to limit access to your application.

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

  // Roles should only be set to verified users.
  if (!user.email || !user.email_verified) {
    return callback(null, user, context);
  }

  user.app_metadata = user.app_metadata || {};
  // You can add a Role based on what you want
  // In this case I check domain
  const addRolesToUser = function(user) {
    const endsWith = '@example.com';

    if (user.email && (user.email.substring(user.email.length - endsWith.length, user.email.length) === endsWith)) {
      return ['admin'];
    }
    return ['user'];
  };

  const roles = addRolesToUser(user);

  user.app_metadata.roles = roles;
  auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
    .then(function() {
      context.idToken['https://schemas.quickstarts.com/roles'] = user.app_metadata.roles;
      callback(null, user, context);
    })
    .catch(function (err) {
      callback(err);
    });
}
```

Update the code to check for your own email domain, or match your custom condition.

::: note
You can define more roles other than `admin` and `user`, or customize the whole rule, depending on your product requirements.
:::

This quickstart guide uses `https://schemas.quickstarts.com/roles` for the claim [namespace](/tokens/guides/create-namespaced-custom-claims). We recommend that you use a namespace related to your own Auth0 tenant for your claims, for example, `https://schemas.YOUR_TENANT_NAME.com`.

::: note
For more information on custom claims, read [User profile claims and scope](/api-auth/tutorials/adoption/scope-custom-claims).
:::

## Restrict Access Based on User Roles

Configure the OIDC authentication handler registration inside your ASP.NET application to inform it which claim in the ID Token contains the role information. Specify the `RoleClaimType` inside `TokenValidationParameters`. The value you specify must match the namespace you used in your rule.

```csharp
public void ConfigureServices(IServiceCollection services)
{
    // Some code omitted for brevity...

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
