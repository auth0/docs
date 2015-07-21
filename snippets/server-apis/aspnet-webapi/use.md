```cs
var clientID = WebConfigurationManager.AppSettings["Auth0ClientID"];
var clientSecret = WebConfigurationManager.AppSettings["Auth0ClientSecret"];

config.MessageHandlers.Add(new JsonWebTokenValidationHandler()
{
    Audience = clientID,
    SymmetricKey = clientSecret
});
```
