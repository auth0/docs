---
name: AppDelegate.cs
language: csharp
---

```csharp
using Auth0.OidcClient;

[Register("AppDelegate")]
public class AppDelegate : UIApplicationDelegate
{
    public override bool OpenUrl(UIApplication application, NSUrl url, string sourceApplication, NSObject annotation)
    {
        ActivityMediator.Instance.Send(url.AbsoluteString);

        return true;
    }
}
```