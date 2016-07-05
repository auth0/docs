---
title: User Profile
description: This tutorial will show you how to display get the user's profile and display it.
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-aspnetcore-sample/tree/master/03-User-Profile',
}) %>


## Getting the profile

The OpenID Connect middleware will automatically retrieve the user's profile, and all the attributes of the user's profile as claims to the user. You can create a simple User Profile page to display all the claims.

First add a new `UserProfile` action to the `HomeController`:   

```
public IActionResult UserProfile()
{
    return View();
}
```

Then create the View to display the claims in a table:

```html
@{
    ViewData["Title"] = "User Profile";

    int rowNo = 1;
}

<div class="row">
    <div class="col-md-12">
        <h2>@ViewData["Title"].</h2>

        <p>Welcome <strong>@User.Identity.Name</strong>. Here are the claims associated with your account:</p>

        <table class="table">
            <thead>
                <tr>
                    <th colspan="2">
                        Claim
                    </th>
                    <th>
                        Value
                    </th>
                </tr>
            </thead>
            <tbody>
                @foreach (var claim in User.Claims)
                {
                    <tr>
                        <th>@rowNo</th>
                        <td>@claim.Type</td>
                        <td>@claim.Value</td>
                    </tr>

                    rowNo++;
                }
            </tbody>
        </table>
    </div>
</div>
```
Now when you log in and then go to the URL `/Home/UserProfile` you will see all the users's claims displayed.

## Displaying the user's name

You may also want to put a link in the top navigation bar to display the user's name, and when the user click on that navigate to the User Profile page.

Go to the `Views/Shared/_Layout.cshtml` file and update the Navbar section which displays the Login and Logout options to also display the user's name and link to the `UserProfile` action on the `HomeController`:

```html
<ul class="nav navbar-nav navbar-right">
    @if (User.Identity.IsAuthenticated)
    {
        <li><a asp-controller="Home" asp-action="UserProfile">Hello @User.Identity.Name!</a></li>
        <li><a  asp-controller="Account" asp-action="Logout">Logout</a></li>
    }
    else
    {
        <li><a asp-controller="Account" asp-action="Login">Login</a></li>
    }
</ul>
```
 
One remaining issue is that the `User.Identity.Name` property used in the Navbar snippet above will look for a claim of type `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name` on the user, buy hat claim will not be set and the property will therefor be null.

Auth0 will however pass back a `name` property, so in the `OnTicketReceived` event you will have to retrieve the value of the `name` claim and a new claim of type `ClaimTypes.Name` ( which is the same as `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name`):

```cs
app.UseOpenIdConnectAuthentication(new OpenIdConnectOptions("Auth0")
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

    // Set the callback path, so Auth0 will call back to http://localhost:60856/signin-auth0 
    // Also ensure that you have added the URL as an Allowed Callback URL in your Auth0 dashboard 
    CallbackPath = new PathString("/signin-auth0"),

    // Configure the Claims Issuer to be Auth0
    ClaimsIssuer = "Auth0",

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
});
```

Now, after the user has signed it you will be able to see the user's name in the top right corner of the Navbar:

![](/media/articles/server-platforms/aspnet-core/navbar-userprofile.png)