---
title: User Profile
description: This tutorial will show you how to display get the user's profile and display it.
budicon: 292
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-aspnetcore-mvc-samples',
  branch: 'v1',
  path: 'Quickstart/02-User-Profile',
  requirements: [
    '.NET Core 1.1.0',
    'ASP.NET Core 1.1.1',
    'Microsoft.AspNetCore.Authentication.OpenIdConnect 1.1.1'
  ]
}) %>

## Getting the Profile

As mentioned in the previous step, the OIDC middleware will automatically extract the user's information from the ID Token and add it as claims to the `ClaimsIdentity`.

The seed project contains a controller action and view which will display the claims associated with a particular user. Once a user has signed in, you can simply go to `/Account/Claims` to see these claims.

You may also want to create a nicer looking user profile page which will display a user's name, email address and profile image.

First create view model which will contain the basic user profile information, such as a `Name`, `EmailAddress` and `ProfileImage`:

```csharp
// ViewModels/UserProfileViewModel.cs

public class UserProfileViewModel
{
  public string EmailAddress { get; set; }

  public string Name { get; set; }

  public string ProfileImage { get; set; }
}
```

Add a new `Profile` action to the `AccountController` and extract the relevant claims and add them to a new instance of `UserProfileViewModel` which is then passed to the view. Be sure to dectorate the action with the `[Authorize]` attribute so only authenticated users can access the action:

```csharp
// Controllers/AccountController.cs

[Authorize]
public IActionResult Profile()
{
  return View(new UserProfileViewModel()
  {
    Name = User.Identity.Name,
    EmailAddress = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value,
    ProfileImage = User.Claims.FirstOrDefault(c => c.Type == "picture")?.Value
  });
}
```

The `User.Identity.Name` property will look for a claim of type `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name` on the user object. Auth0 passes the name of the user in the `name` claim of the `id_token`, but this does not get automatically matched the the `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name` claim type, and therefore `User.Identity.Name` will return null.

There is however a way to control the claim type which ASP.NET Core should retrieve when accessing the name through `User.Identity.Name`. To do this you need to update the OIDC middleware registration in the `Startup` class and set the `NameClaimType` of the `TokenValidationParameters` property. By setting this value to `name`, ASP.NET Core will retrieve the value of the `name` claim which was passed in the `id_token` whenever you access the name of the user using the `User.Identity.Name` property.

You will also need to update the list of scopes to ensure that your request the `profile` scope. This will ensure the user's profile information is returned as claims in the `id_token`.


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
      NameClaimType = "name"
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

Next create a view. For the view, display a user profile card at the top with the user's name, email address and profile image.

```html
<!-- Views/Account/Profile.cshtml -->

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
      </div>
    </div>
  </div>
</div>
```

Now when you log in and then go to the URL `/Account/Profile` you will see all the user's profile displayed.

## Displaying the User's Name in the Navigation Bar

You may also want to put a link in the top navigation bar to display the user's name, and when the user clicks on that you can navigate them to their Profile page.

Go to the `Views/Shared/_Layout.cshtml` file and update the Navbar section which displays the Login and Logout options to also display the user's name and link to the `Profile` action in the `AccountController`:

```html
<!-- Views/Shared/_Layout.cshtml -->

<ul class="nav navbar-nav navbar-right">
  @if (User.Identity.IsAuthenticated)
  {
    <li><a asp-controller="Account" asp-action="Profile">Hello @User.Identity.Name!</a></li>
    <li><a  asp-controller="Account" asp-action="Logout">Logout</a></li>
  }
  else
  {
    <li><a asp-controller="Account" asp-action="Login">Login</a></li>
  }
</ul>
```

Now, after the user has signed it you will be able to see the user's name in the top right corner of the Navbar:

![](/media/articles/server-platforms/aspnet-core/navbar-userprofile.png)
