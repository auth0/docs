---
title: Storing Tokens
description: This tutorial demonstrates how store the tokens returned from Auth0 in order to use them later on.
budicon: 280
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-aspnet-owin-mvc-sample',
  path: '03-Storing-Tokens'
}) %>


The Auth0 OAuth2 middleware can automatically add the `id_token` and `access_token` as claims on the `ClaimsIdentity` by setting the `SaveIdToken` and `SaveAccessToken` properties of the `Auth0AuthenticationOptions` to `true`. 

You can also save the refresh token by setting the `SaveRefreshToken` property to `true`, but you will need to ensure that Auth0 issues a `refresh_token` by requesting the `offline_access` scope.

Update the registration of the Auth0 middleware in your `Startup.cs` file as follows:

```csharp
public void Configuration(IAppBuilder app)
{
    // Configure Auth0 parameters
    string auth0Domain = ConfigurationManager.AppSettings["auth0:Domain"];
    string auth0ClientId = ConfigurationManager.AppSettings["auth0:ClientId"];
    string auth0ClientSecret = ConfigurationManager.AppSettings["auth0:ClientSecret"];

    // Set Cookies as default authentication type
    app.SetDefaultSignInAsAuthenticationType(CookieAuthenticationDefaults.AuthenticationType);
    app.UseCookieAuthentication(new CookieAuthenticationOptions
    {
        AuthenticationType = CookieAuthenticationDefaults.AuthenticationType,
        LoginPath = new PathString("/Account/Login")
    });

    // Configure Auth0 authentication
    var options = new Auth0AuthenticationOptions()
    {
        Domain = auth0Domain,
        ClientId = auth0ClientId,
        ClientSecret = auth0ClientSecret,

        // Save the tokens to claims
        SaveIdToken = true,
        SaveAccessToken = true,
        SaveRefreshToken = true
    };
    options.Scope.Add("offline_access"); // Request a refresh_token
    app.UseAuth0Authentication(options);
}
```

To access these token from one of your controllers, simply cast the `User.Identity` property to a `ClaimsIdentity`, and then find the particular claim by querying the `Claims` property.

The sample code below shows how you can extract the claims for the `access_token`, `id_token` and `refresh_token` respectively:

``` csharp
[Authorize]
public ActionResult Tokens()
{
    var claimsIdentity = User.Identity as ClaimsIdentity;

    // Extract tokens
    string accessToken = claimsIdentity?.Claims.FirstOrDefault(c => c.Type == "access_token")?.Value;
    string idToken = claimsIdentity?.Claims.FirstOrDefault(c => c.Type == "id_token")?.Value;
    string refreshToken = claimsIdentity?.Claims.FirstOrDefault(c => c.Type == "refresh_token")?.Value;

    // Now you can use the tokens as appropriate...
}
```
