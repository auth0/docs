---
name: MainWindow.xaml.cs
language: csharp
---

```csharp
using Auth0.OidcClient;

public partial class MainWindow : Window
{
    private Auth0Client client;

    public MainWindow()
    {
        InitializeComponent();
        InitializeClient();
    }

    private InitializeClient()
    {
        Auth0ClientOptions clientOptions = new Auth0ClientOptions
        {
            Domain = "${account.namespace}"
            ClientId = "${account.clientId}"
        };
        client = new Auth0Client(clientOptions);
        clientOptions.PostLogoutRedirectUri = clientOptions.RedirectUri;
    }

    private async void LoginButton_OnClick(object sender, RoutedEventArgs e) 
    {
        var loginResult = await client.LoginAsync();

        if (loginResult.IsError == false)
        {
            var user = loginResult.User;
            var name = user.FindFirst(c => c.Type == "name")?.Value;
            var email = user.FindFirst(c => c.Type == "email")?.Value;
            var picture = user.FindFirst(c => c.Type == "picture")?.Value;
        }
    }

    private async void LogoutButton_Click(object sender, RoutedEventArgs e)
    {
        await client.LogoutAsync();
    }
}
```

