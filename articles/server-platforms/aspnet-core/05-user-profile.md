---
title: User Profile
description: This tutorial will show you how to display get the user's profile and display it.
budicon: 292
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-aspnetcore-sample',
  path: '05-User-Profile'
}) %>

## Getting the Profile

As mentioned in the previous step, the OIDC middleware will automatically extract the user's information from the ID Token and add it as claims to the `ClaimsIdentity`.

The seed project contains a controller action and view which will display the claims associated with a particular user. Once a user has signed in, you can simply go to `/Account/Claims` to see these claims.

You may also want to create a nicer looking user profile page which will display a user's name, email address and profile image.

First create view model which will contain the basic user profile information, such as a `Name`, `EmailAddress` and `ProfileImage`:

```csharp
public class UserProfileViewModel
{
  public string EmailAddress { get; set; }

  public string Name { get; set; }

  public string ProfileImage { get; set; }
}
```

Add a new `Profile` action to the `AccountController` and extract the relevant claims and add them to a new instance of `UserProfileViewModel` which is then passed to the view. Be sure to dectorate the action with the `[Authorize]` attribute so only authenticated users can access the action:

```csharp
[Authorize]
public IActionResult Profile()
{
  return View(new UserProfileViewModel()
  {
    Name = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value,
    EmailAddress = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value,
    ProfileImage = User.Claims.FirstOrDefault(c => c.Type == "picture")?.Value
  });
}
```

Next create a view. For the view, display a user profile card at the top with the user's name, email address and profile image.

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
      </div>
    </div>
  </div>
</div>
```

Now when you log in and then go to the URL `/Account/Profile` you will see all the users's profile displayed.

## Displaying the User's Name in the Navigation Bar

You may also want to put a link in the top navigation bar to display the user's name, and when the user clicks on that you can navigate them to their Profile page.

Go to the `Views/Shared/_Layout.cshtml` file and update the Navbar section which displays the Login and Logout options to also display the user's name and link to the `Profile` action in the `AccountController`:

```html
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

A remaining issue is that the `User.Identity.Name` property used in the Navbar snippet above will look for a claim of type `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name` on the user, but hat claim will not be set and the property will therefor be null.

Added to that, none of the user's profile details will be returned in the `id_token` as we a currently only requesting the `openid` scope. Ensure to also request the `name`, `email` and `picture` scopes to ensure that the user's Name, Email address and Profile Image is returned as claims in the `id_token`.

Once Auth0 passed back the `name` claim, you will have to retrieve the value of the `name` claim in the `OnTicketReceived` event and add a new claim of type `ClaimTypes.Name` (which resolves to `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name`). This will ensure that the user's name is returned when accessing the `User.Identity.Name` property.

```csharp
var options = new OpenIdConnectOptions("Auth0")
{
    // Set the authority to your Auth0 domain
    Authority = $"https://{auth0Settings.Value.Domain}",

    // Configure the Auth0 Client ID and Client Secret
    ClientId = auth0Settings.Value.ClientId,
    ClientSecret = auth0Settings.Value.ClientSecret,

    // Do not automatically authenticate and challenge
    AutomaticAuthenticate = false,
    AutomaticChallenge = false,

    // Set response type to code
    ResponseType = "code",

    // Set the callback path, so Auth0 will call back to http://localhost:5000/signin-auth0
    // Also ensure that you have added the URL as an Allowed Callback URL in your Auth0 dashboard
    CallbackPath = new PathString("/signin-auth0"),

    // Configure the Claims Issuer to be Auth0
    ClaimsIssuer = "Auth0",

    // Saves tokens to the AuthenticationProperties
    SaveTokens = true,

    Events = new OpenIdConnectEvents
    {
        OnTicketReceived = context =>
        {
            // Get the ClaimsIdentity
            var identity = context.Principal.Identity as ClaimsIdentity;
            if (identity != null)
            {
                // Add the Name ClaimType. This is required if we want User.Identity.Name to actually return something!
                if (!context.Principal.HasClaim(c => c.Type == ClaimTypes.Name) &&
                    identity.HasClaim(c => c.Type == "name"))
                    identity.AddClaim(new Claim(ClaimTypes.Name, identity.FindFirst("name").Value));
            }

            return Task.FromResult(0);
        }
    }
};
options.Scope.Clear();
options.Scope.Add("openid");
options.Scope.Add("name");
options.Scope.Add("email");
options.Scope.Add("picture");
app.UseOpenIdConnectAuthentication(options);
```

Now, after the user has signed it you will be able to see the user's name in the top right corner of the Navbar:

![](/media/articles/server-platforms/aspnet-core/navbar-userprofile.png)
