Edit `App_Start\Startup.Auth.cs` in order to call the `UseAuth0Authentication` extension method:

```cs
public void ConfigureAuth(IAppBuilder app)
{
  // Enable the application to use a cookie to store information for the signed in user
    app.UseCookieAuthentication(new CookieAuthenticationOptions
    {
        AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
        LoginPath = new PathString("/Account/Login")
    });

    // Use a cookie to temporarily store information about a user logging in with a third party login provider
    app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

  // ...

    app.UseAuth0Authentication(
        clientId:       System.Configuration.ConfigurationManager.AppSettings["auth0:ClientId"],
        clientSecret:   System.Configuration.ConfigurationManager.AppSettings["auth0:ClientSecret"],
        domain:         System.Configuration.ConfigurationManager.AppSettings["auth0:Domain"]);
}
```
