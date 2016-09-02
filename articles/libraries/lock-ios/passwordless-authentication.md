# Lock iOS: Passwordless Authentication

Lock provides passwordless authentication with [**SMS**](#sms) and [**TouchID**](#TouchID) for your Auth0 database connections.

## SMS

TODO

## TouchID

When using TouchID, the app prompts users to tap the screen with their thumb in order to prove their identity.

<div class="phone-mockup"><img src="/media/articles/libraries/lock-ios/touch-id-widget.png" alt="Touch ID Widget"/></div>

Enabling this feature is pretty simple, just follow these three steps:

**First,** integrate the `Lock/TouchID` pod to your project. Add this line to your `Podfile` and run `pod install`:

```ruby
pod "Lock/TouchID"
```

**Then,** import the Lock module (if you haven't already) in the file from where you present your Login widget.

```swift
import Lock
```

**Finally,** setup and present an `A0TouchIDLockViewController` instance, like this:

```swift
let lock = A0Lock.sharedLock()
let controller = A0TouchIDLockViewController(lock: lock)
controller.onAuthenticationBlock = { (profile, token) -> () in
    // Store token & profile. For example, in the keychain, using SimpleKeychain.
    self.dismissViewControllerAnimated(true, completion:nil)
}
lock.presentTouchIDController(controller, fromController: self)
```

That's pretty much it! You should see the Lock Touch ID widget presented above.

