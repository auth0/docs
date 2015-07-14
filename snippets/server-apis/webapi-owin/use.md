```cs
var issuer = WebConfigurationManager.AppSettings["Auth0Domain"];
var audience = WebConfigurationManager.AppSettings["Auth0ClientID"];
var secret = TextEncodings.Base64Url.Decode(
    WebConfigurationManager.AppSettings["Auth0ClientSecret"]);

// Api controllers with an [Authorize] attribute will be validated with JWT
app.UseJwtBearerAuthentication(
    new JwtBearerAuthenticationOptions
    {
        AuthenticationMode = AuthenticationMode.Active,
        AllowedAudiences = new[] { audience },
        IssuerSecurityTokenProviders = new IIssuerSecurityTokenProvider[]
        {
            new SymmetricKeyIssuerSecurityTokenProvider(issuer, secret)
        },
    });
```
