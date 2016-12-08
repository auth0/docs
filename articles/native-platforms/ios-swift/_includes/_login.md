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

> For further reference on the `profile` and `token` objects, check the [A0UserProfile](https://github.com/auth0/Lock.iOS-OSX/blob/master/Pod/Classes/Core/A0UserProfile.h) and [A0Token](https://github.com/auth0/Lock.iOS-OSX/blob/master/Pod/Classes/Core/A0Token.h) classes' documentation.
>
> To learn how to save and manage the tokens and profile in detail, please read [this guide](/libraries/lock-ios/save-and-refresh-jwt-tokens). Notice that Lock on its own will not save the tokens and profile for you.

### Optional: Log In with Social Connections

In order to have a simple login mechanism through social connections, all you have to do is enable them in your account's [connections dashboard](${manage_url}/#/connections/social). Every social connection you switch on there, will appear in the Login screen of your app. That's pretty much it!

#### Important: Google Connections

Google recently announced they will no longer support web-views, it is *highly recommended* you update your code to use Safari for web based authentication.

##### Podfile

Update your Podfile to include:

```ruby
pod 'Lock/Safari'
```

You should add the following code before you present Lock to the user. If you have multiple connections you wish to
use with Safari you will need to specify each one manually as above.

To use Safari for the default Google social connection, add the following:

```swift
let lock = A0Lock.shared()
let safari = A0SafariAuthenticator(lock: lock, connectionName: "google-oauth2")
lock.registerAuthenticators([safari])    
```
