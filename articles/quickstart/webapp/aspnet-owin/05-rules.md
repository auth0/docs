---
title: Rules
description: This tutorial demonstrates how to use Auth0 rules to extend what Auth0 has to offer.
budicon: 173
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-aspnet-owin-mvc-samples',
  path: 'Quickstart/05-Rules'
}) %>

<%= include('../_includes/_rules-introduction') %>

One thing to note is that for OIDC-conformant clients, all clams must be namespaced. So alter the code for the rule to namespace the claim:

```js
function (user, context, callback) {
  if (context.request.geoip) {
    context.idToken['https://schemas.quickstarts.com/country'] = context.request.geoip.country_name;
  }

  callback(null, user, context);
}
```

This quickstart uses `https://schemas.quickstarts.com` for the claim namespace, but it is suggested that you use a namespace related to your own Auth0 tenant for your claims, e.g `https://schemas.YOUR_TENANT_NAME.com`

## Add the country as a claim

The Auth0 middleware will not add the country as a claim, so you will need to do this manually. You can alter the middleware registration in the `Startup` class to add an `OnAuthenticated` event handler which extracts the country from the `User` object and add it as a claim.

```csharp
// Startup.cs

var options = new Auth0AuthenticationOptions()
{
    Domain = auth0Domain,
    ClientId = auth0ClientId,
    ClientSecret = auth0ClientSecret,

    Provider = new Auth0AuthenticationProvider
    {
        OnAuthenticated = context =>
        {
            // Get the user's country
            JToken countryObject = context.User["https://schemas.quickstarts.com/country"];
            if (countryObject != null)
            {
                string country = countryObject.ToObject<string>();

                context.Identity.AddClaim(new Claim("country", country, ClaimValueTypes.String, context.Connection));
            }

            return Task.FromResult(0);
        }
    }
};
app.UseAuth0Authentication(options);
```

## Display the country in the user profile

Now that the user's country is returned by Auth0, you can display this inside the user profile page created in the previous step.

Update the `UserProfileViewModel` and add a `Country` property:

```csharp
// ViewModels/UserProfileViewModel.cs

public class UserProfileViewModel
{
    public string Country { get; set; }

    public string EmailAddress { get; set; }

    public string Name { get; set; }

    public string ProfileImage { get; set; }
}
```

Update the `Profile` action in your `AccountController` to retrieve the country from the "country" claim:

```csharp
// Controllers/AccountController.cs

[Authorize]
public ActionResult Profile()
{
    var claimsIdentity = User.Identity as ClaimsIdentity;

    return View(new UserProfileViewModel()
    {
        Name = claimsIdentity?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value,
        EmailAddress = claimsIdentity?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value,
        ProfileImage = claimsIdentity?.Claims.FirstOrDefault(c => c.Type == "picture")?.Value,
        Country = claimsIdentity?.Claims.FirstOrDefault(c => c.Type == "country")?.Value
    });
}
```

And finally display the country in the profile view:

```html
<!-- Views/Account/UserProfile.cshtml -->

@model global::MvcApplication.ViewModels.UserProfileViewModel
@{
    ViewData["Title"] = "User Profile";
}

<div class="row">
    <div class="col-md-12">
        <div class="row">
            <h2>@ViewData["Title"].</h2>

            <div class="col-md-2">
                <img src="@Model.ProfileImage"
                     alt="" class="img-rounded img-responsive" />
            </div>
            <div class="col-md-4">
                <h3>@Model.Name</h3>
                <p>
                    <i class="glyphicon glyphicon-envelope"></i> @Model.EmailAddress
                </p>
                <p>
                    <i class="glyphicon glyphicon-map-marker"></i> @Model.Country
                </p>
            </div>
        </div>
    </div>
</div>
```

Now when you run the application you will be able to see the user's country displayed:

![](/media/articles/server-platforms/aspnet-owin/user-profile-country.png)
