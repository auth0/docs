---
title: "SSO for Regular Web Apps: ASP.NET Core Implementation"
description: The ASP.NET Core implementation for the SSO for Regular Web Apps architecture scenario
url: /architecture-scenarios/application/web-app-sso/implementation-aspnetcore
---

# SSO for Regular Web Apps: ASP.NET Core implementation

Full source code for the ASP.NET Core implementation can be found in [this GitHub repository](https://github.com/auth0-samples/auth0-pnp-webapp-oidc).

## Configure the Cookie and OIDC Middleware

For the purposes this guide we will be using a simple hosted login. You can use the standard cookie and OIDC middleware which is available with ASP.NET Core, so ensure that you install the NuGet packages.

```text
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

## Implement the Logout

You can control both the application session and the Auth0 session using the `SignOutAsync` method of the `AuthenticationManager` class, and passing along the authentication scheme from which you want to sign out.

As an example to sign out of the cookie middleware, and thereby clearing the authentication cookie for your application, you can make the following call:

```csharp
await HttpContext.Authentication.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
```

Similarly you can log the user out from Auth0 by making a call to the `SignOutAsync` method and passing along `Auth0` as the authentication scheme to sign out of.

```csharp
await HttpContext.Authentication.SignOutAsync("Auth0");
```

For the above to work you will however also need to add extra configuration when registering the OIDC middleware by handling the `OnRedirectToIdentityProviderForSignOut` event. Inside the event you will need to redirect to the [Auth0 logout endpoint](/api/authentication/reference#logout) which will clear the Auth0 cookie.

```csharp
app.UseOpenIdConnectAuthentication(new OpenIdConnectOptions("Auth0")
{
    // Some code omitted for brevity
    Events = new OpenIdConnectEvents
    {
        OnRedirectToIdentityProviderForSignOut = context =>
        {
            context.Response.Redirect($"https://{auth0Settings.Value.Domain}/v2/logout?client_id={auth0Settings.Value.ClientId}&returnTo={context.Request.Scheme}://{context.Request.Host}/");
            context.HandleResponse();

            return Task.FromResult(0);
        }
    }
});
```

You will also need to ensure that you add your application's URL to the __Allowed Logout URLs__ for your application inside the Auth0 dashboard. For more information refer to [Logout](/logout).

## Implement Admin permissions

The easiest way to integrate the groups into an ASP.NET Core application is to user the built-in [Role based Authorization](https://docs.asp.net/en/latest/security/authorization/roles.html) available in ASP.NET Core. In order to achieve this we will need to add a Claim of type

```text
http://schemas.microsoft.com/ws/2008/06/identity/claims/role
```

for each of the groups a user is assigned to.

Once the claims has been added we can easily ensure that a specific action is available only to `Admin` users by decorating the claim with the `[Authorize(Roles = "Admin")]` attribute. You can also check whether a user is in a specific role from code by making a call to `User.IsInRole("Admin")` from inside your controller.

The ASP.NET OIDC middleware will automatically add all claims returned in the JWT as claims to the `ClaimsIdentity`. We would therefore need to extract the information from the `authorization` claim, deserialize the JSON body of the claim, and for each of the groups add a `http://schemas.microsoft.com/ws/2008/06/identity/claims/role` claim to the `ClaimsIdentity`.

```csharp
app.UseOpenIdConnectAuthentication(new OpenIdConnectOptions("Auth0")
{
    // Some configuration omitted for brevity

    Events = new OpenIdConnectEvents
    {
        OnTicketReceived = context =>
        {
            var options = context.Options as OpenIdConnectOptions;

            // Get the ClaimsIdentity
            var identity = context.Principal.Identity as ClaimsIdentity;
            if (identity != null)
            {
                // Add the groups as roles
                var authzClaim = context.Principal.FindFirst(c => c.Type == "authorization");
                if (authzClaim != null)
                {
                    var authorization = JsonConvert.DeserializeObject<Auth0Authorization>(authzClaim.Value);
                    if (authorization != null)
                    {
                        foreach (var group in authorization.Groups)
                        {
                            identity.AddClaim(new Claim(ClaimTypes.Role, group, ClaimValueTypes.String, options.Authority));
                        }
                    }
                }
            }

            return Task.FromResult(0);
        }
    }
});
```

And subsequently we can add an action which allows Administrators to approve timesheets:

```csharp
[Authorize(Roles = "Admin")]
public IActionResult TimesheetApproval()
{          
    return View();
}
```
