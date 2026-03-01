---
title: Login
description: This tutorial demonstrates how to add user login to an ASP.NET OWIN application.
budicon: 448
topics:
  - quickstarts
  - webapp
  - aspnet-owin
  - login
github:
  path: Quickstart/Sample
contentType: tutorial
useCase: quickstart
sample_download_required_data:
  - client
---
<%= include('../../../_includes/_new_app', { showClientSecret: true, isPublicClient: false }) %>

<%= include('_includes/_setup') %>

## Install and configure the OpenID Connect middleware

::: note
  This quickstart uses OWIN middleware and as such, you need to use OWIN in your application. If your application is not currently using OWIN, please refer to Microsoft's <a href="https://docs.microsoft.com/en-us/aspnet/aspnet/overview/owin-and-katana/">OWIN documentation</a> to enable it in your application.
:::

The easiest way to enable authentication with Auth0 in your ASP.NET MVC application is to use the OWIN OpenID Connect middleware, so install the `Microsoft.Owin.Security.OpenIdConnect` NuGet package first:

```bash
Install-Package Microsoft.Owin.Security.OpenIdConnect
```

You must also install the following middleware library to enable cookie authentication in your project:

```bash
Install-Package Microsoft.Owin.Security.Cookies
```

::: note
There are issues when configuring the OWIN cookie middleware and System.Web cookies at the same time. Please read about the [System.Web cookie integration issues doc](https://github.com/aspnet/AspNetKatana/wiki/System.Web-response-cookie-integration-issues) to learn about how to mitigate these problems
:::

Now go to the `Configuration` method of your `Startup` class and configure the cookie middleware as well as the Auth0 middleware.

```cs
// Startup.cs
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin;
using Microsoft.Owin.Host.SystemWeb;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OpenIdConnect;
using MvcApplication.Support;
using Owin;

public void Configuration(IAppBuilder app)
{
    // Configure Auth0 parameters
    string auth0Domain = ConfigurationManager.AppSettings["auth0:Domain"];
    string auth0ClientId = ConfigurationManager.AppSettings["auth0:ClientId"];
    string auth0RedirectUri = ConfigurationManager.AppSettings["auth0:RedirectUri"];
    string auth0PostLogoutRedirectUri = ConfigurationManager.AppSettings["auth0:PostLogoutRedirectUri"];

    // Set Cookies as default authentication type
    app.SetDefaultSignInAsAuthenticationType(CookieAuthenticationDefaults.AuthenticationType);
    app.UseCookieAuthentication(new CookieAuthenticationOptions
    {
        AuthenticationType = CookieAuthenticationDefaults.AuthenticationType,
        LoginPath = new PathString("/Account/Login"),

        // Configure SameSite as needed for your app. Lax works well for most scenarios here but
        // you may want to set SameSiteMode.None for HTTPS
        CookieSameSite = SameSiteMode.Lax,

        // More information on why the CookieManager needs to be set can be found here: 
        // https://github.com/aspnet/AspNetKatana/wiki/System.Web-response-cookie-integration-issues
        CookieManager = new SameSiteCookieManager(new SystemWebCookieManager())
    });

    // Configure Auth0 authentication
    app.UseOpenIdConnectAuthentication(new OpenIdConnectAuthenticationOptions
    {
        AuthenticationType = "Auth0",

        Authority = $"https://{auth0Domain}",

        ClientId = auth0ClientId,

        RedirectUri = auth0RedirectUri,
        PostLogoutRedirectUri = auth0PostLogoutRedirectUri,
        Scope = "openid profile email",
        TokenValidationParameters = new TokenValidationParameters
        {
            NameClaimType = "name"
        },

        // More information on why the CookieManager needs to be set can be found here: 
        // https://docs.microsoft.com/en-us/aspnet/samesite/owin-samesite
        CookieManager = new SameSiteCookieManager(new SystemWebCookieManager()),

        // Configure Auth0's Logout URL by hooking into the RedirectToIdentityProvider notification, 
        // which is getting triggered before any redirect to Auth0 happens.
        Notifications = new OpenIdConnectAuthenticationNotifications
        {
            RedirectToIdentityProvider = notification =>
            {
                // Only when the RequestType is OpenIdConnectRequestType.Logout should we configure the logout URL.
                // Any other RequestType means a different kind of interaction with Auth0 that isn't logging out.
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

It is essential that you register both the cookie middleware and the OpenID Connect middleware, as they are required (in that order) for the authentication to work. The OpenID Connect middleware will handle the authentication with Auth0. Once the user has authenticated, their identity will be stored in the cookie middleware.

In the code snippet above, note that the `AuthenticationType` is set to **Auth0**. This will be used in the next section to challenge the OpenID Connect middleware and start the authentication flow. Also note code in the `RedirectToIdentityProvider` notification event which constructs the correct [logout URL](/logout).




## Add login to your ASP.NET OWIN application

To allow users to login to your ASP.NET OWIN application, add a `Login` action to your controller.

Call `HttpContext.GetOwinContext().Authentication.Challenge` and pass `"Auth0"` as the authentication scheme. This invokes the OIDC authentication handler that was registered earlier. Be sure to specify the corresponding `AuthenticationProperties`, including a `RedirectUri`.

After successfully calling `HttpContext.GetOwinContext().Authentication.Challenge`, the user is redirected to Auth0 and signed in to both the OIDC middleware and the cookie middleware upon being redirected back to your application. This will allow users to be authenticated on subsequent requests.

```cs
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
}
```

## Add logout to your ASP.NET OWIN application

From your controller's action, call `HttpContext.GetOwinContext().Authentication.SignOut` with the `CookieAuthenticationDefaults.AuthenticationType` authentication scheme to log the user out of your application.

Additionally, if you want to log the user out from Auth0 (this might also log them out of other applications that rely on Single Sign-On), call `HttpContext.GetOwinContext().Authentication.SignOut` with the `"Auth0"` authentication scheme.

```cs
public class AccountController : Controller
{
    [Authorize]
    public void Logout()
    {
        HttpContext.GetOwinContext().Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
        HttpContext.GetOwinContext().Authentication.SignOut("Auth0");
    }
}
```

## Display the user profile

After the middleware successfully retrieves the tokens from Auth0, it extracts the user's information and claims from the ID token and makes them available as `ClaimsIdentity`. Access the extracted information by using the `User` property on the controller.

To create a user profile, retrieve a user's name, email address, and profile image from `User.Identity` and pass it to the view from inside your controller.
```csharp
// Controllers/AccountController.cs

[Authorize]
public ActionResult UserProfile()
{
    var claimsIdentity = User.Identity as ClaimsIdentity;

    return View(new
    {
        Name = claimsIdentity?.FindFirst(c => c.Type == claimsIdentity.NameClaimType)?.Value,
        EmailAddress = claimsIdentity?.FindFirst(c => c.Type == ClaimTypes.Email)?.Value,
        ProfileImage = claimsIdentity?.FindFirst(c => c.Type == "picture")?.Value
    });
}
```
