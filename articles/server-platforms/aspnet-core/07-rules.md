---
title: Rules
description: This tutorial will show you how to use Auth0 rules to extend what Auth0 has to offer.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-aspnetcore-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-aspnetcore-sample',
  pkgBranch: 'master',
  pkgPath: '07-Rules',
  pkgFilePath: '07-Rules/SampleMvcApp/appsettings.json',
  pkgType: 'replace'
}) %>



<%= include('../_includes/_rules-introduction') %>

## Display the Country in the User Profile

Now that the user's country is returned by Auth0, you can display this inside the user profile page created in the previous step.

Update the `UserProfileViewModel` and add a `Country` property:

```csharp
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
[Authorize]
public IActionResult Profile()
{
  return View(new UserProfileViewModel()
  {
    Name = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value,
    EmailAddress = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value,
    ProfileImage = User.Claims.FirstOrDefault(c => c.Type == "picture")?.Value,
    Country = User.Claims.FirstOrDefault(c => c.Type == "country")?.Value
  });
}
```

And finally display the country in the profile view:

```html
@model SampleMvcApp.ViewModels.UserProfileViewModel
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

![](/media/articles/server-platforms/aspnet-core/user-profile-country.png)
