---
name: MainPage.xaml.cs
language: csharp
---
    
```csharp
// MainPage.xaml.cs

using Auth0.OidcClient;

var client = new Auth0Client(new Auth0ClientOptions
{
    Domain = "${account.namespace}",
    ClientId = "${account.clientId}"
});
```
