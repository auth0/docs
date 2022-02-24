---
name: Startup.cs
language: csharp
---

```csharp
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
    string domain = ConfigurationManager.AppSettings["auth0:Domain"];
    string clientId = ConfigurationManager.AppSettings["auth0:ClientId"];
    string redirectUri = "http://localhost:3000/callback";
    string postLogoutRedirectUri = "http://localhost:3000";

    // Set Cookies as default authentication type
    app.SetDefaultSignInAsAuthenticationType(CookieAuthenticationDefaults.AuthenticationType);
    app.UseCookieAuthentication(new CookieAuthenticationOptions
    {
        AuthenticationType = CookieAuthenticationDefaults.AuthenticationType,
        LoginPath = new PathString("/Account/Login"),

        CookieSameSite = SameSiteMode.Lax,

        // More information on why the CookieManager needs to be set can be found here: 
        // https://github.com/aspnet/AspNetKatana/wiki/System.Web-response-cookie-integration-issues
        CookieManager = new SameSiteCookieManager(new SystemWebCookieManager())
    });

    app.UseOpenIdConnectAuthentication(new OpenIdConnectAuthenticationOptions
    {
        AuthenticationType = "Auth0",
        Authority = $"https://{domain}",
        ClientId = clientId,
        RedirectUri = redirectUri,
        PostLogoutRedirectUri = postLogoutRedirectUri,
        ResponseType = OpenIdConnectResponseType.CodeIdToken,
        Scope = "openid profile email",
        TokenValidationParameters = new TokenValidationParameters
        {
            NameClaimType = "name"
        },
        // More information on why the CookieManager needs to be set can be found here: 
        // https://docs.microsoft.com/en-us/aspnet/samesite/owin-samesite
        CookieManager = new SameSiteCookieManager(new SystemWebCookieManager()),
        Notifications = new OpenIdConnectAuthenticationNotifications
        {
            RedirectToIdentityProvider = notification =>
            {
                if (notification.ProtocolMessage.RequestType == OpenIdConnectRequestType.Logout)
                {
                    var logoutUri = $"https://{domain}/v2/logout?client_id={clientId}";

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
```