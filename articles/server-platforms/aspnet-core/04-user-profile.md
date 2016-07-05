

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

```
public IActionResult UserProfile()
{
    return View();
}
```

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