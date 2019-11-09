## Configure your application to use Auth0

[Universal Login](/hosted-pages/login) is the easiest way to set up authentication in your application. We recommend using it for the best experience, best security and the fullest array of features. This guide will use it to provide a way for your users to log in to your ASP.NET MVC 5 application.

::: note
You can also create a custom login for prompting the user for their username and password. To learn how to do this in your application, follow the [Custom Login sample](https://github.com/auth0-samples/auth0-aspnet-owin-mvc-samples/tree/master/Samples/custom-login).
:::

### Install and configure the OpenID Connect middleware

::: note
  This quickstart makes use of OWIN middleware and as such, you need to use OWIN in your application. If your application is not currently making use of OWIN, please refer to Microsoft's <a href="https://docs.microsoft.com/en-us/aspnet/aspnet/overview/owin-and-katana/">OWIN documentation</a> to enable it in your application.
:::

The easiest way to enable authentication with Auth0 in your ASP.NET MVC application is to use the OWIN OpenID Connect middleware which is available in the `Microsoft.Owin.Security.OpenIdConnect` NuGet package, so install that first:

```bash
Install-Package Microsoft.Owin.Security.OpenIdConnect
```

There is a bug in Microsoft's OWIN implementation for System.Web, which can cause cookies to disappear on some occasions. To work around this issue, you will also need to install the `Kentor.OwinCookieSaver` NuGet package:

```bash
Install-Package Kentor.OwinCookieSaver
```

Now go to the `Configuration` method of your `Startup` class and configure the cookie middleware as well as the Auth0 middleware. Also, be sure to register the [Kentor OWIN Cookie saver middleware](https://github.com/KentorIT/owin-cookie-saver) which must be added *before* any cookie handling middleware.

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

It is essential that you register both the Kentor Cookie Saver middleware, the cookie middleware, and the OpenID Connect middleware as all of them are required (in that order) for the authentication to work. The OpenID Connect middleware will handle the authentication with Auth0. Once the user has authenticated, their identity will be stored in the cookie middleware.

In the code snippet above, note that the `AuthenticationType` is set to **Auth0**. This will be used in the next section to challenge the OpenID Connect middleware and start the authentication flow. Also note code in the `RedirectToIdentityProvider` notification event which constructs the correct [logout URL](/logout).

## Trigger Authentication

### Add Login and Logout Methods

Next, you will need to add `Login` and `Logout` actions to the `AccountController`.

The `Login` action will challenge the OpenID Connect middleware to start the authentication flow. For the `Logout` action, you will need to sign the user out of the cookie middleware (which will clear the local application session), as well as the OpenID Connect middleware. For more information, you can refer to the Auth0 [Logout](/logout) documentation.

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

### Add Login and Logout Links

To add the Login and Logout links to the navigation bar, head over to `/Views/Shared/_Layout.cshtml` and add code to the navigation bar section which displays a Logout link when the user is authenticated, otherwise a Login link. These will link to the `Logout` and `Login` actions of the `AccountController` respectively:

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

### Obtain an Access Token for Calling an API

If you want to call an API from your MVC application, you need to obtain an Access Token issued for the API you want to call. To receive and Access Token, pass an additional audience parameter containing the API identifier to the Auth0 authorization endpoint.

You will also need to configure the OpenID Connect middleware to add the ID Token and Access Token as claims on the `ClaimsIdentity`.

Update the OpenID Connect middleware registration in your `Startup` class as follows:

1. Set the `ResponseType` to `OpenIdConnectResponseType.CodeIdTokenToken`. This will inform the OpenID Connect middleware to extract the Access Token and store it in the `ProtocolMessage`.
1. Handle the `RedirectToIdentityProvider` to check to an authentication request and add the `audience` parameter.
1. Handle the `SecurityTokenValidated` to extract the ID Token and Access Token from the `ProtocolMessage` and store them as claims.

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

To access these tokens from one of your controllers, cast the `User.Identity` property to a `ClaimsIdentity`, and then find the particular claim by calling the `FindFirst` method.

``` csharp
// Controllers/AccountController.cs

[Authorize]
public ActionResult Tokens()
{
    var claimsIdentity = User.Identity as ClaimsIdentity;

    // Extract tokens
    string accessToken = claimsIdentity?.FindFirst(c => c.Type == "access_token")?.Value;
    string idToken = claimsIdentity?.FindFirst(c => c.Type == "id_token")?.Value;

    // Now you can use the tokens as appropriate...
}
```
