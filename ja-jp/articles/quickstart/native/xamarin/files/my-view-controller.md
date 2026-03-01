---
name: MyViewController.cs
language: csharp
---

```csharp
// Example of a full iOS UIViewController
public partial class MyViewController : UIViewController
{
    private Auth0Client _auth0Client;

    public MyViewController() : base("MyViewController", null)
    {
    }

    public override void ViewDidLoad()
    {
        base.ViewDidLoad();

        Auth0ClientOptions clientOptions = new Auth0ClientOptions
        {
            Domain = "${account.namespace}"
            ClientId = "${account.clientId}"
        };
        
        _auth0Client = new Auth0Client(clientOptions, this);
    }

    private async void LoginButton_TouchUpInside(object sender, EventArgs e)
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

    private async void LogoutButton_TouchUpInside(object sender, EventArgs e)
    {
        await _auth0Client.LogoutAsync();
    }
}
```