---
name: MainPage.xaml.cs
language: csharp
---

```csharp
public partial class MainPage : ContentPage
{
    Auth0Client client = new Auth0Client(new Auth0ClientOptions
    {
        Domain = "${account.namespace}"
        ClientId = "${account.clientId}",
        RedirectUri = "myapp://callback",
        PostLogoutRedirectUri = "myapp://callback",
        Scope = "openid profile email"
    });

    public MainPage()
    {
        InitializeComponent();
    }

    private async void OnLoginClicked(object sender, EventArgs e)
    {
        var extraParameters = new Dictionary<string, string>();
        var audience = ""; // FILL WITH AUDIENCE AS NEEDED

        if (!string.IsNullOrEmpty(audience))
            extraParameters.Add("audience", audience);

        var result = await client.LoginAsync(extraParameters);

        DisplayResult(result);
    }

    private async void OnLogoutClicked(object sender, EventArgs e)
    {
        BrowserResultType browserResult = await client.LogoutAsync();

        if (browserResult != BrowserResultType.Success)
        {
            ErrorLabel.Text = browserResult.ToString();
            return;
        }

        LogoutBtn.IsVisible = false;
        LoginBtn.IsVisible = true;

        HelloLabel.Text = $"Hello, World!";
        ErrorLabel.Text = "";
    }

    private void DisplayResult(LoginResult loginResult)
    {
        if (loginResult.IsError)
        {
            ErrorLabel.Text = loginResult.Error;
            return;
        }

        var user = loginResult.User;
        var name = user.FindFirst(c => c.Type == "name")?.Value;
        var email = user.FindFirst(c => c.Type == "email")?.Value;
        var picture = user.FindFirst(c => c.Type == "picture")?.Value;
        
        LogoutBtn.IsVisible = true;
        LoginBtn.IsVisible = false;


        HelloLabel.Text = $"Hello, {loginResult.User.Identity.Name}";
        ErrorLabel.Text = "";
    }
}
```