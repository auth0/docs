---
title: Storing Tokens
description: This tutorial will show you how store the tokens returned from Auth0 in order to use them later on.
budicon: 280
github:
  path: Quickstart/02-Storing-Tokens
---
The OIDC middleware in ASP.NET Core automatically decodes the ID token returned from Auth0 and adds the claims from the ID token as claims in the `ClaimsIdentity`.

This means that you can use `User.Claims.FirstOrDefault("<claim type>").Value` to obtain the value of any claim inside any action in your controllers.

The seed project contains a controller action and view that display the claims associated with a user. Once a user has logged in, you can go to `/Account/Claims` to see these claims.

## Store the Tokens

You may want to Access Tokens received from Auth0. For example, you can use the Access Token to authenticate the user in calls to your API. To achieve this, when calling `AddOpenIdConnect`, set the `SaveTokens` property to `true`. This saves the tokens to `AuthenticationProperties`:

```csharp
// Startup.cs

public void ConfigureServices(IServiceCollection services)
{
    // Add authentication services
    services.AddAuthentication(options => {
        options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    })
    .AddCookie()
    .AddOpenIdConnect("Auth0", options => {
        // ...

        // Saves tokens to the AuthenticationProperties
        options.SaveTokens = true;

        options.Events = new OpenIdConnectEvents
        {
            // handle the logout redirection 
            OnRedirectToIdentityProviderForSignOut = (context) =>
            {
                //...
            }
        };   
    });
}
```

To retrieve the tokens, you can call `GetTokenAsync`:

```csharp
// Inside one of your controller actions

if (User.Identity.IsAuthenticated)
{
    string accessToken = await HttpContext.GetTokenAsync("access_token");
    string idToken = await HttpContext.GetTokenAsync("id_token");

    // Now you can use them. For more info on when and how to use the 
    // access_token and id_token, see https://auth0.com/docs/tokens
}
```
