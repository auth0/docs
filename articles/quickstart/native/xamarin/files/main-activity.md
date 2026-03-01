---
name: MainActivity.cs
language: csharp
---

```csharp
// Example of a full Android Activity
[Activity(Label = "AndroidSample", MainLauncher = true, Icon = "@drawable/icon",
    LaunchMode = LaunchMode.SingleTask)]
[IntentFilter(
    new[] { Intent.ActionView },
    Categories = new[] { Intent.CategoryDefault, Intent.CategoryBrowsable },
    DataScheme = "YOUR_ANDROID_PACKAGE_NAME",
    DataHost = "{yourDomain}",
    DataPathPrefix = "/android/YOUR_ANDROID_PACKAGE_NAME/callback")]
public class MainActivity : Activity
{    
    private Auth0Client _auth0Client;

    protected override void OnNewIntent(Intent intent)
    {
        base.OnNewIntent(intent);
        ActivityMediator.Instance.Send(intent.DataString);
    }

    protected override void OnCreate(Bundle bundle)
    {
        base.OnCreate(bundle);

        Auth0ClientOptions clientOptions = new Auth0ClientOptions
        {
            Domain = "${account.namespace}"
            ClientId = "${account.clientId}"
        };

        _auth0Client = new Auth0Client(clientOptions, this);
    }

    private async void LoginButtonOnClick(object sender, EventArgs eventArgs)
    {
        var loginResult = await _auth0Client.LoginAsync();

        if (loginResult.IsError == false)
        {
            var user = loginResult.User;
            var name = user.FindFirst(c => c.Type == "name")?.Value;
            var email = user.FindFirst(c => c.Type == "email")?.Value;
            var picture = user.FindFirst(c => c.Type == "picture")?.Value;
        }
    }

    private async void LogoutButtonOnClick(object sender, EventArgs e)
    {
        await _auth0Client.LogoutAsync();
    }
}
```