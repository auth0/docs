```cs
// Form1.cs

using Auth0.OidcClient;

Auth0ClientOptions clientOptions = new Auth0ClientOptions
{
    Domain = "${account.namespace}",
    ClientId = "${account.clientId}"
};
client = new Auth0Client(clientOptions);
clientOptions.PostLogoutRedirectUri = clientOptions.RedirectUri;
```
