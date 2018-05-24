---
title: Authorization
description: This tutorial demonstrates how assign roles to your users, and use those claims to authorize or deny a user to access certain routes in the app.
budicon: 500
github:
  path: Quickstart/04-Authorization
---
Many identity providers will supply access claims, like roles or groups, with the user. You can request these in your token by setting `scope: openid roles` or `scope: openid groups`. However, not every identity provider provides this type of information. Fortunately, Auth0 has an alternative to it, which is creating a rule for assigning different roles to different users.

::: note
This tutorial assumes that you are familiar with [Rules](/rules/current).
:::

### Create a Rule to assign roles

First, we will create a rule that assigns our users either an `admin` role, or a single `user` role. To do so, go to the [new rule page](${manage_url}/#/rules/new) and create an empty rule. Then, use the following code for your rule:

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

This quickstart uses `https://schemas.quickstarts.com` for the claim namespace, but it is suggested that you use a namespace related to your own Auth0 tenant for your claims, e.g `https://schemas.YOUR_TENANT_NAME.com`

## Restrict an action based on a user's roles

As with the country property which was added in the previous step, you will also need to manually extract the roles from the user in the `OnAuthenticated` event and add the appropriate claims. For each role, you can add a role of the type `ClaimTypes.Role`.

This will ensure proper integration with the existing role-based authorization in ASP.NET MVC and allow you to restrict access to a controller by simply decorating your controller actions with the `[Authorize(Roles = ?)]` attribute

So change the existing middleware registration in the `Startup` class to extract the roles and add the claims:

```csharp
// Startup.cs

var options = new Auth0AuthenticationOptions()
{
  Domain = auth0Domain,
  ClientId = auth0ClientId,
  ClientSecret = auth0ClientSecret,

  Provider = new Auth0AuthenticationProvider
  {
    OnApplyRedirect = context =>
    {
        string userInfoAudience = $"https://{auth0Domain}/userinfo";
        string redirectUri = context.RedirectUri + "&audience=" + WebUtility.UrlEncode(userInfoAudience);

        context.Response.Redirect(redirectUri);
    },
    OnAuthenticated = context =>
    {
        // Get the user's roles
        var rolesObject = context.User["https://schemas.quickstarts.com/roles"];
        if (rolesObject != null)
        {
            string[] roles = rolesObject.ToObject<string[]>();
            foreach (var role in roles)
            {
                context.Identity.AddClaim(new Claim(ClaimTypes.Role, role, ClaimValueTypes.String, context.Connection));
            }
        }


        return Task.FromResult(0);
    }
  }
};
app.UseAuth0Authentication(options);
```

Now you can add a new action to your controller and restrict it by decorating your controller actions with the `[Authorize(Roles = ?)]` attribute.

The sample code below will restrict the particular action only to the user who have the "admin" role:

```csharp
// Controllers/AccountController.cs

[Authorize(Roles = "admin")]
public ActionResult Admin()
{
    return View();
}
```
