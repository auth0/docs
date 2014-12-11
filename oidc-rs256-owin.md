Since Auth0 exposes OIDC discovery documents (`https://{YOURS}.auth0.com/.well-known/openid-configuration`), we can use the OpenID Connect middleware for Katana v3 (OWIN) to read that information and automatically configure our web app, so you don't have to provide all the configuration values:

![](https://cdn.auth0.com/docs/oidc-discovery.png)

### How to use it

1. Install the nuget package `Microsoft.Owin.Security.OpenIdConnect` (v3.x.x)
2. Go to `App_Start\Startup.Auth.cs`, and replace your implementation with the following:

```csharp
app.UseCookieAuthentication(new CookieAuthenticationOptions
{
  AuthenticationType = CookieAuthenticationDefaults.AuthenticationType
});

app.UseOpenIdConnectAuthentication(new OpenIdConnectAuthenticationOptions
{
  Authority = "https://{YOU}.auth0.com/",
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

#### Disclaimer
Currently, the OpenID Connect middleware is not supporting JWT tokens signed with symmetric keys, so we need to make sure to configure RSA algorithm from Auth0 dashboard:

1. Go to https://app.auth0.com/#/applications/{YOUR_AUTH0_CLIENT_ID}/settings
2. Click on `Show Advanced Settings` button.
3. Set `RS256` as `JsonWebToken Token Signature Algorithm` and click on `Save`.

![](https://cdn.auth0.com/docs/rsa256.png)

> Now, JWT tokens will be signed with your private signing key and they can be verified using your public signing key.
