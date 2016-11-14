---
title: User Profile
description: This tutorial demonstrates how to get the user's profile and display it.
budicon: 292
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-aspnet-owin-mvc-sample',
  path: '04-User-Profile'
}) %>

## Getting the profile

The Auth0 OAuth2 middleware will automatically retrieve the user's information from Auth0 and add it as claims to the `ClaimsIdentity`. The seed project contains a controller action and view which will display the claims associated with a particular user. Once a user has signed in, you can simply go to `/Account/Claims` to see these claims.

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
public ActionResult Profile()
{
    var claimsIdentity = User.Identity as ClaimsIdentity;

    return View(new UserProfileViewModel()
    {
        Name = claimsIdentity?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value,
        EmailAddress = claimsIdentity?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value,
        ProfileImage = claimsIdentity?.Claims.FirstOrDefault(c => c.Type == "picture")?.Value
    });
}
```

Next create a view. For the view, display a user profile card at the top with the user's name, email address and profile image.

```html
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
            </div>
        </div>
    </div>
</div>
```

Now when you log in and then go to the URL `/Account/Profile` you will see all the users's profile displayed.

## Displaying the user's name in the navigation bar

You may also want to put a link in the top navigation bar to display the user's name, and when the user clicks on that you can navigate them to their Profile page.

Go to the `Views/Shared/_Layout.cshtml` file and update the Navbar section which displays the Login and Logout options to also display the user's name and link to the `Profile` action in the `AccountController`:

```html
<ul class="nav navbar-nav navbar-right">
@if (User.Identity.IsAuthenticated)
{
    <li>@Html.ActionLink("Hello " + User.Identity.Name, "Profile", "Account")</li>
    <li>@Html.ActionLink("Logout", "Logout", "Account")</li>
}
else
{
    <li>@Html.ActionLink("Login", "Login", "Account")</li>
}
</ul>
```

Now, after the user has signed it you will be able to see the user's name in the top right corner of the Navbar:

![](/media/articles/server-platforms/aspnet-owin/navbar-userprofile.png)
