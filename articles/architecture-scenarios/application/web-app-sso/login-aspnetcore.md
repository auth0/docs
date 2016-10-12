---
title: "Login: ASP.NET Core Implementation"
description: Implement login using ASP.NET Core
---

## ASP.NET Core: Configure the Cookie and OIDC Middleware

For the purposes this guide we will be using a simple hosted login. You can use the standard cookie and OIDC middleware which is available with ASP.NET Core, so ensure that you install the NuGet packages.

```csharp
Install-Package Microsoft.AspNetCore.Authentication.Cookies
Install-Package Microsoft.AspNetCore.Authentication.OpenIdConnect
```

Then configure the cookie and OIDC middleware inside your application's middleware pipeline.

```csharp
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        // Add authentication services
        services.AddAuthentication(
            options => options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme);

        // Code omitted for brevity...
    }

    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IOptions<Auth0Settings> auth0Settings)
    {
        // Code omitted for brevity...

        // Add the cookie middleware
        app.UseCookieAuthentication(new CookieAuthenticationOptions
        {
            AutomaticAuthenticate = true,
            AutomaticChallenge = true
        });

        // Add the OIDC middleware
        app.UseOpenIdConnectAuthentication(new OpenIdConnectOptions("Auth0")
        {
            // Set the authority to your Auth0 domain
            Authority = "https://${account.namespace}/",

            // Configure the Auth0 Client ID and Client Secret
            ClientId = ${account.clientId},
            ClientSecret = ${account.clientSecret},

            // Do not automatically authenticate and challenge
            AutomaticAuthenticate = false,
            AutomaticChallenge = false,

            // Set response type to code
            ResponseType = "code",

            CallbackPath = new PathString("/signin-auth0"),

            // Configure the Claims Issuer to be Auth0
            ClaimsIssuer = "Auth0"
        });

        // Code omitted for brevity...
    }
}
```

As you can see in the code above, we have configured two different types of authentication middleware.

The first is the cookie middleware which was registered with the call to `UseCookieAuthentication`.
The second is the OIDC middleware which is done with the call to `UseOpenIdConnectAuthentication`.

Once the user has signed in to Auth0 using the OIDC middleware, their information will automatically be stored inside a session cookie. All you need to do is to configure the middleware as above and it will take care of managing the user session.

The OpenID Connect middleware will also extract all the claims from the `id_token`, which is sent from Auth0 once the user has authenticated, and add them as claims on the `ClaimsIdentity`.
