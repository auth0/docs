---
description: How to use OpenID Connect discovery with Auth0.
---

# OpenID Connect Discovery

Auth0 exposes OIDC discovery documents (`https://${account.namespace}/.well-known/openid-configuration`). These can be used to automatically configure applications. 

A good example is __OpenID Connect middleware for Katana v3 (OWIN)__:

![](/media/articles/oidc-rs256-owin/oidc-discovery.png)

## How to use it

1. Install the nuget package `Microsoft.Owin.Security.OpenIdConnect` (v3.x.x)
2. Go to `App_Start\Startup.Auth.cs`, and replace your implementation with the following:

```cs
app.UseCookieAuthentication(new CookieAuthenticationOptions
{
  AuthenticationType = CookieAuthenticationDefaults.AuthenticationType
});

app.UseOpenIdConnectAuthentication(new OpenIdConnectAuthenticationOptions
{
  Authority = "https://${account.namespace}/",
  ClientId = "{YOUR_AUTH0_CLIENT_ID}",
  SignInAsAuthenticationType = CookieAuthenticationDefaults.AuthenticationType,
  ResponseType = "token",
  Notifications = new OpenIdConnectAuthenticationNotifications
  {
    // OPTIONAL: you can read/modify the claims that are populated based on the JWT
    SecurityTokenValidated = context =>
    {
      // add Auth0 access_token as claim
      var accessToken = context.ProtocolMessage.AccessToken;
      if (!string.IsNullOrEmpty(accessToken))
      {
        context.AuthenticationTicket.Identity.AddClaim(new Claim("access_token", accessToken));
      }

      return Task.FromResult(0);
    }
  }
});
```

## Notes on this middleware
Currently, the OpenID Connect middleware does not support JWT tokens signed with symmetric keys. Make sure you configure your app to use the RSA algorithm using public/private keys:

### On the Auth0 dashboard:

1. Go to ${manage_url}/#/applications/{YOUR_AUTH0_CLIENT_ID}/settings
2. Click on `Show Advanced Settings`.
3. Set `RS256` as `JsonWebToken Token Signature Algorithm` and click on `Save`.

![](/media/articles/oidc-rs256-owin/rsa256.png)

With this setting, Auth0 will issue JWT tokens signed with your private signing key. Your app will verify them with your public signing key.
