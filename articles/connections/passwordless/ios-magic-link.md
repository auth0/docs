# Lock iOS: Passwordless with Magic Link


## Set Up Universal Link Domains for Your iOS App

iOS needs to know which domains your application handles. To configure this:

1. Go to your project's Xcode settings page and open the *Capabilities* tab.
2. Find the *Associated Domains* section, and move the slider (located near the top right) so that it displays **On**. This enables the use of Associated Domains.
3. Click on the **plus sign** to add your Auth0 Client's domain. You'll need to use the following format: `applinks:${account.namespace}`

![Associated Domains](/associated-domains.png)

## Pass Callbacks to the Auth0 Lock Library

:::panel-info
If you've already implemented [Lock iOS](https://auth0.com/blog/how-to-implement-slack-like-login-on-ios-with-auth0/), you have already configured callbacks to the Auth0 Lock Library.
:::

In the `AppDelegate` class of your iOS application, include the following code to pass callbacks to Auth0 Lock:

```swift

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
        A0Lock.sharedLock().applicationLaunchedWithOptions(launchOptions)
        return true
    }

    func application(application: UIApplication, openURL url: NSURL, sourceApplication: String?, annotation: AnyObject) -> Bool {
        return A0Lock.sharedLock().handleURL(url, sourceApplication: sourceApplication)
    }

    func application(application: UIApplication, continueUserActivity userActivity: NSUserActivity, restorationHandler: ([AnyObject]?) -> Void) -> Bool {
        return A0Lock.sharedLock().continueUserActivity(userActivity, restorationHandler:restorationHandler)
    }
}

```

### Enable Magic Link Login Strategy
