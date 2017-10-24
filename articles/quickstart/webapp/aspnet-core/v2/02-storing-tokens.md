---
title: Storing Tokens
description: This tutorial will show you how store the tokens returned from Auth0 in order to use them later on.
budicon: 280
---

<%= include('../../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-aspnetcore-mvc-samples',
  path: 'Quickstart/02-Storing-Tokens',
  branch: 'master',
  requirements: [
    '.NET Core SDK 2.0',
    '.NET Core 2.0',
    'ASP.NET Core 2.0'
  ]
}) %>

The OIDC middleware in ASP.NET Core will automatically Decode the ID Token returned from Auth0 and will automatically add the claims contained in the ID Token as claims on the `ClaimsIdentity`.

This means that inside any of the actions in your controllers you can simply use `User.Claims.FirstOrDefault("<claim type>").Value` to obtain the value of a particular claim.

The seed project contains a controller action and view which will display the claims associated with a particular user. Once a user has signed in, you can simply go to `/Account/Claims` to see these claims.

## Storing the Tokens

Sometimes you may want to access the tokens received from Auth0. For example, you may want to get the `access_token` to authenticate against API calls. In order to do this, you will need to set the `SaveTokens` property to `true` when calling `AddOpenIdConnect`. This will save the tokens to the `AuthenticationProperties`:

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

To subsequently retrieve any of the tokens you can call `GetTokenAsync`:

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
