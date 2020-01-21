---
description: How to use OpenID Connect discovery to configure applications with Auth0.
topics:
    - protocols
    - oidc-discovery
    - oidc
contentType:
  - how-to
useCase:
  - development
  - configure-apps
  - oidc-discovery
---

# Configure Applications with OpenID Connect Discovery

Auth0 exposes <dfn data-key="openid">OpenID Connect (OIDC)</dfn> discovery documents (`https://${account.namespace}/.well-known/openid-configuration`). These can be used to automatically configure applications.

A good example is __OpenID Connect middleware for Katana v3 (OWIN)__:

![](/media/articles/oidc-rs256-owin/oidc-discovery.png)

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
        // add Auth0 Access Token as claim
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

## Use RSA algorithm for JWTs

The OpenID Connect middleware does not support JWTs signed with symmetric keys. Make sure you configure your app to use the RSA algorithm using public/private keys:

On the Auth0 dashboard:

1. Go to ${manage_url}/#/applications/{YOUR_AUTH0_CLIENT_ID}/settings
2. Click on `Show Advanced Settings`.
3. Set `RS256` as `JsonWebToken Token Signature Algorithm` and click on `Save`.

![RSA 256](/media/articles/oidc-rs256-owin/rsa256.png)

With this setting, Auth0 will issue JWTs signed with your private signing key. Your app will verify them with your public signing key.

## Keep reading

* [OIDC Handbook](https://auth0.com/resources/ebooks/the-openid-connect-handbook)
