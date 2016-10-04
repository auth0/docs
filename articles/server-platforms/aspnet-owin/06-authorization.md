---
title: Authorization
description: This tutorial demonstrates how assign roles to your users, and use those claims to authorize or deny a user to access certain routes in the app.
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-aspnet-owin-mvc-sample',
  path: '06-Authorization'
}) %>

Many identity providers will supply access claims, like roles or groups, with the user. You can request these in your token by setting `scope: openid roles` or `scope: openid groups`. However, not every identity provider provides this type of information. Fortunately, Auth0 has an alternative to it, which is creating a rule for assigning different roles to different users.

> This tutorial assumes that you've already read the [rules tutorial](/quickstart/webapp/aspnet-owin/05-rules) and you know how to implement a basic rule in your app.

### Create a Rule to assign roles

First, we will create a rule that assigns our users either an `admin` role, or a single `user` role. To do so, go to the [new rule page](${manage_url}/#/rules/new) and select the "*Set Roles To A User*" template, under *Access Control*. Then, replace this line from the default script:

```
if (user.email.indexOf('@example.com') > -1)
```

to match the condition that fits your needs. Notice that you can also set more roles other than `admin` and `user`, or customize the whole rule as you please.

By default, it says that if the user email contains `@example.com` he will be given an `admin` role, otherwise a regular `user` role.

## Restrict an action based on a user's roles

As with the country property which was added in the previous step, you will also need to manually extract the roles from the user in the `OnAuthenticated` event and add the appropriate claims. For each role you can add a role of the type `ClaimTypes.Role`.

This will ensure proper integration with the existing role based authorization in ASP.NET MVC and allow you to restrict access to a controller by simply decorating your controller actions with the `[Authorize(Roles = ?)]` attribute

So change the existing middleware registration in the `Startup` class to extract the roles and add the claims:

```csharp
var options = new Auth0AuthenticationOptions
{
    ClientId = System.Configuration.ConfigurationManager.AppSettings["auth0:ClientId"],
    ClientSecret = System.Configuration.ConfigurationManager.AppSettings["auth0:ClientSecret"],
    Domain = System.Configuration.ConfigurationManager.AppSettings["auth0:Domain"],
    RedirectPath = new PathString("/Auth0Account/ExternalLoginCallback"),
    Provider = new Auth0AuthenticationProvider
    {
        OnAuthenticated = context =>
        {
            // Get the user's country
            JToken countryObject = context.User["country"];
            if (countryObject != null)
            {
                string country = countryObject.ToObject<string>();

                context.Identity.AddClaim(new Claim("country", country, ClaimValueTypes.String, context.Connection));
            }

            // Get the user's roles
            var rolesObject = context.User["app_metadata"]["roles"];
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

The sample code below will restrict the particular action only to user who have the "admin" role:

```csharp
[Authorize(Roles = "admin")]
public ActionResult Admin()
{
    return View();
}
```
