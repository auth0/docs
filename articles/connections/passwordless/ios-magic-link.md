# Lock iOS: Passwordless with Magic Link

Using the Lock library, you can implement a Passwordless login flow using Magic Link authentication for your iOS applications.

[Click here](https://github.com/auth0/Mobile-Samples.iOS) for iOS sample applications.

:::panel-info
Before beginning this tutorial, [enable Universal Links](/clients/enable-universal-links/) between your iOS application and Auth0 Client.
:::

## Set Up Universal Link Domains for Your iOS App

iOS needs to know which domains your application handles. To configure this:

1. Go to your project's Xcode settings page and open the *Capabilities* tab.
2. Find the *Associated Domains* section, and move the slider (located near the top right) so that it displays **On**. This enables the use of Associated Domains.
3. Click on the **plus sign** to add your Auth0 Client's domain. You'll need to use the following format: `applinks:${account.namespace}`

![Associated Domains](/media/articles/connections/passwordless/associated-domains.png)

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

Because the Lock library handles the login flow, you'll indicate that it should use a Magic Link. To do this, you'll place the following code into the view controller that presents the Lock login screen:

```swift
let lock = A0Lock.sharedLock()
let controller = lock.newEmailViewController()

controller.useMagicLink = true // <--- ENABLE MAGIC LINKS!

controller.onAuthenticationBlock = { (profile, token) in
    // Do something with profile and token if necessary
    self.dismissViewControllerAnimated(true, completion: { self.performSegueWithIdentifier("UserLoggedIn", sender: self) })
}
lock.presentEmailController(controller, fromController: self)
```

* The `newEmailViewController` creates an email login view controller.
* Setting `userMagicLink` to `true` tells the email login view controller to use the Magic Link.

### Test Notes

* Because Universal Links do not work on iOS simulators, you'll need an iOS-enabled devie to test this implementation.
* When testing, do not use the Gmail app to open the email that contains the Magic Link. Gmail opens links internally or using Chrome, both of which bypass the detection of the Universal Link by iOS.
