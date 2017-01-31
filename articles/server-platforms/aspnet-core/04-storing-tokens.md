---
title: Storing Tokens
description: This tutorial will show you how store the tokens returned from Auth0 in order to use them later on.
budicon: 280
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-aspnetcore-sample',
  path: '04-Storing-Tokens'
}) %>

The OIDC middleware in ASP.NET Core will automatically Decode the ID Token returned from Auth0 and will automatically add the claims contained in the ID Token as claims on the `ClaimsIdentity`.

This means that inside any of the actions in your controllers you can simply use `User.Claims.FirstOrDefault("<claim type>").Value` to obtain the value of a particular claim.

The seed project contains a controller action and view which will display the claims associated with a particular user. Once a user has signed in, you can simply go to `/Account/Claims` to see these claims.

## Storing the Tokens as Claims

You may, however, want to save the actual tokens as claims, so you can use these tokens to authenticate against API calls.

The first thing you must do is to set the `SaveTokens` property of `OpenIdConnectOptions` to true. This will save the tokens to the Properties. You can then subsequently retrieve the tokens from the Properties in the `OnTicketReceived` event.

The names of the tokens will be saved as a semicolon-separated list inside the ".TokenNames" property. You will need to extract those names, and then for each of them extract the value of the token from the Properties.

The value will be stored as a property with the name ".Token." suffixed with the name of the token. So, for example, the "access_token" will be stored in a property with the name ".Token.access_token".

Once you have retrieved the value of the token, you can then simply store it as a claim for the `ClaimsIdentity`:

```csharp
var options = new OpenIdConnectOptions("Auth0")
{
    // Set the authority to your Auth0 domain
    Authority = $"https://{auth0Settings.Value.Domain}",

    // Configure the Auth0 Client ID and Client Secret
    ClientId = auth0Settings.Value.ClientId,
    ClientSecret = auth0Settings.Value.ClientSecret,

    // Do not automatically authenticate and challenge
    AutomaticAuthenticate = false,
    AutomaticChallenge = false,

    // Set response type to code
    ResponseType = "code",

    // Set the callback path, so Auth0 will call back to http://localhost:5000/signin-auth0
    // Also ensure that you have added the URL as an Allowed Callback URL in your Auth0 dashboard
    CallbackPath = new PathString("/signin-auth0"),

    // Configure the Claims Issuer to be Auth0
    ClaimsIssuer = "Auth0",

    // Saves tokens to the AuthenticationProperties
    SaveTokens = true,

    Events = new OpenIdConnectEvents()
    {
        OnTicketReceived = context =>
        {
            // Get the ClaimsIdentity
            var identity = context.Principal.Identity as ClaimsIdentity;
            if (identity != null)
            {
                // Check if token names are stored in Properties
                if (context.Properties.Items.ContainsKey(".TokenNames"))
                {
                    // Token names a semicolon separated
                    string[] tokenNames = context.Properties.Items[".TokenNames"].Split(';');

                    // Add each token value as Claim
                    foreach (var tokenName in tokenNames)
                    {
                        // Tokens are stored in a Dictionary with the Key ".Token.<token name>"
                        string tokenValue = context.Properties.Items[$".Token.{tokenName}"];

                        identity.AddClaim(new Claim(tokenName, tokenValue));
                    }
                }
            }

            return Task.FromResult(0);
        }
    }
};
options.Scope.Clear();
options.Scope.Add("openid");
app.UseOpenIdConnectAuthentication(options);
```

The `access_token` will now be stored as a claim called "access_token", so to retrieve it inside a controller you can simply use `User.Claims.FirstOrDefault("access_token").Value`

::: warning-banner Beware of your cookie size
You need to note that saving the tokens will increase the size of your authentication cookie, so be careful with adding unnecessary claims to the ClaimsIdentity as this cookie is sent back to the server with every request.
:::
