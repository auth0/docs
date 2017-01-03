## Implement the Login

First, import the `Lock` module in the file where you want to present the login dialog:

```swift
import Lock
```

Then, configure and present the login screen, like this:

```swift
let controller = A0Lock.sharedLock().newLockViewController()
controller.closable = true
controller.onAuthenticationBlock = { profile, token in
    // Do something with token  profile. e.g.: save them.
    // Lock will not save these objects for you.

    // Don't forget to dismiss the Lock controller
    controller.dismissViewControllerAnimated(true, completion: nil)
}
A0Lock.sharedLock().presentLockController(controller, fromController: self)
```

[![Lock.png](/media/articles/native-platforms/ios-swift/Lock-Widget-Screenshot.png)](https://auth0.com)

> There are multiple ways of implementing the login dialog. What you see above is the default widget; however, if you want, you can use [your own UI](/libraries/lock-ios/use-your-own-ui).
> You can also try our passwordless Login Widgets: [SMS](/libraries/lock-ios#sms) or [TouchID](/libraries/lock-ios#touchid).

As you can see, upon successful authentication, the `onAuthenticationBlock` callback will yield the user's `profile` and `token`.

A basic example of how to use this information:

```swift
self.usernameLabel.text = profile.name
self.emailLabel.text = profile.email
MyApplication.sharedInstance.accessToken = token.accessToken
```

> For further reference on the `profile` and `token` objects, check the [A0UserProfile](https://github.com/auth0/Lock.iOS-OSX/blob/master/Lock/Core/A0UserProfile.h) and [A0Token](https://github.com/auth0/Lock.iOS-OSX/blob/master/Lock/Core/A0Token.h) classes' documentation.
>
> To learn how to save and manage the tokens and profile in detail, please read [this guide](/libraries/lock-ios/save-and-refresh-jwt-tokens). Notice that Lock on its own will not save the tokens and profile for you.

### Optional: Log In with Social Connections

In order to have a simple login mechanism through social connections, all you have to do is enable them in your account's [connections dashboard](${manage_url}/#/connections/social). Every social connection you switch on there, will appear in the Login screen of your app. That's pretty much it!