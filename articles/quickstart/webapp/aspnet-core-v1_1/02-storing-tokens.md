---
title: Storing Tokens
description: This tutorial will show you how store the tokens returned from Auth0 in order to use them later on.
budicon: 280
github:
  path: Quickstart/02-Storing-Tokens
---
The OIDC middleware in ASP.NET Core will automatically decode the ID Token returned from Auth0 and will automatically add the claims contained in the ID Token as claims on the `ClaimsIdentity`.

This means that inside any of the actions in your controllers you can simply use `User.Claims.FirstOrDefault("<claim type>").Value` to obtain the value of a particular claim.

The seed project contains a controller action and view which will display the claims associated with a particular user. Once a user has signed in, you can simply go to `/Account/Claims` to see these claims.

## Storing the Tokens

Sometimes you may want to access the tokens received from Auth0. For example, you may want to get the `access_token` to authenticate against API calls. In order to do this, you will need to set the `SaveTokens` property of `OpenIdConnectOptions` to true. This will save the tokens to the `AuthenticationProperties`:

```csharp
// Startup.cs

public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory,
    IOptions<Auth0Settings> auth0Settings)
{
    // Some code was omitted for brevity...

    var options = new OpenIdConnectOptions("Auth0")
    {
        [...]

        // Saves tokens to the AuthenticationProperties
        SaveTokens = true,

        Events = new OpenIdConnectEvents
        {
            // handle the logout redirection
            OnRedirectToIdentityProviderForSignOut = [...] // omitted for brevity
        }
    };
    options.Scope.Clear();
    options.Scope.Add("openid");
    app.UseOpenIdConnectAuthentication(options);
}
```

To subsequently retrieve either of the tokens you can call `GetAuthenticateInfoAsync` to retrieve the `AuthenticateInfo`. The tokens will be available in the `Properties` of the `AuthenticateInfo` object, stored in the format `.Token.<token name>`:

```csharp
// Inside one of your controller actions
if (User.Identity.IsAuthenticated)
{
    var authenticateInfo = await HttpContext.Authentication.GetAuthenticateInfoAsync("Auth0");
    string accessToken = authenticateInfo.Properties.Items[".Token.access_token"];
    string idToken = authenticateInfo.Properties.Items[".Token.id_token"];
}
```
