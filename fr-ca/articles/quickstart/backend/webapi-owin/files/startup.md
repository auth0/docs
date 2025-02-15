---
name: Startup.cs
language: csharp
---

```csharp
public void Configuration(IAppBuilder app)
{
    var domain = $"https://{ConfigurationManager.AppSettings["Auth0Domain"]}/";
    var apiIdentifier = ConfigurationManager.AppSettings["Auth0ApiIdentifier"];
    var keyResolver = new OpenIdConnectSigningKeyResolver(domain);

    app.UseJwtBearerAuthentication(
        new JwtBearerAuthenticationOptions
        {
            AuthenticationMode = AuthenticationMode.Active,
            TokenValidationParameters = new TokenValidationParameters()
            {
                ValidAudience = apiIdentifier,
                ValidIssuer = domain,
                IssuerSigningKeyResolver = (token, securityToken, kid, parameters) => keyResolver.GetSigningKey(kid)
            }
        });

    // Configure Web API
    WebApiConfig.Configure(app);
}
```