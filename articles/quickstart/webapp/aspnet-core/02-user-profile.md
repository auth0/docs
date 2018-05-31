---
title: User Profile
description: This tutorial will show you how to display get the user's profile and display it.
budicon: 292
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-aspnetcore-mvc-samples',
  path: 'Quickstart/02-User-Profile',
  branch: 'master',
  requirements: [
    '.NET Core SDK 2.0',
    '.NET Core 2.0',
    'ASP.NET Core 2.0'
  ]
}) %>

## Get the Profile

The OIDC middleware extracts the user's information from the ID Token and adds it as claims to the `ClaimsIdentity`.

The seed project contains a controller action and view which display the claims associated with a user. Once a user has logged in, you can go to `/Account/Claims` to see these claims.

You can create a custom user profile page for displaying a user's name, email address and profile image.

Create a view model containing the basic user profile information:

```csharp
// ViewModels/UserProfileViewModel.cs

public class UserProfileViewModel
{
  public string EmailAddress { get; set; }

  public string Name { get; set; }

  public string ProfileImage { get; set; }
}
```

Add a new `Profile` action to the `AccountController` and extract the relevant claims. Add the claims to a new instance of `UserProfileViewModel` passed to the view. Add the `[Authorize]` attribute to the action so only authenticated users can access the action:

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

The `User.Identity.Name` property looks for a claim of a type `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name` on the user object. Auth0 passes the name of the user in the `name` claim of the ID Token, but this does not get automatically matched to the  `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name` type. This means that `User.Identity.Name` will return null.

You can control the claim type that ASP.NET Core retrieves when accessing the name through `User.Identity.Name`. To achieve this, update the OIDC authentication handler registration in the `Startup` class. Set the `NameClaimType` of the `TokenValidationParameters` property to `name`. ASP.NET Core will retrieve the value of the `name` claim passed in the ID Token when you access the name of the user with the `User.Identity.Name` property.

You must update the list of scopes to request the `profile` scope. The user's profile information is returned as claims in the ID Token.

```csharp
public void ConfigureServices(IServiceCollection services)
{
    // Add authentication services
    services.AddAuthentication(options => {
        options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    })
    .AddCookie()
    .AddOpenIdConnect("Auth0", options => {
        // ...

        // Configure the scope
        options.Scope.Clear();
        options.Scope.Add("openid");
        options.Scope.Add("profile");

        // Set the correct name claim type
        options.TokenValidationParameters = new TokenValidationParameters
        {
            NameClaimType = "name"
        };

        options.Events = new OpenIdConnectEvents
        {
            // handle the logout redirection 
            OnRedirectToIdentityProviderForSignOut = (context) =>
            {
                //...
            }
        };   
    });
}
```

Next create a view. For the view, display user's profile card at the top with the user's name, email address and profile image.

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

Now when you log in and go to the URL `/Account/Profile`, you will see the user's profile with the information.

## Display the User's Name in the Navigation Bar

You can put a link in the top navigation bar to display the user's name. When the user clicks on their name, you can navigate them to their profile page.

Go to the `Views/Shared/_Layout.cshtml` file and update the `Navbar` section to display the user's name and link to the `Profile` action in the `AccountController`:

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

Now, after the user has logged in, the user's name is displayed in the top-right corner of the navigation bar:

![](/media/articles/server-platforms/aspnet-core/navbar-userprofile.png)
