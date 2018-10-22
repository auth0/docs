---
title: Lock iOS v1 Passwordless Magic Links
description: Using Passwordless Magic Links with Lock for iOS v1
topics:
    - connections
    - passwordless
    - email
    - ios
    - magic-links
contentType: how-to
useCase: customize-connections
---

# Lock iOS v1: Passwordless with Magic Link

<%= include('../../_includes/_native_passwordless_warning') %>

Using [Lock v1 for iOS](/libraries/lock-ios/v1), you can implement a Passwordless login flow using Magic Link authentication for your iOS applications.

::: note
Before beginning this tutorial, [enable Universal Links](/applications/enable-universal-links/) between your iOS application and Auth0 Application.
:::

## Set Up Universal Link domains for your iOS app

iOS needs to know which domains your application handles. To configure this:

1. Go to your project's Xcode settings page and open the *Capabilities* tab.
2. Find the *Associated Domains* section, and move the slider (located near the top right) so that it displays **On**. This enables the use of Associated Domains.
3. Click on the **plus sign** to add your Auth0 Application's domain. You'll need to use the following format: `applinks:${account.namespace}`

![Associated Domains](/media/articles/connections/passwordless/associated-domains.png)

## Pass callbacks to Lock

::: note
If you've already implemented [Lock v1 for iOS](https://auth0.com/blog/how-to-implement-slack-like-login-on-ios-with-auth0/), you have already configured callbacks to the Auth0 Lock Library.
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

### Enable Magic Link login strategy

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

### Test notes

* Because Universal Links do not work on iOS simulators, you'll need an iOS-enabled device to test this implementation.
* When testing, do not use the Gmail app to open the email that contains the Magic Link. Gmail opens links internally or using Chrome, both of which bypass the detection of the Universal Link by iOS.

<%= include('_single-browser-magic-link') %>

