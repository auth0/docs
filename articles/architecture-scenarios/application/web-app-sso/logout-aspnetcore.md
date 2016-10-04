---
title: "Logout: ASP.NET Core Implementation"
description: Implement logout using ASP.NET Core
---

## ASP.NET Core: Implement the Logout

You can control both the application session and the Auth0 session using the `SignOutAsync` method of the `AuthenticationManager` class, and passing along the authentication scheme from which you want to sign out.

As an example to sign out of the cookie middleware, and thereby clearing the authentication cookie for your application, you can make the following call:

```csharp
await HttpContext.Authentication.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
```

Similarly you can log the user out from Auth0 by making a call to the `SignOutAsync` method and passing along `Auth0` as the authentication scheme to sign out of.

```csharp
await HttpContext.Authentication.SignOutAsync("Auth0");
```

For the above to work you will however also need to add extra configuration when registering the OIDC middleware by handling the `OnRedirectToIdentityProviderForSignOut` event. Inside the event you will need to redirect to the [Auth0 logout endpoint](/api/authentication#!#get--v2-logout) which will clear the Auth0 cookie.

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