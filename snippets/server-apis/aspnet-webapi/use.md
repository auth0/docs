```cs
var clientID = WebConfigurationManager.AppSettings["auth0:ClientId"];
var clientSecret = WebConfigurationManager.AppSettings["auth0:ClientSecret"];

config.MessageHandlers.Add(new JsonWebTokenValidationHandler()
{
    Audience = clientID,
    SymmetricKey = clientSecret,
    IsSecretBase64Encoded = false
});
```
