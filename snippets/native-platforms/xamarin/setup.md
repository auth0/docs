For Android:

```cs
using Auth0.OidcClient;

var client = new Auth0Client(new Auth0ClientOptions
{
    Domain = "${account.namespace}",
    ClientId = "${account.clientId}",
    Activity = this
});
```

For iOS:

```csharp
using Auth0.OidcClient;

var client = new Auth0Client(new Auth0ClientOptions
{
    Domain = "${account.namespace}",
    ClientId = "${account.clientId}",
    Controller = this // The instance of your UIViewController from which you are calling this code
});
```
