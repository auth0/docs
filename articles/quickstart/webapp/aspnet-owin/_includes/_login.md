## Add Authentication with Auth0

[Universal Login](/hosted-pages/login) is the easiest way to set up authentication in your application. We recommend using it for the best experience, best security and the fullest array of features. This guide will use it to provide a way for your users to log in to your ASP.NET MVC 5 application.

::: note
You can also create a custom login for prompting the user for their username and password. To learn how to do this in your application, follow the [Custom Login sample](https://github.com/auth0-samples/auth0-aspnet-owin-mvc-samples/tree/master/Samples/custom-login).
:::

## Install and Configure Auth0 OAuth2 Middleware

The easiest way to enable authentication with Auth0 in your ASP.NET MVC application is to use the OWIN OpenID Connect middleware which is available in the `Microsoft.Owin.Security.OpenIdConnect` NuGet package, so install that first:

```bash
Install-Package Microsoft.Owin.Security.OpenIdConnect
```

There is a bug in Microsoft's OWIN implementation for System.Web, which can cause cookies to disappear on some occasions. To work around this issue, you will also need to install the `Kentor.OwinCookieSaver` NuGet package:

```bash
Install-Package Kentor.OwinCookieSaver
```

Now go to the `Configuration` method of your `Startup` class and configure the cookie middleware as well as the Auth0 middleware. Also be sure to register the [Kentor OWIN Cookie saver middleware](https://github.com/KentorIT/owin-cookie-saver) which must be added *before* any cookie handling middleware.

```cs
// Startup.cs

public void Configuration(IAppBuilder app)
{
    // Configure Auth0 parameters
    string auth0Domain = ConfigurationManager.AppSettings["auth0:Domain"];
    string auth0ClientId = ConfigurationManager.AppSettings["auth0:ClientId"];
    string auth0ClientSecret = ConfigurationManager.AppSettings["auth0:ClientSecret"];
    string auth0RedirectUri = ConfigurationManager.AppSettings["auth0:RedirectUri"];
    string auth0PostLogoutRedirectUri = ConfigurationManager.AppSettings["auth0:PostLogoutRedirectUri"];

    // Enable the Cookie saver middleware to work around a bug in the OWIN implementation
    app.UseKentorOwinCookieSaver();

    // Set Cookies as default authentication type
    app.SetDefaultSignInAsAuthenticationType(CookieAuthenticationDefaults.AuthenticationType);
    app.UseCookieAuthentication(new CookieAuthenticationOptions
    {
        AuthenticationType = CookieAuthenticationDefaults.AuthenticationType,
        LoginPath = new PathString("/Account/Login")
    });

    // Configure Auth0 authentication
    app.UseOpenIdConnectAuthentication(new OpenIdConnectAuthenticationOptions
    {
        AuthenticationType = "Auth0",
        
        Authority = $"https://{auth0Domain}",

        ClientId = auth0ClientId,
        ClientSecret = auth0ClientSecret,

        RedirectUri = auth0RedirectUri,
        PostLogoutRedirectUri = auth0PostLogoutRedirectUri,

        ResponseType = OpenIdConnectResponseType.CodeIdToken,
        Scope = "openid profile",

        TokenValidationParameters = new TokenValidationParameters
        {
            NameClaimType = "name"
        },

        Notifications = new OpenIdConnectAuthenticationNotifications
        {
            RedirectToIdentityProvider = notification =>
            {
                if (notification.ProtocolMessage.RequestType == OpenIdConnectRequestType.Logout)
                {
                    var logoutUri = $"https://{auth0Domain}/v2/logout?client_id={auth0ClientId}";

                    var postLogoutUri = notification.ProtocolMessage.PostLogoutRedirectUri;
                    if (!string.IsNullOrEmpty(postLogoutUri))
                    {
                        if (postLogoutUri.StartsWith("/"))
                        {
                            // transform to absolute
                            var request = notification.Request;
                            postLogoutUri = request.Scheme + "://" + request.Host + request.PathBase + postLogoutUri;
                        }
                        logoutUri += $"&returnTo={ Uri.EscapeDataString(postLogoutUri)}";
                    }

                    notification.Response.Redirect(logoutUri);
                    notification.HandleResponse();
                }
                return Task.FromResult(0);
            }
        }
    });
}
```

It is important that you register both the cookie middleware and the OpenID Connect middleware, as all of them are required for the authentication to work. The OpenID Connect middleware will handle the authentication with Auth0. Once the user has authenticated, their identity will be stored in the cookie middleware.

## Add Login and Logout Methods

Next, you will need to add `Login` and `Logout` actions to the `AccountController`.

The `Login` action will challenge the OpenID Connect middleware to start the authentication flow. For the `Logout` action you will need to sign the user out of the cookie middleware (which will clear the local application session), as well as Auth0. For more information you can refer to the Auth0 [Logout](/logout) documentation.

```cs
// Controllers/AccountController.cs

public class AccountController : Controller
{
    public ActionResult Login(string returnUrl)
    {
        HttpContext.GetOwinContext().Authentication.Challenge(new AuthenticationProperties
            {
                RedirectUri = returnUrl ?? Url.Action("Index", "Home")
            },
            "Auth0");
        return new HttpUnauthorizedResult();
    }

    [Authorize]
    public void Logout()
    {
        HttpContext.GetOwinContext().Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
        HttpContext.GetOwinContext().Authentication.SignOut("Auth0");
    }

    [Authorize]
    public ActionResult Claims()
    {
        return View();
    }
}
```

## Add Login and Logout Links

Lastly, add Login and Logout links to the navigation bar. To do that, head over to `/Views/Shared/_Layout.cshtml` and add code to the navigation bar section which displays a Logout link when the user is authenticated, otherwise a Login link. These will link to the `Logout` and `Login` actions of the `AccountController` respectively:

```html
<!-- Views/Shared/_Layout.cshtml -->

<div class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            @Html.ActionLink("Application name", "Index", "Home", new { area = "" }, new { @class = "navbar-brand" })
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li>@Html.ActionLink("Home", "Index", "Home")</li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                @if (User.Identity.IsAuthenticated)
                {
                    <li>@Html.ActionLink("Logout", "Logout", "Account")</li>
                }
                else
                {
                    <li>@Html.ActionLink("Login", "Login", "Account")</li>
                }
            </ul>
        </div>
    </div>
</div>
```

## Run the Application

Now when you run the application, you can select the Login link to log in to the application. This will display the Login page with the Auth0 Lock component embedded in the page. The user can enter their username and password to log in, or alternatively log in with any of the social login providers you may have configured.

## Store the Tokens

The Auth0 OAuth2 middleware can automatically add the ID Token and Access Token as claims on the `ClaimsIdentity` by setting the `SaveIdToken` and `SaveAccessToken` properties of the `Auth0AuthenticationOptions` to `true`.

You can also save the Refresh Token by setting the `SaveRefreshToken` property to `true`, but you will need to ensure that Auth0 issues a Refresh Token by requesting the `offline_access` scope.

Update the registration of the Auth0 middleware in your `Startup.cs` file as follows:

```csharp
// Startup.cs

public void Configuration(IAppBuilder app)
{
    // Some code omitted for brevity...

    // Configure Auth0 authentication
    app.UseOpenIdConnectAuthentication(new OpenIdConnectAuthenticationOptions
    {
        //...
        
        ResponseType = OpenIdConnectResponseType.CodeIdTokenToken,
        Scope = "openid profile",
    
        TokenValidationParameters = new TokenValidationParameters
        {
            NameClaimType = "name"
        },
    
        Notifications = new OpenIdConnectAuthenticationNotifications
        {
            SecurityTokenValidated = notification =>
            {
                notification.AuthenticationTicket.Identity.AddClaim(new Claim("id_token",notification.ProtocolMessage.IdToken));
                notification.AuthenticationTicket.Identity.AddClaim(new Claim("access_token",notification.ProtocolMessage.AccessToken));
    
                return Task.FromResult(0);
            },
            RedirectToIdentityProvider = notification =>
            {
                if (notification.ProtocolMessage.RequestType == OpenIdConnectRequestType.Authentication)
                {
                    notification.ProtocolMessage.SetParameter("audience", "https://quickstarts/api");
                }
                else if (notification.ProtocolMessage.RequestType == OpenIdConnectRequestType.Logout)
                {
                    //...
                }
                return Task.FromResult(0);
            }
        }
    });
    
}
```

To access these token from one of your controllers, simply cast the `User.Identity` property to a `ClaimsIdentity`, and then find the particular claim by querying the `Claims` property.

The sample code below shows how you can extract the claims for the Access Token, ID Token, and Refresh Token respectively:

``` csharp
// Controllers/AccountController.cs

[Authorize]
public ActionResult Tokens()
{
    var claimsIdentity = User.Identity as ClaimsIdentity;

    // Extract tokens
    string accessToken = claimsIdentity?.Claims.FirstOrDefault(c => c.Type == "access_token")?.Value;
    string idToken = claimsIdentity?.Claims.FirstOrDefault(c => c.Type == "id_token")?.Value;
    string refreshToken = claimsIdentity?.Claims.FirstOrDefault(c => c.Type == "refresh_token")?.Value;

    // Now you can use the tokens as appropriate...
}
```
